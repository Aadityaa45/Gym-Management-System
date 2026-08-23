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

@page {
    size: A4;
    margin: 0;
}

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#edf2f7;
    font-family: "Segoe UI", Arial, sans-serif;
    display:flex;
    justify-content:center;
    padding:20px;
}

.invoice-card{
    width:794px;
    background:white;
    border-radius:12px;
    overflow:hidden;
    position:relative;
    box-shadow: 0 12px 40px rgba(0,0,0,.08);
    border:1px solid #dbe4ef;
}

/* Print Specific Overrides */
@media print {
    body {
        background: white;
        padding: 0;
    }
    .invoice-card {
        width: 100%;
        border-radius: 0;
        border: none;
        box-shadow: none;
    }
}

/* Watermark */

.watermark{
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    width:300px;
    opacity:.03;
    z-index:1;
}

.content{
    position:relative;
    z-index:5;
}

/* Header */

.header{
    background: linear-gradient(135deg, #071321, #0c2340);
    color:white;
    padding:24px 30px;
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
}

.brand h1{
    font-size:24px;
    margin-bottom:4px;
    letter-spacing:.5px;
}

.brand p{
    color:#b8c7d9;
    font-size:13px;
}

.invoice-right{
    text-align:right;
}

.invoice-right h2{
    font-size:26px;
    margin-bottom:4px;
    color:#ffffff;
}

.bill-number{
    font-size:14px;
    color:#d7e3f3;
}

.status{
    display:inline-block;
    margin-top:8px;
    padding:4px 12px;
    border-radius:30px;
    background:#ffffff20;
    color:white;
    font-weight:600;
    text-transform:uppercase;
    font-size:11px;
}

/* Details */

.details{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:15px;
    padding:20px 30px;
    background:#f8fbff;
    border-bottom:1px solid #e5edf6;
}

.detail-card{
    background:white;
    border:1px solid #e5edf6;
    border-radius:10px;
    padding:12px 16px;
}

.detail-title{
    color:#6b7280;
    font-size:11px;
    font-weight:700;
    margin-bottom:6px;
    text-transform:uppercase;
}

.detail-value{
    color:#111827;
    font-weight:700;
    font-size:13px;
    line-height:1.5;
}

/* Table */

.table-wrapper{
    padding:20px 30px 10px;
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
    padding:10px 12px;
    text-align:left;
    font-size:12px;
    text-transform:uppercase;
}

.bill-table td{
    padding:10px 12px;
    border-bottom:1px solid #edf2f7;
    color:#374151;
    font-size:13px;
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
    font-size:11px;
    margin-top:2px;
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
grid-template-columns:1fr 320px;
gap:20px;
padding:15px 30px;
border-top:1px solid #edf2f7;
">

<div>

<div
style="
background:#f8fbff;
border:1px dashed #d1d5db;
padding:14px;
border-radius:10px;
font-size:13px;
">

<h3
style="
margin-bottom:12px;
color:#111827;
font-size:14px;
">

Payment Details

</h3>

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:8px;
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
margin-bottom:8px;
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
margin-bottom:8px;
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
font-size:13px;
">

<tr>

<td
style="
padding:6px 0;
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
padding:6px 0;
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
padding:6px 0;
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
padding:10px 0;
font-size:16px;
font-weight:700;
border-top:1px solid #e5e7eb;
">

Final Amount

</td>

<td
style="
text-align:right;
font-size:18px;
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
padding:8px 0;
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
padding:8px 0;
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
padding:0 30px 20px;
">

${
invoice.notes
?

`

<div
style="
margin-top:15px;
background:#f8fbff;
border:1px solid #dbeafe;
border-radius:10px;
padding:12px;
">

<h3
style="
margin-bottom:6px;
color:#111827;
font-size:14px;
">

Notes

</h3>

<p
style="
color:#4b5563;
line-height:1.5;
font-size:12px;
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
margin-top:15px;
padding:14px;
border-radius:10px;
background:#ecfeff;
border-left:4px solid #0891b2;
">

<h3
style="
margin-bottom:6px;
color:#0f172a;
font-size:14px;
">

Thank You!

</h3>

<p
style="
color:#475569;
line-height:1.5;
font-size:12px;
">

Thank you for choosing
<strong>${invoice.gym.gymName}</strong>.

This invoice serves as an official proof of your payment.
Please keep this invoice safely for future reference.

</p>

</div>

<div
style="
margin-top:25px;
display:flex;
justify-content:space-between;
align-items:flex-end;
">

<div>

<p
style="
font-size:12px;
color:#64748b;
">

Generated On

</p>

<strong style="font-size:12px;">

${new Date().toLocaleString()}

</strong>

</div>

<div
style="
text-align:right;
">

<div
style="
width:180px;
border-top:1px solid #111827;
margin-bottom:6px;
">

</div>

<strong style="font-size:12px;">

Authorized Signature

</strong>

</div>

</div>

<hr
style="
margin:20px 0 12px;
border:none;
border-top:1px solid #e5e7eb;
">

<div
style="
text-align:center;
font-size:12px;
color:#64748b;
line-height:1.6;
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