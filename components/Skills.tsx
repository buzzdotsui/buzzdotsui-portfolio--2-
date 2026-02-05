import React from 'react';
import { SectionId, SkillCategory } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { Server, Terminal, Activity, Cpu } from 'lucide-react';
import { MotionWrapper } from './ui/MotionWrapper';

const skillCategories: SkillCategory[] = [
  {
    title: "Infrastructure",
    icon: Server,
    skills: ["Linux Admin (Debian/RHEL)", "Docker / Containerd", "VMWare ESXi", "Bare Metal Provisioning", "TCP/IP & DNS", "SSH Key Management"]
  },
  {
    title: "Automation & CI/CD",
    icon: Terminal,
    skills: ["Python (Boto3/Fabric)", "Bash / Shell Scripting", "Ansible Playbooks", "GitHub Actions", "Terraform Basics", "GitOps Principles"]
  },
  {
    title: "Observability",
    icon: Activity,
    skills: ["Prometheus / Grafana", "ELK Stack", "Nmap Network Audits", "Wireshark Packet Analysis", "Systemd Journaling", "Kernel Tuning"]
  },
  {
    title: "Engineering",
    icon: Cpu,
    skills: ["Root Cause Analysis", "Capacity Planning", "Disaster Recovery", "System Hardening (CIS)", "Load Balancing", "Cost Optimization"]
  }
];

export const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-20 px-4 md:px-6 bg-background relative">
      <MotionWrapper className="max-w-6xl mx-auto">
        <SectionHeading title="Technical Inventory" number="01" subtitle="Competencies and toolchains currently in production use." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="bg-surface/50 border border-border p-6 rounded-xl hover:bg-surfaceHighlight hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.2)] group"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-surface border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                  <category.icon size={20} className="text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-text-main">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-sm text-text-muted font-mono flex items-start gap-2">
                    <span className="text-primary/50 mt-1">›</span>
                    <span className="group-hover:text-text-main transition-colors">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MotionWrapper>
    </section>
  );
};