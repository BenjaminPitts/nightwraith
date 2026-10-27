import * as React from "react"

import logoImage from "../images/NW-LOGO-2.png"

const Header = () => {
  const [logoLoaded, setLogoLoaded] = React.useState(false)

  return (
    <header>
      <div className="header">
        <a href="/" className="logo-link">
          <img
            src={logoImage}
            id="top"
            width={380}
            height={228}
            alt="NightWraith"
            loading="eager"
            decoding="sync"
            onLoad={() => setLogoLoaded(true)}
            onError={() => setLogoLoaded(true)}
            style={{
              margin: `1rem 0`,
              display: `block`,
              backgroundColor: `transparent`,
              opacity: logoLoaded ? 1 : 0,
              transition: `none`,
            }}
          />
        </a>

        <div className="nav">
          <a href="/bio/" className="link">
            {" "}
            Bio
          </a>{" "}
          |
          <a href="/press/" className="link">
            {" "}
            Press
          </a>{" "}
          |
          <a href="/videos/" className="link">
            {" "}
            Videos
          </a>{" "}
          |
          <a href="/photos/" className="link">
            {" "}
            Photos
          </a>{" "}
          |
          <a
            href="https://nightwraith.bandcamp.com/merch"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Merch
          </a>{" "}
          |
          <a href="/contact/" className="link">
            {" "}
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
