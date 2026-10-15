import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reusable section wrapper with consistent layout, title, and 3D fade-in animation.
 * Every section (About, Skills, Projects, ...) gets the 3D effect automatically.
 */
export default function SectionWrapper({ id, title, subtitle, children, className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={`relative z-10 ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="section-container"
        style={{ transformOrigin: 'center top', transformPerspective: 1200 }}
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 60, rotateX: 14, scale: 0.96 }
        }
        whileInView={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, rotateX: 0, scale: 1 }
        }
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {title && (
          <motion.h2
            className="section-title"
            style={{ transformPerspective: 800 }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: -60, y: 20 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <span
              className="gradient-text"
              style={{ filter: 'drop-shadow(0 6px 14px rgba(34, 197, 94, 0.35))' }}
            >
              {title}
            </span>
          </motion.h2>
        )}

        {/* Glowing underline that grows in */}
        {title && (
          <motion.div
            className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent"
            style={{ boxShadow: '0 0 18px rgba(34, 197, 94, 0.6)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}

        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {children}
      </motion.div>
    </section>
  );
}