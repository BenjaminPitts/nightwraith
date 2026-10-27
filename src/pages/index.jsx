import * as React from "react"
import OptimizedImage from "../components/optimized-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Function to call the serverless function with a custom metric name
const sendMetric = metricName => {
  fetch("/api/sendMetric", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metricName }),
  })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error("Error calling metric API:", error))
}

const IndexPage = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("indexpage.load")
  }, [])

  return (
    <Layout>
      <br />
      <br />
      <div className="index-box">
        <div className="index-inner-box">
          <OptimizedImage
            src="../images/lauren-promo-bw.jpg"
            width={500}
            quality={60}
            alt="NightWraith"
            style={{ margin: `.5rem`, border: `.1rem solid black` }}
          />
          <OptimizedImage
            src="../images/full-band-oriental2.jpg"
            width={500}
            quality={60}
            alt="NightWraith"
            style={{ margin: `.5rem`, border: `.1rem solid black` }}
          />
        </div>
        <div className="music-embeds">
          <iframe
            data-testid="embed-iframe"
            style={{
              border: 0,
              width: `100%`,
              maxWidth: `400px`,
              height: `352px`,
              borderRadius: `12px`,
            }}
            src="https://open.spotify.com/embed/album/5GudIl7FBjtLVzFuAC5LkY?utm_source=generator&si=1ce457a2defa4aee"
            height="352"
            frameBorder="0"
            title="Divergence by NightWraith on Spotify"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            dangerouslySetInnerHTML={{
              __html:
                '<a href="https://open.spotify.com/album/5GudIl7FBjtLVzFuAC5LkY">Divergence by NightWraith on Spotify</a>',
            }}
          />
          <iframe
            style={{
              border: 0,
              width: `400px`,
              height: `352px`,
              borderRadius: `12px`,
            }}
            src="https://bandcamp.com/EmbeddedPlayer/album=3538762053/size=large/bgcol=333333/linkcol=0f91ff/artwork=small/transparent=true/"
            title="Divergence by NightWraith on Bandcamp"
            seamless
            dangerouslySetInnerHTML={{
              __html:
                '<a href="https://nightwraith.bandcamp.com/album/divergence">Divergence by NightWraith</a>',
            }}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="quotes">
        <h1>
          <i>Divergence</i> - released 9/13/2024 on{" "}
          <a href="https://whatsleftrec.com/">What's Left Records</a>
        </h1>
        <h2>Here's what some of the critics had to say about it:</h2>
        <br />
        <h3>
          <i>
            "The contrast between the harsh vocals and the melodic, atmospheric
            layers creates a unique listening experience
            <br />
            that feels both powerful and unexpectedly harmonious, pushing the
            boundaries of what music can offer."
          </i>{" "}
          -{" "}
          <a
            href="https://metal-temple.com/review/nightwraith-divergence/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Metal Temple
          </a>
        </h3>
        <br />
        <h3>
          <i>
            "Few American melodeath bands can hang their hats on a record that’s
            as creative, engaging, and just plain fun
            <br />
            as Nightwraith has done with Divergence."
          </i>{" "}
          -{" "}
          <a
            href="https://www.nocleansinging.com/2024/09/30/a-double-dose-of-denver-death-metal-glacial-tomb-nightwraith/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            No Clean Singing
          </a>
        </h3>
        <br />
        <h3>
          <i>
            "Layered between blackened death metal passages are melodic,
            synth-heavy segues that form a mature offering
            <br />
            from the Denver group."
          </i>{" "}
          -{" "}
          <a
            href="https://www.invisibleoranges.com/umr-8182024-9282024/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Invisible Oranges
          </a>
        </h3>
        <br />
        <h3>
          <i>
            "Divergence is a wild ride, a fantastic achievement and an album
            that will keep revealing more secrets
            <br />
            with every listen."
          </i>{" "}
          -{" "}
          <a
            href="https://www.rockedtothebones.com/post/nightwraith-album-review"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Rocked to the Bones
          </a>
        </h3>
        <br />
        <h3>
          <i>
            "So if you've ever wondered what it might sound like if the members
            of GENESIS, PINK FLOYD and SATYRICON
            <br />
            accidentally met in the rehearsal room and, without much preamble,
            mixed their songs into a cocktail, then "Divergence"
            <br />
            at least gives you a pretty good starting point."
          </i>{" "}
          -{" "}
          <a
            href="https://powermetal.de/review/review-Nightwraith/Divergence,42885.html"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            PowerMetal.de
          </a>
        </h3>
        <br />
      </div>
    </Layout>
  )
}

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
    description="Official NightWraith website featuring music, videos, photos, press coverage, and contact information."
    pathname="/"
    structuredData={homeStructuredData}
  />
)

export default IndexPage
