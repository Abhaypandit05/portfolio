import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { skillCategories } from '../data/skills';

export default function Skills() {
  return (
    <SectionWrapper
      id="skills"
      title="Technical Skills"
      subtitle="Technologies and tools I work with to bring ideas to life."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIndex) => {
          const CategoryIcon = category.icon;
          return (
            <motion.div
              key={category.id}
              className="glass-card p-6 rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2.5 rounded-lg"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <CategoryIcon size={22} style={{ color: category.color }} />
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 gap-2.5">
                {category.skills.map((skill, skillIndex) => {
                  const SkillIcon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      className="flex items-center justify-between px-4 py-3 rounded-lg bg-[var(--color-dark-800)]/80 border border-transparent hover:border-[rgba(59,130,246,0.15)] transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: catIndex * 0.1 + skillIndex * 0.05,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <SkillIcon
                          size={16}
                          className="text-slate-500 group-hover:text-[var(--color-accent-blue)] transition-colors"
                        />
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          color: category.color,
                          backgroundColor: `${category.color}15`,
                        }}
                      >
                        {skill.level}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
