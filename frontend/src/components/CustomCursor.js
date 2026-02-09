import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    
    // Spring physics for smooth trailing
    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });
    
    // Faster spring for the outer ring delay
    const ringX = useSpring(0, { stiffness: 150, damping: 20 });
    const ringY = useSpring(0, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
            
            // Detect clickable elements
            const target = e.target;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                              target.tagName === 'A' || 
                              target.tagName === 'BUTTON';
            setIsPointer(isClickable);
        };

        const handleMouseDown = () => setIsHovered(true);
        const handleMouseUp = () => setIsHovered(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY, ringX, ringY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Precision Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 bg-accent-primary"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            
            {/* Technical Crosshair / Ring */}
            <motion.div
                className="fixed top-0 left-0 border border-accent-primary/20"
                animate={{
                    width: isPointer ? 48 : 24,
                    height: isPointer ? 48 : 24,
                    opacity: isHovered ? 0.8 : 0.3,
                    scale: isHovered ? 0.95 : 1,
                    rotate: isPointer ? 45 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
};

export default CustomCursor;
