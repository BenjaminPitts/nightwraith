import * as React from "react"
import { Link } from "gatsby"

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
      address on our <Link to="/contact/">contact page</Link>.
    </p>
    <Link to="/">Back to Homepage</Link>
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
