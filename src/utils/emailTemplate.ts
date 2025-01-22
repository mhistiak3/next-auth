/* eslint-disable @typescript-eslint/no-explicit-any */
export const emailVerificationTemplate = (type:any, code:any) => {
  const buttonText =
    type === "VERIFY"
      ? "Verify Email"
      : type === "RESET"
      ? "Reset Password"
      : "Button";
  const buttonUrl =
    type === "VERIFY"
      ? `${process.env.DOMAIN}/verify-email?token=${code}`
      : type === "RESET"
      ? `${process.env.DOMAIN}/reset-password?token=${code}`
      : "#";

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${
    type === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
  }</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
    }

    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }

    .button {
      display: inline-block;
      background-color: #4caf50;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      margin-top: 20px;
    }

    .button:hover {
      background-color: #45a049;
    }

    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #aaaaaa;
      background-color: #f1f1f1;
    }
  </style>
</head>

<body>
  <div class="email-container">
    <div class="header">
      ${type === "VERIFY" ? "Email Verification" : "Password Reset"}
    </div>
    <div class="content">
      <p>
        ${
          type === "VERIFY"
            ? "Thank you for signing up! Please verify your email address by clicking the button below."
            : "You requested to reset your password. Click the button below to proceed."
        }
      </p>
      <p>Your Link: <strong>${buttonUrl}</strong></p>
      <a href="${buttonUrl}" class="button">${buttonText}</a>
      <p>
        If you did not request this, please ignore this email.
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Example Company. All rights reserved.
    </div>
  </div>
</body>

</html>`;
};
