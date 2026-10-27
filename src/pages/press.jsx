import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Function to call the serverless function with a custom metric name
const sendMetric = metricName => {
  fetch("/api/sendMetric", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metricName }),
  })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error("Error calling metric API:", error))
}

const Press = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("press")
  }, [])

  return (
    <Layout>
      <h1>Press</h1>
      <div className="press">
        <h3>
          12/18/2025{" "}
          <a
            href="https://www.decibelmagazine.com/2025/12/18/track-premiere-nightwraith-the-candlelight/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Decibel (USA)
          </a>
        </h3>
        <br></br>
        <h3>
          11/6/2024{" "}
          <a
            href="https://www.metalcrypt.com/pages/review.php?revid=15981"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Metal Crypt (USA)
          </a>
        </h3>
        <h3>
          9/30/2024{" "}
          <a
            href="https://www.nocleansinging.com/2024/09/30/a-double-dose-of-denver-death-metal-glacial-tomb-nightwraith/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            No Clean Singing (USA)
          </a>
        </h3>
        <h3>
          9/19/2024{" "}
          <a
            href="https://www.westword.com/music/nightwraith-celebrates-album-release-at-hi-dive-in-denver-21898836"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Westword (USA)
          </a>
        </h3>
        <h3>
          9/19/2024{" "}
          <a
            href="https://www.ever-metal.com/2024/09/19/nightwraith-divergence/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Ever Metal (UK)
          </a>
        </h3>
        <h3>
          9/13/2024{" "}
          <a
            href="https://metalnoise.net/2024/09/review-divergence-by-nightwraith"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Metal Noise (USA)
          </a>
        </h3>
        <h3>
          9/13/2024{" "}
          <a
            href="https://uber-rock.co.uk/nightwraith-divergence-whats-left-records/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Uber Rock (UK)
          </a>
        </h3>
        <h3>
          9/12/2024{" "}
          <a
            href="https://www.decibelmagazine.com/2024/09/12/album-premiere-nightwraith-divergence/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Decibel (USA)
          </a>
        </h3>
        <h3>
          9/1/2024{" "}
          <a
            href="https://metal-temple.com/review/nightwraith-divergence/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Metal Temple (CAN)
          </a>
        </h3>
        <h3>
          8/29/2024{" "}
          <a
            href="https://theprogspace.com/nightwraith-premieres-perpetual-night-music-video/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            The Progspace (USA)
          </a>
        </h3>
        <h3>
          7/30/2024{" "}
          <a
            href="https://www.nocleansinging.com/2024/07/30/an-ncs-video-premiere-nightwraith-whispers-of-dragonflies/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            No Clean Singing (USA)
          </a>
        </h3>
        <h3>
          7/30/2024{" "}
          <a
            href="https://ashermediarelations.com/2024/07/30/nightwraith-unleashes-first-single-video-whispers-of-dragonflies-off-new-melodic-death-metal-album-divergence-out-sept-2024/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Asher Media Relations (CAN)
          </a>
        </h3>
        <br />
        <h3>
          6/17/2022{" "}
          <a
            href="https://www.nocleansinging.com/2022/06/17/an-ncs-video-premiere-nightwraith-beguiler/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            No Clean Singing (USA)
          </a>
        </h3>
        <h3>
          3/24/2022{" "}
          <a
            href="https://metalinjection.net/av/full-album-stream/nightwraith-brings-the-blackened-heavy-metal-on-new-album-offering"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Metal Injection (USA)
          </a>
        </h3>
        <h3>
          3/18/2022{" "}
          <a
            href="https://www.themetallistpr.com/post/nightwraith-shares-genesthai-video-off-upcoming-album-offering"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            The Metallist PR (Italy)
          </a>
        </h3>
        <h3>
          3/17/2022{" "}
          <a
            href="https://www.decibelmagazine.com/2022/03/17/video-premiere-nightwraith-genesthai/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Decibel (USA)
          </a>
        </h3>
        <h3>
          3/16/2022{" "}
          <a
            href="https://www.westword.com/music/denver-nightwraith-blackened-metal-dad-rock-13645506?fbclid=IwAR0Y80Xjy5y04vbfNJ7I8W_rd8hhu0NTR7hWfmStSJMqkd_1YFUGfXNZ8ZE"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Westword (USA)
          </a>
        </h3>
        <h3>
          2/23/2022{" "}
          <a
            href="https://www.earsplitcompound.com/nightwraith-denver-melodic-death-metal-collective-to-release-offering-full-length-march-25th-via-reaping-scythe-records-new-video-now-playing-preorders-available/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Earsplit PR (USA)
          </a>
        </h3>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Press"
    description="Press coverage, reviews, and features about NightWraith."
    pathname="/press/"
  />
)

export default Press
