import nodemailer from 'nodemailer';
import config from './config/index.js';

const transporter = nodemailer.createTransport({
  host: config.email_host,
  port: config.email_port,
  secure: true,
  auth: {
    user: config.email_user,
    pass: config.email_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    if (!to) {
      throw new Error('Recipient email is missing.');
    }

    const mailOptions = {
      from: `"Design Arc Light" <${config.email_user}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
