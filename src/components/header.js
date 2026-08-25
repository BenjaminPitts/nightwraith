import * as React from "react"
import { Link } from "gatsby"
import logoImage from "../images/NW-LOGO-2.png"

const Header = () => {
  const [logoLoaded, setLogoLoaded] = React.useState(false)

  return (
    <header>
  <div className='header'>
    <Link to="/" className="logo-link">
      <img
        src={logoImage}
        id='top'
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
    </Link>

    <div className='nav'>
    <Link to="/bio/" className='link'> Bio</Link> |
    <Link to='/press/' className='link'> Press</Link> |
    <Link to='/videos/' className='link'> Videos</Link> |
    <Link to='/photos/' className='link'> Photos</Link> |
    <a href='https://nightwraith.bandcamp.com/merch' className='link' target='_blank' rel='noreferrer'> Merch</a> |
    <Link to ='/contact/' className='link'> Contact</Link>
</div>

</div>

  </header>
  )
}

export default Header
