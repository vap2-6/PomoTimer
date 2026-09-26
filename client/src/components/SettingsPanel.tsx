import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimerSettings {
  focusDuration: number
  breakDuration: number
  longBreakDuration: number
}

interface SettingsPanelProps {
  isOpen: boolean
  settings: TimerSettings
  onClose: () => void
  onSave: (settings: TimerSettings) => void
}

export default function SettingsPanel({ isOpen, settings, onClose, onSave }: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<TimerSettings>(settings)

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleSave = () => {
    onSave(localSettings)
  }

  const handleIncrement = (field: keyof TimerSettings) => {
    setLocalSettings((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }))
  }

  const handleDecrement = (field: keyof TimerSettings) => {
    setLocalSettings((prev) => ({
      ...prev,
      [field]: Math.max(1, prev[field] - 1),
    }))
  }

  const getFieldLimits = (field: keyof TimerSettings) => {
    switch (field) {
      case 'focusDuration':
        return { min: 1, max: 60 }
      case 'breakDuration':
        return { min: 1, max: 30 }
      case 'longBreakDuration':
        return { min: 1, max: 30 }
      default:
        return { min: 1, max: 60 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white/10 backdrop-blur-xl p-6 border-l border-white/20"
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-light text-white text-shadow">Settings</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close settings"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Focus Duration (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrement('focusDuration')}
                    disabled={localSettings.focusDuration <= getFieldLimits('focusDuration').min}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="flex-1 text-center text-2xl font-light text-white text-shadow">
                    {localSettings.focusDuration}
                  </span>
                  <button
                    onClick={() => handleIncrement('focusDuration')}
                    disabled={localSettings.focusDuration >= getFieldLimits('focusDuration').max}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Break Duration (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrement('breakDuration')}
                    disabled={localSettings.breakDuration <= getFieldLimits('breakDuration').min}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="flex-1 text-center text-2xl font-light text-white text-shadow">
                    {localSettings.breakDuration}
                  </span>
                  <button
                    onClick={() => handleIncrement('breakDuration')}
                    disabled={localSettings.breakDuration >= getFieldLimits('breakDuration').max}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Long Break Duration (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrement('longBreakDuration')}
                    disabled={localSettings.longBreakDuration <= getFieldLimits('longBreakDuration').min}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="flex-1 text-center text-2xl font-light text-white text-shadow">
                    {localSettings.longBreakDuration}
                  </span>
                  <button
                    onClick={() => handleIncrement('longBreakDuration')}
                    disabled={localSettings.longBreakDuration >= getFieldLimits('longBreakDuration').max}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleSave}
                className="w-full rounded-full bg-white/20 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Save Settings
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}