import React from 'react';
import { Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-border bg-background relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-text-dim hover:text-primary transition-colors cursor-default">
          <Terminal size={14} />
          <span className="font-mono text-xs">buzzdotsui_sys_v2.4.0</span>
        </div>
        
        <div className="flex gap-6 text-xs text-text-muted font-medium uppercase tracking-wider">
           <a href="https://github.com/buzzdotsui" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline underline-offset-4 transition-all">
             GitHub
           </a>
           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline underline-offset-4 transition-all">
             LinkedIn
           </a>
           <a href="https://x.com/_buzzdotsui" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline underline-offset-4 transition-all">
             X / Twitter
           </a>
        </div>
      </div>
    </footer>
  );
};