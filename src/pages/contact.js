import * as React from "react"
import Form from '../components/form'
import Layout from "../components/layout"
import Seo from "../components/seo"


const Contact = () => (
  <Layout>
    <Seo title="Contact" />
    <h1>Contact</h1>
    <div class='contact'>
    <h3>Email: <a href='mailto:nightwraithmetal@gmail.com'>nightwraithmetal@gmail.com</a></h3>
    <h3>Live Chat: <a href='https://calendly.com/benjaminjackpitts/30min' target='blank'>Schedule a Zoom Meeting</a></h3>
    <h3>Label: <a href='https://whatsleftrec.com/' target='blank'>https://whatsleftrec.com/</a></h3>
    <h3>Bandcamp: <a href='https://nightwraith.bandcamp.com/' target='blank'>https://nightwraith.bandcamp.com/</a></h3>
    <h3>Facebook: <a href='https://www.facebook.com/nightwraithband' target='blank'>https://www.facebook.com/nightwraithband</a></h3>
    <h3>Instagram: <a href='https://www.instagram.com/nightwraithband/' target='blank'>https://www.instagram.com/nightwraithband/</a></h3>
    <h3>Twitter: <a href='https://twitter.com/nightwraithband' target='blank'>https://twitter.com/nightwraithband</a></h3>
    </div>
    <br />
    <h3>Or send a message directly:</h3>
    <Form />

  </Layout>
)

export default Contact
