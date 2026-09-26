import { motion } from 'framer-motion'

interface SessionTrackerProps {
  completedSessions: number
}

export default function SessionTracker({ completedSessions }: SessionTrackerProps) {
  const sessionsInCycle = completedSessions % 4
  const totalCycles = Math.floor(completedSessions / 4)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mb-8 flex flex-col items-center"
    >
      <div className="mb-2 text-sm text-white/60">
        {totalCycles > 0 && `${totalCycles} cycle${totalCycles > 1 ? 's' : ''} completed`}
      </div>
      
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`h-3 w-3 rounded-full transition-all ${
              index < sessionsInCycle
                ? 'bg-white shadow-lg shadow-white/50'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
      
      {completedSessions > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-white/80"
        >
          {completedSessions} session{completedSessions !== 1 ? 's' : ''} completed
        </motion.div>
      )}
    </motion.div>
  )
}