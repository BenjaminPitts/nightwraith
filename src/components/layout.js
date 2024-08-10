/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Header from "./header"
import "./layout.css"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{

          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            backgroundColor: `black`,
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
            padding: `3rem`,
            textAlign: `center`
          }}
        >
        <Link to="/" class='homepage'>Back to Homepage</Link>
        <br /><br />
<a href ='https://drive.google.com/file/d/1CqsHz9x3Xob7bB4_nDnNFksrk5uzIwwc/view?usp=sharing' target='_blank'rel="noreferrer" download>Download LOGO </a>
  <p class='socials'>
  <a href='https://www.facebook.com/nightwraithband' target='_blank' rel="noreferrer">
  <StaticImage
    src="../images/fb.png"
    width={40}
    quality={100}
    formats={["AUTO", "WEBP", "AVIF"]}
    alt="NightWraith - Facebook"
    style={{ margin: `1rem 2rem` }}
  /></a>
  <a href='https://www.instagram.com/nightwraithband/' target='_blank' rel="noreferrer">
  <StaticImage
    src="../images/ig.png"
    width={40}
    quality={100}
    formats={["AUTO", "WEBP", "AVIF"]}
    alt="NightWraith - Instagram"
    style={{ margin: `1rem 2rem` }}
  /></a>
  <a href='https://twitter.com/nightwraithband' target='_blank' rel="noreferrer">
  <StaticImage
    src="../images/twitter.png"
    width={40}
    quality={100}
    formats={["AUTO", "WEBP", "AVIF"]}
    alt="NightWraith - Twitter"
    style={{ margin: `1rem 2rem` }}
  />
  </a>
</p>

          © {new Date().getFullYear()} &middot; NightWraith
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
