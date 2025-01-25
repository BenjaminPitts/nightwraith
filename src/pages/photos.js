import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Function to call the serverless function with a custom metric name
const sendMetric = (metricName) => {
  fetch("/api/sendMetric", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metricName })
  })
    .then((response) => response.json())
    .then((data) => console.log(data.message))
    .catch((error) => console.error("Error calling metric API:", error));
};

const Photos = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("photos");
  }, []);

  return (
    <Layout>
      <Seo title="Photos" />
      <h1>Photos</h1>

      <div className="outer-box">
        
        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/hidive3.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Full Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/full-band-oriental.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Blurry Band"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/spy-bw.JPEG"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Spy"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/ben-bw.JPEG"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Ben"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/igor-bw.JPEG"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/caleb-bw.JPEG"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Caleb"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/ben-igor.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Ben and Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/igor-hidive2.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Jacob"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/hidive.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/caleb-hidive.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/hidive2.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/igor-hidive.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/igor.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Igor"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/jj.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="JJ"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/ben2.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Ben"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/live1.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="NightWraith Live"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/spy.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Spy"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>

        <div className="inner-box">
          <strong>
            <StaticImage
              src="../images/igor2.jpg"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Igor2"
              style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
            />
          </strong>
        </div>
      </div>

      <br />
      <h2>Photo Credit: <a href="https://www.instagram.com/permanent_ephemera_photo/" target="blank">Josh Massara</a> | <a href="https://www.instagram.com/kateshootsmusic/" target="blank">Kate Rose</a></h2>
    </Layout>
  );
};

export const Head = () => <Seo title="Photos" />

export default Photos;
