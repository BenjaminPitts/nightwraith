import * as React from "react"
import HomePage from "../components/homepage"
import Seo from "../components/seo"

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "NightWraith",
  url: "https://nightwraithband.com/",
  genre: ["Melodic Death Metal", "Heavy Metal"],
  foundingLocation: {
    "@type": "Place",
    name: "Denver, Colorado, USA",
  },
  sameAs: [
    "https://nightwraith.bandcamp.com/",
    "https://open.spotify.com/artist/4xM6FsTNQOl7OuzAZ0FgXm",
    "https://www.facebook.com/nightwraithband",
    "https://www.instagram.com/nightwraithband/",
    "https://twitter.com/nightwraithband",
  ],
}

export const Head = () => (
  <Seo
    title="NightWraith"
    description="The official home of NightWraith, a melodic heavy metal band from Denver, Colorado. Listen to Divergence, watch videos, and find upcoming shows."
    pathname="/"
    structuredData={homeStructuredData}
  />
)

export default function IndexPage() {
  return <HomePage />
}
