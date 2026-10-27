import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ThanksPage = () => (
  <Layout>
    <h1>Contact form confirmation</h1>
    <p>
      If you were redirected here after a successful form submission, thank you
      for getting in touch.
    </p>
    <p>
      This page cannot verify delivery. Opening it directly does not send a
      message.
    </p>
    <p>
      If you are unsure whether your submission completed, please use the email
      address on our <a href="/contact/">contact page</a>.
    </p>
    <a href="/">Back to Homepage</a>
  </Layout>
)

export const Head = () => (
  <Seo
    title="Contact form confirmation"
    description="Return page for the NightWraith contact form."
    pathname="/thanks/"
    noindex
  />
)

export default ThanksPage
