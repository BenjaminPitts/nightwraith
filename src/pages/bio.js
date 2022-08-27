import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Bio = () => (
  <Layout>
    <h1>Bio</h1>
    <StaticImage
      src="../images/headshot.png"
      width={700}
      quality={80}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="Hammer and Anvil Hearing"
      style={{ margin: `1rem` }}
    />
<div class='bio-text-block'>
NightWraith is a melodic death metal band from Denver, CO that explores the genre with an eclectic and intuitive approach. Their music encompasses poignant themes: seeking the sublime in nature, being genuine in a deceptive world, and living with the idea of death—concepts that unite us all as people. Using haunting melodies and triumphant anthems, NightWraith offers listeners a sonic pilgrimage into the heart of being human. 
<br /><br />
The band was formed in 2016 without any preconceived notion of genre, allowing them to develop their sound organically. "Gone are the days of trying to be the fastest or heaviest band," says founding member Benjamin Pitts. "We've already done bands like that and now we just want to write music that is fun to play and meaningful to us." The members of NightWraith have been musical companions for over a decade in the Denver scene, but this lineup achieves its own unique approach to aggressive music, inspired by but not limited to the past. After releasing a self-titled album in 2019, Nightwraith gained notoriety and played shows with heavy hitters like ‘Khemmis’ and ‘Green Druid’, but they were still developing their sound and being called to a new musical frontier.
<br /><br />
During 2020, a year filled with anxiety and isolation, the band would finally have the time and freedom to create the next chapter of their story. Their new full-length, "Offering", is a monumental effort that has turned some heads in the death metal circuit and beyond. With the addition of a new member in early 2021 (keyboards/synthesizer), the band broadened the scope of their exploration, making “Offering” an experience that is both aggressive and textural.  
<br /><br />
Pulling inspiration from a wide array of bands and genres, NightWraith has been sonically refined into something truly unique. "It's like we took all the heavy parts from bands like <b>Carcass</b>, and <b>Enslaved</b>, and combined it with the warmth of classic bands like <b>Thin Lizzy</b>, and <b>Blue Oyster Cult</b>", explains Ben. "It has been really fun inserting rock guitar and organ tones into a genre that typically avoids these types of sounds." Additionally, the songwriting on "Offering" is deliberate, concise, and thoughtful, while remaining heavy enough to please the death metal audience for which it was intended.
<br /><br />
As NightWraith continues to evolve, it is clear that their ambitions are paying off. "Offering" is expressive, inventive, joyful, sorrowful, and will certainly inspire its listeners. "Offering" was released on March 25th, 2022 and is available on digital/analog formats through Reaping Scythe Records.

<br />
</div>

  </Layout>
)

export const Head = () => <Seo title="Bio" />

export default Bio
