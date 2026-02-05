import React from 'react';
import { SectionId } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { MotionWrapper } from './ui/MotionWrapper';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-20 px-4 md:px-6 bg-surface/20 border-y border-border">
      <MotionWrapper className="max-w-6xl mx-auto">
        <SectionHeading title="System Documentation" number="03" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Narrative */}
          <div className="md:col-span-7">
            <h3 className="text-lg font-medium text-text-main mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-secondary rounded-full"></span>
              Background
            </h3>
            <div className="prose prose-invert prose-sm text-text-muted space-y-4">
              <p className="leading-7">
                My engineering philosophy is derived from Metallurgical Engineering: materials have failure points, and so does software. I approach infrastructure with the same rigor used in physical stress testing.
              </p>
              <p className="leading-7">
                Currently operating as a Systems Reliability Engineer, I focus on removing "hope" from deployment strategies. If a process relies on manual intervention, it is a bug. My work involves designing self-healing architectures, enforcing security compliance at the kernel level, and ensuring data integrity across distributed systems.
              </p>
            </div>
          </div>

          {/* Specs List */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-medium text-text-main mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              Operational Standards
            </h3>
            <dl className="border border-border rounded-xl bg-background p-1">
              <div className="p-4 border-b border-border grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">Uptime Goal</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">99.95% (HA)</dd>
              </div>
              <div className="p-4 border-b border-border grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">Security</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">Zero Trust</dd>
              </div>
              <div className="p-4 border-b border-border grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">IaC</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">Immutable</dd>
              </div>
              <div className="p-4 grid grid-cols-3 gap-4">
                <dt className="text-xs font-mono text-text-dim uppercase pt-0.5">Tooling</dt>
                <dd className="col-span-2 text-sm text-text-main font-mono text-right">Open Source First</dd>
              </div>
            </dl>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
};