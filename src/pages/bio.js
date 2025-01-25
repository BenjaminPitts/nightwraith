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
        NightWraith is a melodic death metal band from Denver, CO that explores the genre with an eclectic and intuitive approach. Their music encompasses poignant themes: seeking the sublime in nature, being genuine in a deceptive world, and living with the idea of death—concepts that unite us all as people. Using haunting melodies and triumphant anthems, NightWraith offers listeners a sonic pilgrimage into the heart of being human.
        <br /><br />
        The band was formed in 2016 (Benjamin Pitts, Isidro Soto, Igor Panasewicz, Jerry Hilger) without any preconceived notion of genre, allowing them to develop their sound organically. The members of NightWraith had already been musical companions for over a decade in the Denver scene, but their lineup achieved its own unique approach to aggressive music - inspired by, but not limited to the past. After releasing a <b>self-titled album in 2019</b>, Nightwraith gained notoriety but were still developing their sound and being called to a new musical frontier.
        <br /><br />
        Pulling inspiration from a wide array of bands and genres, NightWraith sonically refined their sound into something unique by adding a full-time keyboard player (Caleb Jose Tardio). "Writing new material with keys in mind made us want to sound like we were taking all the heavy parts from bands like <b>Carcass</b>, and <b>Enslaved</b>, and combined it with the warmth of classic bands like <b>Thin Lizzy</b>, and <b>Blue Oyster Cult</b>", explains Ben. "It's' been fun putting big rock riffs and Hammond organ tones into a genre that sometimes avoids these types of sounds." NightWraith released their sophomore album, <b>Offering, in the spring of 2022</b>, which received praise from critics and was supported by a number of live performances.
        <br /><br />
        As NightWraith continued to evolve, the producer of Offering (Jacob St. Amand) entered the band on bass and they refined their sound even further. Fall of 2024 saw the release of their <b>3rd full-length studio album, 'Divergence'</b>. This new iteration of songs captured their vision more closely and cleverly used analog synthesizer tones to give the album a 'film score' type of quality. Ben explains: "Musically, the songs on Divergence are melodic and emotional. But the drums are fast with lots of big rock fills, double bass, and blast beats, so it has a driving pace and ‘classic’ metal tone. The keyboards and synths are the icing on the cake though, and really color the album in a nostalgic, 80's type of way. The key melodies often lay on top of the guitars - giving the songs a musical complexity that makes the album stand out in a really memorable way." 
        
        <br /><br />
        NightWraith also stepped up the production on Divergence by recruiting some of their talented friends to contribute (Andreas Wild - The Nightsweats, Kelly Schilling - Dreadnought, Joey Truscelli - Wayfarer, Cole Rudy - Dragondeer, Jeremy Portz - Abhoria), and added extra rhythmic layers with acoustic guitar, and percussive instruments like cowbell, shakers, and chimes. Producer Zack Ohren (Machine Head, Immolation) mixed and mastered the project, giving it a top-shelf sounding production quality.
        
        <br /><br />
        With the addition of keyboard player Lauren Viera (Dreadnought) in 2025, NightWraith looks ahead to the future with plans of playing more shows to a wider audience, and writing new material that will mark their next chapter and evolution as a band.

        <br />
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="Bio" />

export default Bio;
