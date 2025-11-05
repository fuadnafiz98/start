import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <div className="app">
        <h1>Muhtasim Fuad</h1>
        <Link to="/ssr">Go to SSR Demo Page</Link>
      </div>
    </>
  )
}
