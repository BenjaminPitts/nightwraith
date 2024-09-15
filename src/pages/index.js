import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"


const IndexPage = () => (
  <Layout>
  <h1>Listen to the new album <i> Divergence</i>, released on 9/13/2024</h1>
<div class='index-box'>
<div class='index-inner-box'>
      <StaticImage
        src="../images/NW-PROMO-39.jpg"
        width={500}
        quality={60}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="NIghtWraith"
        style={{ margin: `.5rem`, border:`.1rem solid black` }}
      />
      <StaticImage
        src="../images/NW-PROMO-3.jpg"
        width={500}
        quality={60}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="NIghtWraith"
        style={{ margin: `.5rem`, border:`.1rem solid black` }}
      />

</div>
      <iframe class='iframe-index' src="https://bandcamp.com/EmbeddedPlayer/album=3538762053/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" title="Divergence by NightWraith" seamless><a href="https://nightwraith.bandcamp.com/album/divergence">Divergence by NightWraith</a></iframe>
</div>
<br />
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
