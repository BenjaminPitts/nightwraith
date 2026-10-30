import * as React from "react"
import logoImage from "../images/NW-LOGO-2.png"

export const sectionLinks = [
  ["Music", "music"],
  ["Shows", "shows"],
  ["Videos", "videos"],
  ["Photos", "photos"],
  ["About", "about"],
  ["Merch", "merch"],
  ["Press", "press"],
]

const pageLinks = [
  ["Bio", "/bio/"],
  ["Press", "/press/"],
  ["Videos archive", "/videos/"],
  ["Photo archive", "/photos/"],
]

const Header = ({ isHome = false }) => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="site-brand" aria-label="NightWraith home">
          <img src={logoImage} width="1200" height="720" alt="NightWraith" />
        </a>
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span />
          <span />
        </button>
        <nav
          className={`site-nav${menuOpen ? " is-open" : ""}`}
          id="site-navigation"
          aria-label="Main navigation"
        >
          <div className="nav-sections">
            {sectionLinks.map(([label, section]) => (
              <a
                href={isHome ? `#${section}` : `/#${section}`}
                key={section}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-pages">
            {pageLinks.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href="https://nightwraith.bandcamp.com/merch" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              Bandcamp store
            </a>
          </div>
          <a
            className="nav-contact"
            href={isHome ? "#contact" : "/contact/"}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
