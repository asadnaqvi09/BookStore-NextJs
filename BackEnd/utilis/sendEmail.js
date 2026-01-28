const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAILS,
    pass: process.env.SMTP_APP_PASSWORDS,
  },
});

console.log("SMTP_EMAIL:", process.env.SMTP_EMAILS);

transporter.verify((error, success) => {
  if (error) console.log("SMTP error:", error);
  else console.log("✅ SMTP connection ready");
});

const sendEmail = async (from,subject, html, replyToUser) => {
  try {
    const mailOptions = {
      from: from ,
      to:process.env.SMTP_EMAILS,   
      subject,
      html,                  
      replyTo: replyToUser,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully to Admin!");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = { sendEmail };