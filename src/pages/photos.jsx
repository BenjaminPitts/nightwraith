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

const landscapePhotos = [
  { src: "../images/tirenan-test-promo.JPEG", width: 900, quality: 85, alt: "NightWraith band portrait outdoors at night" },
  { src: "../images/ben-and-igor-slo.jpg", width: 900, quality: 85, alt: "NightWraith guitarists performing side by side onstage" },
  { src: "../images/ben-and-jacob.png", width: 900, quality: 85, alt: "NightWraith musicians raising their instruments onstage" },
  { src: "../images/ben-federal.png", width: 900, quality: 85, alt: "NightWraith guitarist raising a guitar beside a microphone" },
  { src: "../images/fists-federal.png", width: 900, quality: 85, alt: "NightWraith guitarist raising a fist above the crowd" },
  { src: "../images/fists-slo.jpg", width: 900, quality: 85, alt: "NightWraith guitarists bumping fists during a performance" },
  { src: "../images/lauren-federal.png", width: 900, quality: 85, alt: "NightWraith keyboardist performing under red stage lights" },
  { src: "../images/promo-2026-fun.jpg", width: 900, quality: 85, alt: "NightWraith posing playfully for a black-and-white band photo" },
  { src: "../images/promo-2026.jpg", width: 900, quality: 85, alt: "Black-and-white NightWraith band portrait" },
  { src: "../images/spy-federal.png", width: 900, quality: 85, alt: "NightWraith drummer performing under red stage lights" },
  { src: "../images/hug.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/ben-jacob.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/hidive3.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/full-band-oriental.jpg", width: 300, quality: 95, alt: "Blurry Band" },
  { src: "../images/ben-oriental3.jpg", width: 300, quality: 95, alt: "Spy" },
  { src: "../images/hidive2.jpg", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/igor-hidive.jpg", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/live1.jpg", width: 900, quality: 85, alt: "NightWraith Live" },
  { src: "../images/spy.jpg", width: 300, quality: 95, alt: "Spy" },
  { src: "../images/igor2.jpg", width: 300, quality: 95, alt: "Igor2" },
  { src: "../images/blurry-band-bw.JPEG", width: 500, quality: 80, alt: "Black-and-white NightWraith performance with motion blur and light trails" },
]

const portraitPhotos = [
  { src: "../images/live-oriental.jpg", width: 300, quality: 95, alt: "Black-and-white photo of a NightWraith guitarist and drummer performing live" },
  { src: "../images/spy-oriental.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/lauren-oriental.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/ben-igor-oriental.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/ben-bw.JPEG", width: 300, quality: 95, alt: "Ben" },
  { src: "../images/igor-bw.JPEG", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/caleb-bw.JPEG", width: 300, quality: 95, alt: "Caleb" },
  { src: "../images/ben-igor.jpg", width: 300, quality: 95, alt: "Ben and Igor" },
  { src: "../images/hidive.jpg", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/igor.jpg", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/jj.jpg", width: 300, quality: 95, alt: "JJ" },
  { src: "../images/ben2.jpg", width: 300, quality: 95, alt: "Ben" },
]

const PhotoRow = ({ photos, orientation }) => (
  <div className={`photo-gallery-row photo-gallery-row--${orientation}`}>
    {photos.map(photo => (
      <figure
        className={`photo-gallery-item photo-gallery-item--${orientation}`}
        key={photo.src}
      >
        <OptimizedImage
          src={photo.src}
          width={photo.width}
          quality={photo.quality}
          alt={photo.alt}
          imageStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "none",
            boxShadow: "5px 10px black",
          }}
        />
      </figure>
    ))}
  </div>
)

const Photos = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("photos")
  }, [])

  return (
    <Layout>
      <h1>Photos</h1>

      <div className="photo-gallery">
        <section className="photo-gallery-group" aria-labelledby="landscapes-heading">
          <h2 className="photo-gallery-title" id="landscapes-heading">
            Landscapes
          </h2>
          <PhotoRow photos={landscapePhotos} orientation="landscape" />
        </section>
        <section className="photo-gallery-group" aria-labelledby="portraits-heading">
          <h2 className="photo-gallery-title" id="portraits-heading">
            Portraits
          </h2>
          <PhotoRow photos={portraitPhotos} orientation="portrait" />
        </section>
      </div>

      <br />
      <h2>
        Photo Credits:{" "}
        <a
          href="https://www.instagram.com/permanent_ephemera_photo/"
          target="_blank"
          rel="noreferrer"
        >
          Josh Massara
        </a>{" "}
        |{" "}
        <a
          href="https://www.instagram.com/kateshootsmusic/"
          target="_blank"
          rel="noreferrer"
        >
          Kate Rose
        </a>{" "}
        |{" "}
        <a
          href="https://www.instagram.com/wanderersmithphotography/"
          target="_blank"
          rel="noreferrer"
        >
          Corey Smith
        </a>{" "}
        |{" "}
        <a
          href="https://www.instagram.com/riotcraig/"
          target="_blank"
          rel="noreferrer"
        >
          Riot Craig
        </a>
      </h2>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Photos"
    description="Official NightWraith live and promo photos."
    pathname="/photos/"
  />
)

export default Photos
