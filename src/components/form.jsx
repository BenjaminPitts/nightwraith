import React from "react"

class Form extends React.Component {
  render = () => {
    return (
      <>
        <br />
        <form
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name="contact"
          action="/thanks/"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />

          <input type="text" name="name" placeholder="your name" aria-label="Your name" />
          <br />

          <input type="email" name="email" placeholder="your email" aria-label="Your email" />
          <br />

          <textarea
            name="message"
            rows="10"
            placeholder="message"
            aria-label="Message"
          ></textarea>
          <br />

          <button type="submit">Send</button>
        </form>
        <br />
      </>
    )
  }
}

export default Form
