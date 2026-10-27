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

const Photos = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("photos")
  }, [])

  return (
    <Layout>
      <h1>Photos</h1>

      <div className="outer-box">
        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/full-band-oriental3.jpg"
              width={300}
              quality={95}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/hug.jpg"
              width={300}
              quality={95}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/ben-jacob.jpg"
              width={300}
              quality={95}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/spy-oriental.jpg"
              width={300}
              quality={95}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/lauren-oriental.jpg"
              width={300}
              quality={95}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/ben-igor-oriental.jpg"
              width={300}
              quality={95}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/hidive3.jpg"
              width={300}
              quality={95}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/full-band-oriental.jpg"
              width={300}
              quality={95}
              alt="Blurry Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/ben-oriental3.jpg"
              width={300}
              quality={95}
              alt="Spy"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/ben-bw.JPEG"
              width={300}
              quality={95}
              alt="Ben"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/igor-bw.JPEG"
              width={300}
              quality={95}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/caleb-bw.JPEG"
              width={300}
              quality={95}
              alt="Caleb"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/ben-igor.jpg"
              width={300}
              quality={95}
              alt="Ben and Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/igor-hidive2.jpg"
              width={300}
              quality={95}
              alt="Jacob"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/hidive.jpg"
              width={300}
              quality={95}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/caleb-hidive.jpg"
              width={300}
              quality={95}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/hidive2.jpg"
              width={300}
              quality={95}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/igor-hidive.jpg"
              width={300}
              quality={95}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/igor.jpg"
              width={300}
              quality={95}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/jj.jpg"
              width={300}
              quality={95}
              alt="JJ"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/ben2.jpg"
              width={300}
              quality={95}
              alt="Ben"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/live1.jpg"
              width={300}
              quality={95}
              alt="NightWraith Live"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/spy.jpg"
              width={300}
              quality={95}
              alt="Spy"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <OptimizedImage
              src="../images/igor2.jpg"
              width={300}
              quality={95}
              alt="Igor2"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>
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
