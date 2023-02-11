import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"


const Videos = () => (
  <Layout>
    <h1>Videos</h1>
  
  <div class='outer-box'>
  <div class='inner-box'>
  
  <iframe src="https://bandcamp.com/VideoEmbed?track=1101588386&bgcol=333333&linkcol=0f91ff" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" title="NW-HedonicAdaptation" seamless></iframe>
  </div>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=3214292848&bgcol=333333&linkcol=0f91ff" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" title="NW-Genesthai" seamless></iframe>
  </div>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=1353052683&bgcol=333333&linkcol=0f91ff" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" title="NW-Beguiler-Live" seamless></iframe>
  </div>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=3683366524&bgcol=333333&linkcol=0f91ff" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" title="NW-Shavano" seamless></iframe>
  </div>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=3111341039&bgcol=333333&linkcol=0f91ff" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" title="NW-TheUnkownCrown" seamless></iframe>
  </div>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=3279518317&bgcol=333333&linkcol=0f91ff" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" title="NW-TheSnakeAndTheRope" seamless></iframe>
  
  </div>
  </div>

  </Layout>
)

export const Head = () => <Seo title="Videos" />

export default Videos