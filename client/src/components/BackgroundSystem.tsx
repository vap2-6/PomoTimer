import { motion } from 'framer-motion'

interface BackgroundSystemProps {
  currentBackground: number
}

const backgrounds = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
]

export default function BackgroundSystem({ currentBackground }: BackgroundSystemProps) {
  const backgroundIndex = currentBackground % backgrounds.length

  return (
    <>
      <motion.div
        key={backgroundIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 -z-10"
        style={{
          background: backgrounds[backgroundIndex],
        }}
      />
      
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        className="fixed bottom-4 right-4 z-20 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Refresh background"
        onClick={() => {
          window.location.reload()
        }}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </motion.button>
    </>
  )
}