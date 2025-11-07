import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Switch } from '../components/ui/switch'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [text, setText] = useState('')
  const [spellCheck, setSpellCheck] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
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

        <div className="w-full max-w-4xl flex items-center justify-between gap-4">
          <div className="text-lg font-medium text-muted-foreground">
            Words: <span className="text-primary">{wordCount}</span>
          </div>

          <div className="flex gap-3 items-center">
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

        {showNotification && (
          <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg animate-in fade-in duration-200">
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
