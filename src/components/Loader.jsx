import { motion, useReducedMotion } from 'framer-motion';

const NAME = 'Abhay Kumar';
const ROLE = 'BCA Student | Full-Stack Developer';

// City skyline outline, 400 wide. It starts and ends at the same height,
// so two copies side by side join without a visible seam.
const SKYLINE =
  'M0 155 V100 H30 V80 H38 V70 H46 V80 H60 V40 H100 V60 H115 V90 H130 V110 H150 V85 H175 V75 H182 V68 H190 V75 H210 V95 H225 V55 H245 V30 H290 V50 H305 V105 H330 V90 H355 V65 H375 V100 H400 V155';

const ORANGE = '#ef6c35';
const ORANGE_DARK = '#e0561f';
const ORANGE_LIGHT = '#ffa06b';

/** A skyline layer that scrolls to the left forever. */
function Skyline({ duration, color, scaleY = 1, opacity = 1, reduce }) {
  return (
    <g transform={`translate(0 ${155 - 155 * scaleY}) scale(1 ${scaleY})`} opacity={opacity}>
      <motion.g
        animate={reduce ? undefined : { x: [0, -400] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <path d={SKYLINE} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path
          d={SKYLINE}
          transform="translate(400 0)"
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>
    </g>
  );
}

/** A spinning wheel. The small arc makes the rotation visible. */
function Wheel({ cx, cy, reduce }) {
  return (
    <motion.g
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx={cx} cy={cy} r="10" fill={ORANGE_DARK} stroke={ORANGE} strokeWidth="3" />
      <path
        d={`M${cx - 5} ${cy + 2} A6 6 0 0 0 ${cx + 2} ${cy + 5}`}
        fill="none"
        stroke="#ffd2b8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </motion.g>
  );
}

/**
 * Loading screen: a little car driving through a city, then your name.
 * Used with <AnimatePresence> in App.jsx, so it fades out when loading is done.
 */
export default function Loader() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      style={{
        background:
          'radial-gradient(40rem 28rem at 50% 42%, rgba(239, 108, 53, 0.14), transparent 60%), #050505',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        className="w-full"
        style={{ maxWidth: 520 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 400 190" className="w-full h-auto" aria-hidden="true">
          {/* Background city (far layer is slower and fainter) */}
          <Skyline duration={9} color="#2b2b30" scaleY={0.7} opacity={0.8} reduce={reduce} />
          <Skyline duration={5} color="#3d3d44" scaleY={1} opacity={1} reduce={reduce} />

          {/* Road: dashes slide to the left */}
          <motion.line
            x1="0"
            y1="155"
            x2="400"
            y2="155"
            stroke="#f2f2f2"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="46 16"
            animate={reduce ? undefined : { strokeDashoffset: [0, -62] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Exhaust puffs */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="126"
              cy="127"
              r="5"
              fill="none"
              stroke={ORANGE_LIGHT}
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={
                reduce
                  ? undefined
                  : { x: [0, -42], y: [0, -10], opacity: [0.9, 0], scale: [0.6, 1.5] }
              }
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
            />
          ))}

          {/* Car */}
          <g transform="translate(130 92)">
            <motion.g
              animate={reduce ? undefined : { y: [0, -2, 0, -1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <g
                fill="none"
                stroke={ORANGE}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="0" y="26" width="8" height="14" rx="3" />
                <path d="M8 24 H52 L60 8 H66 L77 22 H104 Q116 24 118 36 V44 Q118 48 114 48 H12 Q8 48 8 44 Z" />
                <path d="M44 14 L49 24" />
                <path d="M72 24 Q74 38 82 46" />
                <path d="M92 32 H100" />
              </g>
              <Wheel cx={30} cy={50} reduce={reduce} />
              <Wheel cx={92} cy={50} reduce={reduce} />
            </motion.g>
          </g>
        </svg>
      </motion.div>

      {/* Name */}
      <motion.h1
        className="mt-6 text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <span className="gradient-text">{NAME}</span>
      </motion.h1>

      <motion.p
        className="mt-2 text-sm text-center text-slate-400 font-mono"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        {'< '}
        {ROLE}
        {' />'}
      </motion.p>
    </motion.div>
  );
}

