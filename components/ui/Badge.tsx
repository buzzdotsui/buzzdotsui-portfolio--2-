import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'neutral' | 'accent';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-1 text-[10px] font-bold font-mono rounded border leading-none tracking-wide uppercase transition-colors";
  
  const variants = {
    default: "bg-primary/10 border-primary/30 text-primary",
    outline: "bg-transparent border-border text-text-muted",
    neutral: "bg-surfaceHighlight border-border text-text-muted hover:border-primary/30 hover:text-text-main",
    accent: "bg-secondary/10 border-secondary/30 text-secondary"
  };

  return (
    <span className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </span>
  );
};