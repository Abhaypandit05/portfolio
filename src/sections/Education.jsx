import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { education } from '../data/personal';

export default function Education() {
  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="My academic journey and learning path."
    >
      <div className="max-w-3xl mx-auto">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative"
          >
            {/* Timeline connector */}
            {i < education.length - 1 && (
              <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent-blue)]/30 to-transparent" />
            )}

            <div className="glass-card p-6 md:p-8 rounded-xl flex gap-5">
              {/* Icon */}
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <GraduationCap size={26} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                <p className="text-[var(--color-accent-cyan)] font-semibold text-sm mb-3">
                  {edu.institution}
                </p>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {edu.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {edu.location}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {edu.description}
                </p>

                {/* Highlights */}
                {edu.highlights?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-dark-700)] text-slate-300 border border-[rgba(59,130,246,0.1)]"
                      >
                        <BookOpen size={12} className="text-[var(--color-accent-blue)]" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
