import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { personalInfo, socialLinks } from '../data/personal';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles for animated text
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden pt-10 md:pt-14"
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--color-accent-blue)] rounded-full opacity-[0.04] blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-accent-violet)] rounded-full opacity-[0.04] blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <motion.div
        className="section-container flex flex-col items-center text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Status badge */}
      <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium glass text-slate-200 border border-[rgba(239,108,53,0.35)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#ef6c35] opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ef6c35]" />
            </span>
            Open to opportunities
          </span>
      </motion.div>
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-400 mb-4 font-medium"
        >
          Hi, I'm{' '}
          <span className="text-[var(--color-accent-blue)] font-semibold">
            {personalInfo.name}
          </span>
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          <span className="text-white">Building Digital</span>
          <br />
          <span className="gradient-text">Experiences That Matter</span>
        </motion.h1>

        {/* Animated role text */}
        <motion.div variants={itemVariants} className="h-10 mb-6 overflow-hidden">
          <motion.p
            key={roleIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl font-mono text-[var(--color-accent-cyan)]"
          >
            {'<'} {personalInfo.roles[roleIndex]} {' />'}
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed mb-10"
        >
          A passionate full-stack developer crafting modern web applications with
          clean code, intuitive design, and scalable architecture. Currently pursuing
          BCA at Galgotias University.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a href="#projects" className="btn-primary">
            <span>Explore My Work</span>
            <ArrowDownRight size={18} />
          </a>
          <a
            href={personalInfo.resumeUrl}
            download
            className="btn-outline"
          >
            <Download size={18} />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4"
        >
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
              className="p-3 rounded-xl glass text-slate-400 hover:text-[var(--color-accent-blue)] hover:border-[rgba(59,130,246,0.3)] transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
