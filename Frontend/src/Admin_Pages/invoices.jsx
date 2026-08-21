//this page is dedicatedly for  the invoice history based on the different filters search and view 
import React, { useMemo, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Download,
    MoreVertical,
    Receipt,
    CheckCircle2,
    Clock3,
    AlertCircle,
    CreditCard,
    CalendarDays,
    RotateCcw
} from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios"


const Invoices = () => {

    // =========================================================
    // STATES
    // =========================================================

    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices,setInvoices] = useState([])
    const [filters, setFilters] = useState({
        category: "",
        status: "",
        paymentMethod: "",
        fromDate: "",
        toDate: "",
        minAmount: "",
        maxAmount: "",
        processedBy: ""
    });
    const [summary, setSummary] = useState({
        total: 0,
        paid: 0,
        outstandingInvoices: 0,
        outstandingAmount:0
    });
    // =========================================================
    // FILTER HANDLER
    // =========================================================

    const filterChangeHandler = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
        setCurrentPage(1);
    };

    // =========================================================
    // SEARCH
    // =========================================================

    const searchChangeHandler = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // =========================================================
    // CLEAR FILTERS
    // =========================================================

    const clearFilters = () => {
        setFilters({
            category: "",
            status: "",
            paymentMethod: "",
            fromDate: "",
            toDate: "",
            minAmount: "",
            maxAmount: "",
            processedBy: ""
        });
        setSearch("");
        setCurrentPage(1);
    };

    // =========================================================
    // ACTIVE FILTER COUNT
    // =========================================================
    const activeFilterCount = Object.values(filters)
        .filter((value) => value !== "")
        .length;

    // =========================================================
    // SUMMARY
    // =========================================================

    // const summary = useMemo(() => {

    //     const total = invoices.length;

    //     const paid = invoices.filter(
    //         (invoice) => invoice.status === "paid"
    //     ).length;

    //     const pending = invoices.filter(
    //         (invoice) =>
    //             invoice.status === "pending" ||
    //             invoice.status === "partially_paid"
    //     ).length;

    //     const outstanding = invoices.reduce(
    //         (total, invoice) =>
    //             total + invoice.remainingAmount,
    //         0
    //     );

    //     return {
    //         total,
    //         paid,
    //         pending,
    //         outstanding
    //     };

    // }, [invoices]);

    // =========================================================
    // STATUS UI
    // =========================================================
    const getStatusStyle = (status) => {
        switch (status) {
            case "paid":
                return {
                    label: "Paid",
                    className:
                        "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                    icon: CheckCircle2
                };
            case "pending":
                return {
                    label: "Pending",
                    className:
                        "bg-amber-500/10 border-amber-500/20 text-amber-400",
                    icon: Clock3
                };
            case "partially_paid":
                return {
                    label: "Partially Paid",
                    className:
                        "bg-blue-500/10 border-blue-500/20 text-blue-400",
                    icon: CreditCard
                };
            case "cancelled":
                return {
                    label: "Cancelled",
                    className:
                        "bg-red-500/10 border-red-500/20 text-red-400",
                    icon: AlertCircle
                };
            default:
                return {
                    label: status,
                    className:
                        "bg-gray-500/10 border-gray-500/20 text-gray-400",
                    icon: Clock3
                };
        }
    };
    // =========================================================
    // CATEGORY UI
    // =========================================================

    const getCategoryLabel = (category) => {
        const categories = {
            membership: "Membership",
            product: "Product",
            registration: "Registration",
            other: "Other"
        };
        return categories[category] || category;
    };

    //this function is to view a original invoice copy of the selected invoice 
    const viewDetailedInvoiceHandler = () =>{
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            window.open(
                `${backendUrl}/api/admin/invoice/${selectedInvoice._id}`,
                "_blank"
            );
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    //This is the backend call function to fetch the invoices based on different filters and search parameters
    const fetchInvoices = async () => {

    try {

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.get(
            `${backendUrl}/api/admin/invoice/fetch-invoices`,
            {
                params: {
                    page: currentPage,
                    limit: 10,

                    search: search.trim(),

                    category: filters.category,
                    status: filters.status,
                    paymentMethod: filters.paymentMethod,

                    dateFrom: filters.fromDate,
                    dateTo: filters.toDate,

                    minAmount: filters.minAmount,
                    maxAmount: filters.maxAmount,

                    processedBy: filters.processedBy
                },

                withCredentials: true
            }
        );

        if (response.data.success) {

            setInvoices(response.data.invoices);

            setSummary(response.data.summary);

            // Agar pagination state hai:
            // setTotalPages(response.data.pagination.totalPages);
        }

    } catch (error) {

        console.error(
            "Fetch invoices error:",
            error
        );

        toast.error(
            error.response?.data?.message ||
            "Something went wrong!"
        );
    }
};
    // Debouncing
      useEffect(() => {
        const timer = setTimeout(() => {
          fetchInvoices();
        }, 500);
    
        return () => {
          clearTimeout(timer);
        };
      }, [search,currentPage,
    filters.status,
    filters.paymentMethod,
    filters.fromDate,
    filters.toDate,
    filters.minAmount,
    filters.maxAmount,
    filters.processedBy]);
    
    return (

        <div className="min-h-screen pb-12">

            {/* =====================================================
                            HEADER
            ===================================================== */}

            <div className="w-[95%] mx-auto">
                <div className="flex justify-between items-start gap-6">
                    <div>
                        <p className="uppercase tracking-[4px] text-red-400 text-xs font-bold">
                            Billing Center
                        </p>
                        <h1 className="text-5xl font-black text-white mt-2 ">
                            Invoices
                        </h1>
                        <p className="text-gray-500 mt-3 text-lg">
                            Manage billing, payments and transaction history.
                        </p>
                    </div>
                    <button
                        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 text-white font-bold shadow-[0_12px_30px_rgba(239,68,68,.25)] hover:scale-[1.02] transition-all"
                    >
                        <Receipt size={20} />
                        Create Invoice
                    </button>
                </div>
                {/* =====================================================
                                SUMMARY CARDS
                ===================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
                    {/* TOTAL */}
                    <div className="rounded-3xl border border-[#252525] bg-gradient-to-b from-[#181818] to-[#111111] p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Invoices
                                </p>
                                <h2 className="text-3xl font-black text-white mt-3">
                                    {summary.total}
                                </h2>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <Receipt
                                    size={21}
                                    className="text-red-400"
                                />
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs mt-5">
                            All generated invoices
                        </p>
                    </div>
                    {/* PAID */}
                    <div className="rounded-3xl border border-[#252525] bg-gradient-to-b from-[#181818] to-[#111111] p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Paid Invoices
                                </p>
                                <h2 className="text-3xl font-black text-emerald-400 mt-3">
                                    {summary.paid}
                                </h2>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2
                                    size={21}
                                    className="text-emerald-400"
                                />
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs mt-5">
                            Successfully completed payments
                        </p>
                    </div>
                    {/* PENDING */}
                    <div className="rounded-3xl border border-[#252525] bg-gradient-to-b from-[#181818] to-[#111111] p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Pending Payments
                                </p>
                                <h2 className="text-3xl font-black text-amber-400 mt-3">
                                    {summary.outstandingInvoices}
                                </h2>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <Clock3
                                    size={21}
                                    className="text-amber-400"
                                />
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs mt-5">
                            Pending or partially paid
                        </p>
                    </div>
                    {/* OUTSTANDING */}
                    <div className="rounded-3xl border border-[#252525] bg-gradient-to-b from-[#181818] to-[#111111] p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Outstanding Amount
                                </p>
                                <h2 className="text-3xl font-black text-red-400 mt-3">
                                    ₹{summary.outstandingAmount.toLocaleString()}
                                </h2>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <AlertCircle
                                    size={21}
                                    className="text-red-400"
                                />
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs mt-5">
                            Amount yet to be collected
                        </p>
                    </div>
                </div>
                {/* =====================================================
                            SEARCH + FILTER TOOLBAR
                ===================================================== */}
                <div className="
                    mt-10 rounded-3xl border border-[#252525] bg-gradient-to-b from-[#181818] to-[#101010] p-5">
                    <div className="flex gap-4 items-center">
                        {/* SEARCH */}
                        <div className="relative flex-1">
                            <Search
                                size={20}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input type="search" value={search} onChange={searchChangeHandler}
                                placeholder="Search invoice number, customer or transaction..."
                                className="w-full h-14 pl-14 pr-5 rounded-2xl bg-[#0d0d0d] border border-[#292929] text-white placeholder:text-gray-600 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                            />
                        </div>
                        {/* FILTER BUTTON */}
                        <button
                            onClick={() => setFilterOpen(true)}
                            className="h-14 px-6 rounded-2xl border border-[#303030] bg-[#181818] text-gray-300 flex items-center gap-3 hover:border-red-500/40 hover:text-white transition-all"
                        >
                            <SlidersHorizontal size={19} />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        {/* RESET */}

                        {(search || activeFilterCount > 0) && (
                            <button onClick={clearFilters} className="h-14 w-14 rounded-2xl border border-[#303030] bg-[#181818] text-gray-500 hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-all ">
                                <RotateCcw size={18} />
                            </button>
                        )}
                    </div>
                </div>
                {/* =====================================================
                                TABLE
                ===================================================== */}
                <div className="mt-8 rounded-3x border border-[#252525] bg-gradient-to-b from-[#171717] to-[#101010] overflow-hidden">
                    {/* TABLE HEADER */}
                    <div className="px-7 py-6 border-b border-[#252525] flex justify-between items-center">
                        <div>
                            <h2 className="text-xlfont-boldtext-white">
                                Invoice History
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                All billing transactions
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            Showing
                            <span className="text-white font-semibold mx-1">
                                {invoices.length}
                            </span>
                            invoices
                        </div>
                    </div>
                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs uppercase tracking-[2px] text-gray-600 border-b border-[#252525]">
                                    <th className="px-7 py-5">Invoice</th>
                                    <th className="px-5 py-5">Customer</th>
                                    <th className="px-5 py-5">Category</th>
                                    <th className="px-5 py-5">Amount</th>
                                    <th className="px-5 py-5">Payment</th>
                                    <th className="px-5 py-5">Status</th>
                                    <th className="px-5 py-5">Date</th>
                                    <th className="px-7 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => {
                                    const status = getStatusStyle(invoice.status);
                                    const StatusIcon =status.icon;
                                    return (
                                        <tr
                                            key={invoice._id}
                                            className="border-b border-[#202020] hover:bg-[#181818] transition-colors"
                                        >
                                            {/* BILL NUMBER */}
                                            <td className="px-7 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                                        <Receipt
                                                            size={17}
                                                            className="text-red-400"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold">
                                                            {invoice.billNumber}
                                                        </p>
                                                        <p className="text-gray-600 text-xs mt-1">
                                                            #{invoice._id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* CUSTOMER */}
                                            <td className="px-5 py-6">
                                                <p className="text-white font-medium">
                                                    {invoice.invoiceTo}
                                                </p>
                                                <p className="text-gray-600 text-xs mt-1">
                                                    Processed by {invoice.processedBy}
                                                </p>
                                            </td>
                                            {/* CATEGORY */}
                                            <td className="px-5 py-6">
                                                <span className="px-3 py-1.5 rounded-full bg-[#1d1d1d] border border-[#303030] text-gray-400 text-xs font-semibold">
                                                    {getCategoryLabel(
                                                        invoice.category
                                                    )}
                                                </span>
                                            </td>
                                            {/* AMOUNT */}
                                            <td className="px-5 py-6">
                                                <p className="text-white font-black text-lg">
                                                    ₹{invoice.finalAmount.toLocaleString()}
                                                </p>
                                                {invoice.discountAmount > 0 && (
                                                    <p className="text-gray-600 text-xs mt-1">
                                                        Discount ₹{invoice.discountAmount}
                                                    </p>
                                                )}
                                            </td>
                                            {/* PAYMENT */}
                                            <td className="px-5 py-6">
                                                <p className="text-gray-300 capitalize font-medium">
                                                    {invoice.paymentMethod
                                                        ?.replace("_", " ")}
                                                </p>
                                                <p className="text-gray-600 text-xs mt-1">
                                                    Received ₹{invoice.paymentReceived.toLocaleString()}
                                                </p>
                                            </td>
                                            {/* STATUS */}
                                            <td className="px-5 py-6">
                                                <span
                                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold
                                                        ${status.className}
                                                    `}
                                                >
                                                    <StatusIcon size={13}/>
                                                    {status.label}
                                                </span>
                                            </td>
                                            {/* DATE */}
                                            <td className="px-5 py-6">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <CalendarDays size={15}/>
                                                    {invoice.invoiceDate}
                                                </div>
                                            </td>
                                            {/* ACTION */}
                                            <td className="
                                                px-7
                                                py-6
                                                text-right
                                            ">

                                                <button
                                                    onClick={() =>
                                                        setSelectedInvoice(invoice)
                                                    }
                                                    className="
                                                        w-10
                                                        h-10

                                                        rounded-xl

                                                        bg-[#1b1b1b]

                                                        border
                                                        border-[#303030]

                                                        text-gray-400

                                                        hover:text-white
                                                        hover:border-red-500/40

                                                        flex
                                                        items-center
                                                        justify-center

                                                        transition-all
                                                    "
                                                >

                                                    <Eye size={17}/>

                                                </button>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>


                    {/* =====================================================
                                PAGINATION
                    ===================================================== */}

                    <div className="
                        px-7
                        py-5

                        border-t
                        border-[#252525]

                        flex
                        justify-between
                        items-center
                    ">

                        <p className="
                            text-gray-600
                            text-sm
                        ">

                            Page

                            <span className="text-white mx-1">
                                {currentPage}
                            </span>

                            of

                            <span className="text-white mx-1">
                                12
                            </span>

                        </p>


                        <div className="flex gap-2">

                            <button
                                className="
                                    w-10
                                    h-10
                                    rounded-xl

                                    border
                                    border-[#303030]

                                    bg-[#181818]

                                    text-gray-500

                                    hover:text-white

                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <ChevronLeft size={17}/>

                            </button>


                            <button
                                className="
                                    w-10
                                    h-10
                                    rounded-xl

                                    bg-red-600

                                    text-white
                                    font-bold
                                "
                            >
                                1
                            </button>


                            <button
                                className="
                                    w-10
                                    h-10
                                    rounded-xl

                                    border
                                    border-[#303030]

                                    bg-[#181818]

                                    text-gray-400

                                    hover:border-red-500/30
                                    hover:text-white

                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                2
                            </button>


                            <button
                                className="
                                    w-10
                                    h-10
                                    rounded-xl

                                    border
                                    border-[#303030]

                                    bg-[#181818]

                                    text-gray-400

                                    hover:border-red-500/30
                                    hover:text-white

                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                3
                            </button>


                            <button
                                className="
                                    w-10
                                    h-10
                                    rounded-xl

                                    border
                                    border-[#303030]

                                    bg-[#181818]

                                    text-gray-500

                                    hover:text-white

                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <ChevronRight size={17}/>

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================================================
                            FILTER MODAL
            ========================================================= */}

            {filterOpen && (

    <>

        {/* BACKDROP */}
        <div
            onClick={() => setFilterOpen(false)}
            className="
                fixed inset-0
                z-[80]

                bg-black/80
                backdrop-blur-sm
            "
        />


        {/* MODAL */}
        <div
            className="
                fixed
                left-1/2
                top-1/2

                -translate-x-1/2
                -translate-y-1/2

                z-[90]

                w-[680px]
                max-w-[calc(100vw-32px)]

                max-h-[90vh]

                overflow-hidden

                rounded-[24px]

                border
                border-white/[0.08]

                bg-[#111111]

                shadow-[0_30px_100px_rgba(0,0,0,0.65)]
            "
        >

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div
                className="
                    px-7
                    py-6

                    border-b
                    border-white/[0.07]

                    bg-[#131313]
                "
            >

                <div
                    className="
                        flex
                        items-start
                        justify-between
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                mb-2
                            "
                        >

                            <span
                                className="
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    bg-red-500
                                "
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[3px]
                                    text-red-400
                                "
                            >
                                Invoice Search
                            </span>

                        </div>


                        <h2
                            className="
                                text-[25px]
                                leading-tight
                                font-bold
                                tracking-tight
                                text-white
                            "
                        >
                            Advanced Filters
                        </h2>


                        <p
                            className="
                                mt-2
                                text-[13px]
                                text-gray-500
                            "
                        >
                            Refine invoices using billing and payment
                            parameters.
                        </p>

                    </div>


                    {/* CLOSE */}
                    <button
                        type="button"
                        onClick={() => setFilterOpen(false)}
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center

                            rounded-xl

                            border
                            border-white/[0.08]

                            bg-white/[0.03]

                            text-gray-500

                            transition-all

                            hover:border-red-500/30
                            hover:bg-red-500/10
                            hover:text-red-400
                        "
                    >

                        <X size={18} />

                    </button>

                </div>

            </div>


            {/* ================================================= */}
            {/* BODY */}
            {/* ================================================= */}

            <div
                className="
                    max-h-[calc(90vh-170px)]
                    overflow-y-auto

                    px-7
                    py-7

                    scrollbar-thin
                    scrollbar-thumb-white/10
                    scrollbar-track-transparent
                "
            >

                {/* ================================================= */}
                {/* BILLING DETAILS */}
                {/* ================================================= */}

                <div className="mb-8">

                    <div className="mb-4">

                        <p
                            className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[2px]
                                text-gray-600
                            "
                        >
                            Billing Details
                        </p>

                    </div>


                    {/* CATEGORY */}
                    <div>

                        <label
                            className="
                                mb-2
                                block

                                text-[13px]
                                font-medium
                                text-gray-400
                            "
                        >
                            Invoice Category
                        </label>


                        <select
                            name="category"
                            value={filters.category}
                            onChange={filterChangeHandler}
                            className="
                                w-full
                                h-12

                                rounded-xl

                                border
                                border-white/[0.08]

                                bg-[#181818]

                                px-4

                                text-sm
                                text-gray-200

                                outline-none

                                transition-all

                                focus:border-red-500/50
                                focus:ring-2
                                focus:ring-red-500/10

                                cursor-pointer
                            "
                        >

                            <option value="">
                                All Categories
                            </option>

                            <option value="membership">
                                Membership
                            </option>

                            <option value="product">
                                Product
                            </option>

                            <option value="registration">
                                Registration
                            </option>

                            <option value="other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* STATUS + PAYMENT */}
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4

                            mt-5
                        "
                    >

                        {/* STATUS */}
                        <div>

                            <label
                                className="
                                    mb-2
                                    block

                                    text-[13px]
                                    font-medium
                                    text-gray-400
                                "
                            >
                                Payment Status
                            </label>


                            <select
                                name="status"
                                value={filters.status}
                                onChange={filterChangeHandler}
                                className="
                                    w-full
                                    h-12

                                    rounded-xl

                                    border
                                    border-white/[0.08]

                                    bg-[#181818]

                                    px-4

                                    text-sm
                                    text-gray-200

                                    outline-none

                                    transition-all

                                    focus:border-red-500/50
                                    focus:ring-2
                                    focus:ring-red-500/10

                                    cursor-pointer
                                "
                            >

                                <option value="">
                                    All Statuses
                                </option>

                                <option value="paid">
                                    Paid
                                </option>

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="partially_paid">
                                    Partially Paid
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>


                        {/* PAYMENT METHOD */}
                        <div>

                            <label
                                className="
                                    mb-2
                                    block

                                    text-[13px]
                                    font-medium
                                    text-gray-400
                                "
                            >
                                Payment Method
                            </label>


                            <select
                                name="paymentMethod"
                                value={filters.paymentMethod}
                                onChange={filterChangeHandler}
                                className="
                                    w-full
                                    h-12

                                    rounded-xl

                                    border
                                    border-white/[0.08]

                                    bg-[#181818]

                                    px-4

                                    text-sm
                                    text-gray-200

                                    outline-none

                                    transition-all

                                    focus:border-red-500/50
                                    focus:ring-2
                                    focus:ring-red-500/10

                                    cursor-pointer
                                "
                            >

                                <option value="">
                                    All Methods
                                </option>

                                <option value="cash">
                                    Cash
                                </option>

                                <option value="upi">
                                    UPI
                                </option>

                                <option value="card">
                                    Card
                                </option>

                                <option value="bank_transfer">
                                    Bank Transfer
                                </option>

                                <option value="other">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* DATE */}
                {/* ================================================= */}

                <div className="mb-8">

                    <div
                        className="
                            flex
                            items-center
                            gap-2

                            mb-4
                        "
                    >

                        <div
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center

                                rounded-lg

                                bg-red-500/10

                                text-red-400
                            "
                        >

                            <CalendarDays size={14} />

                        </div>


                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-white
                                "
                            >
                                Invoice Date
                            </p>

                            <p
                                className="
                                    text-[11px]
                                    text-gray-600
                                "
                            >
                                Select a date range
                            </p>

                        </div>

                    </div>


                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4
                        "
                    >

                        {/* FROM */}
                        <div>

                            <label
                                className="
                                    mb-2
                                    block

                                    text-[12px]
                                    font-medium
                                    text-gray-500
                                "
                            >
                                From Date
                            </label>


                            <input
                                type="date"
                                name="fromDate"
                                value={filters.fromDate}
                                onChange={filterChangeHandler}
                                className="
                                    w-full
                                    h-12

                                    rounded-xl

                                    border
                                    border-white/[0.08]

                                    bg-[#181818]

                                    px-4

                                    text-sm
                                    text-gray-300

                                    outline-none

                                    transition-all

                                    focus:border-red-500/50
                                    focus:ring-2
                                    focus:ring-red-500/10

                                    scheme-dark
                                "
                            />

                        </div>


                        {/* TO */}
                        <div>

                            <label
                                className="
                                    mb-2
                                    block

                                    text-[12px]
                                    font-medium
                                    text-gray-500
                                "
                            >
                                To Date
                            </label>


                            <input
                                type="date"
                                name="toDate"
                                value={filters.toDate}
                                onChange={filterChangeHandler}
                                className="
                                    w-full
                                    h-12

                                    rounded-xl

                                    border
                                    border-white/[0.08]

                                    bg-[#181818]

                                    px-4

                                    text-sm
                                    text-gray-300

                                    outline-none

                                    transition-all

                                    focus:border-red-500/50
                                    focus:ring-2
                                    focus:ring-red-500/10

                                    scheme-dark
                                "
                            />

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* AMOUNT */}
                {/* ================================================= */}

                <div className="mb-8">

                    <div className="mb-4">

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-white
                            "
                        >
                            Invoice Amount
                        </p>

                        <p
                            className="
                                mt-1
                                text-[11px]
                                text-gray-600
                            "
                        >
                            Define the minimum and maximum invoice value.
                        </p>

                    </div>


                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4
                        "
                    >

                        {/* MIN */}
                        <div>

                            <label
                                className="
                                    mb-2
                                    block

                                    text-[12px]
                                    font-medium
                                    text-gray-500
                                "
                            >
                                Minimum Amount
                            </label>


                            <div className="relative">

                                <span
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2

                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    ₹
                                </span>


                                <input
                                    type="number"
                                    min="0"
                                    name="minAmount"
                                    value={filters.minAmount}
                                    onChange={filterChangeHandler}
                                    placeholder="0"
                                    className="
                                        w-full
                                        h-12

                                        rounded-xl

                                        border
                                        border-white/[0.08]

                                        bg-[#181818]

                                        pl-8
                                        pr-4

                                        text-sm
                                        text-gray-200

                                        placeholder:text-gray-700

                                        outline-none

                                        transition-all

                                        focus:border-red-500/50
                                        focus:ring-2
                                        focus:ring-red-500/10
                                    "
                                />

                            </div>

                        </div>


                        {/* MAX */}
                        <div>

                            <label
                                className="
                                    mb-2
                                    block

                                    text-[12px]
                                    font-medium
                                    text-gray-500
                                "
                            >
                                Maximum Amount
                            </label>


                            <div className="relative">

                                <span
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2

                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    ₹
                                </span>


                                <input
                                    type="number"
                                    min="0"
                                    name="maxAmount"
                                    value={filters.maxAmount}
                                    onChange={filterChangeHandler}
                                    placeholder="100000"
                                    className="
                                        w-full
                                        h-12

                                        rounded-xl

                                        border
                                        border-white/[0.08]

                                        bg-[#181818]

                                        pl-8
                                        pr-4

                                        text-sm
                                        text-gray-200

                                        placeholder:text-gray-700

                                        outline-none

                                        transition-all

                                        focus:border-red-500/50
                                        focus:ring-2
                                        focus:ring-red-500/10
                                    "
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* PROCESSED BY */}
                {/* ================================================= */}

                <div>

                    <label
                        className="
                            mb-2
                            block

                            text-[13px]
                            font-medium
                            text-gray-400
                        "
                    >
                        Processed By
                    </label>


                    <input
                        type="text"
                        name="processedBy"
                        value={filters.processedBy}
                        onChange={filterChangeHandler}
                        placeholder="Search admin, reception or staff..."
                        className="
                            w-full
                            h-12

                            rounded-xl

                            border
                            border-white/[0.08]

                            bg-[#181818]

                            px-4

                            text-sm
                            text-gray-200

                            placeholder:text-gray-700

                            outline-none

                            transition-all

                            focus:border-red-500/50
                            focus:ring-2
                            focus:ring-red-500/10
                        "
                    />

                </div>

            </div>


            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <div
                className="
                    px-7
                    py-5

                    border-t
                    border-white/[0.07]

                    bg-[#131313]

                    flex
                    items-center
                    justify-between

                    gap-4
                "
            >

                {/* CLEAR */}
                <button
                    type="button"
                    onClick={clearFilters}
                    className="
                        flex
                        items-center
                        gap-2

                        px-3
                        py-2

                        rounded-lg

                        text-sm
                        font-medium
                        text-gray-500

                        transition-all

                        hover:bg-white/[0.04]
                        hover:text-gray-300
                    "
                >

                    <RotateCcw size={15} />

                    Clear All

                </button>


                {/* APPLY */}
                <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    className="
                        h-11
                        px-7

                        rounded-xl

                        bg-red-600

                        text-sm
                        font-semibold
                        text-white

                        shadow-[0_8px_25px_rgba(220,38,38,0.18)]

                        transition-all

                        hover:bg-red-500
                        hover:shadow-[0_10px_30px_rgba(220,38,38,0.28)]

                        active:scale-[0.98]
                    "
                >
                    Apply Filters
                </button>

            </div>

        </div>

    </>

)}

            {/* =========================================================
                            INVOICE DETAIL MODAL
            ========================================================= */}

            {selectedInvoice && (

                <>

                    <div
                        onClick={() => setSelectedInvoice(null)}
                        className="
                            fixed
                            inset-0

                            bg-black/75
                            backdrop-blur-md

                            z-[80]
                        "
                    />


                    <div className="
                        fixed

                        left-1/2
                        top-1/2

                        -translate-x-1/2
                        -translate-y-1/2

                        w-[700px]
                        max-w-[95vw]

                        max-h-[90vh]

                        overflow-y-auto

                        rounded-[32px]

                        border
                        border-[#2d2d2d]

                        bg-gradient-to-b
                        from-[#181818]
                        to-[#0b0b0b]

                        z-[90]

                        shadow-[0_40px_120px_rgba(0,0,0,.7)]
                    ">

                        {/* HEADER */}

                        <div className="
                            px-7
                            py-6

                            border-b
                            border-[#252525]

                            flex
                            justify-between
                            items-start
                        ">

                            <div>

                                <p className="
                                    text-red-400
                                    uppercase
                                    tracking-[3px]
                                    text-xs
                                    font-bold
                                ">
                                    Invoice Details
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-black
                                    text-white
                                    mt-2
                                ">
                                    {selectedInvoice.billNumber}
                                </h2>

                            </div>


                            <button
                                onClick={() => setSelectedInvoice(null)}
                                className="
                                    w-11
                                    h-11

                                    rounded-xl

                                    bg-[#1b1b1b]

                                    border
                                    border-[#303030]

                                    hover:bg-red-500

                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <X size={19}/>

                            </button>

                        </div>


                        {/* DETAILS */}

                        <div className="p-7">

                            <div className="
                                grid
                                grid-cols-2
                                gap-4
                            ">

                                <div className="
                                    rounded-2xl
                                    bg-[#151515]
                                    border
                                    border-[#292929]
                                    p-5
                                ">

                                    <p className="text-gray-600 text-xs">
                                        Customer
                                    </p>

                                    <p className="
                                        text-white
                                        font-bold
                                        mt-2
                                    ">
                                        {selectedInvoice.invoiceTo}
                                    </p>

                                </div>


                                <div className="
                                    rounded-2xl
                                    bg-[#151515]
                                    border
                                    border-[#292929]
                                    p-5
                                ">

                                    <p className="text-gray-600 text-xs">
                                        Category
                                    </p>

                                    <p className="
                                        text-white
                                        font-bold
                                        mt-2
                                    ">
                                        {getCategoryLabel(
                                            selectedInvoice.category
                                        )}
                                    </p>

                                </div>

                            </div>


                            <div className="
                                mt-5

                                rounded-3xl

                                border
                                border-[#292929]

                                bg-[#151515]

                                p-6
                            ">

                                <div className="
                                    flex
                                    justify-between
                                ">

                                    <span className="text-gray-500">
                                        Amount
                                    </span>

                                    <span className="text-white font-semibold">
                                        ₹{selectedInvoice.amount.toLocaleString()}
                                    </span>

                                </div>


                                <div className="
                                    flex
                                    justify-between
                                    mt-4
                                ">

                                    <span className="text-gray-500">
                                        Discount
                                    </span>

                                    <span className="text-gray-300">
                                        - ₹{selectedInvoice.discountAmount.toLocaleString()}
                                    </span>

                                </div>


                                <div className="
                                    flex
                                    justify-between
                                    mt-4
                                ">

                                    <span className="text-gray-500">
                                        Tax
                                    </span>

                                    <span className="text-gray-300">
                                        ₹{selectedInvoice.taxAmount.toLocaleString()}
                                    </span>

                                </div>


                                <div className="
                                    border-t
                                    border-[#292929]
                                    my-5
                                "/>


                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                ">

                                    <span className="
                                        text-white
                                        font-bold
                                    ">
                                        Final Amount
                                    </span>

                                    <span className="
                                        text-3xl
                                        font-black
                                        text-red-500
                                    ">
                                        ₹{selectedInvoice.finalAmount.toLocaleString()}
                                    </span>

                                </div>


                                <div className="
                                    flex
                                    justify-between
                                    mt-5
                                ">

                                    <span className="text-gray-500">
                                        Payment Received
                                    </span>

                                    <span className="text-emerald-400 font-bold">
                                        ₹{selectedInvoice.paymentReceived.toLocaleString()}
                                    </span>

                                </div>


                                <div className="
                                    flex
                                    justify-between
                                    mt-4
                                ">

                                    <span className="text-gray-500">
                                        Remaining
                                    </span>

                                    <span className="
                                        text-red-400
                                        font-bold
                                    ">
                                        ₹{selectedInvoice.remainingAmount.toLocaleString()}
                                    </span>

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="
                                grid
                                grid-cols-2
                                gap-4
                                mt-6
                            ">

                                <button className="
                                    h-12
                                    rounded-2xl

                                    border
                                    border-[#303030]

                                    bg-[#181818]

                                    text-gray-300

                                    hover:text-white
                                    hover:border-red-500/30

                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                ">

                                    <Download size={17}/>

                                    Download Invoice

                                </button>


                                <button className="
                                    h-12
                                    rounded-2xl

                                    bg-gradient-to-r
                                    from-red-700
                                    to-red-500

                                    text-white
                                    font-bold

                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                                onClick={viewDetailedInvoiceHandler}
                                >

                                    <Eye size={17}/>

                                    View Full Invoice

                                </button>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
};


export default Invoices;