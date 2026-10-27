import * as React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"

const Layout = ({ children, fullWidth = false }) => (
  <>
    <a className="skip-link" href="#main-content">
      Skip to content
    </a>
    <Header isHome={fullWidth} />
    <div className={`site-content${fullWidth ? " site-content--wide" : ""}`}>
      <main id="main-content" className={fullWidth ? "home-main" : "site-main"}>
        {children}
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="/">
          NightWraith
        </a>
        <nav className="footer-nav" aria-label="Footer">
          <a href="/bio/">Bio</a>
          <a href="/press/">Press</a>
          <a href="/videos/">Videos</a>
          <a href="/photos/">Photos</a>
          <a href="/contact/">Contact</a>
        </nav>
        <div className="footer-socials" aria-label="NightWraith elsewhere">
          <a href="https://nightwraith.bandcamp.com/" target="_blank" rel="noreferrer">Bandcamp</a>
          <a href="https://open.spotify.com/artist/4xM6FsTNQOl7OuzAZ0FgXm" target="_blank" rel="noreferrer">Spotify</a>
          <a href="https://www.instagram.com/nightwraithband/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/nightwraithband" target="_blank" rel="noreferrer">Facebook</a>
        </div>
        <a
          className="footer-download"
          href="https://drive.google.com/file/d/1lEssDOOwnhG12KbQpA_lNaFbG-RnR3Hf/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          Download logo
        </a>
        <p className="copyright">© {new Date().getFullYear()} NightWraith · Denver, Colorado</p>
      </footer>
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
}

export default Layout
