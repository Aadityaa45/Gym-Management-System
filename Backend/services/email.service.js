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

    async sendOtpEmail(email, otp, gymName = "Fitness Beast Gym & MMA") {

    const html = `
        <div style="
            margin:0;
            padding:40px 20px;
            background:#f1f5f9;
            font-family:'Segoe UI',Arial,sans-serif;
        ">

            <div style="
                max-width:620px;
                margin:0 auto;
                background:#ffffff;
                border:1px solid #e2e8f0;
                border-radius:18px;
                overflow:hidden;
                box-shadow:0 12px 35px rgba(15,23,42,0.08);
            ">

                <!-- Header -->

                <div style="
                    background:linear-gradient(135deg,#071321 0%,#0B1220 55%,#111827 100%);
                    padding:34px 30px;
                    text-align:center;
                ">

                    <div style="
                        width:58px;
                        height:58px;
                        margin:0 auto 18px;
                        border-radius:16px;
                        background:rgba(255,255,255,0.08);
                        border:1px solid rgba(255,255,255,0.12);
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:25px;
                    ">
                        🔐
                    </div>

                    <h1 style="
                        margin:0;
                        color:#ffffff;
                        font-size:24px;
                        font-weight:700;
                        letter-spacing:-0.3px;
                    ">
                        ${gymName}
                    </h1>

                    <p style="
                        margin:8px 0 0;
                        color:#94a3b8;
                        font-size:13px;
                    ">
                        Secure verification
                    </p>

                </div>


                <!-- Content -->

                <div style="
                    padding:38px 40px;
                ">

                    <h2 style="
                        margin:0;
                        color:#0f172a;
                        font-size:21px;
                        font-weight:600;
                    ">
                        Verify your email address
                    </h2>

                    <p style="
                        margin:12px 0 0;
                        color:#64748b;
                        font-size:14px;
                        line-height:1.7;
                    ">
                        We received a request to verify this email address
                        for your membership registration. Use the verification
                        code below to continue.
                    </p>


                    <!-- OTP Card -->

                    <div style="
                        margin:30px 0;
                        padding:26px;
                        background:#f8fafc;
                        border:1px solid #e2e8f0;
                        border-radius:14px;
                        text-align:center;
                    ">

                        <p style="
                            margin:0 0 12px;
                            color:#64748b;
                            font-size:11px;
                            font-weight:600;
                            letter-spacing:1.5px;
                            text-transform:uppercase;
                        ">
                            Verification Code
                        </p>

                        <div style="
                            display:inline-block;
                            padding:14px 24px;
                            background:#0B1220;
                            border-radius:10px;
                            color:#ffffff;
                            font-size:30px;
                            font-weight:700;
                            letter-spacing:8px;
                            font-family:'Courier New',monospace;
                        ">
                            ${otp}
                        </div>

                        <p style="
                            margin:14px 0 0;
                            color:#94a3b8;
                            font-size:11px;
                        ">
                            This code expires in <strong style="color:#475569;">
                                5 minutes
                            </strong>.
                        </p>

                    </div>


                    <!-- Security Notice -->

                    <div style="
                        padding:16px 18px;
                        background:#fffbeb;
                        border:1px solid #fde68a;
                        border-radius:10px;
                    ">

                        <p style="
                            margin:0;
                            color:#92400e;
                            font-size:12px;
                            line-height:1.7;
                        ">
                            <strong>Security notice:</strong>
                            Never share this verification code with anyone.
                            Our team will never ask you for your OTP.
                        </p>

                    </div>


                    <p style="
                        margin:28px 0 0;
                        color:#94a3b8;
                        font-size:11px;
                        line-height:1.7;
                        text-align:center;
                    ">
                        If you did not request this verification code,
                        you can safely ignore this email.
                    </p>

                </div>


                <!-- Footer -->

                <div style="
                    border-top:1px solid #e2e8f0;
                    padding:20px 30px;
                    text-align:center;
                    background:#f8fafc;
                ">

                    <p style="
                        margin:0;
                        color:#94a3b8;
                        font-size:10px;
                        line-height:1.6;
                    ">
                        This is an automated message from ${gymName}.
                        <br>
                        Please do not reply to this email.
                    </p>

                    <p style="
                        margin:8px 0 0;
                        color:#cbd5e1;
                        font-size:10px;
                    ">
                        © ${new Date().getFullYear()} ${gymName}
                    </p>

                </div>

            </div>

        </div>
    `;

    return await this.sendEmail({
        to: email,
        subject: `${gymName} | Email Verification Code`,
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
    
    async sendWelcomeEmail(
    name,
    email,
    gymName = "Fitness Beast Gym & MMA",
    membership = {},
    fee = {}
) {

    // --------------------------------------------------
    // FORMATTERS
    // --------------------------------------------------

    const formatDate = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    const formatCurrency = (amount) => {

        return `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    };


    // --------------------------------------------------
    // MEMBERSHIP DATA
    // --------------------------------------------------

    const planName =
        membership?.plan?.name ||
        membership?.planName ||
        "Membership Plan";

    const startDate =
        membership?.planStartDate;

    const endDate =
        membership?.planEndDate;

    const duration =
        membership?.plan?.durationInDays ||
        membership?.durationInDays ||
        null;


    // --------------------------------------------------
    // PAYMENT DATA
    // --------------------------------------------------

    const totalAmount =
        Number(fee?.total || 0);

    const paidAmount =
        Number(fee?.paid || 0);

    const remainingAmount =
        Number(
            fee?.remaining ??
            Math.max(totalAmount - paidAmount, 0)
        );

    const discountAmount =
        Number(fee?.discount || 0);


    const paymentStatus =
        remainingAmount <= 0
            ? "Paid in Full"
            : "Payment Pending";


    // --------------------------------------------------
    // PAYMENT STATUS COLORS
    // --------------------------------------------------

    const paymentStatusColor =
        remainingAmount <= 0
            ? "#16a34a"
            : "#dc2626";

    const paymentStatusBackground =
        remainingAmount <= 0
            ? "#f0fdf4"
            : "#fef2f2";


    // --------------------------------------------------
    // HTML EMAIL
    // --------------------------------------------------

    const html = `

    <div style="
        margin:0;
        padding:40px 20px;
        background:#0a0a0a;
        font-family:Arial,Helvetica,sans-serif;
        color:#111827;
    ">

        <div style="
            max-width:680px;
            margin:0 auto;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            border:1px solid #e5e7eb;
        ">


            <!-- ========================================= -->
            <!-- HEADER -->
            <!-- ========================================= -->

            <div style="
                background:#111111;
                padding:35px 30px;
                text-align:center;
                border-bottom:3px solid #ef1b2d;
            ">

                <div style="
                    width:64px;
                    height:64px;
                    margin:0 auto 18px;
                    border-radius:16px;
                    background:#ef1b2d;
                    color:#ffffff;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:28px;
                    font-weight:bold;
                ">
                    FB
                </div>


                <h1 style="
                    margin:0;
                    color:#ffffff;
                    font-size:24px;
                    font-weight:700;
                ">
                    Welcome to ${gymName}
                </h1>


                <p style="
                    margin:10px 0 0;
                    color:#a1a1aa;
                    font-size:14px;
                ">
                    Membership registration confirmed
                </p>

            </div>



            <!-- ========================================= -->
            <!-- MAIN CONTENT -->
            <!-- ========================================= -->

            <div style="
                padding:35px 30px;
            ">


                <h2 style="
                    margin:0;
                    color:#111111;
                    font-size:22px;
                ">
                    Hello ${name} 👋
                </h2>


                <p style="
                    margin:12px 0 0;
                    color:#52525b;
                    font-size:14px;
                    line-height:1.7;
                ">
                    Your membership with
                    <strong>${gymName}</strong>
                    has been successfully registered.
                    Here are your membership and payment details
                    for your records.
                </p>



                <!-- ========================================= -->
                <!-- MEMBERSHIP CARD -->
                <!-- ========================================= -->

                <div style="
                    margin-top:28px;
                    border:1px solid #e5e7eb;
                    border-radius:14px;
                    overflow:hidden;
                ">

                    <div style="
                        background:#111111;
                        padding:16px 20px;
                    ">

                        <p style="
                            margin:0;
                            color:#a1a1aa;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1.5px;
                        ">
                            Membership Details
                        </p>

                    </div>


                    <div style="
                        padding:20px;
                    ">


                        <!-- PLAN -->

                        <table style="
                            width:100%;
                            border-collapse:collapse;
                        ">

                            <tr>

                                <td style="
                                    padding:9px 0;
                                    color:#71717a;
                                    font-size:13px;
                                ">
                                    Membership Plan
                                </td>

                                <td style="
                                    padding:9px 0;
                                    color:#111111;
                                    font-size:14px;
                                    font-weight:700;
                                    text-align:right;
                                ">
                                    ${planName}
                                </td>

                            </tr>


                            ${
                                duration
                                    ? `
                            <tr>

                                <td style="
                                    padding:9px 0;
                                    color:#71717a;
                                    font-size:13px;
                                ">
                                    Duration
                                </td>

                                <td style="
                                    padding:9px 0;
                                    color:#111111;
                                    font-size:14px;
                                    font-weight:600;
                                    text-align:right;
                                ">
                                    ${duration} Days
                                </td>

                            </tr>
                            `
                                    : ""
                            }


                            <tr>

                                <td style="
                                    padding:9px 0;
                                    color:#71717a;
                                    font-size:13px;
                                ">
                                    Joining Date
                                </td>

                                <td style="
                                    padding:9px 0;
                                    color:#111111;
                                    font-size:14px;
                                    font-weight:600;
                                    text-align:right;
                                ">
                                    ${formatDate(startDate)}
                                </td>

                            </tr>


                            <tr>

                                <td style="
                                    padding:9px 0;
                                    color:#71717a;
                                    font-size:13px;
                                ">
                                    Membership Ends
                                </td>

                                <td style="
                                    padding:9px 0;
                                    color:#111111;
                                    font-size:14px;
                                    font-weight:700;
                                    text-align:right;
                                ">
                                    ${formatDate(endDate)}
                                </td>

                            </tr>

                        </table>

                    </div>

                </div>



                <!-- ========================================= -->
                <!-- PAYMENT SUMMARY -->
                <!-- ========================================= -->

                <div style="
                    margin-top:18px;
                    border:1px solid #e5e7eb;
                    border-radius:14px;
                    overflow:hidden;
                ">

                    <div style="
                        background:#fafafa;
                        padding:16px 20px;
                        border-bottom:1px solid #e5e7eb;
                    ">

                        <p style="
                            margin:0;
                            color:#71717a;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1.5px;
                        ">
                            Payment Summary
                        </p>

                    </div>


                    <div style="
                        padding:20px;
                    ">

                        <table style="
                            width:100%;
                            border-collapse:collapse;
                        ">


                            <!-- TOTAL -->

                            <tr>

                                <td style="
                                    padding:8px 0;
                                    color:#71717a;
                                    font-size:13px;
                                ">
                                    Membership Fee
                                </td>

                                <td style="
                                    padding:8px 0;
                                    text-align:right;
                                    color:#111111;
                                    font-weight:600;
                                ">
                                    ${formatCurrency(totalAmount)}
                                </td>

                            </tr>


                            <!-- DISCOUNT -->

                            ${
                                discountAmount > 0
                                    ? `
                            <tr>

                                <td style="
                                    padding:8px 0;
                                    color:#16a34a;
                                    font-size:13px;
                                ">
                                    Discount
                                </td>

                                <td style="
                                    padding:8px 0;
                                    text-align:right;
                                    color:#16a34a;
                                    font-weight:600;
                                ">
                                    - ${formatCurrency(discountAmount)}
                                </td>

                            </tr>
                            `
                                    : ""
                            }


                            <!-- PAID -->

                            <tr>

                                <td style="
                                    padding:8px 0;
                                    color:#71717a;
                                    font-size:13px;
                                ">
                                    Amount Paid
                                </td>

                                <td style="
                                    padding:8px 0;
                                    text-align:right;
                                    color:#111111;
                                    font-weight:600;
                                ">
                                    ${formatCurrency(paidAmount)}
                                </td>

                            </tr>


                            <!-- REMAINING -->

                            <tr>

                                <td style="
                                    padding:12px 0 5px;
                                    border-top:1px solid #e5e7eb;
                                    color:#71717a;
                                    font-size:13px;
                                ">
                                    Amount Remaining
                                </td>

                                <td style="
                                    padding:12px 0 5px;
                                    border-top:1px solid #e5e7eb;
                                    text-align:right;
                                    color:${remainingAmount > 0 ? "#dc2626" : "#16a34a"};
                                    font-size:15px;
                                    font-weight:700;
                                ">
                                    ${formatCurrency(remainingAmount)}
                                </td>

                            </tr>

                        </table>


                        <!-- PAYMENT STATUS -->

                        <div style="
                            margin-top:15px;
                            padding:12px 14px;
                            background:${paymentStatusBackground};
                            border-radius:9px;
                            border:1px solid ${paymentStatusColor}30;
                        ">

                            <span style="
                                color:${paymentStatusColor};
                                font-size:12px;
                                font-weight:700;
                            ">
                                ● ${paymentStatus}
                            </span>

                        </div>

                    </div>

                </div>



                <!-- ========================================= -->
                <!-- IMPORTANT NOTE -->
                <!-- ========================================= -->

                ${
                    remainingAmount > 0
                        ? `
                <div style="
                    margin-top:22px;
                    padding:16px;
                    background:#fff7ed;
                    border-left:4px solid #f97316;
                    border-radius:8px;
                ">

                    <p style="
                        margin:0;
                        color:#9a3412;
                        font-size:13px;
                        line-height:1.6;
                    ">
                        <strong>Payment Reminder:</strong>
                        An outstanding amount of
                        ${formatCurrency(remainingAmount)}
                        remains against your membership.
                        Please contact the gym reception for payment assistance.
                    </p>

                </div>
                `
                        : `
                <div style="
                    margin-top:22px;
                    padding:16px;
                    background:#f0fdf4;
                    border-left:4px solid #16a34a;
                    border-radius:8px;
                ">

                    <p style="
                        margin:0;
                        color:#166534;
                        font-size:13px;
                        line-height:1.6;
                    ">
                        <strong>Payment Complete:</strong>
                        Your membership payment has been received in full.
                    </p>

                </div>
                `
                }



                <!-- ========================================= -->
                <!-- CLOSING -->
                <!-- ========================================= -->

                <p style="
                    margin:28px 0 0;
                    color:#52525b;
                    font-size:14px;
                    line-height:1.7;
                ">
                    Thank you for choosing
                    <strong>${gymName}</strong>.
                    We look forward to supporting you throughout
                    your fitness journey.
                </p>


            </div>



            <!-- ========================================= -->
            <!-- FOOTER -->
            <!-- ========================================= -->

            <div style="
                padding:22px 30px;
                background:#fafafa;
                border-top:1px solid #e5e7eb;
                text-align:center;
            ">

                <p style="
                    margin:0;
                    color:#71717a;
                    font-size:12px;
                    line-height:1.6;
                ">
                    This is an automated membership confirmation email.
                </p>


                <p style="
                    margin:8px 0 0;
                    color:#a1a1aa;
                    font-size:11px;
                ">
                    © ${new Date().getFullYear()} ${gymName}
                </p>

            </div>

        </div>

    </div>

    `;


    // --------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------

    await this.sendEmail({

        to: email,

        subject:
            `Membership Confirmation | ${gymName}`,

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