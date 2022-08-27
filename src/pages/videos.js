import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Videos = () => (
  <Layout>
    <h1>Videos</h1>
  
  <div class='outer-box'>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=1101588386&bgcol=ffffff&linkcol=0687f5" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" seamless></iframe>
  </div>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=3214292848&bgcol=ffffff&linkcol=0687f5" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" seamless></iframe>
  </div>
  <div class='inner-box'>
  <iframe src="https://bandcamp.com/VideoEmbed?track=1353052683&bgcol=ffffff&linkcol=0687f5" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" seamless></iframe>
  </div>
  
  
  </div>

  </Layout>
)

export const Head = () => <Seo title="Videos" />

export default Videos