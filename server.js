const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Ensure EMAIL_USER is set in Vercel environment variables
    pass: process.env.EMAIL_PASS   // Ensure EMAIL_PASS is set in Vercel environment variables
  }
});

const sendEmail = async (subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Ensure EMAIL_USER is set as sender
      to: process.env.EMAIL_USER,
      subject,
      text
    });

    console.log('Email sent: ' + info.response);
    return 'Success';
  } catch (error) {
    console.error('Error sending email: ', error);
    return 'error';
  }
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/', async (req, res) => {
  const { email, subject, message } = req.body;
  const emailContent = `You have received a message from: ${email}\n\nMessage:\n${message}`;

  // Send the email and await its completion before responding to the client
  const response = await sendEmail(subject, emailContent);

  // Send the result back to the client
  res.send(response);
});

// Start the server, in local development or on Vercel
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

