import React from 'react';
import { Github, Linkedin, MapPin, Clock, ArrowRight, Twitter } from 'lucide-react';
import { SectionId } from '../types';
import { OptimizedImage } from './ui/OptimizedImage';
import { Hero3DBackground } from './effects/Hero3DBackground';
import { TypeAnimation } from 'react-type-animation';

export const Hero: React.FC = () => {
  return (
    <section id={SectionId.HERO} className="relative pt-32 pb-20 px-4 md:px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden">

      {/* Background FX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <Hero3DBackground />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Identity Data */}
        <div className="lg:col-span-8 flex flex-col">

          <div className="flex items-start gap-6 mb-8 animate-slide-up">
            {/* Avatar */}
            <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-gradient-to-tr from-primary via-secondary to-accent animate-float shadow-lg shadow-primary/20">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                <OptimizedImage
                  src="https://github.com/buzzdotsui.png"
                  alt="Profile"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="flex-1 pt-2">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-primary/30 bg-primary/10 text-primary uppercase tracking-wider">Reliability Engineering</span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-secondary/30 bg-secondary/10 text-secondary uppercase tracking-wider">DevSecOps</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                <TypeAnimation
                  sequence={[
                    'Testimony Owolabi',
                    3000,
                    'DevSecOps Engineer',
                    2000,
                    'Systems Architect',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-gradient"
                  repeat={Infinity}
                />
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-text-muted max-w-2xl mb-10 leading-relaxed font-light animate-slide-up-delay-1">
            Designing <span className="text-text-main font-medium">deterministic infrastructure</span>. I bridge the gap between hardware constraints and cloud scalability, focusing on automated pipelines, security baselines, and
            <span className="text-primary font-mono bg-primary/5 px-1 mx-1 rounded">99.99%</span>
            system availability.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up-delay-2">
            <a
              href={`#${SectionId.PROJECTS}`}
              className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center gap-2 group"
            >
              View Operations
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`#${SectionId.CONTACT}`}
              className="px-6 py-3 bg-surfaceHighlight border border-border text-text-main text-sm font-medium rounded-lg hover:bg-surface hover:border-primary/50 transition-colors"
            >
              Initiate Contact
            </a>
          </div>

          {/* Info Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border animate-slide-up-delay-3">
            <div>
              <div className="text-[10px] uppercase text-text-dim font-bold mb-2 tracking-widest">Location</div>
              <div className="flex items-center gap-2 text-sm text-text-muted group">
                <MapPin size={14} className="text-primary group-hover:animate-bounce" /> Akure, NG
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-text-dim font-bold mb-2 tracking-widest">Timezone</div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Clock size={14} className="text-secondary" /> GMT+1
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-text-dim font-bold mb-2 tracking-widest">Availability</div>
              <div className="text-sm text-success font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                Open to Work
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-text-dim font-bold mb-2 tracking-widest">Links</div>
              <div className="flex gap-4 text-text-muted">
                <a href="https://github.com/buzzdotsui" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><Github size={18} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><Linkedin size={18} /></a>
                <a href="https://x.com/_buzzdotsui" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><Twitter size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack */}
        <div className="lg:col-span-4 lg:pl-12 animate-slide-up-delay-3">
          <div className="p-6 rounded-2xl border border-border bg-surface/30 backdrop-blur-sm relative overflow-hidden group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur transition duration-1000 group-hover:duration-200"></div>

            <div className="relative">
              <div className="text-[10px] font-mono text-secondary uppercase mb-6 flex items-center gap-2">
                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                Core Stack
              </div>
              <ul className="space-y-4">
                {[
                  { label: 'Orchestration', value: 'K8s / Ansible' },
                  { label: 'Scripting', value: 'Python / Bash' },
                  { label: 'Cloud', value: 'AWS / GCP' },
                  { label: 'OS', value: 'Linux (RHEL)' }
                ].map((item) => (
                  <li key={item.label} className="flex justify-between items-center text-sm font-mono border-b border-border pb-2 last:border-0">
                    <span className="text-text-dim">{item.label}</span>
                    <span className="text-text-main font-semibold">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};