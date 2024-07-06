import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:5000/users/reset-password?token=${token}`;

  const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Password Reset - Sail Innovation',
  html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">Sail Innovation</h2>
      <p>Hi there,</p>
      <p>We received a request to reset your password. Click the button below to reset your password:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>If you didn't request a password reset, please ignore this email or let us know.</p>
      <p>Thank you,</p>
      <p>The Sail Innovation Team</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 12px; color: #888;">If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
      <p style="font-size: 12px; color: #888;"><a href="${resetLink}">${resetLink}</a></p>
    </div>
  `,
};

  await transporter.sendMail(mailOptions);
};

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code - Sail Innovation',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Sail Innovation</h2>
        <p>Hi there,</p>
        <p>Your OTP code is <strong>${otp}</strong>. It is valid for 7 days.</p>
        <p>If you didn't request this, please ignore this email or let us know.</p>
        <p>Thank you,</p>
        <p>The Sail Innovation Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};