// This file is no longer in use for OTPs or Feedback, but is kept for potential other uses.
// You may remove it if no other part of the app uses it.
import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// 1. Create a transporter object using the default SMTP transport
// You will need to use an email service that provides SMTP credentials.
// See https://nodemailer.com/smtp/well-known/ for a list of common services.
//
// IMPORTANT: DO NOT hardcode your credentials here. Use environment variables.
// You can add them to a .env.local file in your project root.
// For example:
// EMAIL_SERVER_USER="your-email@example.com"
// EMAIL_SERVER_PASSWORD="your-app-password"
// EMAIL_SERVER_HOST="smtp.example.com"
// EMAIL_SERVER_PORT=587

const transporter = nodemailer.createTransport({
  // Example for Gmail. You will need to enable "Less secure app access"
  // or use an "App Password" for this to work.
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
  secure: (process.env.EMAIL_SERVER_PORT || '587') === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER, // Your email address
    pass: process.env.EMAIL_SERVER_PASSWORD, // Your email password or app-specific password
  },
});

export const sendEmail = async (data: EmailPayload) => {
  const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER;

  if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
     console.warn(
      `**************************************************************************************
      * WARNING: EMAIL_SERVER_USER or EMAIL_SERVER_PASSWORD is not set.                      *
      * Email sending is disabled. Please set these environment variables.                 *
      * To test locally, create a .env file in the root of your project with the following: *
      *                                                                                    *
      * EMAIL_SERVER_USER="your-email@example.com"                                         *
      * EMAIL_SERVER_PASSWORD="your-email-password"                                        *
      * EMAIL_FROM="optional-from-address@example.com"                                     *
      *                                                                                    *
      **************************************************************************************`
    );
    // In a real app, you might want to throw an error here if email is critical.
    // For now, we just log a warning and don't send the email.
    return;
  }
  
  if (!fromAddress) {
    throw new Error('EMAIL_FROM or EMAIL_SERVER_USER environment variable is not set.');
  }

  const mailOptions = {
    from: `"Obsidian Peak University" <${fromAddress}>`,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  // 2. Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
};
