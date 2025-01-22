/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { emailVerificationTemplate } from "./emailTemplate";
const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour,
      });
    }
    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour,
      });
    }
    await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: "'iA Coder'  <estiyak1122@gmail.com>",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailVerificationTemplate(emailType, hashToken),
    };
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.log(error.message);
  }
};
export default sendEmail;
