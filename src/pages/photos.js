import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"


const Photos = () => (
  <Layout>
    <h1>Photos</h1>

    <div class='outer-box'>

    <div class='inner-box'>
      <strong>
      <StaticImage
        src="../images/nw-hidive-ben.jpg"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Ben"
        style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
      />
      </strong>
    </div>

    <div class='inner-box'>
      <strong>
      <StaticImage
        src="../images/nw-hidive-spy.jpg"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Spy"
        style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
      />
      </strong>
    </div>

    <div class='inner-box'>
      <strong>
      <StaticImage
        src="../images/nw-hidive-igor.jpg"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Igor"
        style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
      />
      </strong>
    </div>

  <div class='inner-box'>
    <strong>
    <StaticImage
      src="../images/igor.jpg"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="NightWraith"
      style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
    />
    </strong>
  </div>

  <div class='inner-box'>
    <strong>
    <StaticImage
      src="../images/ben.jpg"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="Ben"
      style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
    />
    </strong>
  </div>

  <div class='inner-box'>
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

  <div class='inner-box'>
    <strong>
    <StaticImage
      src="../images/strings.jpg"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="Igor"
      style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
    />
    </strong>
  </div>

  <div class='inner-box'>
    <strong>
    <StaticImage
      src="../images/caleb.jpg"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="NIghtWraith"
      style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black`}}
    />
    </strong>
  </div>

  <div class='inner-box'>
    <strong>
    <StaticImage
      src="../images/ben2.jpg"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="NightWraith"
      style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
    />
    </strong>
  </div>

  <div class='inner-box'>
    <strong>
    <StaticImage
      src="../images/live1.jpg"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="NightWraith live"
      style={{ margin: `1rem .5rem`, boxShadow: `5px 10px black` }}
    />
    </strong>
  </div>

  <div class='inner-box'>
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

  <div class='inner-box'>
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

  </Layout>
)

export const Head = () => <Seo title="Photos" />

export default Photos
