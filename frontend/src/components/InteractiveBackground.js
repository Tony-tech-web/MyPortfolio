import React, { useEffect, useRef } from 'react';

const InteractiveBackground = ({
  particleCount = 'auto',
  primaryColor = '#3b82f6',
  secondaryColor = '#8b5cf6',
  connectionDistance = 120,
  mouseRepelDistance = 200,
  mouseGlowIntensity = 0.3,
  showFloatingShapes = true,
  showMouseGlow = true,
  particleSize = 'medium',
  animationSpeed = 1,
  opacity = 1,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const particlesRef = useRef([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;

    // Parse colors to RGB (support hex or CSS variable)
    const getColorValue = (color) => {
      if (color.startsWith('var(')) {
        const varName = color.slice(4, -1);
        return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      }
      return color;
    };

    const hexToRgb = (colorInput) => {
      const hex = getColorValue(colorInput);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 59, g: 130, b: 246 };
    };

    const primary = hexToRgb(primaryColor);
    const secondary = hexToRgb(secondaryColor);

    // Particle size mapping
    const sizeMap = {
      small: { min: 0.5, max: 1.5 },
      medium: { min: 1, max: 2.5 },
      large: { min: 1.5, max: 3.5 }
    };
    const particleSizeRange = sizeMap[particleSize] || sizeMap.medium;

    // Resize canvas
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      width = rect.width;
      height = rect.height;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);
      
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      let count;
      if (particleCount === 'auto') {
        count = Math.min(150, Math.floor((width * height) / 15000));
      } else {
        count = particleCount;
      }

      particlesRef.current = [];

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5 * animationSpeed,
          vy: (Math.random() - 0.5) * 0.5 * animationSpeed,
          radius: Math.random() * (particleSizeRange.max - particleSizeRange.min) + particleSizeRange.min,
          originalX: 0,
          originalY: 0,
          alpha: Math.random() * 0.5 + 0.3,
          hue: Math.random()
        });
      }

      particlesRef.current.forEach(p => {
        p.originalX = p.x;
        p.originalY = p.y;
      });
    };

    // Global mouse handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;

      // Add to trail
      trailRef.current.push({
        x: mouseRef.current.targetX,
        y: mouseRef.current.targetY,
        alpha: 1,
        size: 20
      });

      // Limit trail length
      if (trailRef.current.length > 15) {
        trailRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = width / 2;
      mouseRef.current.targetY = height / 2;
      trailRef.current = [];
    };

    // Draw mouse trail
    const drawMouseTrail = () => {
      trailRef.current.forEach((point, index) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.size);
        gradient.addColorStop(0, `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${point.alpha * 0.3})`);
        gradient.addColorStop(0.5, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, ${point.alpha * 0.15})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();

        // Fade out
        point.alpha *= 0.95;
        point.size *= 0.98;
      });

      // Remove dead trails
      trailRef.current = trailRef.current.filter(p => p.alpha > 0.01);
    };

    // Draw connections with mouse enhancement
    const updateParticles = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;

      particlesRef.current.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Stronger mouse repulsion
        if (distance < mouseRepelDistance) {
          const force = (mouseRepelDistance - distance) / mouseRepelDistance;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 1.5 * animationSpeed;
          particle.vy -= Math.sin(angle) * force * 1.5 * animationSpeed;
        }

        // Mouse attraction for very close particles (creates swirl effect)
        if (distance < 100 && distance > 50) {
          const force = (100 - distance) / 100;
          const perpAngle = Math.atan2(dy, dx) + Math.PI / 2;
          particle.vx += Math.cos(perpAngle) * force * 0.3;
          particle.vy += Math.sin(perpAngle) * force * 0.3;
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Return to original position
        const returnForce = 0.02;
        particle.vx += (particle.originalX - particle.x) * returnForce;
        particle.vy += (particle.originalY - particle.y) * returnForce;

        // Damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Boundary wrapping
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Color shift based on distance from mouse
        if (distance < mouseRepelDistance) {
          particle.hue = (distance / mouseRepelDistance);
        }
      });
    };

    // Draw particles with enhanced glow
    const drawParticles = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;

      particlesRef.current.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        // Enhance particles near mouse
        const enhanceFactor = distToMouse < 150 ? (150 - distToMouse) / 150 : 0;
        const currentRadius = particle.radius * (1 + enhanceFactor * 0.5);
        const currentAlpha = particle.alpha * (1 + enhanceFactor);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentRadius * 3
        );
        
        // Color mixing based on distance
        const r = Math.floor(primary.r * (1 - enhanceFactor) + secondary.r * enhanceFactor);
        const g = Math.floor(primary.g * (1 - enhanceFactor) + secondary.g * enhanceFactor);
        const b = Math.floor(primary.b * (1 - enhanceFactor) + secondary.b * enhanceFactor);
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow for nearby particles
        if (enhanceFactor > 0.3) {
          ctx.shadowBlur = 20 * enhanceFactor;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${enhanceFactor})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    };

    // Draw connections with mouse enhancement
    const drawConnections = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            let opacity = (1 - distance / connectionDistance) * 0.3;

            const distToMouse1 = Math.sqrt((mouseX - p1.x) ** 2 + (mouseY - p1.y) ** 2);
            const distToMouse2 = Math.sqrt((mouseX - p2.x) ** 2 + (mouseY - p2.y) ** 2);
            
            // Strong boost for lines near mouse
            if (distToMouse1 < 150 || distToMouse2 < 150) {
              opacity *= 3;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
    };

    // Draw floating shapes with mouse influence
    const drawFloatingShapes = (time) => {
      if (!showFloatingShapes) return;

      const { x: mouseX, y: mouseY } = mouseRef.current;
      
      for (let i = 0; i < 5; i++) {
        const angle = (time * 0.0002 * animationSpeed + i * 0.5) % (Math.PI * 2);
        const radius = 150 + i * 80;
        
        // Stronger mouse influence
        const offsetX = (mouseX - width / 2) * 0.15;
        const offsetY = (mouseY - height / 2) * 0.15;
        
        const x = width / 2 + Math.cos(angle) * radius + offsetX;
        const y = height / 2 + Math.sin(angle) * radius + offsetY;
        
        const size = 3 + i * 2;
        const rotation = time * 0.001 * animationSpeed + i;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
        gradient.addColorStop(0, `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${0.5 - i * 0.05})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.strokeStyle = `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${0.4 - i * 0.05})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }
    };

    // Animation loop
    const animate = (time) => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      drawFloatingShapes(time);
      drawMouseTrail();
      updateParticles();
      drawConnections();
      drawParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, primaryColor, secondaryColor, connectionDistance, mouseRepelDistance, 
      mouseGlowIntensity, showFloatingShapes, showMouseGlow, particleSize, animationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ background: 'transparent', opacity }}
    />
  );
};

export default InteractiveBackground;