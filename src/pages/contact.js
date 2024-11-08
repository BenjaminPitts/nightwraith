import * as React from "react"
import Form from '../components/form'
import Layout from "../components/layout"
import Seo from "../components/seo"

// Function to call the serverless function with a custom metric name
const sendMetric = (metricName) => {
  fetch("/api/sendMetric", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metricName })
  })
    .then((response) => response.json())
    .then((data) => console.log(data.message))
    .catch((error) => console.error("Error calling metric API:", error));
};

const Contact = () => {
  // Use useEffect to send the metric once when the page loads
  React.useEffect(() => {
    sendMetric("contact");
  }, []);

  return (
    <Layout>
      <Seo title="Contact" />
      <h1>Contact</h1>
      <div className="contact">
        <h3>Email: <a href="mailto:nightwraithmetal@gmail.com">nightwraithmetal@gmail.com</a></h3>
        <h3>Live Chat: <a href="https://calendly.com/benjaminjackpitts/30min" target="blank">Schedule a Zoom Meeting</a></h3>
        <h3>Label: <a href="https://whatsleftrec.com/" target="blank">https://whatsleftrec.com/</a></h3>
        <h3>Bandcamp: <a href="https://nightwraith.bandcamp.com/" target="blank">https://nightwraith.bandcamp.com/</a></h3>
        <h3>Instagram: <a href="https://www.instagram.com/nightwraithband/" target="blank">https://www.instagram.com/nightwraithband/</a></h3>
        <h3>Spotify: <a href="https://open.spotify.com/artist/4xM6FsTNQOl7OuzAZ0FgXm" target="blank">https://open.spotify.com/artist/4xM6FsTNQOl7OuzAZ0FgXm</a></h3>
        <h3>Facebook: <a href="https://www.facebook.com/nightwraithband" target="blank">https://www.facebook.com/nightwraithband</a></h3>
        <h3>Twitter: <a href="https://twitter.com/nightwraithband" target="blank">https://twitter.com/nightwraithband</a></h3>
      </div>
      <br />
      <h3>Or send a message directly:</h3>
      <Form />
    </Layout>
  );
};

export default Contact;
