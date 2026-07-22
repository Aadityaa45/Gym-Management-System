// const invoiceTemplate = (invoice) =>{
//     return 
//     `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Modern Gym Bill Visual Mockup</title>
//     <script>
// window.onload = () => {
//     window.print();
// };

// window.onafterprint = () => {
//     window.close();
// };
// </script>
//     <style>
//         body {
//             background-color: #f1f5f9;
//             font-family: 'Segoe UI', Arial, sans-serif;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             padding: 40px 20px;
//             margin: 0;
//         }
//         .invoice-card {
//             background: #ffffff;
//             width: 700px;
//             border-radius: 16px;
//             box-shadow: 0 10px 25px rgba(0,0,0,0.05);
//             padding: 40px;
//             position: relative;
//             overflow: hidden;
//             border: 1px solid #e2e8f0;
//         }
//         /* Visual Watermark Effect */
//         .watermark-layer {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             width: 320px;
//             height: 320px;
//             opacity: 0.03; /* Kept very soft to make text easily readable */
//             pointer-events: none;
//             z-index: 1;
//         }
//         .content-layer {
//             position: relative;
//             z-index: 2;
//         }
//         .header {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             border-bottom: 2px solid #f8fafc;
//             padding-bottom: 24px;
//             margin-bottom: 24px;
//         }
//         .brand h1 {
//             margin: 0;
//             font-size: 24px;
//             color: #0f172a;
//             letter-spacing: 0.5px;
//         }
//         .brand p {
//             margin: 4px 0 0 0;
//             color: #64748b;
//             font-size: 13px;
//         }
//         .invoice-meta {
//             text-align: right;
//         }
//         .invoice-meta h2 {
//             margin: 0;
//             color: #ef4444;
//             font-size: 28px;
//             font-weight: 800;
//             letter-spacing: 1px;
//         }
//         .badge {
//             display: inline-block;
//             background: #fef3c7;
//             color: #92400e;
//             padding: 4px 12px;
//             border-radius: 20px;
//             font-size: 11px;
//             font-weight: 700;
//             text-transform: uppercase;
//             margin-top: 8px;
//         }
//         .grid-details {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 20px;
//             background: #f8fafc;
//             padding: 16px;
//             border-radius: 8px;
//             margin-bottom: 24px;
//             font-size: 13px;
//         }
//         .detail-lbl { color: #64748b; font-weight: 600; margin-bottom: 4px;}
//         .detail-val { color: #1e293b; font-weight: 700; font-size: 14px;}
        
//         .bill-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-bottom: 30px;
//         }
//         .bill-table th {
//             text-align: left;
//             padding: 12px;
//             background: #0f172a;
//             color: #ffffff;
//             font-size: 12px;
//             text-transform: uppercase;
//         }
//         .bill-table td {
//             padding: 14px 12px;
//             border-bottom: 1px solid #f1f5f9;
//             color: #334155;
//             font-size: 14px;
//         }
//         .right { text-align: right; }
//         .center { text-align: center; }
        
//         .footer-summary {
//             display: grid;
//             grid-template-columns: 1.2fr 0.8fr;
//             gap: 40px;
//         }
//         .payment-box {
//             border: 1px dashed #cbd5e1;
//             padding: 16px;
//             border-radius: 8px;
//             font-size: 13px;
//             height: fit-content;
//         }
//         .payment-box h4 { margin: 0 0 10px 0; color: #334155; text-transform: uppercase;}
//         .p-row { display: flex; justify-content: space-between; margin-bottom: 6px; color: #64748b;}
//         .p-row span strong { color: #334155; }
        
//         .totals-box table { width: 100%; border-collapse: collapse; }
//         .totals-box td { padding: 6px 0; font-size: 14px; color: #64748b;}
//         .grand-total { font-weight: 800; color: #0f172a; font-size: 16px; border-top: 1px solid #e2e8f0; padding-top: 8px !important;}
//         .highlight-due { background: #fef2f2; color: #991b1b !important; font-weight: 700; padding: 8px !important; border-radius: 4px; display: flex; justify-content: space-between; margin-top: 8px;}
//     </style>
// </head>
// <body>

//     <div class="invoice-card">
//         <!-- Dumbbell Gym Logo Watermark Centered in Background -->
//         <svg class="watermark-layer" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//             <path d="M10 45 h15 v10 h-15 z M85 45 h15 v10 h-15 z M25 48 h50 v4 h-50 z M35 35 h8 v30 h-8 z M45 30 h8 v40 h-8 z M65 35 h8 v30 h-8 z M57 30 h8 v40 h-8 z" fill="#000000"/>
//         </svg>

//         <!-- ForeGround Content -->
//         <div class="content-layer">
//             <div class="header">
//                 <div class="brand">
//                     <h1>IRON PULSE HUB</h1>
//                     <p>GYM NODE ID: #G-99281</p>
//                 </div>
//                 <div class="invoice-meta">
//                     <h2>BILL STATEMENT</h2>
//                     <div>No: <strong>#INV-2026-0489</strong></div>
//                     <span class="badge">Partial Payment</span>
//                 </div>
//             </div>

//             <div class="grid-details">
//                 <div>
//                     <div class="detail-lbl">MEMBER DETAIL</div>
//                     <div class="detail-val">ID: MEMBER-88310</div>
//                 </div>
//                 <div>
//                     <div class="detail-lbl">BILLING CATEGORY</div>
//                     <div class="detail-val">Membership & Products</div>
//                 </div>
//             </div>

//             <table class="bill-table">
//                 <thead>
//                     <tr>
//                         <th>Item Description</th>
//                         <th class="center">Qty</th>
//                         <th class="right">Unit Price</th>
//                         <th class="right">Final Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td><strong>Premium Annual Plan</strong><br><small style="color:#94a3b8">ID: MS-PREM-12M</small></td>
//                         <td class="center">1</td>
//                         <td class="right">$1200.00</td>
//                         <td class="right">$1200.00</td>
//                     </tr>
//                     <tr>
//                         <td><strong>Whey Protein Isolate (2kg)</strong><br><small style="color:#94a3b8">ID: PRD-WPI-CHO</small></td>
//                         <td class="center">2</td>
//                         <td class="right">$75.00</td>
//                         <td class="right">$150.00</td>
//                     </tr>
//                 </tbody>
//             </table>

//             <div class="footer-summary">
//                 <div class="payment-box">
//                     <h4>Payment Verification</h4>
//                     <div class="p-row">Method: <span><strong>Credit Card</strong></span></div>
//                     <div class="p-row">Reference: <span><strong style="font-family: monospace;">TXN-994827104X</strong></span></div>
//                     <div class="p-row">Due Date: <span><strong>July 20, 2026</strong></span></div>
//                     <div class="p-row">Handled By: <span><strong>Staff_AlexM</strong></span></div>
//                 </div>
//                 <div class="totals-box">
//                     <table>
//                         <tr><td>Subtotal:</td><td class="right">$1350.00</td></tr>
//                         <tr><td>Discount:</td><td class="right" style="color:#ef4444;">-$100.00</td></tr>
//                         <tr><td>Tax Amount:</td><td class="right">$62.50</td></tr>
//                         <tr class="grand-total"><td>Final Amount:</td><td class="right" style="color:#0f172a; font-weight:800;">$1312.50</td></tr>
//                         <tr><td>Paid Amount:</td><td class="right" style="color:#16a34a; font-weight:600;">$800.00</td></tr>
//                     </table>
//                     <div class="highlight-due">
//                         <span>Remaining Due:</span>
//                         <span>$512.50</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

// </body>
// </html>
//     `
// }

// export default invoiceTemplate
const invoiceTemplate = (invoice) => {

return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8"/>

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>
${invoice.billNumber}
</title>

<script>

window.onload = () => {
    window.print();
};

window.onafterprint = () => {
    window.close();
};

</script>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    background:#edf2f7;

    font-family:
    "Segoe UI",
    Arial,
    sans-serif;

    display:flex;

    justify-content:center;

    padding:40px;

}

.invoice-card{

    width:850px;

    background:white;

    border-radius:18px;

    overflow:hidden;

    position:relative;

    box-shadow:
    0 12px 40px rgba(0,0,0,.08);

    border:1px solid #dbe4ef;

}

/* Watermark */

.watermark{

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:340px;

    opacity:.03;

    z-index:1;

}

.content{

    position:relative;

    z-index:5;

}

/* Header */

.header{

    background:

    linear-gradient(
        135deg,
        #071321,
        #0c2340
    );

    color:white;

    padding:35px;

    display:flex;

    justify-content:space-between;

    align-items:flex-start;

}

.brand h1{

    font-size:30px;

    margin-bottom:8px;

    letter-spacing:.5px;

}

.brand p{

    color:#b8c7d9;

    font-size:14px;

}

.invoice-right{

    text-align:right;

}

.invoice-right h2{

    font-size:34px;

    margin-bottom:8px;

    color:#ffffff;

}

.bill-number{

    font-size:16px;

    color:#d7e3f3;

}

.status{

    display:inline-block;

    margin-top:14px;

    padding:6px 16px;

    border-radius:30px;

    background:#ffffff20;

    color:white;

    font-weight:600;

    text-transform:uppercase;

    font-size:12px;

}

/* Details */

.details{

    display:grid;

    grid-template-columns:repeat(2,1fr);

    gap:20px;

    padding:30px;

    background:#f8fbff;

    border-bottom:1px solid #e5edf6;

}

.detail-card{

    background:white;

    border:1px solid #e5edf6;

    border-radius:12px;

    padding:18px;

}

.detail-title{

    color:#6b7280;

    font-size:12px;

    font-weight:700;

    margin-bottom:10px;

    text-transform:uppercase;

}

.detail-value{

    color:#111827;

    font-weight:700;

    line-height:1.7;

}

/* Table */

.table-wrapper{

    padding:30px;

}

.bill-table{

    width:100%;

    border-collapse:collapse;

}

.bill-table thead{

    background:#091729;

}

.bill-table th{

    color:white;

    padding:14px;

    text-align:left;

    font-size:13px;

    text-transform:uppercase;

}

.bill-table td{

    padding:15px;

    border-bottom:1px solid #edf2f7;

    color:#374151;

    font-size:14px;

}

.center{

    text-align:center;

}

.right{

    text-align:right;

}

.item-name{

    font-weight:700;

    color:#111827;

}

.item-sub{

    color:#94a3b8;

    font-size:12px;

    margin-top:4px;

}

</style>

</head>

<body>

<div class="invoice-card">

<!-- Watermark -->

<svg
class="watermark"
viewBox="0 0 100 100"
xmlns="http://www.w3.org/2000/svg">

<path
d="M10 45 h15 v10 h-15 z
M85 45 h15 v10 h-15 z
M25 48 h50 v4 h-50 z
M35 35 h8 v30 h-8 z
M45 30 h8 v40 h-8 z
M65 35 h8 v30 h-8 z
M57 30 h8 v40 h-8 z"
fill="#000"/>

</svg>

<div class="content">

<div class="header">

<div class="brand">

<h1>

${invoice.gym.gymName}

</h1>

<p>

Gym ID :
${invoice.gym._id}

</p>

</div>

<div class="invoice-right">

<h2>

INVOICE

</h2>

<div class="bill-number">

Bill No :

<strong>

${invoice.billNumber}

</strong>

</div>

<div class="status">

${invoice.status.replaceAll("_"," ")}

</div>

</div>

</div>

<div class="details">

<div class="detail-card">

<div class="detail-title">

Member Details

</div>

<div class="detail-value">

${invoice.member.fullName}

<br>

${invoice.member.email}

<br>

${invoice.member.phone}

</div>

</div>

<div class="detail-card">

<div class="detail-title">

Invoice Details

</div>

<div class="detail-value">

Category :
${invoice.category}

<br>

Date :
${new Date(invoice.invoiceDate).toLocaleDateString()}

<br>

Processed By :
${invoice.processedBy}

</div>

</div>

</div>

<div class="table-wrapper">

<table class="bill-table">

<thead>

<tr>

<th>

Description

</th>

<th class="center">

Qty

</th>

<th class="right">

Unit Price

</th>

<th class="right">

Total

</th>

</tr>

</thead>

<tbody>
${
invoice.category === "membership"

?

`

<tr>

<td>

<div class="item-name">

${invoice.membership.planName}

</div>

<div class="item-sub">

Membership Plan

</div>

</td>

<td class="center">

1

</td>

<td class="right">

₹${invoice.amount.toFixed(2)}

</td>

<td class="right">

₹${invoice.amount.toFixed(2)}

</td>

</tr>

`

:

invoice.items.map(item=>`

<tr>

<td>

<div class="item-name">

${item.product.name}

</div>

<div class="item-sub">

Product Sale

</div>

</td>

<td class="center">

${item.quantity}

</td>

<td class="right">

₹${item.unitPrice.toFixed(2)}

</td>

<td class="right">

₹${item.total.toFixed(2)}

</td>

</tr>

`).join("")

}

</tbody>

</table>

</div>

<div
style="
display:grid;
grid-template-columns:1fr 360px;
gap:30px;
padding:30px;
border-top:1px solid #edf2f7;
">

<div>

<div
style="
background:#f8fbff;
border:1px dashed #d1d5db;
padding:20px;
border-radius:12px;
">

<h3
style="
margin-bottom:18px;
color:#111827;
">

Payment Details

</h3>

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
">

<span>

Payment Method

</span>

<strong>

${invoice.paymentMethod}

</strong>

</div>

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
">

<span>

Transaction Ref

</span>

<strong>

${invoice.transactionReference ?? "-"}

</strong>

</div>

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
">

<span>

Due Date

</span>

<strong>

${
invoice.dueDate
?
new Date(invoice.dueDate).toLocaleDateString()
:
"-"
}

</strong>

</div>

<div
style="
display:flex;
justify-content:space-between;
">

<span>

Processed By

</span>

<strong>

${invoice.processedBy}

</strong>

</div>

</div>

</div>

<div>

<table
style="
width:100%;
border-collapse:collapse;
">

<tr>

<td
style="
padding:10px 0;
color:#6b7280;
">

Subtotal

</td>

<td
style="
text-align:right;
">

₹${invoice.amount.toFixed(2)}

</td>

</tr>

<tr>

<td
style="
padding:10px 0;
color:#6b7280;
">

Discount

</td>

<td
style="
text-align:right;
color:#dc2626;
">

- ₹${invoice.discountAmount.toFixed(2)}

</td>

</tr>

<tr>

<td
style="
padding:10px 0;
color:#6b7280;
">

Tax

</td>

<td
style="
text-align:right;
">

₹${invoice.taxAmount.toFixed(2)}

</td>

</tr>

<tr>

<td
style="
padding:14px 0;
font-size:18px;
font-weight:700;
border-top:1px solid #e5e7eb;
">

Final Amount

</td>

<td
style="
text-align:right;
font-size:22px;
font-weight:700;
color:#111827;
border-top:1px solid #e5e7eb;
">

₹${invoice.finalAmount.toFixed(2)}

</td>

</tr>

<tr>

<td
style="
padding:12px 0;
color:#16a34a;
font-weight:600;
">

Paid

</td>

<td
style="
text-align:right;
color:#16a34a;
font-weight:700;
">

₹${invoice.paymentReceived.toFixed(2)}

</td>

</tr>

<tr>

<td
style="
padding:12px 0;
color:#ef4444;
font-weight:700;
">

Remaining

</td>

<td
style="
text-align:right;
color:#ef4444;
font-weight:700;
">

₹${invoice.remainingAmount.toFixed(2)}

</td>

</tr>

</table>

</div>

</div>
<div
style="
padding:0 30px 30px;
">

${
invoice.notes
?

`

<div
style="
margin-top:25px;
background:#f8fbff;
border:1px solid #dbeafe;
border-radius:12px;
padding:18px;
">

<h3
style="
margin-bottom:10px;
color:#111827;
">

Notes

</h3>

<p
style="
color:#4b5563;
line-height:1.7;
">

${invoice.notes}

</p>

</div>

`

:

""

}

<div
style="
margin-top:30px;
padding:20px;
border-radius:12px;
background:#ecfeff;
border-left:5px solid #0891b2;
">

<h3
style="
margin-bottom:10px;
color:#0f172a;
">

Thank You!

</h3>

<p
style="
color:#475569;
line-height:1.7;
">

Thank you for choosing
<strong>${invoice.gym.gymName}</strong>.

This invoice serves as an official proof of your payment.
Please keep this invoice safely for future reference.

</p>

</div>

<div
style="
margin-top:35px;
display:flex;
justify-content:space-between;
align-items:flex-end;
">

<div>

<p
style="
font-size:13px;
color:#64748b;
">

Generated On

</p>

<strong>

${new Date().toLocaleString()}

</strong>

</div>

<div
style="
text-align:right;
">

<div
style="
width:220px;
border-top:1px solid #111827;
margin-bottom:8px;
">

</div>

<strong>

Authorized Signature

</strong>

</div>

</div>

<hr
style="
margin:35px 0 20px;
border:none;
border-top:1px solid #e5e7eb;
">

<div
style="
text-align:center;
font-size:13px;
color:#64748b;
line-height:1.8;
">

© ${new Date().getFullYear()} <strong>${invoice.gym.gymName}</strong>

<br>

This is a computer generated invoice and does not require a physical signature.

</div>

</div>

</div>

</div>

</body>

</html>

`;

};

export default invoiceTemplate;