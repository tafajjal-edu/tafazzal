const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or your email provider
        auth: {
            user: 'sam12mensah@gmail.com', // Your email
            pass: '123456789', // Your email password or app password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'sam12mensah@gmail.com',
        subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email.');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
