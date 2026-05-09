import Job from "../modules/jobs/job.model.js";
import User from "../modules/auth/auth.model.js";
import { sendReminderEmail } from "./mailer.js";

const processReminders = async () => {
  try {
    const now = new Date();

    // Find jobs with at least one pending unsent reminder that has date+time set
    const jobs = await Job.find({
      reminders: {
        $elemMatch: {
          completed: false,
          emailSent: false,
          date: { $exists: true, $ne: "" },
          time: { $exists: true, $ne: "" },
        },
      },
    });

    for (const job of jobs) {
      let changed = false;

      for (const reminder of job.reminders) {
        if (reminder.completed || reminder.emailSent) continue;
        if (!reminder.date || !reminder.time) continue;

        const reminderTime = new Date(`${reminder.date}T${reminder.time}`);

        // Only send if due within the last 2 minutes (handles the 60s polling window)
        const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
        if (reminderTime > now || reminderTime < twoMinutesAgo) continue;

        try {
          const user = await User.findById(job.userId).select("email name");
          if (!user) continue;

          const scheduledAt = reminderTime.toLocaleString("en-US", {
            month: "short", day: "numeric", year: "numeric",
            hour: "2-digit", minute: "2-digit",
          });

          await sendReminderEmail(
            user.email,
            user.name,
            reminder.title,
            job.role,
            job.company,
            scheduledAt
          );

          reminder.emailSent = true;
          changed = true;
          console.log(`✅ Reminder sent: "${reminder.title}" → ${user.email}`);
        } catch (err) {
          console.error(`❌ Failed to send reminder "${reminder.title}":`, err.message);
        }
      }

      if (changed) await job.save();
    }
  } catch (err) {
    console.error("❌ Reminder scheduler error:", err.message);
  }
};

export const startReminderScheduler = () => {
  console.log("⏰ Reminder scheduler started (runs every 60s)");
  processReminders(); // run once immediately on startup
  setInterval(processReminders, 60 * 1000); // then every minute
};