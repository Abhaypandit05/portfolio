import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, GraduationCap, Rocket, Trophy } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { personalInfo } from '../data/personal';

// Put your photo in the `public` folder and name it profile.jpg
// (or change the path below, e.g. '/my-photo.png')
const PROFILE_IMAGE = '/profile.jpeg';

const highlights = [
  { icon: Code2, label: 'Tech Stack', value: 'React, Node.js & PostgreSQL' },
  { icon: GraduationCap, label: 'Education', value: 'BCA, Galgotias University (2024–2027)' },
  { icon: Rocket, label: 'Current Project', value: 'VastuGrid for Civil Engineers' },
  { icon: Trophy, label: 'Achievements', value: 'Hackathon Participant' },
];

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="Get to know the developer behind the code."
    >
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left: Profile visual */}
        <motion.div
          className="lg:col-span-2 flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Profile placeholder with code aesthetic */}
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl glass-card overflow-hidden flex items-center justify-center relative">
              {/* Abstract code visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/10 to-[var(--color-accent-violet)]/10" />
              <div className="relative text-center p-6">
                {!imgError ? (
                  <img
                    src={PROFILE_IMAGE}
                    alt={personalInfo.name}
                    onError={() => setImgError(true)}
                    className="w-28 h-28 mx-auto mb-4 rounded-full object-cover border-2 border-[var(--color-accent-blue)]/40 shadow-lg shadow-blue-500/20"
                  />
                ) : (
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] flex items-center justify-center text-4xl font-bold text-white">
                    AK
                  </div>
                )}
                <p className="text-white font-semibold text-lg">{personalInfo.name}</p>
                <p className="text-sm text-[var(--color-accent-cyan)] font-mono mt-1">
                  BCA Student | Full-Stack Developer
                </p>
              </div>
            </div>

            {/* Decorative floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-sm font-mono text-[var(--color-accent-blue)]">
                {'{ }'} Clean Code
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Bio + highlights */}
        <motion.div
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-slate-300 text-base leading-relaxed">
            {personalInfo.bio}
          </p>

          <p className="text-slate-400 text-base leading-relaxed">
            I'm a BCA student at Galgotias University, aspiring to be a full-stack
            developer. I build responsive web applications with HTML, CSS, JavaScript
            and React, and I'm comfortable with Node.js, Express.js and PostgreSQL on
            the backend. I've built and deployed BiharBees, a responsive website that
            uses the YouTube API, and I'm currently working on VastuGrid, a platform
            for civil engineers. I also take part in hackathons, where I've worked on
            teamwork, problem-solving and project development.
          </p>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {highlights.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                className="glass-card p-4 rounded-xl group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <Icon
                  size={20}
                  className="text-[var(--color-accent-blue)] mb-2 group-hover:text-[var(--color-accent-cyan)] transition-colors"
                />
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  {label}
                </p>
                <p className="text-sm text-white font-semibold mt-1">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}