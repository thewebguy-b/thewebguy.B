
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  tags: string[];
  number: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  label: string;
  desc: string;
  icon: string;
  longDesc: string;
  methodology: string[];
  techStack: string[];
  logicSnippet: string;
}

export interface CaseStudyProps {
  id: string;
  title: string;
  category: string;
  img: string;
  accent: string;
  stat: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  year: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  id: string;
}
