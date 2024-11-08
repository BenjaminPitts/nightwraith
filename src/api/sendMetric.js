// src/api/sendMetric.js

const dgram = require("dgram");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { metricName } = req.body;
    
    // Check if metricName is provided in the request body
    if (!metricName) {
      return res.status(400).json({ status: "error", message: "Metric name missing" });
    }

    // Create the UDP client and construct the message
    const client = dgram.createSocket("udp4");
    const message = Buffer.from(`8770573a-2e24-4ad5-9d1f-f69afca83321.nightwraith.${metricName}:1|c\n`);

    // Send the metric to Hosted Graphite
    client.send(message, 0, message.length, 8125, "statsd.hostedgraphite.com", (err) => {
      client.close();
      if (err) {
        console.error("Error sending metric:", err);
        return res.status(500).json({ status: "error", message: "Failed to send metric" });
      } else {
        return res.status(200).json({ status: "success", message: "Metric sent successfully" });
      }
    });
  } else {
    // Handle any non-POST requests
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}

