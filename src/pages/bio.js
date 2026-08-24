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

const Bio = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("bio");
  }, []);

  return (
    <Layout>
      <h1>Bio</h1>
      <StaticImage
        src="../images/blurry-band-bw.JPEG"
        width={500}
        quality={80}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="NW Promo"
        style={{ margin: `1rem` }}
      />
      <br /><br />
      <div className="bio-text-block">
        NightWraith is a melodic heavy metal band from Denver, Colorado, formed in 2016. Their music combines death metal, progressive songwriting and 80s inspired synths into something dark, melodic and atmospheric. Lyrically, the band explores mortality, nature, authenticity and the search for meaning in a deceptive world. Haunting melodies and moments of triumph offer a counterpoint to the darker themes, creating music that is heavy without abandoning warmth or humanity.

        <br /><br />

        The band began among longtime musical companions in the Denver metal scene, without much concern for fitting neatly into a particular genre. Their <b>self titled debut arrived in 2019</b>, followed by <b>Offering in 2022</b>. During those years, keyboards became increasingly important to NightWraith's identity. Hammond organ, synthesizers and classic rock melody began finding their way into music rooted in death metal. The unlikely combination drew equally from the aggression of <b>Carcass and Enslaved</b> that meets the warmth of <b>Thin Lizzy and Blue Oyster Cult</b>.

        <br /><br />

        NightWraith pushed this idea much further on their third album, <b>Divergence</b>, released in 2024. Fast drums and heavy guitars collided with analog synthesizers and cinematic melodies, at times giving the record the atmosphere of a forgotten 80's film score. Friends from <b>Dreadnought, Wayfarer, Dragondeer, The Nightsweats, and Abhoria</b> contributed to the sessions, while producer <b>Zack Ohren (Machine Head, Immolation)</b> mixed and mastered the album.

        <br /><br />

        With <b>Lauren Viera (Dreadnought)</b> joining on keyboards in 2025, the band entered another period of transformation. NightWraith's current and former members also have roots in <b>Primitive Man, In the Company of Serpents</b> and <b>Dreadnought</b>, reflecting the strange cross section of Denver's heavy music scene that has surrounded the project from its beginning.

        <br /><br />

        Nearly ten years after forming, NightWraith has now completed their <b>fourth full length album</b>. The new record promises to be darker, heavier and more focused, while pushing further into the contrasts that have gradually come to define the band. Death metal aggression sits beside nostalgic synth tones, bleakness gives way to melody, and moments of tension open into something strangely triumphant.

        <br /><br />

        Four albums in, NightWraith sounds less interested than ever in where those elements are supposed to belong, and more certain of what to do actually with them.

        <br />
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="Bio" />

export default Bio;
