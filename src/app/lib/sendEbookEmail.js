import { Resend } from "resend";
import { createAdminClient } from "./supabase.admin";

const resend = new Resend(process.env.RESEND_API_KEY);

const ebookFiles = {
    1: {
        name: "Beginner Bass Course Ebook",
        path: "beginner-bass-guide.pdf",
    },
    2: {
        name: "Intermediate Bass Course Ebook",
        path: "intermediate-bass-guide.pdf",
    },
    3: {
        name: "Advanced Bass Course Ebook",
        path: "advanced-bass-guide.pdf",
    },
};

export async function sendEbookEmail({ email, fullName, tierId, tierName }) {
    const ebook = ebookFiles[tierId];

    if (!ebook) {
        console.error("No ebook found for tier:", tierId);
        return;
    }

    const firstName = fullName?.split(" ")[0] || "there";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    try {
        // generate a signed URL that expires in 24 hours
        const adminSupabase = createAdminClient();
        const { data: signedUrlData, error: signedUrlError } = await adminSupabase
            .storage
            .from("ebooks")
            .createSignedUrl(ebook.path, 60 * 60 * 24); // 86400 seconds = 24 hours

        if (signedUrlError || !signedUrlData?.signedUrl) {
            console.error("Failed to generate signed URL:", signedUrlError);
            return;
        }

        const ebookUrl = signedUrlData.signedUrl;

        const { data, error } = await resend.emails.send({
            from: "Bassist Barry Music Academy <noreply@bassistbarry.com>",
            to: email,
            subject: `Your ${tierName} Ebook is Here! 🎸`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Your BBMA Ebook</title>
                </head>
                <body style="margin:0;padding:0;background-color:#EDE0CC;font-family:Arial,sans-serif;">
                    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

                        <!-- Header -->
                        <div style="background-color:#1B130D;border-radius:16px 16px 0 0;padding:40px;text-align:center;">
                            <p style="color:#D9A246;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px 0;font-family:monospace;">
                                Bassist Barry Music Academy
                            </p>
                            <h1 style="color:#EDE0CC;font-size:26px;margin:0;line-height:1.3;">
                                Your Ebook is Ready 🎸
                            </h1>
                            <div style="display:flex;align-items:center;margin-top:20px;">
                                <div style="flex:1;height:1px;background-color:rgba(140,106,63,0.3);"></div>
                                <div style="width:6px;height:6px;border-radius:50%;background-color:rgba(140,106,63,0.5);margin:0 12px;"></div>
                                <div style="width:6px;height:6px;border-radius:50%;background-color:rgba(140,106,63,0.5);margin:0 12px;"></div>
                                <div style="width:6px;height:6px;border-radius:50%;background-color:rgba(140,106,63,0.5);margin:0 12px;"></div>
                                <div style="flex:1;height:1px;background-color:rgba(140,106,63,0.3);"></div>
                            </div>
                        </div>

                        <!-- Body -->
                        <div style="background-color:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
                            <h2 style="color:#1B130D;font-size:20px;margin:0 0 16px 0;">
                                Hey ${firstName}! 👋
                            </h2>
                            <p style="color:#555;line-height:1.7;margin:0 0 16px 0;font-size:15px;">
                                Thank you for enrolling in the
                                <strong style="color:#1B130D;">${tierName} Course</strong>
                                at Bassist Barry Music Academy. Your payment has been
                                confirmed and your exclusive ebook is ready to download.
                            </p>

                            <!-- Ebook download card -->
                            <div style="background-color:#1B130D;border-radius:12px;padding:28px;margin:28px 0;text-align:center;">
                                <p style="color:#D9A246;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px 0;font-family:monospace;">
                                    Your Exclusive Ebook
                                </p>
                                <h3 style="color:#EDE0CC;font-size:17px;margin:0 0 6px 0;">
                                    ${ebook.name}
                                </h3>
                                <p style="color:rgba(237,224,204,0.5);font-size:12px;margin:0 0 24px 0;">
                                    ${tierName} tier · Digital PDF · Link expires in 24 hours
                                </p>
                                <a href="${ebookUrl}"
                                   style="background-color:#D9A246;color:#1B130D;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block;">
                                    Download Your Ebook →
                                </a>
                            </div>

                            <!-- Dashboard access -->
                            <div style="background-color:#f9f5ef;border:1px solid rgba(140,106,63,0.2);border-radius:12px;padding:20px;margin:20px 0;">
                                <p style="color:#1B130D;font-weight:bold;font-size:14px;margin:0 0 6px 0;">
                                    📺 Access Your Video Lessons
                                </p>
                                <p style="color:#777;font-size:13px;line-height:1.6;margin:0 0 12px 0;">
                                    Your dashboard is now unlocked with your ${tierName} video
                                    lessons. Log in anytime to continue learning.
                                </p>
                                <a href="${appUrl}/dashboard"
                                   style="color:#D9A246;font-size:13px;font-weight:bold;text-decoration:none;">
                                    Go to Dashboard →
                                </a>
                            </div>

                            <p style="color:#777;font-size:13px;line-height:1.7;margin:20px 0 8px 0;">
                                The download link expires in 24 hours. If you need it
                                again after that, just visit your dashboard or
                                <a href="${appUrl}/contact" style="color:#D9A246;text-decoration:none;">
                                    contact us
                                </a>
                                and we'll resend it.
                            </p>

                            <!-- Signature -->
                            <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(140,106,63,0.15);">
                                <p style="color:#555;font-size:14px;margin:0;line-height:1.6;">
                                    Keep practicing,<br/>
                                    <strong style="color:#1B130D;font-size:16px;">Barry</strong><br/>
                                    <span style="color:#8C6A3F;font-size:12px;">
                                        Founder · Bassist Barry Music Academy
                                    </span>
                                </p>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="text-align:center;margin-top:24px;">
                            <p style="color:#8C6A3F;font-size:11px;margin:0 0 6px 0;">
                                &copy; ${new Date().getFullYear()} Bassist Barry Music Academy.
                                All rights reserved.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
        } else {
            console.log("Ebook email sent successfully:", data?.id);
        }

    } catch (err) {
        console.error("Email send failed:", err);
    }
}