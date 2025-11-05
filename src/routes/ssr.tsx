import { createFileRoute } from '@tanstack/react-router'
import { getPunkSongs } from '@/data/demo.punk-songs'

export const Route = createFileRoute('/ssr')({
  component: RouteComponent,
  loader: async () => await getPunkSongs(),
})

function RouteComponent() {
  const punkSongs = Route.useLoaderData()

  return (
    <>
      {punkSongs.map((song) => (
        <li key={song.id}>
          <span className="text-lg font-medium">{song.name}</span>
          <span> - {song.artist}</span>
        </li>
      ))}
    </>
  )
}
