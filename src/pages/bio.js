import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"


const Bio = () => (
  <Layout>
    <h1>Bio</h1>
    <StaticImage
      src="../images/NW-PROMO-53.jpg"
      width={500}
      quality={80}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="NW Promo"
      style={{ margin: `1rem` }}
    />
<div class='bio-text-block'>
NightWraith is a melodic death metal band from Denver, CO that explores the genre with an eclectic and intuitive approach. Their music encompasses poignant themes: seeking the sublime in nature, being genuine in a deceptive world, and living with the idea of death—concepts that unite us all as people. Using haunting melodies and triumphant anthems, NightWraith offers listeners a sonic pilgrimage into the heart of being human.
<br /><br />
The band was formed in 2016 without any preconceived notion of genre, allowing them to develop their sound organically. "Gone are the days of trying to be the fastest or heaviest band," says founding member Benjamin Pitts. "We've already done bands like that and now we just want to write music that is fun to play and meaningful to us." The members of NightWraith have been musical companions for over a decade in the Denver scene, but this lineup achieves its own unique approach to aggressive music, inspired by but not limited to the past. After releasing a self-titled album in 2019, Nightwraith gained notoriety and played shows with heavy hitters like ‘Khemmis’, but they were still developing their sound and being called to a new musical frontier.
<br /><br />
Pulling inspiration from a wide array of bands and genres, NightWraith has been sonically refined into something truly unique. "It's like we took all the heavy parts from bands like <b>Carcass</b>, and <b>Enslaved</b>, and combined it with the warmth of classic bands like <b>Thin Lizzy</b>, and <b>Blue Oyster Cult</b>", explains Ben. "It has been really fun inserting rock guitar and organ tones into a genre that typically avoids these types of sounds." NightWraith released their sophomore album, Offering, in the spring of 2022, receiving widespread praise from critics.
<br /><br />
As NightWraith continues to evolve, they have refined their sound even further and completed work on a 3rd full-length studio album titled 'Divergence'. This new album captures their vision even more closely, bringing in more 'film-score' type elements with the synthesizer tones. 'Divergnece' will be released worldwide on 9/13/2024 via <a href = 'https://whatsleftrec.com/' target='blank'> What's Left Records</a>.
<br />
</div>

  </Layout>
)

export const Head = () => <Seo title="Bio" />

export default Bio
