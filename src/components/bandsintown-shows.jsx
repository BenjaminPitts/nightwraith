import { useEffect, useRef } from "react"

const widgetScript = "https://widgetv3.bandsintown.com/main.min.js"
const artistUrl = "https://www.bandsintown.com/a/15563342-nightwraith"

export default function BandsintownShows() {
  const widgetHost = useRef(null)

  useEffect(() => {
    const host = widgetHost.current
    if (host.childElementCount) return

    const styles = getComputedStyle(host)
    const accent = styles.getPropertyValue("--accent").trim()
    const paper = styles.getPropertyValue("--paper").trim()
    const ink = styles.getPropertyValue("--ink").trim()
    const options = {
      artistName: "id_15563342",
      autoStyle: false,
      layoutStyle: "classic",
      displayLocalDates: false,
      displayPastDates: false,
      displayLimit: "all",
      displayLineup: false,
      displayDetails: false,
      displaySocialShareButtons: false,
      backgroundColor: ink,
      textColor: paper,
      linkColor: accent,
      font: styles.fontFamily,
      separatorColor: styles.getPropertyValue("--line").trim(),
      widgetWidth: "100%",
      ctaBgColor: accent,
      ctaTextColor: ink,
      ctaBorderColor: accent,
      ctaBorderRadius: "0px",
      eventTicketCtaBgColor: accent,
      eventTicketCtaTextColor: ink,
      eventTicketCtaBorderColor: accent,
      eventRsvpCtaBgColor: ink,
      eventRsvpCtaTextColor: accent,
      eventRsvpCtaBorderColor: accent,
      followSectionCtaBgColor: ink,
      followSectionCtaTextColor: paper,
      followSectionCtaBorderColor: accent,
      playMyCityCtaBgColor: ink,
      playMyCityCtaTextColor: paper,
      playMyCityCtaBorderColor: accent,
      language: "en",
    }

    if (window.BIT?.widgetInitializer) {
      window.BIT.widgetInitializer.append(host, options)
      return
    }

    const initializer = document.createElement("a")
    initializer.className = "bit-widget-initializer"
    initializer.href = artistUrl
    for (const [name, value] of Object.entries(options)) {
      initializer.dataset[name] = String(value)
    }
    host.appendChild(initializer)

    if (!document.querySelector(`script[src="${widgetScript}"]`)) {
      const script = document.createElement("script")
      script.src = widgetScript
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="shows-content">
      <div
        className="shows-widget"
        role="region"
        aria-label="Upcoming NightWraith shows"
        tabIndex={0}
      >
        <div ref={widgetHost} />
      </div>
      <div className="shows-links">
        <a className="text-link" href={artistUrl} target="_blank" rel="noreferrer">
          View dates on Bandsintown
        </a>
        <a className="text-link" href="/contact/">
          Booking inquiries
        </a>
      </div>
    </div>
  )
}