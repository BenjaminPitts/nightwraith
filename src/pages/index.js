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

const IndexPage = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("indexpage.load");
  }, []);

  return (
    <Layout>
      <br />
      <br />
      <div className="index-box">
        <div className="index-inner-box">
          <StaticImage
            src="../images/lauren-promo-bw.jpg"
            width={500}
            quality={60}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="NightWraith"
            style={{ margin: `.5rem`, border: `.1rem solid black` }}
          />
          <StaticImage
            src="../images/full-band-oriental2.jpg"
            width={500}
            quality={60}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="NightWraith"
            style={{ margin: `.5rem`, border: `.1rem solid black` }}
          />
        </div>
        <iframe
          className="iframe-index"
          src="https://bandcamp.com/EmbeddedPlayer/album=3538762053/size=large/bgcol=333333/linkcol=e32c14/transparent=true/"
          title="Divergence by NightWraith"
          seamless
        >
          <a href="https://nightwraith.bandcamp.com/album/divergence">Divergence by NightWraith</a>
        </iframe>
      </div>
      <br />
      <br />
      <div className="quotes">
      <h1><i>Divergence</i> - released 9/13/2024 on <a href="https://whatsleftrec.com/">What's Left Records</a></h1>
        <h2>Here's what some of the critics had to say about it:</h2>
        <br />
        <h3><i>"The contrast between the harsh vocals and the melodic, atmospheric layers creates a unique listening experience
          <br />
          that feels both powerful and unexpectedly harmonious, pushing the boundaries of what music can offer."</i> - <a href="https://metal-temple.com/review/nightwraith-divergence/" target="blank"> Metal Temple</a></h3>
        <br />
        <h3><i>"Few American melodeath bands can hang their hats on a record that’s as creative, engaging, and just plain fun
          <br />
          as Nightwraith has done with Divergence."</i> - <a href="https://www.nocleansinging.com/2024/09/30/a-double-dose-of-denver-death-metal-glacial-tomb-nightwraith/" target="blank"> No Clean Singing</a></h3>
        <br />
        <h3><i>"Layered between blackened death metal passages are melodic, synth-heavy segues that form a mature offering
          <br />
          from the Denver group."</i> - <a href="https://www.invisibleoranges.com/umr-8182024-9282024/" target="blank"> Invisible Oranges</a></h3>
        <br />
        <h3><i>"Divergence is a wild ride, a fantastic achievement and an album that will keep revealing more secrets
          <br />
          with every listen."</i> - <a href="https://www.rockedtothebones.com/post/nightwraith-album-review" target="blank"> Rocked to the Bones</a></h3>
        <br />
        <h3><i>"So if you've ever wondered what it might sound like if the members of GENESIS, PINK FLOYD and SATYRICON
          <br />
          accidentally met in the rehearsal room and, without much preamble, mixed their songs into a cocktail, then "Divergence"
          <br />
          at least gives you a pretty good starting point."</i> - <a href="https://powermetal.de/review/review-Nightwraith/Divergence,42885.html" target="blank"> PowerMetal.de</a></h3>
        <br />
      </div>
    </Layout>
  );
};

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage;
