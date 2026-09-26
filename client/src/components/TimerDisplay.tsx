import { motion } from 'framer-motion'

interface TimerDisplayProps {
  mode: 'focus' | 'break' | 'longBreak'
  time: string
  isRunning: boolean
}

const modeLabels = {
  focus: 'Focus',
  break: 'Break',
  longBreak: 'Long Break',
}

export default function TimerDisplay({ mode, time, isRunning }: TimerDisplayProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-8 rounded-3xl bg-white/10 p-8 backdrop-blur-xl border border-white/20 shadow-2xl"
    >
      <div className="mb-4 text-center">
        <span className="text-lg font-light text-white/80 text-shadow">
          {modeLabels[mode]}
        </span>
      </div>
      
      <motion.div
        key={time}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <h2 className="font-light text-white text-shadow-lg tabular-nums" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          {time}
        </h2>
      </motion.div>

      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex justify-center"
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-white/60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}