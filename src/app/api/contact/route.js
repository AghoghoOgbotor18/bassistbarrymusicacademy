import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// rate limit — max 3 contact messages per IP per 10 minutes
const contactRateLimit = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const window = 10 * 60 * 1000;
    const entry = contactRateLimit.get(ip) || { count: 0, start: now };
    if (now - entry.start > window) {
        contactRateLimit.set(ip, { count: 1, start: now });
        return false;
    }
    if (entry.count >= 3) return true;
    contactRateLimit.set(ip, { count: entry.count + 1, start: entry.start });
    return false;
}

export async function POST(request) {
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many messages. Please wait 10 minutes before trying again." },
                { status: 429 }
            );
        }

        const { name, email, subject, message } = await request.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"BBMA Contact Form" <${process.env.GMAIL_USER}>`,
            to: process.env.BARRY_EMAIL || process.env.GMAIL_USER,
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background-color:#EDE0CC;font-family:Arial,sans-serif;">
                    <div style="max-width:500px;margin:0 auto;padding:40px 20px;">
                        <div style="background-color:#1B130D;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
                            <p style="color:#D9A246;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px 0;font-family:monospace;">
                                BBMA Contact Form
                            </p>
                            <h1 style="color:#EDE0CC;font-size:20px;margin:0;">
                                New Message from Website
                            </h1>
                        </div>

                        <div style="background-color:#ffffff;padding:32px;border-radius:0 0 16px 16px;">
                            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                                <tr>
                                    <td style="color:#8C6A3F;font-size:12px;padding:10px 0;border-bottom:1px solid #EDE0CC;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">From</td>
                                    <td style="color:#1B130D;font-size:14px;padding:10px 0;border-bottom:1px solid #EDE0CC;text-align:right;font-weight:bold;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="color:#8C6A3F;font-size:12px;padding:10px 0;border-bottom:1px solid #EDE0CC;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Email</td>
                                    <td style="padding:10px 0;border-bottom:1px solid #EDE0CC;text-align:right;">
                                        <a href="mailto:${email}" style="color:#D9A246;font-size:14px;text-decoration:none;">${email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color:#8C6A3F;font-size:12px;padding:10px 0;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Subject</td>
                                    <td style="color:#1B130D;font-size:14px;padding:10px 0;text-align:right;">${subject}</td>
                                </tr>
                            </table>

                            <div style="background-color:#f9f5ef;border-left:4px solid #D9A246;border-radius:0 8px 8px 0;padding:16px;margin-bottom:24px;">
                                <p style="color:#8C6A3F;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px 0;font-weight:bold;">Message</p>
                                <p style="color:#1B130D;font-size:14px;line-height:1.7;margin:0;">${message.replace(/\n/g, "<br/>")}</p>
                            </div>

                            <div style="background-color:#1B130D;border-radius:8px;padding:12px 16px;text-align:center;">
                                <p style="color:rgba(237,224,204,0.6);font-size:12px;margin:0 0 8px 0;">Reply directly to this email to respond to ${name}</p>
                                <a href="mailto:${email}" style="background-color:#D9A246;color:#1B130D;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:13px;display:inline-block;">
                                    Reply to ${name} →
                                </a>
                            </div>
                        </div>

                        <p style="color:#8C6A3F;font-size:11px;text-align:center;margin-top:20px;">
                            Bassist Barry Music Academy · Contact Form
                        </p>
                    </div>
                </body>
                </html>
            `,
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Contact form error:", err.message);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}