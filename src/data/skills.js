import {
  Code2, Server, Database, Wrench,
  Globe, Layout, Palette, FileCode,
  Layers, GitBranch, Terminal, Cloud, PenTool
} from 'lucide-react';

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Layout,
    color: '#ef6c35',
    skills: [
      { name: 'HTML', icon: Globe, level: 'Intermediate' },
      { name: 'CSS', icon: Palette, level: 'Intermediate' },
      { name: 'JavaScript', icon: FileCode, level: 'Intermediate' },
      { name: 'React', icon: Code2, level: 'Intermediate' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    color: '#ffa06b',
    skills: [
      { name: 'Node.js', icon: Terminal, level: 'Intermediate' },
      { name: 'Express.js', icon: Server, level: 'Intermediate' },
    ],
  },
  {
    id: 'databases',
    title: 'Database',
    icon: Database,
    color: '#f59e0b',
    skills: [
      { name: 'PostgreSQL', icon: Database, level: 'Intermediate' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    color: '#e0561f',
    skills: [
      { name: 'Git', icon: GitBranch, level: 'Intermediate' },
      { name: 'GitHub', icon: GitBranch, level: 'Intermediate' },
      { name: 'Netlify', icon: Cloud, level: 'Intermediate' },
    ],
  },
  {
    id: 'uiux',
    title: 'UI/UX',
    icon: Layers,
    color: '#fbbf77',
    skills: [
      { name: 'Figma', icon: PenTool, level: 'Intermediate' },
    ],
  },
];