import * as React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"
import OptimizedImage from "./optimized-image"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
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
            textAlign: `center`,
          }}
        >
          <a href="/" className="homepage">
            Back to Homepage
          </a>
          <br />
          <br />
          <a
            href="https://drive.google.com/file/d/1lEssDOOwnhG12KbQpA_lNaFbG-RnR3Hf/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            download
          >
            Download LOGO{" "}
          </a>
          <p className="socials">
            <a
              href="https://www.facebook.com/nightwraithband"
              target="_blank"
              rel="noreferrer"
            >
              <OptimizedImage
                src="../images/fb.png"
                width={40}
                quality={100}
                alt="NightWraith - Facebook"
                style={{ margin: `1rem 2rem` }}
              />
            </a>
            <a
              href="https://www.instagram.com/nightwraithband/"
              target="_blank"
              rel="noreferrer"
            >
              <OptimizedImage
                src="../images/ig.png"
                width={40}
                quality={100}
                alt="NightWraith - Instagram"
                style={{ margin: `1rem 2rem` }}
              />
            </a>
            <a
              href="https://twitter.com/nightwraithband"
              target="_blank"
              rel="noreferrer"
            >
              <OptimizedImage
                src="../images/twitter.png"
                width={40}
                quality={100}
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
