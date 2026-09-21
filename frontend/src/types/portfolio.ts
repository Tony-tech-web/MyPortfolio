import React from 'react';

export interface CaseStudyArchitecture {
  frontend: string;
  backend: string;
  database: string;
  ai: string;
}

export interface CaseStudy {
  id: string;
  name: string;
  type: string;
  problem: string;
  solution: string;
  stack: string[];
  architecture: CaseStudyArchitecture;
  impact: string;
  github: string;
  demo: string;
}

export interface PillarSpec {
  label: string;
  value: string;
}

export interface Pillar {
  id: string;
  code: string;
  name: string;
  role: string;
  statusColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  directives: string[];
  specs: PillarSpec[];
  tags: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  built: string;
  learned: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  created_at: string;
  url: string;
}

export interface RadarStat {
  label: string;
  value: number;
}

export interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  id: string;
  skills: string[];
  description: string;
  stats: RadarStat[];
  color: string;
}

export interface ProofCard {
  id: number;
  title: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  description: string;
}

export interface SystemArchitectureItem {
  title: string;
  icon: React.ReactNode;
  points: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface OrbitModule {
  title: string;
  icon: React.ReactNode;
  desc: string;
}
