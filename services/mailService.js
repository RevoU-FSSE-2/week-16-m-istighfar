const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daiqijb105@gmail.com",
    pass: "elrvbtfvypzvosdr",
  },
});

const sendMail = async (options) => {
  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (error) {
    console.error("Mail send error:", error);
    return { success: false, error };
  }
};

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:3000/auth/verify-email/${token}`;

  const mailOptions = {
    from: "daiqijb105@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click on the link to verify your email: ${verificationLink}`,
  };

  return await sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
  const mailOptions = {
    from: "daiqijb105@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text: `Please click on the following link, or paste this into your browser to complete the process within one hour: \n\n${resetLink}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return await sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
