import React from 'react';
import { SectionId, Project } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';
import { MotionWrapper } from './ui/MotionWrapper';

const projects: Project[] = [
  {
    id: 'cipher',
    title: 'Project Cipher',
    description: 'Automated hardening suite for Debian-based systems. Configures UFW, Fail2Ban, and SSH according to CIS benchmarks automatically.',
    tags: ['Bash', 'Security', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1624969862644-791f3dc98ee2',
    githubUrl: 'https://github.com/buzzdotsui/Project-Cipher',
    featured: true
  },
  {
    id: 'recon',
    title: 'AutoRecon',
    description: 'Python-based surveillance tool that schedules Nmap scans, diffs results against previous baselines, and alerts on new open ports.',
    tags: ['Python', 'Nmap', 'Monitoring'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
    githubUrl: 'https://github.com/buzzdotsui/Auto-Recon',
    featured: true
  },
  {
    id: 'sentinel',
    title: 'LogSentinel',
    description: 'Real-time log parser for authentication logs. Detects brute-force patterns using regex and triggers IP blocks via iptables.',
    tags: ['Python', 'Regex', 'SysAdmin'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    githubUrl: 'https://github.com/buzzdotsui/LogSentinel',
    featured: true
  },
  {
    id: 'dashboard',
    title: 'InfraUI',
    description: 'React dashboard for visualizing server health metrics. Consumes custom JSON endpoints to display CPU, RAM, and Disk IO stats.',
    tags: ['React', 'Dashboard', 'Data Viz'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    githubUrl: 'https://github.com/buzzdotsui/Infra-UI',
    demoUrl: 'https://testytech.netlify.app/',
    featured: false
  }
];

interface ProjectsProps {
  onProjectSelect: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  return (
    <section id={SectionId.PROJECTS} className="py-20 px-4 md:px-6 bg-background">
      <MotionWrapper className="max-w-6xl mx-auto">
        <SectionHeading title="Field Operations" number="02" subtitle="Deployed solutions focusing on automation and security." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className="group relative rounded-xl border border-border bg-surface/30 hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.15)] flex flex-col"
            >
              {/* Image Container */}
              <div className="h-56 w-full overflow-hidden relative border-b border-border">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <OptimizedImage
                  src={`${project.imageUrl}?q=80&w=800&auto=format&fit=crop`}
                  alt={project.title}
                  wrapperClassName="h-full w-full"
                  className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out saturate-0 group-hover:saturate-100"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  {project.featured && (
                    <span className="px-2 py-0.5 bg-primary/20 border border-primary/50 text-primary text-[10px] font-bold uppercase rounded shadow-lg backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 flex gap-2 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {project.githubUrl && (
                    <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} className="p-2 bg-background/80 backdrop-blur border border-border text-text-main hover:text-primary hover:border-primary rounded-full transition-colors" aria-label="GitHub">
                      <Github size={16} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} onClick={(e) => e.stopPropagation()} className="p-2 bg-background/80 backdrop-blur border border-border text-text-main hover:text-secondary hover:border-secondary rounded-full transition-colors" aria-label="Live Demo">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow bg-surface/50 backdrop-blur-sm">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">{project.title}</h3>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="neutral">{tag}</Badge>
                    ))}
                  </div>

                  <button
                    className="text-xs font-bold uppercase flex items-center gap-1 hover:gap-2 transition-all text-text-dim group-hover:text-primary"
                  >
                    Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionWrapper>
    </section>
  );
};