const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config();
const app = express()

const PORT = process.env.PORT || 5000;

app.use(express.static('public'))
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
app.post('/', (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Use environment variable
      pass: process.env.EMAIL_PASS   // Use environment variable

    }

  })
  const mailOptions = {
    from: req.body.email,
    to: 'ns080685@gmail.com',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error')
    }
    else {
      console.log('Email sent ' + info.response);
      res.send('Success')
    }
  })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})