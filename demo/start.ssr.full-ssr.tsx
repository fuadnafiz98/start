import { createFileRoute } from '@tanstack/react-router'
import { getPunkSongs } from '@/data/demo.punk-songs'

export const Route = createFileRoute('/demo/start/ssr/full-ssr')({
  component: RouteComponent,
  loader: async () => await getPunkSongs(),
})

function RouteComponent() {
  const punkSongs = Route.useLoaderData()

  return (
    <>
      {punkSongs.map((song) => (
        <li key={song.id}>
          <span className="text-lg text-white font-medium">{song.name}</span>
          <span className="text-white/60"> - {song.artist}</span>
        </li>
      ))}
    </>
  )
}
