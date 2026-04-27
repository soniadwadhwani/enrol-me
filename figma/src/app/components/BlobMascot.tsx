import { motion } from 'motion/react';

interface BlobMascotProps {
  scale?: number;           // visual scale multiplier (default 1 = 170px native)
  speechText?: string;      // override speech bubble copy
  onClick?: () => void;
}

export default function BlobMascot({ scale = 1, speechText, onClick }: BlobMascotProps) {
  const s = scale;
  const px = (n: number) => `${n * s}px`;

  const defaultSpeech = speechText ?? 'Find your perfect class today! ✨';

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 1.04, y: -4 }}
      style={{
        width: px(170), height: px(170),
        border: 'none', cursor: onClick ? 'pointer' : 'default',
        position: 'relative', overflow: 'visible',
        padding: 0, background: 'transparent', flexShrink: 0,
      }}
    >
      {/* Floating Shadow */}
      <motion.div
        animate={{ opacity: [0.08, 0.12, 0.08], scale: [0.9, 1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: px(-6), left: '50%',
          transform: 'translateX(-50%)',
          width: '50%', height: px(18), borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(100,150,190,0.18) 0%, rgba(80,130,170,0.06) 60%, transparent 80%)',
          filter: `blur(${10 * s}px)`,
        }}
      />

      {/* Floating + Wobble wrapper */}
      <motion.div
        animate={{ y: [-5 * s, 5 * s, -5 * s], rotate: [-0.6, 0.6, -0.6] }}
        transition={{
          y:      { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        {/* ── Main Blob Body ── */}
        <motion.div
          animate={{ scaleY: [1, 1.02, 1, 0.98, 1], scaleX: [1, 0.99, 1, 1.01, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '6%', left: '-35%',
            width: '90%', height: '88%',
            borderRadius: '48% 52% 50% 50% / 44% 44% 78% 78%',
            background: 'linear-gradient(180deg, rgba(190,160,230,0.96) 0%, rgba(205,170,235,0.97) 10%, rgba(220,180,228,0.97) 20%, rgba(240,190,210,0.97) 32%, rgba(255,220,180,0.98) 44%, rgba(210,245,215,0.97) 56%, rgba(170,235,230,0.98) 68%, rgba(140,215,240,0.99) 82%, rgba(110,205,240,0.99) 100%)',
            boxShadow: `0 ${24*s}px ${52*s}px rgba(120,160,200,0.55), 0 ${10*s}px ${28*s}px rgba(17,19,24,0.15), inset ${-10*s}px ${-14*s}px ${35*s}px rgba(80,170,225,0.6), inset ${10*s}px ${10*s}px ${35*s}px rgba(255,255,255,0.95)`,
            overflow: 'visible',
            filter: 'blur(0.5px)',
          }}
        >
          {/* Outer Pale Rim Glow */}
          <div style={{
            position: 'absolute', inset: px(-6),
            borderRadius: '48% 52% 50% 50% / 44% 44% 78% 78%',
            background: 'linear-gradient(180deg, rgba(190,215,245,0.75) 0%, rgba(175,225,248,0.72) 50%, rgba(165,230,250,0.78) 100%)',
            filter: `blur(${12*s}px)`, zIndex: -1,
          }} />

          {/* Top Glossy Highlight */}
          <motion.div
            animate={{ opacity: [0.95, 1, 0.95], scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '12%', left: '28%',
              width: '32%', height: '20%',
              borderRadius: '55% 45% 50% 50% / 60% 65% 35% 40%',
              background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.88) 30%, rgba(255,255,255,0.5) 62%, transparent 85%)',
              filter: `blur(${4*s}px)`,
            }}
          />

          {/* Lavender Pink Top */}
          <motion.div
            animate={{ opacity: [0.92, 1, 0.92], scale: [1, 1.04, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '10%', left: '14%',
              width: '72%', height: '34%', borderRadius: '50%',
              background: 'radial-gradient(ellipse at 50% 35%, rgba(180,145,225,0.96) 0%, rgba(190,155,230,0.88) 38%, rgba(200,165,235,0.6) 68%, transparent 88%)',
              filter: `blur(${16*s}px)`,
            }}
          />

          {/* Soft Pink Blush */}
          <motion.div
            animate={{ opacity: [0.88, 0.96, 0.88], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '22%', left: '18%',
              width: '64%', height: '32%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(235,170,210,0.92) 0%, rgba(240,180,220,0.82) 38%, rgba(245,190,230,0.55) 68%, transparent 88%)',
              filter: `blur(${14*s}px)`,
            }}
          />

          {/* Warm Peachy Yellow Center */}
          <motion.div
            animate={{ opacity: [0.94, 1, 0.94], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '30%', left: '24%',
              width: '52%', height: '34%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,220,160,0.96) 0%, rgba(255,228,175,0.88) 36%, rgba(255,235,190,0.65) 66%, transparent 88%)',
              filter: `blur(${12*s}px)`,
            }}
          />

          {/* Mint Green Lower Center */}
          <motion.div
            animate={{ opacity: [0.92, 1, 0.92], y: ['0%', '2%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '48%', left: '18%',
              width: '64%', height: '38%', borderRadius: '50%',
              background: 'radial-gradient(ellipse at 50% 46%, rgba(160,235,210,0.96) 0%, rgba(175,240,220,0.88) 36%, rgba(190,245,230,0.68) 66%, transparent 88%)',
              filter: `blur(${14*s}px)`,
            }}
          />

          {/* Cyan Blue Lower Body */}
          <motion.div
            animate={{ opacity: [0.96, 1, 0.96], y: ['0%', '3%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '12%', left: '14%',
              width: '72%', height: '48%', borderRadius: '50%',
              background: 'radial-gradient(ellipse at 50% 54%, rgba(125,215,245,0.98) 0%, rgba(145,225,248,0.92) 36%, rgba(165,235,250,0.78) 66%, transparent 88%)',
              filter: `blur(${14*s}px)`,
            }}
          />

          {/* Additional Cyan Intensity */}
          <motion.div
            animate={{ opacity: [0.92, 1, 0.92] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '18%', left: '22%',
              width: '56%', height: '42%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(105,210,240,0.98) 0%, rgba(125,220,245,0.82) 48%, transparent 78%)',
              filter: `blur(${17*s}px)`,
            }}
          />

          {/* Bottom Point Glow */}
          <motion.div
            animate={{ opacity: [0.9, 0.98, 0.9], scaleY: [1, 1.03, 1] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '3%', left: '40%',
              width: '20%', height: '18%', borderRadius: '50%',
              background: 'radial-gradient(ellipse at 50% 28%, rgba(115,210,240,0.98) 0%, rgba(135,220,245,0.78) 45%, transparent 72%)',
              filter: `blur(${10*s}px)`,
            }}
          />

          {/* Inner White Pearl Glow */}
          <motion.div
            animate={{ opacity: [0.56, 0.72, 0.56], scale: [1, 1.1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '26%', left: '28%',
              width: '44%', height: '42%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.76) 0%, rgba(250,252,255,0.46) 48%, transparent 78%)',
              filter: `blur(${22*s}px)`,
            }}
          />

          {/* Right Side Reflection */}
          <div style={{
            position: 'absolute', top: '20%', right: '12%',
            width: '22%', height: '38%', borderRadius: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(245,250,255,0.3) 48%, transparent 100%)',
            filter: `blur(${9*s}px)`,
          }} />
        </motion.div>

        {/* ── Left Arm ── */}
        <motion.div
          animate={{ x: [-1.5*s, 0.8*s, -1.5*s], scaleX: [1, 1.04, 1], scaleY: [1, 1.02, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          style={{
            position: 'absolute', top: '50%', left: '2%',
            width: px(30), height: px(42),
            borderRadius: '50% 45% 48% 52% / 45% 50% 50% 55%',
            background: 'linear-gradient(155deg, rgba(175,235,248,0.85) 0%, rgba(185,238,250,0.82) 50%, rgba(165,230,245,0.8) 100%)',
            boxShadow: `inset ${-2*s}px ${1*s}px ${8*s}px rgba(125,200,235,0.32), 0 ${4*s}px ${10*s}px rgba(160,215,240,0.28)`,
            filter: 'blur(0.5px)',
          }}
        >
          <div style={{
            position: 'absolute', top: '18%', left: '15%',
            width: '48%', height: '42%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(225,248,255,0.22) 60%, transparent 85%)',
            filter: `blur(${5*s}px)`,
          }} />
        </motion.div>

        {/* ── Right Arm ── */}
        <motion.div
          animate={{ x: [1.5*s, -0.8*s, 1.5*s], scaleX: [1, 1.04, 1], scaleY: [1, 1.02, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          style={{
            position: 'absolute', top: '50%', right: '22%',
            width: px(30), height: px(42),
            borderRadius: '45% 50% 52% 48% / 50% 45% 55% 50%',
            background: 'linear-gradient(-155deg, rgba(175,235,248,0.85) 0%, rgba(185,238,250,0.82) 50%, rgba(165,230,245,0.8) 100%)',
            boxShadow: `inset ${2*s}px ${1*s}px ${8*s}px rgba(125,200,235,0.32), 0 ${4*s}px ${10*s}px rgba(160,215,240,0.28)`,
            filter: 'blur(0.5px)', zIndex: -1,
          }}
        >
          <div style={{
            position: 'absolute', top: '18%', right: '15%',
            width: '48%', height: '42%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(225,248,255,0.22) 60%, transparent 85%)',
            filter: `blur(${5*s}px)`,
          }} />
        </motion.div>

        {/* ── Face ── */}
        <div style={{
          position: 'absolute', top: '30%', left: '30%',
          transform: 'translateX(-50%)',
          width: px(88), height: px(52),
        }}>
          {/* Left Eye */}
          <motion.div
            animate={{ scaleY: [1, 0.05, 1, 1, 1, 1, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.025, 0.05, 0.08, 0.94, 0.97, 1], repeatDelay: 3 }}
            style={{
              position: 'absolute', top: px(5), left: px(24),
              width: px(10), height: px(18), borderRadius: '50%',
              background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
              boxShadow: `inset 0 ${2*s}px ${5*s}px rgba(0,0,0,0.22), 0 ${1*s}px ${3*s}px rgba(75,137,184,0.35)`,
            }}
          />
          {/* Right Eye */}
          <motion.div
            animate={{ scaleY: [1, 0.05, 1, 1, 1, 1, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.025, 0.05, 0.08, 0.94, 0.97, 1], repeatDelay: 3 }}
            style={{
              position: 'absolute', top: px(5), right: px(20),
              width: px(10), height: px(18), borderRadius: '50%',
              background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
              boxShadow: `inset 0 ${2*s}px ${5*s}px rgba(0,0,0,0.22), 0 ${1*s}px ${3*s}px rgba(75,137,184,0.35)`,
            }}
          />
          {/* Smile */}
          <div style={{
            position: 'absolute', bottom: px(10), left: '50%',
            transform: 'translateX(-50%)',
            width: px(32), height: px(16),
            borderRadius: '0 0 50% 50% / 0 0 100% 100%',
            background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
            boxShadow: `inset 0 ${1*s}px ${4*s}px rgba(0,0,0,0.18)`,
            overflow: 'hidden',
          }} />
        </div>

        {/* ── Outer Halo ── */}
        <motion.div
          animate={{ opacity: [0.16, 0.24, 0.16], scale: [1, 1.1, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: px(-16), borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180,220,248,0.28) 0%, rgba(160,210,243,0.18) 50%, rgba(140,200,238,0.08) 75%, transparent 90%)',
            filter: `blur(${22*s}px)`, pointerEvents: 'none',
          }}
        />

        {/* ── Speech Bubble ── */}
        <motion.div
          animate={{ opacity: [0.92, 1, 0.92], y: [-1 * s, 1 * s, -1 * s] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '10%',
            right: px(-90),
            width: px(162),
            backgroundColor: '#FFFFFF',
            borderRadius: px(20),
            padding: `${12*s}px ${14*s}px`,
            boxShadow: `0 ${10*s}px ${28*s}px rgba(17,19,24,0.16)`,
            pointerEvents: 'none',
          }}
        >
          {/* Tail */}
          <div style={{
            position: 'absolute',
            left: px(-9), top: '40%',
            transform: 'translateY(-50%)',
            width: 0, height: 0,
            borderTop: `${9*s}px solid transparent`,
            borderBottom: `${9*s}px solid transparent`,
            borderRight: `${11*s}px solid #FFFFFF`,
          }} />
          <div style={{
            fontSize: `${13 * s}px`,
            fontWeight: 700,
            color: '#111318',
            lineHeight: 1.4,
            textAlign: 'center',
            fontFamily: "'Raleway', sans-serif",
          }}>
            {defaultSpeech}
          </div>
        </motion.div>
      </motion.div>

      {/* Tap Glow */}
      <motion.div
        whileTap={{ opacity: [0, 0.75, 0], scale: [0.88, 1.18, 1] }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', inset: px(-12), borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,245,255,0.65) 0%, rgba(200,235,250,0.45) 55%, transparent 80%)',
          filter: `blur(${20*s}px)`, pointerEvents: 'none', opacity: 0,
        }}
      />
    </motion.button>
  );
}
