import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Must be a Gmail App Password, NOT your Gmail login password
  },
});

// Verify SMTP connection on startup (logs clearly if env vars are wrong)
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error.message);
    console.error(
      "   → Check SMTP_USER and SMTP_PASS in your .env file.\n" +
      "   → Gmail requires a 16-char App Password (not your login password).\n" +
      "   → Generate one at: https://myaccount.google.com/apppasswords\n" +
      "   → Make sure FRONTEND_URL is on its own line in .env (not same line as SMTP_PASS)."
    );
  } else {
    console.log("✅ SMTP connection verified — mailer is ready");
  }
});

export const sendPasswordResetEmail = async (to, name, resetUrl) => {
  try {
    await transporter.sendMail({
      from: `"Trackiva" <${process.env.SMTP_USER}>`,
      to,
      subject: "Reset your Trackiva password",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0">
          <h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 8px">Reset your password</h2>
          <p style="font-size:14px;color:#475569;margin:0 0 24px">
            Hi ${name}, click the button below to reset your password.
            This link expires in <strong>15 minutes</strong>.
          </p>
          <a
            href="${resetUrl}"
            style="display:inline-block;background:#2563eb;color:#ffffff;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none"
          >
            Reset Password
          </a>
          <p style="font-size:13px;color:#64748b;margin:20px 0 0">
            Or paste this link into your browser:<br/>
            <a href="${resetUrl}" style="color:#2563eb;word-break:break-all">${resetUrl}</a>
          </p>
          <p style="font-size:12px;color:#94a3b8;margin:24px 0 0">
            If you didn't request this, you can safely ignore this email. Your password will not change.
          </p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 16px">
          <p style="font-size:11px;color:#cbd5e1;margin:0">Trackiva · Job Application Tracker</p>
        </div>
      `,
    });
    console.log(`✅ Password reset email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send reset email to ${to}:`, error.message);
    // Re-throw so the caller knows it failed
    throw Object.assign(
      new Error("Failed to send reset email. Please try again later."),
      { statusCode: 500 }
    );
  }
};

export const sendReminderEmail = async (to, name, reminderTitle, jobTitle, company, scheduledAt) => {
  try {
    await transporter.sendMail({
      from: `"Trackiva" <${process.env.SMTP_USER}>`,
      to,
      subject: `Reminder: ${reminderTitle}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0">
          <h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 8px">⏰ ${reminderTitle}</h2>
          <p style="font-size:14px;color:#475569;margin:0 0 8px">Hi ${name}, this is your reminder for:</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-bottom:20px">
            <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#0f172a">${jobTitle}</p>
            <p style="margin:0;font-size:13px;color:#64748b">${company}</p>
          </div>
          <p style="font-size:12px;color:#94a3b8;margin:0">Scheduled for ${scheduledAt}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 16px">
          <p style="font-size:11px;color:#cbd5e1;margin:0">Trackiva · Job Application Tracker</p>
        </div>
      `,
    });
    console.log(`✅ Reminder email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send reminder email to ${to}:`, error.message);
    throw Object.assign(
      new Error("Failed to send reminder email."),
      { statusCode: 500 }
    );
  }
};