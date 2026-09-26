import { motion } from 'framer-motion'

interface ControlPanelProps {
  isRunning: boolean
  onStartPause: () => void
  onReset: () => void
  onSkip: () => void
}

export default function ControlPanel({ isRunning, onStartPause, onReset, onSkip }: ControlPanelProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex justify-center gap-4"
    >
      <button
        onClick={onStartPause}
        className="group flex h-14 items-center gap-2 rounded-full bg-white/20 px-8 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        {isRunning ? (
          <>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            <span className="font-medium">Pause</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="font-medium">Start</span>
          </>
        )}
      </button>

      <button
        onClick={onReset}
        className="group flex h-14 items-center gap-2 rounded-full bg-white/20 px-6 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Reset timer"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span className="font-medium">Reset</span>
      </button>

      <button
        onClick={onSkip}
        className="group flex h-14 items-center gap-2 rounded-full bg-white/20 px-6 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Skip to next session"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
        <span className="font-medium">Skip</span>
      </button>
    </motion.div>
  )
}