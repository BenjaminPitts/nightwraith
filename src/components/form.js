import React from 'react'

class Form extends React.Component {
  render = () => {
    return <>

    <br />
    <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact" action='/thanks/' netifly>
    <input type="hidden" name="bot-field" />
    <input type="hidden" name="form-name" value="contact" />

    <input type="text" name="name" placeholder='your name'/><br />


    <input type="email" name="email" placeholder='your email'/><br />


    <textarea type="text" name="message" rows='10'placeholder='message'>
    </textarea><br />

    <button type='submit'>Send</button>
  </form><br />
    </>
  }
}

export default Form
