import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { Mail, Copy, Check, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { MotionWrapper } from './ui/MotionWrapper';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';

// ========================================
// EMAILJS CONFIGURATION
// ========================================
// Your EmailJS credentials from https://www.emailjs.com/
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dd5v77m',           // ✅ Configured
  TEMPLATE_ID: 'template_eehdjv3',         // ✅ Configured
  PUBLIC_KEY: 'Ios-Y4WNV37Naxn8W',         // ✅ Configured
};

// Template variables to use in your EmailJS template:
// {{from_name}}   - The sender's name
// {{from_email}}  - The sender's email
// {{message}}     - The message content
// {{to_email}}    - Your email (optional, can be set in EmailJS dashboard)

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  // Check if EmailJS is configured
  useEffect(() => {
    const configured =
      EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
    setIsConfigured(configured);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (formState === 'error') setFormState('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      toast.error('Contact form not configured. Please set up EmailJS credentials.', {
        duration: 4000,
        icon: '⚠️',
      });
      return;
    }

    setFormState('submitting');

    try {
      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'owolabitestimony7724@gmail.com', // Your email
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        toast.success('Message sent successfully! I\'ll get back to you soon.', {
          duration: 4000,
          icon: '✉️',
          style: {
            background: '#10b981',
            color: '#ffffff',
          },
        });

        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormState('error');
      toast.error('Failed to send message. Please try emailing me directly.', {
        duration: 4000,
        icon: '❌',
        style: {
          background: '#ef4444',
          color: '#ffffff',
        },
      });

      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('owolabitestimony7724@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!', {
      duration: 2000,
      icon: '📋',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={SectionId.CONTACT} className="py-20 px-4 md:px-6 bg-background relative overflow-hidden">
      <Toaster position="bottom-right" />

      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <MotionWrapper className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="Communication Interface" number="04" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Direct Info */}
          <div className="space-y-8">
            <p className="text-base text-text-muted leading-relaxed">
              Available for contract work and full-time positions focusing on infrastructure reliability and security. I typically respond within 24 hours.
            </p>

            <div className="p-6 border border-border bg-surface/30 rounded-xl hover:border-primary/30 transition-colors group">
              <div className="text-xs font-mono text-text-dim uppercase mb-3 flex items-center gap-2">
                <Mail size={12} /> Primary Channel
              </div>
              <div className="flex items-center gap-3 bg-background p-3 rounded-lg border border-border">
                <span className="text-sm font-mono text-text-main break-all flex-1">owolabitestimony7724@gmail.com</span>
                <button
                  onClick={copyEmail}
                  className="text-text-muted hover:text-primary p-2 hover:bg-surfaceHighlight rounded-md transition-all"
                  title="Copy to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Configuration Status */}
            {!isConfigured ? (
              <div className="p-4 border border-warning/30 bg-warning/5 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-text-muted space-y-2">
                    <p className="font-bold text-warning">EmailJS Setup Required</p>
                    <p>To enable the contact form, follow these steps:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-2">
                      <li>Sign up at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">emailjs.com</a></li>
                      <li>Add an email service (Gmail, Outlook, etc.)</li>
                      <li>Create an email template with variables: <code className="px-1 py-0.5 bg-background rounded text-primary">from_name</code>, <code className="px-1 py-0.5 bg-background rounded text-primary">from_email</code>, <code className="px-1 py-0.5 bg-background rounded text-primary">message</code></li>
                      <li>Replace the config values at the top of <code className="px-1 py-0.5 bg-background rounded text-primary">Contact.tsx</code></li>
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-success/30 bg-success/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-success" />
                  <p className="text-sm text-success font-medium">Contact form is configured and ready!</p>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-surfaceHighlight/50 border border-border p-3 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none rounded-lg placeholder:text-text-dim transition-all"
                  placeholder="Identify yourself"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-surfaceHighlight/50 border border-border p-3 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none rounded-lg placeholder:text-text-dim transition-all"
                  placeholder="return_path@domain.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-surfaceHighlight/50 border border-border p-3 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none rounded-lg resize-none placeholder:text-text-dim transition-all"
                placeholder="Payload..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formState === 'submitting'}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-bold uppercase transition-all ${formState === 'success'
                ? 'bg-success text-white'
                : formState === 'error'
                  ? 'bg-error text-white'
                  : 'bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02]'
                } disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed`}
            >
              {formState === 'submitting' && (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              )}
              {formState === 'success' && (
                <>
                  <Check size={16} />
                  Message Sent!
                </>
              )}
              {formState === 'error' && (
                <>
                  <AlertCircle size={16} />
                  Failed - Retry
                </>
              )}
              {formState === 'idle' && (
                <>
                  Transmit
                  <Send size={14} />
                </>
              )}
            </button>
          </form>

        </div>
      </MotionWrapper>
    </section>
  );
};