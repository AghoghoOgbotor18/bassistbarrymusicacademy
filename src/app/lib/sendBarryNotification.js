import nodemailer from "nodemailer";

export async function sendBarryNotification({ studentName, studentEmail, tierName, enrolledAt }) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"BBMA Notifications" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // sends to Barry's own Gmail
            subject: `🎸 New ${tierName} Enrollment — Action Required`,
            html: `
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background-color:#1B130D;font-family:Arial,sans-serif;">
                    <div style="max-width:500px;margin:0 auto;padding:40px 20px;">
                        <div style="background-color:#2A1F15;border-radius:16px;padding:32px;border:1px solid rgba(140,106,63,0.3);">

                            <p style="color:#D9A246;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;font-family:monospace;">
                                BBMA — New Enrollment Alert
                            </p>

                            <h1 style="color:#EDE0CC;font-size:22px;margin:0 0 8px 0;">
                                New ${tierName} Student 🎸
                            </h1>

                            ${tierName === "Advanced" ? `
                            <div style="background-color:#D9A246;border-radius:8px;padding:12px 16px;margin:16px 0;">
                                <p style="color:#1B130D;font-weight:bold;font-size:14px;margin:0;">
                                    ⚡ This student needs a one-on-one session scheduled!
                                </p>
                            </div>
                            ` : ""}

                            <div style="background-color:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin:20px 0;">
                                <table style="width:100%;border-collapse:collapse;">
                                    <tr>
                                        <td style="color:rgba(237,224,204,0.5);font-size:12px;padding:8px 0;border-bottom:1px solid rgba(140,106,63,0.15);">Student Name</td>
                                        <td style="color:#EDE0CC;font-size:14px;font-weight:bold;padding:8px 0;border-bottom:1px solid rgba(140,106,63,0.15);text-align:right;">${studentName || "Not provided"}</td>
                                    </tr>
                                    <tr>
                                        <td style="color:rgba(237,224,204,0.5);font-size:12px;padding:8px 0;border-bottom:1px solid rgba(140,106,63,0.15);">Student Email</td>
                                        <td style="padding:8px 0;border-bottom:1px solid rgba(140,106,63,0.15);text-align:right;">
                                            <a href="mailto:${studentEmail}" style="color:#D9A246;font-size:14px;font-weight:bold;text-decoration:none;">${studentEmail}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color:rgba(237,224,204,0.5);font-size:12px;padding:8px 0;border-bottom:1px solid rgba(140,106,63,0.15);">Course Tier</td>
                                        <td style="color:#EDE0CC;font-size:14px;font-weight:bold;padding:8px 0;border-bottom:1px solid rgba(140,106,63,0.15);text-align:right;">${tierName}</td>
                                    </tr>
                                    <tr>
                                        <td style="color:rgba(237,224,204,0.5);font-size:12px;padding:8px 0;">Enrolled On</td>
                                        <td style="color:#EDE0CC;font-size:14px;padding:8px 0;text-align:right;">${new Date(enrolledAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</td>
                                    </tr>
                                </table>
                            </div>

                            ${tierName === "Advanced" ? `
                            <div style="border:1px solid rgba(140,106,63,0.3);border-radius:12px;padding:16px;margin-top:16px;">
                                <p style="color:#D9A246;font-size:12px;font-weight:bold;margin:0 0 8px 0;">📅 Next Step</p>
                                <p style="color:rgba(237,224,204,0.7);font-size:13px;line-height:1.6;margin:0;">
                                    Reach out to <a href="mailto:${studentEmail}" style="color:#D9A246;">${studentEmail}</a> 
                                    to introduce yourself and agree on a date and time for the one-on-one session.
                                </p>
                            </div>
                            ` : `
                            <p style="color:rgba(237,224,204,0.5);font-size:13px;line-height:1.6;margin:16px 0 0 0;">
                                This student now has access to their ${tierName} dashboard content and has received their ebook by email.
                                No action needed from you.
                            </p>
                            `}
                        </div>

                        <p style="color:rgba(140,106,63,0.4);font-size:11px;text-align:center;margin-top:24px;">
                            BBMA Admin Notifications · Bassist Barry Music Academy
                        </p>
                    </div>
                </body>
                </html>
            `,
        });

        console.log("✅ Barry notification sent for:", tierName, studentEmail);
    } catch (err) {
        console.error("Barry notification failed:", err.message);
    }
}