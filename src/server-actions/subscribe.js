"use server";

import nodemailer from "nodemailer";

export async function subscribe({ email }) {
  if (!email || !email.includes("@")) {
    return { status: 400, message: "Invalid email address" };
  }

  // Configure the SMTP transport
  const transporter = nodemailer.createTransport({
    host: "mail.sarojbartaula.com", // Replace with your SMTP server host
    port: 587, // Replace with your SMTP server port
    secure: false, // true for 465, false for other ports
    auth: {
      user: "saroj@sarojbartaula.com", // Replace with your email address
      pass: "JG@sGG;9n3ve$9E", // Replace with your email password
    },
  });

  // Email options
  const mailOptions = {
    from: "saroj@sarojbartaula.com", // Replace with your email address
    to: "saroj@sarojbartaula.com", // Replace with your email address to receive subscription notifications
    subject: "New Newsletter Subscription",
    text: `New subscriber: ${email}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { status: 200, message: "Subscription successful!" };
  } catch (error) {
    return { status: 500, message: "Subscription failed. Please try again." };
  }
}
