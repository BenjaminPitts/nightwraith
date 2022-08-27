import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = () => (
  <Layout>
  <h3>Stream the new album, <i> Offering</i>, now!</h3>
<div class='index-box'>
<div class='index-inner-box'>
      <StaticImage
        src="../images/promo-photo.jpg"
        width={500}
        quality={60}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="NIghtWraith"
        style={{ margin: `1rem` }}
      />
      <StaticImage
        src="../images/live3.jpg"
        width={500}
        quality={60}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="NIghtWraith"
        style={{ margin: `1rem` }}
      />
</div>
      <iframe class='iframe2' src="https://bandcamp.com/EmbeddedPlayer/album=3760641137/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://nightwraith.bandcamp.com/album/offering">Offering by NightWraith</a></iframe>
</div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
