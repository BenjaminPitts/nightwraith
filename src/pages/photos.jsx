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
  { src: "../images/full-band-oriental3.jpg", width: 1000, quality: 85, alt: "Full Band" },
  { src: "../images/hug.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/ben-jacob.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/hidive3.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/full-band-oriental.jpg", width: 300, quality: 95, alt: "Blurry Band" },
  { src: "../images/ben-oriental3.jpg", width: 300, quality: 95, alt: "Spy" },
  { src: "../images/caleb-hidive.jpg", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/hidive2.jpg", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/igor-hidive.jpg", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/live1.jpg", width: 900, quality: 85, alt: "NightWraith Live" },
  { src: "../images/spy.jpg", width: 300, quality: 95, alt: "Spy" },
  { src: "../images/igor2.jpg", width: 300, quality: 95, alt: "Igor2" },
]

const portraitPhotos = [
  { src: "../images/spy-oriental.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/lauren-oriental.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/ben-igor-oriental.jpg", width: 300, quality: 95, alt: "Full Band" },
  { src: "../images/ben-bw.JPEG", width: 300, quality: 95, alt: "Ben" },
  { src: "../images/igor-bw.JPEG", width: 300, quality: 95, alt: "Igor" },
  { src: "../images/caleb-bw.JPEG", width: 300, quality: 95, alt: "Caleb" },
  { src: "../images/ben-igor.jpg", width: 300, quality: 95, alt: "Ben and Igor" },
  { src: "../images/igor-hidive2.jpg", width: 300, quality: 95, alt: "Jacob" },
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
        style={orientation === "landscape" ? { width: `${photo.width}px` } : null}
      >
        <OptimizedImage
          src={photo.src}
          width={photo.width}
          quality={photo.quality}
          alt={photo.alt}
          imageStyle={
            orientation === "portrait"
              ? { width: "100%", height: "100%", objectFit: "contain" }
              : { width: "100%", height: "auto" }
          }
          style={{
            width: "100%",
            height: orientation === "portrait" ? "100%" : "auto",
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
        Photo Credit:{" "}
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
