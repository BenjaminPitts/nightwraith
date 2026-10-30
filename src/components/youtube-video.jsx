import * as React from "react"

export const youtubeVideos = [
  { title: "Perpetual Night", id: "bd49beja8YI" },
  { title: "Whispers of Dragonflies", id: "6GbvCjvV0Lc" },
  { title: "Fallen Kings and Queens", id: "WHqZzT8nafU" },
  { title: "Invocation", id: "AZbbEhHMGOs" },
  { title: "Hedonic Adaptation", id: "97B2rVpAf04" },
  { title: "Genesthai", id: "ibFxyuPq_mk" },
  { title: "Beguiler", id: "YQyrTqrd1iA" },
  { title: "Shavano", id: "_rUOAKGEnIk" },
  { title: "The Snake and the Rope", id: "50w6OpCtDqM" },
  { title: "The Unknown Crown", id: "vucUusvftWI" },
]

export const featuredVideos = youtubeVideos.slice(0, 2)

export default function YouTubeVideo({ video }) {
  const [playing, setPlaying] = React.useState(false)

  return (
    <article className="video-item">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&controls=1&rel=0`}
            title={`${video.title} - NightWraith`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt={`${video.title} video thumbnail`}
              loading="lazy"
              decoding="async"
            />
            <button
              className="video-load"
              type="button"
              aria-label={`Play ${video.title}`}
              onClick={() => setPlaying(true)}
            >
              <span className="video-play-mark" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <div className="video-caption">
        <h3 className="video-title">{video.title}</h3>
        <a
          className="video-watch"
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube
        </a>
      </div>
    </article>
  )
}