import { ArrowUp, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { socialLinks } from '../data/personal';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[rgba(59,130,246,0.08)]">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Name & tagline */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-lg font-bold">
              <span className="gradient-text">Abhay</span>
              <span className="text-white/90"> Kumar</span>
            </a>
            <p className="text-sm text-slate-500 mt-1">
              Building digital experiences that matter.
            </p>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: GithubIcon, href: socialLinks.github, label: 'GitHub' },
              { icon: LinkedinIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${socialLinks.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="p-2.5 rounded-lg text-slate-500 hover:text-[var(--color-accent-blue)] hover:bg-[rgba(59,130,246,0.08)] transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Right: Copyright + Back to top */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Abhay Kumar. Made with{' '}
              <Heart size={12} className="inline text-red-400" /> &amp; code.
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg glass text-slate-400 hover:text-[var(--color-accent-blue)] hover:border-[rgba(59,130,246,0.3)] transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
