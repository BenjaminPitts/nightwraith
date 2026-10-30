import OptimizedImage from "./optimized-image"
import Layout from "./layout"
import YouTubeVideo, { featuredVideos } from "./youtube-video"
import BandsintownShows from "./bandsintown-shows"

// Change these three entries to choose the homepage photos; orientation follows source dimensions.
const photoPreviews = [
  {
    src: "../images/full-band-oriental-color.jpg",
    width: 1200,
    quality: 90,
    orientation: "landscape",
    alt: "NightWraith performing live at the Oriental Theater in color",
  },
  {
    src: "../images/live-oriental.jpg",
    width: 300,
    quality: 95,
    orientation: "portrait",
    alt: "Black-and-white photo of a NightWraith guitarist and drummer performing live",
  },
  {
    src: "../images/hidive.jpg",
    width: 300,
    quality: 95,
    orientation: "portrait",
    alt: "NightWraith musician performing under red stage lighting at the hi-dive",
  },
]

const landscapePhotoPreviews = photoPreviews.filter(
  photo => photo.orientation === "landscape"
)
const portraitPhotoPreviews = photoPreviews.filter(
  photo => photo.orientation === "portrait"
)

const PhotoPreview = ({ photo }) => (
  <figure className={`photo-tile photo-tile--${photo.orientation}`}>
    <OptimizedImage
      src={photo.src}
      width={photo.width}
      quality={photo.quality}
      alt={photo.alt}
      imageStyle={{
        width: "100%",
        height: "100%",
        objectFit: photo.orientation === "landscape" ? "cover" : "contain",
      }}
      style={{ width: "100%", height: "100%", maxWidth: "none" }}
    />
  </figure>
)

const pressQuotes = [
  {
    quote:
      "Few American melodeath bands can hang their hats on a record that’s as creative, engaging, and just plain fun as Nightwraith has done with Divergence.",
    source: "No Clean Singing",
    href: "https://www.nocleansinging.com/2024/09/30/a-double-dose-of-denver-death-metal-glacial-tomb-nightwraith/",
  },
  {
    quote:
      "Layered between blackened death metal passages are melodic, synth-heavy segues that form a mature offering from the Denver group.",
    source: "Invisible Oranges",
    href: "https://www.invisibleoranges.com/umr-8182024-9282024/",
  },
  {
    quote:
      "Divergence is a wild ride, a fantastic achievement and an album that will keep revealing more secrets with every listen.",
    source: "Rocked to the Bones",
    href: "https://www.rockedtothebones.com/post/nightwraith-album-review",
  },
  {
    quote:
      "The contrast between the harsh vocals and the melodic, atmospheric layers creates a unique listening experience that feels both powerful and unexpectedly harmonious, pushing the boundaries of what music can offer.",
    source: "Metal Temple",
    href: "https://metal-temple.com/review/nightwraith-divergence/",
  },
]

const HomePage = () => (
  <Layout fullWidth>
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <OptimizedImage
          className="hero-photo"
          src="../images/nw-agr-promo.png"
          width={1800}
          quality={85}
          alt="Black-and-white NightWraith band portrait in a room covered with signatures"
          loading="eager"
          imageStyle={{ height: "100%", objectFit: "cover" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
          }}
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Est. 2016</p>
          <h1 id="hero-title">NightWraith</h1>
          <p className="hero-intro">
            Melodic and progressive death metal from Denver, Colorado, USA.
          </p>
        </div>
      </section>

      <section className="home-section home-section--toned music-section" id="music">
        <div className="section-heading music-heading">
          <h2>Music</h2>
        </div>
        <div className="music-album">
          <div className="music-art">
          <OptimizedImage
            src="../images/divergence-sm.jpg"
            width={1000}
            quality={85}
            alt="Divergence album artwork"
            imageStyle={{ display: "block", width: "100%", height: "auto" }}
            style={{ width: "100%", maxWidth: "none" }}
          />
          </div>
          <div className="music-copy">
            <h3 className="album-title">Divergence</h3>
            <p className="eyebrow">2024 · What’s Left Records</p>
          </div>
        </div>
        <div className="music-player">
          <iframe
            data-testid="embed-iframe"
            src="https://open.spotify.com/embed/album/5GudIl7FBjtLVzFuAC5LkY?utm_source=generator&si=1ce457a2defa4aee"
            title="Divergence by NightWraith on Spotify"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <div className="listen-links" aria-label="Listen to NightWraith">
            <a
              href="https://nightwraith.bandcamp.com/album/divergence"
              target="_blank"
              rel="noreferrer"
            >
              Bandcamp
            </a>
            <a
              href="https://open.spotify.com/artist/4xM6FsTNQOl7OuzAZ0FgXm"
              target="_blank"
              rel="noreferrer"
            >
              Spotify
            </a>
          </div>
        </div>
      </section>

      <section className="home-section shows-section" id="shows">
        <div className="section-heading">
          <h2>Shows</h2>
        </div>
        <BandsintownShows />
      </section>

      <section className="home-section video-section" id="videos">
        <div className="section-heading section-heading--row">
          <h2>Videos</h2>
          <a className="text-link" href="/videos/">
            All Videos
          </a>
        </div>
        <div className="video-grid">
          {featuredVideos.map(video => (
            <YouTubeVideo video={video} key={video.id} />
          ))}
        </div>
      </section>

      <section className="home-section photos-section" id="photos">
        <div className="section-heading section-heading--row">
          <h2>Photos</h2>
          <a className="text-link" href="/photos/">
            Photo Gallery
          </a>
        </div>
        <div className="photo-grid">
          {landscapePhotoPreviews.map(photo => (
            <PhotoPreview photo={photo} key={photo.src} />
          ))}
          {portraitPhotoPreviews.map(photo => (
            <PhotoPreview photo={photo} key={photo.src} />
          ))}
        </div>
      </section>

      <section className="home-section about-section" id="about">
        <div className="about-label">
          <h2>About</h2>
        </div>
        <div className="about-copy">
          <p>
            NightWraith is a melodic heavy metal band from Denver, Colorado, formed in 2016. Longtime musical companions in the Denver metal scene, the band combines death metal aggression, progressive songwriting, and '80s-inspired synthesizers while their lyrics explore mortality, nature, and the search for meaning. NightWraith released its self-titled debut in 2019, followed by <i>Offering </i> (2022), as keyboards and classic rock tones became increasingly important to their sound.
          </p>
          <p>
            On their third album, <i>Divergence </i> (2024), driving percussion and harmonized guitars meet analog synthesizers and cinematic melodies. Friends from Dreadnought, Wayfarer, Dragondeer, and The Nightsweats contributed to the sessions, while producer Zack Ohren (Machine Head, Immolation) mixed and mastered the album. Their upcoming fourth album, <i>Impending Rebellion</i>, is scheduled for release in 2027 via <a href="https://artgatesrecords.com/" target="_blank" rel="noreferrer">Art Gates Records</a> which promises to be their darkest and most cohesive material to date.
          </p>
          <a className="text-link" href="/bio/">
            Full Biography
          </a>
        </div>
      </section>

      <section className="home-section merch-section" id="merch">
        <h2>Merch</h2>
        <p>Current releases and merchandise are available through Bandcamp.</p>
        <a
          className="button button--outline"
          href="https://nightwraith.bandcamp.com/merch"
          target="_blank"
          rel="noreferrer"
        >
          Visit Bandcamp
        </a>
      </section>

      <section className="home-section home-section--toned press-section" id="press">
        <h2>Press</h2>
        <div className="press-content">
          <div className="press-quotes">
            {pressQuotes.map(({ quote, source, href }) => (
              <article className="press-quote" key={source}>
                <blockquote>“{quote}”</blockquote>
                <cite>
                  <a href={href} target="_blank" rel="noreferrer">
                    {source}
                  </a>
                </cite>
              </article>
            ))}
          </div>
          <a className="text-link press-more" href="/press/">
            More Press
          </a>
        </div>
      </section>

      <section className="home-section contact-section" id="contact">
        <h2>Contact</h2>
        <p>For booking, press and general inquiries.</p>
        <a className="button button--outline" href="/contact/">
          Contact NightWraith
        </a>
      </section>
    </div>
  </Layout>
)

export default HomePage