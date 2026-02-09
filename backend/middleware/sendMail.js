import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendForgetPasswordMail = async (email, subject, token, endpoint) => {
    try {
        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "AI Interview",
                    email: process.env.BREVO_SENDER_EMAIL,
                },
                to: [
                    {
                        email: email,
                    },
                ],
                subject: subject || "Not mention",
                htmlContent: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6;">
                        <div style="max-width: 500px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #f1f5f9; margin: 0 0 10px 0; font-size: 28px;">AI Interview</h1>
                                <div style="height: 3px; width: 50px; background: #6366f1; margin: 0 auto;"></div>
                            </div>
                            
                            <h2 style="color: #f1f5f9; text-align: center; font-size: 22px; margin: 20px 0;">Password Reset Request</h2>
                            
                            <p style="color: #cbd5e1; text-align: center; font-size: 14px; margin: 20px 0; line-height: 1.6;">
                                We received a request to reset your password. Click the button below to create a new password.
                            </p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${endpoint}/${token}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; transition: transform 0.2s;">
                                    Reset Password
                                </a>
                            </div>
                            
                            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0 0 10px 0;">Or copy this link:</p>
                                <p style="color: #6366f1; font-size: 11px; word-break: break-all; text-align: center; margin: 0; font-family: 'Courier New', monospace;">
                                    ${endpoint}/${token}
                                </p>
                            </div>
                            
                            <p style="color: #94a3b8; font-size: 13px; text-align: center; margin: 20px 0;">
                                ⏱️ This link will expire in <strong>10 minutes</strong>
                            </p>
                            
                            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 30px;">
                                <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                                    If you didn't request this, please ignore this email.
                                </p>
                                <p style="color: #475569; font-size: 11px; text-align: center; margin: 10px 0 0 0;">
                                    © 2024 AI Interview • Secure Login • MERN AI Project
                                </p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );
        // console.log("OTP is: ", otp);
        console.log("✅ Email sent successfully to:", email);
        return true;
    } catch (error) {
        console.error(
            "❌ Brevo API Email Error:",
            error.response?.data || error.message
        );
        return false;
    }
};

export const sendMail = async (email, subject, otp) => {
    try {
        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "AI Interview",
                    email: process.env.BREVO_SENDER_EMAIL,
                },
                to: [
                    {
                        email: email,
                    },
                ],
                subject: subject,
                htmlContent: `
                    <div style="max-width:400px;margin:auto;background:#0f172a;padding:30px;border-radius:20px;color:#f1f5f9;text-align:center">
                        <h2>Verification Code</h2>
                        <p>Use the OTP below to login</p>
                        <h1 style="letter-spacing:8px;color:#6366f1">${otp}</h1>
                        <p style="font-size:12px;color:#94a3b8">Secure Login • MERN AI Project</p>
                    </div>
                `,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("OTP is: ", otp);
        console.log("✅ Email sent successfully to:", email);
    } catch (error) {
        console.error(
            "❌ Brevo API Email Error:",
            error.response?.data || error.message
        );
        throw error;
    }
};

