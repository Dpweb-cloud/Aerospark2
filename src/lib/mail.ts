import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
const pass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  const senderEmail = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const senderPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!senderEmail || !senderPass) {
    console.log("==================================================");
    console.log(`[DEV MODE] VERIFICATION CODE FOR ${email}: [ ${code} ]`);
    console.log("==================================================");
    return { success: true, simulated: true };
  }

  const mailOptions = {
    from: `"AeroSpark Portal" <${senderEmail}>`,
    to: email,
    subject: "AeroSpark Portal - Verification Code",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #00a3ff; text-align: center; margin-bottom: 20px;">Verify Your Email</h2>
        <p style="color: #334155; font-size: 15px; line-height: 1.5;">Thank you for signing up for the AeroSpark Portal. Please enter the following 6-digit code on the verification screen to activate your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; background-color: #f1f5f9; padding: 12px 24px; border-radius: 8px; color: #0f172a; border: 1px solid #cbd5e1; display: inline-block;">
            ${code}
          </span>
        </div>
        <p style="color: #64748b; font-size: 13px; text-align: center; margin-top: 20px;">This code will expire in 15 minutes.</p>
        <div style="border-top: 1px solid #e2e8f0; margin-top: 25px; padding-top: 15px; text-align: center;">
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">AeroSpark Systems, Inc.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send verification email:", error);
    return { success: false, error: error.message };
  }
}
