import { useState, useEffect, useCallback } from 'react'
import TimerDisplay from './components/TimerDisplay'
import ControlPanel from './components/ControlPanel'
import SettingsPanel from './components/SettingsPanel'
import SessionTracker from './components/SessionTracker'
import BackgroundSystem from './components/BackgroundSystem'

type TimerMode = 'focus' | 'break' | 'longBreak'

interface TimerSettings {
  focusDuration: number
  breakDuration: number
  longBreakDuration: number
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
}

function App() {
  const [mode, setMode] = useState<TimerMode>('focus')
  const [isRunning, setIsRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_SETTINGS.focusDuration * 60)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentBackground, setCurrentBackground] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && isRunning) {
      handleTimerComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining, handleTimerComplete])

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false)
    
    if (mode === 'focus') {
      const newCompletedSessions = completedSessions + 1
      setCompletedSessions(newCompletedSessions)
      
      if (newCompletedSessions % 4 === 0) {
        setMode('longBreak')
        setTimeRemaining(settings.longBreakDuration * 60)
      } else {
        setMode('break')
        setTimeRemaining(settings.breakDuration * 60)
      }
    } else {
      setMode('focus')
      setTimeRemaining(settings.focusDuration * 60)
    }
    
    setCurrentBackground((prev) => prev + 1)
    
    playNotificationSound()
  }, [mode, completedSessions, settings, playNotificationSound])

  const playNotificationSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }, [])

  const handleStartPause = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    const duration = mode === 'focus' 
      ? settings.focusDuration 
      : mode === 'break' 
        ? settings.breakDuration 
        : settings.longBreakDuration
    setTimeRemaining(duration * 60)
  }, [mode, settings])

  const handleSkip = useCallback(() => {
    setIsRunning(false)
    handleTimerComplete()
  }, [handleTimerComplete])

  const handleSettingsSave = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings)
    setIsSettingsOpen(false)
    
    if (!isRunning) {
      const duration = mode === 'focus' 
        ? newSettings.focusDuration 
        : mode === 'break' 
          ? newSettings.breakDuration 
          : newSettings.longBreakDuration
      setTimeRemaining(duration * 60)
    }
  }, [isRunning, mode])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundSystem currentBackground={currentBackground} />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-light text-white text-shadow">
              ZenFocus
            </h1>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Open settings"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <TimerDisplay
            mode={mode}
            time={formatTime(timeRemaining)}
            isRunning={isRunning}
          />

          <SessionTracker completedSessions={completedSessions} />

          <ControlPanel
            isRunning={isRunning}
            onStartPause={handleStartPause}
            onReset={handleReset}
            onSkip={handleSkip}
          />
        </div>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSettingsSave}
      />
    </div>
  )
}

export default App