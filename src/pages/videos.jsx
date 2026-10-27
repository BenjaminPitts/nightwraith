import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import YouTubeVideo, { youtubeVideos } from "../components/youtube-video"

const Videos = () => (
  <Layout>
    <h1>Videos</h1>
    <div className="video-grid">
      {youtubeVideos.map(video => (
        <YouTubeVideo video={video} key={video.id} />
      ))}
    </div>
  </Layout>
)

export const Head = () => (
  <Seo
    title="Videos"
    description="Watch official NightWraith music videos and live performance clips."
    pathname="/videos/"
  />
)

export default Videos
