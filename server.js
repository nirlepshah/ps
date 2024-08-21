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
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,  // Use environment variable
    pass: process.env.EMAIL_PASS   // Use environment variable
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Email user as sender
      to,
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
  const response = await sendEmail(email, subject, message);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
