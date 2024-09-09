const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Route to send location-based email
router.post('/sendLocationEmail', async (req, res) => {
  const { selectedPeople, mapsLink } = req.body;

  if (!selectedPeople || !mapsLink) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    for (const person of selectedPeople) {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: person.email,
        subject: 'Your friend’s current location',
        text: `${person.name}, here is the current location on Google Maps:\n${mapsLink}`,
      };
      await transporter.sendMail(mailOptions);
    }
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails', error: error.message });
  }
});

module.exports = router;
