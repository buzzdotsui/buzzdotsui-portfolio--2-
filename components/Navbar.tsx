import React, { useState, useEffect } from 'react';
import { NavItem, SectionId } from '../types';
import { Terminal, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';

const navItems: NavItem[] = [
  { label: 'Overview', href: `#${SectionId.HERO}` },
  { label: 'Expertise', href: `#${SectionId.SKILLS}` },
  { label: 'Work', href: `#${SectionId.PROJECTS}` },
  { label: 'Documentation', href: `#${SectionId.ABOUT}` },
  { label: 'Contact', href: `#${SectionId.CONTACT}` },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-lg shadow-primary/5' : 'bg-transparent border-transparent'}`}>
      <div className="w-full px-4 md:px-6 h-16 flex items-center justify-between max-w-7xl mx-auto">

        {/* Left: Identity */}
        <div className="flex items-center gap-4 animate-fade-in">
          <a
            href={`#${SectionId.HERO}`}
            onClick={(e) => handleScroll(e, `#${SectionId.HERO}`)}
            className="flex items-center gap-2 text-text-main hover:text-primary transition-colors cursor-pointer group"
          >
            <div className="p-1.5 rounded-md bg-surfaceHighlight border border-border group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
              <Terminal size={18} className="text-primary" />
            </div>
            <span className="font-mono text-sm font-bold tracking-tight">buzzdotsui</span>
          </a>
        </div>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-surface/50 backdrop-blur-sm border border-border rounded-full px-4 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-xs font-medium text-text-muted hover:text-primary transition-colors px-4 py-1.5 rounded-full hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Status Indicator & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="text-xs font-mono text-primary font-medium tracking-wide">v2.0 Online</span>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-text-muted hover:text-primary transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-4 flex flex-col gap-2 shadow-2xl md:hidden animate-slide-up origin-top">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-sm font-medium text-text-muted hover:text-primary hover:bg-white/5 transition-all p-3 rounded-lg flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};