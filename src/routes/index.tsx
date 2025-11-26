import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Copy, Pause, Play, RotateCcw, Timer } from 'lucide-react'
import { Button } from '../components/ui/button' // assuming you have this component
import { Switch } from '../components/ui/switch'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [text, setText] = useState('')
  const [spellCheck, setSpellCheck] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  // Timer state
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getWordCount = () => {
    const parts = text.split('---')
    const relevantText = parts.length > 1 ? parts[parts.length - 1] : text
    return relevantText.trim() ? relevantText.trim().split(/\s+/).length : 0
  }

  const wordCount = getWordCount()

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const handleTimerToggle = () => setIsRunning((v) => !v)
  const handleTimerReset = () => {
    setIsRunning(false)
    setElapsedSeconds(0)
  }

  return (
    <>
      <div className="app flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        <div className="w-full max-w-4xl">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={spellCheck}
            placeholder="Start typing here..."
            className="w-full h-96 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none bg-background text-foreground"
          />
        </div>

        <div className="w-full max-w-4xl flex flex-col gap-6">
          <div className="flex flex-col items-start justify-between">
            <div className="text-lg font-medium text-muted-foreground">
              Words: <span className="text-primary">{wordCount}</span>
            </div>

            <div className="flex items-center gap-2 text-lg font-medium text-primary">
              <Timer className="w-5 h-5" />
              {formatTime(elapsedSeconds)}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleTimerToggle}
                variant={isRunning ? 'destructive' : 'default'}
                size="lg"
                aria-label={isRunning ? 'Stop timer' : 'Start timer'}
              >
                {isRunning ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <Button
                onClick={handleTimerReset}
                variant="outline"
                size="lg"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <Switch checked={spellCheck} onCheckedChange={setSpellCheck} />
              <span className="text-sm text-muted-foreground">
                Enable spell-check
              </span>
            </label>

            <Button onClick={handleCopy} variant="default">
              Copy
            </Button>
          </div>
        </div>

        {/* Copy notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg animate-in fade-in duration-200 flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Copied to clipboard!
          </div>
        )}

        <Link to="/ssr" className="text-primary hover:underline mt-8">
          Go to SSR Demo Page
        </Link>
      </div>
    </>
  )
}
