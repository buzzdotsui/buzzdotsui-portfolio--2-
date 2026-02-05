import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  number?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, number }) => {
  return (
    <div className="flex flex-col gap-2 pb-6 border-b border-border mb-8">
      <div className="flex items-baseline gap-3">
        {number && <span className="text-xs font-mono text-text-dim">{number}</span>}
        <h2 className="text-xl font-semibold text-text-main tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm text-text-muted max-w-2xl font-normal pl-[2rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
};