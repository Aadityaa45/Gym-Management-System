import nodemailer from "nodemailer";

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendEmail({to, subject, html, text}) {
        return await this.transporter.sendMail({
            from: `"${process.env.APP_NAME || "Gym Management"}" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            text,
            html
        });
    }

    async sendOtpEmail(email, otp) {

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto;">
                <h2>OTP Verification</h2>
                <p>Your verification code is:</p>
                <h1 style="letter-spacing: 4px;">${otp}</h1>
                <p>This OTP will expire in 5 minutes.</p>
                <p>If you did not request this OTP, please ignore this email.</p>
            </div>
        `;

        return await this.sendEmail({
            to: email,
            subject: "OTP Verification",
            html
        });
    }

    // async sendWelcomeEmail(name, email, password) {
    //     const html = `
    //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto;">
    //             <h2>Welcome ${name} 🎉</h2>
    //             <p>Your account has been successfully created.</p>
    //             <p>Here are your login credentials:</p>
    //             <p><strong>Email:</strong> ${email}</p>
    //             <p><strong>Password:</strong> ${password}</p>
    //             <p>Thank you for joining us.</p>
    //         </div>
    //     `;
    //     return await this.sendEmail({
    //         to: email,
    //         subject: "Welcome",
    //         html
    //     });
    // }
    async sendWelcomeEmail(name, email, password, gymName = "Your Gym") {

    const html = `
    
    <div style="
        margin:0;
        padding:40px;
        background:#f4f7fb;
        font-family:'Segoe UI',Arial,sans-serif;
    ">

        <div style="
            max-width:650px;
            margin:auto;
            background:white;
            border-radius:18px;
            overflow:hidden;
            border:1px solid #e5e7eb;
            box-shadow:0 10px 30px rgba(0,0,0,0.08);
        ">

            <!-- Header -->

            <div style="
                background:linear-gradient(135deg,#071321,#0d223f);
                padding:35px;
                text-align:center;
            ">

                <div style="
                    width:80px;
                    height:80px;
                    margin:auto;
                    background:rgba(255,255,255,0.1);
                    border-radius:50%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    font-size:35px;
                ">
                    🏋️
                </div>

                <h1 style="
                    color:white;
                    margin-top:20px;
                    margin-bottom:10px;
                ">
                    Welcome to ${gymName}
                </h1>

                <p style="
                    color:#cbd5e1;
                    margin:0;
                ">
                    Your account has been successfully created
                </p>

            </div>

            <!-- Content -->

            <div style="padding:40px;">

                <h2 style="
                    color:#111827;
                    margin-top:0;
                ">
                    Hello ${name} 👋
                </h2>

                <p style="
                    color:#4b5563;
                    line-height:1.8;
                    font-size:15px;
                ">
                    Welcome to <strong>${gymName}</strong>! Your membership account has been successfully created.
                    Below are your login credentials to access your member portal.
                </p>

                <!-- Credentials Card -->

                <div style="
                    margin-top:30px;
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:25px;
                ">

                    <h3 style="
                        margin-top:0;
                        color:#111827;
                    ">
                        Login Credentials
                    </h3>

                    <table style="
                        width:100%;
                        border-collapse:collapse;
                    ">

                        <tr>
                            <td style="
                                padding:12px;
                                background:#f1f5f9;
                                border:1px solid #e5e7eb;
                                font-weight:600;
                            ">
                                Email
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                            ">
                                ${email}
                            </td>
                        </tr>

                        <tr>
                            <td style="
                                padding:12px;
                                background:#f1f5f9;
                                border:1px solid #e5e7eb;
                                font-weight:600;
                            ">
                                Password
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                font-family:monospace;
                                font-size:16px;
                                color:#7c3aed;
                                font-weight:700;
                            ">
                                ${password}
                            </td>
                        </tr>

                    </table>

                </div>

                <!-- Security Note -->

                <div style="
                    margin-top:30px;
                    background:#eff6ff;
                    border-left:5px solid #2563eb;
                    padding:18px;
                    border-radius:8px;
                ">

                    <strong style="color:#1e40af;">
                        🔒 Security Recommendation
                    </strong>

                    <p style="
                        margin-top:8px;
                        color:#1e3a8a;
                        line-height:1.7;
                    ">
                        Please change your password after your first login
                        to keep your account secure.
                    </p>

                </div>

                <!-- Features -->

                <div style="
                    margin-top:35px;
                ">

                    <h3 style="color:#111827;">
                        You can now:
                    </h3>

                    <ul style="
                        color:#4b5563;
                        line-height:2;
                    ">
                        <li>View Membership Details</li>
                        <li>Check Payment History</li>
                        <li>Access Invoices & Receipts</li>
                        <li>Manage Personal Information</li>
                    </ul>

                </div>

                <!-- Footer -->

                <hr style="
                    margin:35px 0;
                    border:none;
                    border-top:1px solid #e5e7eb;
                ">

                <p style="
                    color:#6b7280;
                    line-height:1.8;
                ">
                    Thank you for choosing
                    <strong>${gymName}</strong>.
                    We wish you a successful fitness journey.
                </p>

                <p style="
                    margin-top:30px;
                    color:#9ca3af;
                    font-size:13px;
                    text-align:center;
                ">
                    © ${new Date().getFullYear()} ${gymName}
                    <br>
                    This is an automated email. Please do not reply.
                </p>

            </div>

        </div>

    </div>
    `;

    await this.sendEmail({
        to: email,
        subject: `🎉 Welcome to ${gymName} | Your Login Credentials`,
        html
    });
}

    async sendPasswordResetEmail(email, resetLink) {

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto;">
                <h2>Password Reset</h2>
                <p>Click the button below to reset your password.</p>
                <a
                    href="${resetLink}"
                    style="
                        display:inline-block;
                        padding:12px 20px;
                        background:#000;
                        color:#fff;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Reset Password
                </a>
                <p style="margin-top:20px;">
                    If you did not request this, please ignore this email.
                </p>
            </div>
        `;

        return await this.sendEmail({
            to: email,
            subject: "Password Reset",
            html
        });
    }

    async sendMembershipExpiryEmail({
        email,
        memberName,
        expiryDate
    }) {

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto;">
                <h2>Membership Expiry Reminder</h2>

                <p>Hello ${memberName},</p>

                <p>
                    Your membership will expire on
                    <strong>${expiryDate}</strong>.
                </p>

                <p>
                    Please renew your membership to continue enjoying our services.
                </p>
            </div>
        `;

        return await this.sendEmail({
            to: email,
            subject: "Membership Expiry Reminder",
            html
        });
    }

    async sendInvoiceEmail({
        email,
        memberName,
        invoiceNumber,
        amount
    }) {

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto;">
                <h2>Invoice Generated</h2>

                <p>Hello ${memberName},</p>

                <p>
                    Your invoice has been generated successfully.
                </p>

                <table
                    border="1"
                    cellpadding="10"
                    cellspacing="0"
                    style="border-collapse: collapse;"
                >
                    <tr>
                        <td>Invoice Number</td>
                        <td>${invoiceNumber}</td>
                    </tr>

                    <tr>
                        <td>Amount</td>
                        <td>₹${amount}</td>
                    </tr>
                </table>
            </div>
        `;

        return await this.sendEmail({
            to: email,
            subject: `Invoice ${invoiceNumber}`,
            html
        });
    }
}

const emailService = new EmailService();

export default emailService