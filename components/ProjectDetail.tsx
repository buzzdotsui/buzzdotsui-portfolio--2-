import React, { useEffect } from 'react';
import { ArrowLeft, Terminal, ExternalLink, FileCode, BarChart, Layers, Cpu } from 'lucide-react';
import { Project } from '../types';
import { Footer } from './Footer';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

// Mock Data for the Technical Deep Dive
const CASE_STUDY_DATA = {
  metadata: {
    cloud: 'AWS',
    orchestration: 'Kubernetes 1.28',
    iac: 'Terraform'
  },
  diffs: {
    before: [
      "Manual Security Group Updates",
      "Publicly Exposed Bastion Hosts",
      "Mean Time to Recovery: 4h",
      "Config Drift: High"
    ],
    after: [
      "Automated SG Rules via Terraform",
      "SSM Session Manager Access",
      "Mean Time to Recovery: <5m",
      "Immutable Infrastructure"
    ]
  },
  snippet: `resource "aws_security_group" "bastion" {
  name        = "bastion-sg"
  description = "Strict control for bastion access"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.vpn_cidr] # LIMIT: VPN ONLY
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}`,
  artifacts: [
    { label: 'Terraform Module', type: 'Gist', icon: FileCode, href: '#' },
    { label: 'Lighthouse Performance Report', type: 'Audit', icon: BarChart, href: '#' },
    { label: 'Architecture Diagram', type: 'Source', icon: Layers, href: '#' },
  ]
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main relative font-mono selection:bg-primary selection:text-white">

      {/* Top Nav */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md h-14 flex items-center px-4 md:px-6 justify-between rounded-none">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-primary uppercase tracking-wider group transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          ./cd ..
        </button>
        <div className="text-[10px] text-text-dim uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
          MODE: DEEP_DIVE
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border-x border-border min-h-screen">

        {/* Sidebar TOC - Hidden on Mobile */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-border bg-background">
          <div className="sticky top-16 p-6">
            <div className="text-xs font-bold text-text-dim mb-6 uppercase tracking-widest">Index</div>
            <nav className="space-y-1">
              {['Overview', 'Legacy vs Modern', 'Implementation', 'Results', 'Artifacts'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                  className="block w-full text-left text-xs py-2 px-3 text-text-muted hover:text-primary hover:bg-surfaceHighlight border-l-2 border-transparent hover:border-primary transition-all rounded-r-md"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Column */}
        <div className="lg:col-span-9 bg-background">

          {/* Console Header */}
          <header className="p-8 md:p-12 border-b border-border bg-background relative overflow-hidden">
            {/* Background glow for header */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="mb-6 inline-flex items-center px-2 py-1 border border-border bg-surfaceHighlight text-[10px] text-text-muted rounded">
              CASE_STUDY_ID: {project.id.toUpperCase()}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 tracking-tighter">
              {project.title}_
            </h1>
            <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-3xl font-sans">
              {project.description} This technical case study explores the transition from manual infrastructure management to a fully automated, immutable infrastructure stack.
            </p>
          </header>

          {/* System Metadata Bar - Stack on mobile */}
          <div id="overview" className="grid grid-cols-1 md:grid-cols-3 border-b border-border text-xs text-text-dim uppercase tracking-widest bg-surface/30">
            <div className="p-4 border-b md:border-b-0 md:border-r border-border flex items-center gap-2">
              <Cpu size={14} className="text-secondary" /> Cloud: {CASE_STUDY_DATA.metadata.cloud}
            </div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-border flex items-center gap-2">
              <Layers size={14} className="text-primary" /> Orchestration: {CASE_STUDY_DATA.metadata.orchestration}
            </div>
            <div className="p-4 flex items-center gap-2">
              <Terminal size={14} className="text-accent" /> IaC: {CASE_STUDY_DATA.metadata.iac}
            </div>
          </div>

          {/* Diff View */}
          <section id="legacy-vs-modern" className="p-8 md:p-12 border-b border-border">
            <h2 className="text-lg font-bold text-text-main mb-8 flex items-center gap-2">
              <span className="text-primary">//</span> SYSTEM EVOLUTION: DIFF VIEW
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-lg overflow-hidden">
              {/* Legacy - Red */}
              <div className="bg-error/5 border-b md:border-b-0 md:border-r border-border p-6">
                <div className="text-error text-xs font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-error rounded-full"></span> LEGACY STATE
                </div>
                <ul className="space-y-3">
                  {CASE_STUDY_DATA.diffs.before.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-text-muted">
                      <span className="text-error font-bold shrink-0">-</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Modern - Green */}
              <div className="bg-success/5 p-6">
                <div className="text-success text-xs font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full"></span> MODERN STATE
                </div>
                <ul className="space-y-3">
                  {CASE_STUDY_DATA.diffs.after.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-text-muted">
                      <span className="text-success font-bold shrink-0">+</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Terminal Component */}
          <section id="implementation" className="p-8 md:p-12 border-b border-border">
            <h2 className="text-lg font-bold text-text-main mb-8 flex items-center gap-2">
              <span className="text-primary">//</span> INFRASTRUCTURE_AS_CODE
            </h2>

            <div className="border border-border bg-surfaceHighlight/30 rounded-lg overflow-hidden">
              {/* VS Code Tab Bar */}
              <div className="flex items-center bg-background/50 border-b border-border overflow-x-auto">
                <div className="px-4 py-2 text-xs text-text-main bg-surfaceHighlight/30 border-t-2 border-primary border-r border-border flex items-center gap-2 shrink-0">
                  <FileCode size={12} className="text-secondary" /> main.tf
                </div>
                <div className="px-4 py-2 text-xs text-text-dim border-r border-border flex items-center gap-2 shrink-0">
                  <FileCode size={12} /> variables.tf
                </div>
                <div className="px-4 py-2 text-xs text-text-dim border-r border-border flex items-center gap-2 shrink-0">
                  <FileCode size={12} /> outputs.tf
                </div>
              </div>

              {/* Code Area */}
              <div className="p-4 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed text-text-muted">
                  <code className="block">
                    {CASE_STUDY_DATA.snippet.split('\n').map((line, i) => (
                      <div key={i} className="table-row hover:bg-white/5 transition-colors">
                        <span className="table-cell select-none text-text-dim text-right pr-4 border-r border-border/50 mr-4">{i + 1}</span>
                        <span className="table-cell pl-4 whitespace-pre">{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section id="results" className="p-8 md:p-12 border-b border-border">
            <h2 className="text-lg font-bold text-text-main mb-8 flex items-center gap-2">
              <span className="text-primary">//</span> PERFORMANCE_METRICS
            </h2>

            {/* Wrapper for responsive table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead className="bg-surfaceHighlight/50 text-text-dim uppercase tracking-widest border-b border-border">
                  <tr>
                    <th className="p-4 font-normal">Metric</th>
                    <th className="p-4 font-normal">Before</th>
                    <th className="p-4 font-normal">After</th>
                    <th className="p-4 font-normal text-right">Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  <tr className="hover:bg-surfaceHighlight/20 transition-colors">
                    <td className="p-4 font-mono text-text-main">Deployment Time</td>
                    <td className="p-4 text-text-muted">45 mins</td>
                    <td className="p-4 text-text-main">3.5 mins</td>
                    <td className="p-4 text-right text-success font-bold">-92%</td>
                  </tr>
                  <tr className="hover:bg-surfaceHighlight/20 transition-colors">
                    <td className="p-4 font-mono text-text-main">Attack Surface</td>
                    <td className="p-4 text-text-muted">All Ports</td>
                    <td className="p-4 text-text-main">Port 443</td>
                    <td className="p-4 text-right text-success font-bold">-99%</td>
                  </tr>
                  <tr className="hover:bg-surfaceHighlight/20 transition-colors">
                    <td className="p-4 font-mono text-text-main">Recovery Time</td>
                    <td className="p-4 text-text-muted">4 hours</td>
                    <td className="p-4 text-text-main">2 mins</td>
                    <td className="p-4 text-right text-success font-bold">-99%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Artifacts Section */}
          <section id="artifacts" className="p-8 md:p-12 bg-surfaceHighlight/10">
            <h2 className="text-lg font-bold text-text-main mb-8 flex items-center gap-2">
              <span className="text-primary">//</span> PROJECT_ARTIFACTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CASE_STUDY_DATA.artifacts.map((artifact) => (
                <a
                  key={artifact.label}
                  href={artifact.href}
                  className="group block border border-border bg-background p-4 hover:border-primary hover:bg-surfaceHighlight/50 rounded-lg transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <artifact.icon size={20} className="text-text-dim group-hover:text-primary transition-colors" />
                    <ExternalLink size={12} className="text-text-muted group-hover:text-text-main" />
                  </div>
                  <div className="text-[10px] text-text-dim uppercase mb-1">{artifact.type}</div>
                  <div className="text-xs font-bold text-text-main group-hover:text-primary">{artifact.label}</div>
                </a>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Footer integration */}
      <div className="border-t border-border">
        <Footer />
      </div>
    </div>
  );
};