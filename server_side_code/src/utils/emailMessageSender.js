const ApiError = require("../utils/ApiError.js");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASS_KEY,
  },
});

const sendOtpMail = async (name, email, generatedOTP) => {
  try {
    const mailOptions = {
      from: `"PersonalChat" <${process.env.EMAIL_ID}>`,
      to: email,
      subject: "Your OTP for PersonalChat",
      text: `Hi ${name},

Your One-Time Password (OTP) for verifying your account on PersonalChat is ${generatedOTP}.

Please do not share this OTP with anyone. It is valid for 5 minutes.

Thank you,  
The PersonalChat Team`,
    };
    const otpSend = await transporter.sendMail(mailOptions);
    if (!otpSend || !otpSend.accepted.length) {
      throw new ApiError(500, "Failed to send OTP");
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong while sending OTP");
  }
};

const sendWelcomeMessageMail = async (name, email) => {
  try {
    const mailOptions = {
      from: `"PersonalChat" <${process.env.EMAIL_ID}>`,
      to: email,
      subject: "Welcome to PersonalChat!",
      text: `Hi ${name},

Thank you for registering with PersonalChat. We're excited to have you join our community!

Start chatting with your friends, connect with new people, and enjoy secure, seamless messaging — all in one place.

If you have any questions or need support, feel free to reach out.

Best regards,  
The PersonalChat Team`,
    };

    const welcomemessageSend = await transporter.sendMail(mailOptions);
    if (!welcomemessageSend || !welcomemessageSend.accepted.length) {
      throw new ApiError(500, "Failed to send Message");
    }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while sending welcome message"
    );
  }
};

const sendContactJoinMail = async (
  requestedByUsername,
  requestedByUseremail,
  contactName,
  contactPhone
) => {
  try {
    const mailOptions = {
      from: `"PersonalChat" <${process.env.EMAIL_ID}>`,
      to: requestedByUseremail,
      subject: "Your contact just joined on PersonalChat",
      text: `Hi ${requestedByUsername},

Good news! A user you wanted to connect with has just joined PersonalChat.

👤 Name: ${contactName}
📱 Phone: ${contactPhone}

You can now start chatting with them securely on PersonalChat!

Simply log in and search for their number or name to begin the conversation.

If you need any help, feel free to contact our support team.

Best regards,  
The PersonalChat Team`,
    };

    const notificationSend = await transporter.sendMail(mailOptions);
    if (!notificationSend || !notificationSend.accepted.length) {
      throw new ApiError(500, "Failed to send Message");
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong while sending message");
  }
};

module.exports = { sendOtpMail, sendWelcomeMessageMail, sendContactJoinMail };
