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
As NightWraith continues to evolve, they refined their sound even further and released their 3rd full-length studio album, 'Divergence' which captures their vision even more closely, bringing in more 'film-score' type elements with the synthesizer tones. Benjamin Pitts explains: "Musically, the songs on ‘Divergence’ utilize classic songwriting structures (verse/chorus/bridge/lead). The drums are fast with lots of big rock fills and the choice to use fast double bass and blast beats give the album a driving, more ‘classic’ metal sound. The keyboards/synthesizer tones are the icing on the cake and are what really color the album in a nostalgic sounding way. The melodies were written to lay on top of the guitars giving the songs a musical complexity that can be rare within the heavy metal genre. There are also a lot of solos on this album, but none of them are overly ‘shreddy’ and are meant to serve the song, not the player."
<br /><br />
NightWraith also stepped up the production on this album by recruiting some talented guest musicians to contribute (Andreas Wild - The Nightsweats, Kelly Schilling - Dreadnought, Joey Truscelli - Wayfarer, Cole Rudy - Dragondeer, Jeremy Portz - Abhoria), and added extra rythmic layers using acoustic guitar and percussive instruments like cowbell, shakers, and chimes. Producer Zack Ohren (Machine Head, Immolation, Fallujah) then mixed and mastered the project, giving it a top-shelf sounding production quality.
<br /><br />
'Divergnece' was released worldwide on 9/13/2024 via <a href = 'https://whatsleftrec.com/' target='blank'> What's Left Records</a>.
<br />
</div>

  </Layout>
)

export const Head = () => <Seo title="Bio" />

export default Bio
