const invoiceTemplate = (invoice) =>{
    return 
    `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Modern Gym Bill Visual Mockup</title>
    <style>
        body {
            background-color: #f1f5f9;
            font-family: 'Segoe UI', Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
            margin: 0;
        }
        .invoice-card {
            background: #ffffff;
            width: 700px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            padding: 40px;
            position: relative;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        /* Visual Watermark Effect */
        .watermark-layer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 320px;
            height: 320px;
            opacity: 0.03; /* Kept very soft to make text easily readable */
            pointer-events: none;
            z-index: 1;
        }
        .content-layer {
            position: relative;
            z-index: 2;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #f8fafc;
            padding-bottom: 24px;
            margin-bottom: 24px;
        }
        .brand h1 {
            margin: 0;
            font-size: 24px;
            color: #0f172a;
            letter-spacing: 0.5px;
        }
        .brand p {
            margin: 4px 0 0 0;
            color: #64748b;
            font-size: 13px;
        }
        .invoice-meta {
            text-align: right;
        }
        .invoice-meta h2 {
            margin: 0;
            color: #ef4444;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: 1px;
        }
        .badge {
            display: inline-block;
            background: #fef3c7;
            color: #92400e;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 8px;
        }
        .grid-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            font-size: 13px;
        }
        .detail-lbl { color: #64748b; font-weight: 600; margin-bottom: 4px;}
        .detail-val { color: #1e293b; font-weight: 700; font-size: 14px;}
        
        .bill-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .bill-table th {
            text-align: left;
            padding: 12px;
            background: #0f172a;
            color: #ffffff;
            font-size: 12px;
            text-transform: uppercase;
        }
        .bill-table td {
            padding: 14px 12px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
            font-size: 14px;
        }
        .right { text-align: right; }
        .center { text-align: center; }
        
        .footer-summary {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 40px;
        }
        .payment-box {
            border: 1px dashed #cbd5e1;
            padding: 16px;
            border-radius: 8px;
            font-size: 13px;
            height: fit-content;
        }
        .payment-box h4 { margin: 0 0 10px 0; color: #334155; text-transform: uppercase;}
        .p-row { display: flex; justify-content: space-between; margin-bottom: 6px; color: #64748b;}
        .p-row span strong { color: #334155; }
        
        .totals-box table { width: 100%; border-collapse: collapse; }
        .totals-box td { padding: 6px 0; font-size: 14px; color: #64748b;}
        .grand-total { font-weight: 800; color: #0f172a; font-size: 16px; border-top: 1px solid #e2e8f0; padding-top: 8px !important;}
        .highlight-due { background: #fef2f2; color: #991b1b !important; font-weight: 700; padding: 8px !important; border-radius: 4px; display: flex; justify-content: space-between; margin-top: 8px;}
    </style>
</head>
<body>

    <div class="invoice-card">
        <!-- Dumbbell Gym Logo Watermark Centered in Background -->
        <svg class="watermark-layer" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 45 h15 v10 h-15 z M85 45 h15 v10 h-15 z M25 48 h50 v4 h-50 z M35 35 h8 v30 h-8 z M45 30 h8 v40 h-8 z M65 35 h8 v30 h-8 z M57 30 h8 v40 h-8 z" fill="#000000"/>
        </svg>

        <!-- ForeGround Content -->
        <div class="content-layer">
            <div class="header">
                <div class="brand">
                    <h1>IRON PULSE HUB</h1>
                    <p>GYM NODE ID: #G-99281</p>
                </div>
                <div class="invoice-meta">
                    <h2>BILL STATEMENT</h2>
                    <div>No: <strong>#INV-2026-0489</strong></div>
                    <span class="badge">Partial Payment</span>
                </div>
            </div>

            <div class="grid-details">
                <div>
                    <div class="detail-lbl">MEMBER DETAIL</div>
                    <div class="detail-val">ID: MEMBER-88310</div>
                </div>
                <div>
                    <div class="detail-lbl">BILLING CATEGORY</div>
                    <div class="detail-val">Membership & Products</div>
                </div>
            </div>

            <table class="bill-table">
                <thead>
                    <tr>
                        <th>Item Description</th>
                        <th class="center">Qty</th>
                        <th class="right">Unit Price</th>
                        <th class="right">Final Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Premium Annual Plan</strong><br><small style="color:#94a3b8">ID: MS-PREM-12M</small></td>
                        <td class="center">1</td>
                        <td class="right">$1200.00</td>
                        <td class="right">$1200.00</td>
                    </tr>
                    <tr>
                        <td><strong>Whey Protein Isolate (2kg)</strong><br><small style="color:#94a3b8">ID: PRD-WPI-CHO</small></td>
                        <td class="center">2</td>
                        <td class="right">$75.00</td>
                        <td class="right">$150.00</td>
                    </tr>
                </tbody>
            </table>

            <div class="footer-summary">
                <div class="payment-box">
                    <h4>Payment Verification</h4>
                    <div class="p-row">Method: <span><strong>Credit Card</strong></span></div>
                    <div class="p-row">Reference: <span><strong style="font-family: monospace;">TXN-994827104X</strong></span></div>
                    <div class="p-row">Due Date: <span><strong>July 20, 2026</strong></span></div>
                    <div class="p-row">Handled By: <span><strong>Staff_AlexM</strong></span></div>
                </div>
                <div class="totals-box">
                    <table>
                        <tr><td>Subtotal:</td><td class="right">$1350.00</td></tr>
                        <tr><td>Discount:</td><td class="right" style="color:#ef4444;">-$100.00</td></tr>
                        <tr><td>Tax Amount:</td><td class="right">$62.50</td></tr>
                        <tr class="grand-total"><td>Final Amount:</td><td class="right" style="color:#0f172a; font-weight:800;">$1312.50</td></tr>
                        <tr><td>Paid Amount:</td><td class="right" style="color:#16a34a; font-weight:600;">$800.00</td></tr>
                    </table>
                    <div class="highlight-due">
                        <span>Remaining Due:</span>
                        <span>$512.50</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
    `
}

export default invoiceTemplate