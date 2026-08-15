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


const Invoices = () => {

    // =========================================================
    // STATES
    // =========================================================

    const [search, setSearch] = useState("");

    const [filterOpen, setFilterOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [selectedInvoice, setSelectedInvoice] = useState(null);

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


    // =========================================================
    // TEMPORARY DATA
    // Later this will come from backend
    // =========================================================

    const invoices = [
        {
            _id: "1",
            billNumber: "INV-2026-00124",
            invoiceTo: "Rahul Sharma",
            category: "product",
            amount: 2499,
            discountAmount: 100,
            taxAmount: 0,
            finalAmount: 2399,
            paymentReceived: 2399,
            remainingAmount: 0,
            status: "paid",
            paymentMethod: "upi",
            invoiceDate: "2026-08-15",
            processedBy: "Admin",
        },

        {
            _id: "2",
            billNumber: "INV-2026-00123",
            invoiceTo: "Aman Verma",
            category: "membership",
            amount: 12000,
            discountAmount: 1000,
            taxAmount: 0,
            finalAmount: 11000,
            paymentReceived: 6000,
            remainingAmount: 5000,
            status: "partially_paid",
            paymentMethod: "cash",
            invoiceDate: "2026-08-14",
            processedBy: "Reception",
        },

        {
            _id: "3",
            billNumber: "INV-2026-00122",
            invoiceTo: "Neha Singh",
            category: "product",
            amount: 1599,
            discountAmount: 0,
            taxAmount: 0,
            finalAmount: 1599,
            paymentReceived: 0,
            remainingAmount: 1599,
            status: "pending",
            paymentMethod: "card",
            invoiceDate: "2026-08-14",
            processedBy: "Admin",
        },

        {
            _id: "4",
            billNumber: "INV-2026-00121",
            invoiceTo: "Vikas Jain",
            category: "registration",
            amount: 2500,
            discountAmount: 0,
            taxAmount: 0,
            finalAmount: 2500,
            paymentReceived: 2500,
            remainingAmount: 0,
            status: "paid",
            paymentMethod: "cash",
            invoiceDate: "2026-08-13",
            processedBy: "Reception",
        },

        {
            _id: "5",
            billNumber: "INV-2026-00120",
            invoiceTo: "Rohit Mehta",
            category: "product",
            amount: 3499,
            discountAmount: 0,
            taxAmount: 0,
            finalAmount: 3499,
            paymentReceived: 0,
            remainingAmount: 3499,
            status: "cancelled",
            paymentMethod: "upi",
            invoiceDate: "2026-08-12",
            processedBy: "Admin",
        }
    ];


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

    const summary = useMemo(() => {

        const total = invoices.length;

        const paid = invoices.filter(
            (invoice) => invoice.status === "paid"
        ).length;

        const pending = invoices.filter(
            (invoice) =>
                invoice.status === "pending" ||
                invoice.status === "partially_paid"
        ).length;

        const outstanding = invoices.reduce(
            (total, invoice) =>
                total + invoice.remainingAmount,
            0
        );

        return {
            total,
            paid,
            pending,
            outstanding
        };

    }, [invoices]);


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


    return (

        <div className="min-h-screen pb-12">

            {/* =====================================================
                            HEADER
            ===================================================== */}

            <div className="w-[95%] mx-auto">

                <div className="
                    flex
                    justify-between
                    items-start
                    gap-6
                ">

                    <div>

                        <p className="
                            uppercase
                            tracking-[4px]
                            text-red-400
                            text-xs
                            font-bold
                        ">
                            Billing Center
                        </p>

                        <h1 className="
                            text-5xl
                            font-black
                            text-white
                            mt-2
                        ">
                            Invoices
                        </h1>

                        <p className="
                            text-gray-500
                            mt-3
                            text-lg
                        ">
                            Manage billing, payments and transaction history.
                        </p>

                    </div>


                    <button
                        className="
                            flex
                            items-center
                            gap-3

                            px-6
                            py-4

                            rounded-2xl

                            bg-gradient-to-r
                            from-red-700
                            to-red-500

                            text-white
                            font-bold

                            shadow-[0_12px_30px_rgba(239,68,68,.25)]

                            hover:scale-[1.02]

                            transition-all
                        "
                    >

                        <Receipt size={20} />

                        Create Invoice

                    </button>

                </div>


                {/* =====================================================
                                SUMMARY CARDS
                ===================================================== */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                    mt-10
                ">


                    {/* TOTAL */}

                    <div className="
                        rounded-3xl
                        border
                        border-[#252525]
                        bg-gradient-to-b
                        from-[#181818]
                        to-[#111111]
                        p-6
                    ">

                        <div className="
                            flex
                            justify-between
                            items-start
                        ">

                            <div>

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Total Invoices
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-black
                                    text-white
                                    mt-3
                                ">
                                    {summary.total}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-red-500/10
                                border
                                border-red-500/20
                                flex
                                items-center
                                justify-center
                            ">

                                <Receipt
                                    size={21}
                                    className="text-red-400"
                                />

                            </div>

                        </div>

                        <p className="
                            text-gray-600
                            text-xs
                            mt-5
                        ">
                            All generated invoices
                        </p>

                    </div>


                    {/* PAID */}

                    <div className="
                        rounded-3xl
                        border
                        border-[#252525]
                        bg-gradient-to-b
                        from-[#181818]
                        to-[#111111]
                        p-6
                    ">

                        <div className="
                            flex
                            justify-between
                            items-start
                        ">

                            <div>

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Paid Invoices
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-black
                                    text-emerald-400
                                    mt-3
                                ">
                                    {summary.paid}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-emerald-500/10
                                border
                                border-emerald-500/20
                                flex
                                items-center
                                justify-center
                            ">

                                <CheckCircle2
                                    size={21}
                                    className="text-emerald-400"
                                />

                            </div>

                        </div>

                        <p className="
                            text-gray-600
                            text-xs
                            mt-5
                        ">
                            Successfully completed payments
                        </p>

                    </div>


                    {/* PENDING */}

                    <div className="
                        rounded-3xl
                        border
                        border-[#252525]
                        bg-gradient-to-b
                        from-[#181818]
                        to-[#111111]
                        p-6
                    ">

                        <div className="
                            flex
                            justify-between
                            items-start
                        ">

                            <div>

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Pending Payments
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-black
                                    text-amber-400
                                    mt-3
                                ">
                                    {summary.pending}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-amber-500/10
                                border
                                border-amber-500/20
                                flex
                                items-center
                                justify-center
                            ">

                                <Clock3
                                    size={21}
                                    className="text-amber-400"
                                />

                            </div>

                        </div>

                        <p className="
                            text-gray-600
                            text-xs
                            mt-5
                        ">
                            Pending or partially paid
                        </p>

                    </div>


                    {/* OUTSTANDING */}

                    <div className="
                        rounded-3xl
                        border
                        border-[#252525]
                        bg-gradient-to-b
                        from-[#181818]
                        to-[#111111]
                        p-6
                    ">

                        <div className="
                            flex
                            justify-between
                            items-start
                        ">

                            <div>

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    Outstanding Amount
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-black
                                    text-red-400
                                    mt-3
                                ">
                                    ₹{summary.outstanding.toLocaleString()}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-red-500/10
                                border
                                border-red-500/20
                                flex
                                items-center
                                justify-center
                            ">

                                <AlertCircle
                                    size={21}
                                    className="text-red-400"
                                />

                            </div>

                        </div>

                        <p className="
                            text-gray-600
                            text-xs
                            mt-5
                        ">
                            Amount yet to be collected
                        </p>

                    </div>

                </div>


                {/* =====================================================
                            SEARCH + FILTER TOOLBAR
                ===================================================== */}

                <div className="
                    mt-10

                    rounded-3xl

                    border
                    border-[#252525]

                    bg-gradient-to-b
                    from-[#181818]
                    to-[#101010]

                    p-5
                ">

                    <div className="
                        flex
                        gap-4
                        items-center
                    ">


                        {/* SEARCH */}

                        <div className="
                            relative
                            flex-1
                        ">

                            <Search
                                size={20}
                                className="
                                    absolute
                                    left-5
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-500
                                "
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={searchChangeHandler}
                                placeholder="
                                    Search invoice number, customer or transaction...
                                "
                                className="
                                    w-full
                                    h-14

                                    pl-14
                                    pr-5

                                    rounded-2xl

                                    bg-[#0d0d0d]

                                    border
                                    border-[#292929]

                                    text-white

                                    placeholder:text-gray-600

                                    outline-none

                                    focus:border-red-500

                                    focus:ring-4
                                    focus:ring-red-500/10

                                    transition-all
                                "
                            />

                        </div>


                        {/* FILTER BUTTON */}

                        <button
                            onClick={() => setFilterOpen(true)}
                            className="
                                h-14

                                px-6

                                rounded-2xl

                                border
                                border-[#303030]

                                bg-[#181818]

                                text-gray-300

                                flex
                                items-center
                                gap-3

                                hover:border-red-500/40
                                hover:text-white

                                transition-all
                            "
                        >

                            <SlidersHorizontal size={19} />

                            Filters

                            {activeFilterCount > 0 && (

                                <span className="
                                    w-6
                                    h-6
                                    rounded-full

                                    bg-red-600

                                    text-white

                                    text-xs
                                    font-bold

                                    flex
                                    items-center
                                    justify-center
                                ">

                                    {activeFilterCount}

                                </span>

                            )}

                        </button>


                        {/* RESET */}

                        {(search || activeFilterCount > 0) && (

                            <button
                                onClick={clearFilters}
                                className="
                                    h-14
                                    w-14

                                    rounded-2xl

                                    border
                                    border-[#303030]

                                    bg-[#181818]

                                    text-gray-500

                                    hover:text-red-400
                                    hover:border-red-500/30

                                    flex
                                    items-center
                                    justify-center

                                    transition-all
                                "
                            >

                                <RotateCcw size={18} />

                            </button>

                        )}

                    </div>

                </div>


                {/* =====================================================
                                TABLE
                ===================================================== */}

                <div className="
                    mt-8

                    rounded-3xl

                    border
                    border-[#252525]

                    bg-gradient-to-b
                    from-[#171717]
                    to-[#101010]

                    overflow-hidden
                ">


                    {/* TABLE HEADER */}

                    <div className="
                        px-7
                        py-6

                        border-b
                        border-[#252525]

                        flex
                        justify-between
                        items-center
                    ">

                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                                text-white
                            ">
                                Invoice History
                            </h2>

                            <p className="
                                text-gray-600
                                text-sm
                                mt-1
                            ">
                                All billing transactions
                            </p>

                        </div>


                        <div className="
                            text-sm
                            text-gray-500
                        ">

                            Showing

                            <span className="
                                text-white
                                font-semibold
                                mx-1
                            ">
                                {invoices.length}
                            </span>

                            invoices

                        </div>

                    </div>


                    {/* TABLE */}

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="
                                    text-left
                                    text-xs
                                    uppercase
                                    tracking-[2px]
                                    text-gray-600

                                    border-b
                                    border-[#252525]
                                ">

                                    <th className="px-7 py-5">
                                        Invoice
                                    </th>

                                    <th className="px-5 py-5">
                                        Customer
                                    </th>

                                    <th className="px-5 py-5">
                                        Category
                                    </th>

                                    <th className="px-5 py-5">
                                        Amount
                                    </th>

                                    <th className="px-5 py-5">
                                        Payment
                                    </th>

                                    <th className="px-5 py-5">
                                        Status
                                    </th>

                                    <th className="px-5 py-5">
                                        Date
                                    </th>

                                    <th className="px-7 py-5 text-right">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {invoices.map((invoice) => {

                                    const status =
                                        getStatusStyle(invoice.status);

                                    const StatusIcon =
                                        status.icon;

                                    return (

                                        <tr
                                            key={invoice._id}
                                            className="
                                                border-b
                                                border-[#202020]

                                                hover:bg-[#181818]

                                                transition-colors
                                            "
                                        >

                                            {/* BILL NUMBER */}

                                            <td className="px-7 py-6">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className="
                                                        w-10
                                                        h-10
                                                        rounded-xl

                                                        bg-red-500/10

                                                        border
                                                        border-red-500/20

                                                        flex
                                                        items-center
                                                        justify-center
                                                    ">

                                                        <Receipt
                                                            size={17}
                                                            className="text-red-400"
                                                        />

                                                    </div>

                                                    <div>

                                                        <p className="
                                                            text-white
                                                            font-bold
                                                        ">

                                                            {invoice.billNumber}

                                                        </p>

                                                        <p className="
                                                            text-gray-600
                                                            text-xs
                                                            mt-1
                                                        ">

                                                            #{invoice._id}

                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* CUSTOMER */}

                                            <td className="px-5 py-6">

                                                <p className="
                                                    text-white
                                                    font-medium
                                                ">

                                                    {invoice.invoiceTo}

                                                </p>

                                                <p className="
                                                    text-gray-600
                                                    text-xs
                                                    mt-1
                                                ">

                                                    Processed by {invoice.processedBy}

                                                </p>

                                            </td>


                                            {/* CATEGORY */}

                                            <td className="px-5 py-6">

                                                <span className="
                                                    px-3
                                                    py-1.5

                                                    rounded-full

                                                    bg-[#1d1d1d]

                                                    border
                                                    border-[#303030]

                                                    text-gray-400

                                                    text-xs
                                                    font-semibold
                                                ">

                                                    {getCategoryLabel(
                                                        invoice.category
                                                    )}

                                                </span>

                                            </td>


                                            {/* AMOUNT */}

                                            <td className="px-5 py-6">

                                                <p className="
                                                    text-white
                                                    font-black
                                                    text-lg
                                                ">

                                                    ₹
                                                    {invoice.finalAmount.toLocaleString()}

                                                </p>

                                                {invoice.discountAmount > 0 && (

                                                    <p className="
                                                        text-gray-600
                                                        text-xs
                                                        mt-1
                                                    ">

                                                        Discount ₹
                                                        {invoice.discountAmount}

                                                    </p>

                                                )}

                                            </td>


                                            {/* PAYMENT */}

                                            <td className="px-5 py-6">

                                                <p className="
                                                    text-gray-300
                                                    capitalize
                                                    font-medium
                                                ">

                                                    {invoice.paymentMethod
                                                        ?.replace("_", " ")}

                                                </p>

                                                <p className="
                                                    text-gray-600
                                                    text-xs
                                                    mt-1
                                                ">

                                                    Received ₹
                                                    {invoice.paymentReceived.toLocaleString()}

                                                </p>

                                            </td>


                                            {/* STATUS */}

                                            <td className="px-5 py-6">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        gap-2

                                                        px-3
                                                        py-1.5

                                                        rounded-full

                                                        border

                                                        text-xs
                                                        font-bold

                                                        ${status.className}
                                                    `}
                                                >

                                                    <StatusIcon size={13}/>

                                                    {status.label}

                                                </span>

                                            </td>


                                            {/* DATE */}

                                            <td className="px-5 py-6">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-gray-400
                                                    text-sm
                                                ">

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

                    <div
                        onClick={() => setFilterOpen(false)}
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

                        w-[650px]
                        max-w-[95vw]

                        max-h-[90vh]

                        overflow-y-auto

                        rounded-[32px]

                        border
                        border-[#2d2d2d]

                        bg-gradient-to-b
                        from-[#181818]
                        via-[#111111]
                        to-[#0b0b0b]

                        shadow-[0_40px_120px_rgba(0,0,0,.7)]

                        z-[90]
                    ">


                        {/* MODAL HEADER */}

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
                                    uppercase
                                    tracking-[4px]
                                    text-red-400
                                    text-xs
                                    font-bold
                                ">
                                    Invoice Search
                                </p>

                                <h2 className="
                                    text-2xl
                                    font-black
                                    text-white
                                    mt-2
                                ">
                                    Advanced Filters
                                </h2>

                                <p className="
                                    text-gray-600
                                    text-sm
                                    mt-2
                                ">
                                    Narrow down invoices using billing parameters.
                                </p>

                            </div>


                            <button
                                onClick={() => setFilterOpen(false)}
                                className="
                                    w-11
                                    h-11

                                    rounded-xl

                                    bg-[#1b1b1b]

                                    border
                                    border-[#303030]

                                    hover:bg-red-500

                                    text-gray-400
                                    hover:text-white

                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <X size={19}/>

                            </button>

                        </div>


                        {/* MODAL BODY */}

                        <div className="p-7">

                            {/* CATEGORY */}

                            <div>

                                <label className="
                                    text-gray-400
                                    text-sm
                                ">
                                    Invoice Category
                                </label>

                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={filterChangeHandler}
                                    className="premiumInput mt-2"
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

                            <div className="
                                grid
                                grid-cols-2
                                gap-5
                                mt-5
                            ">

                                <div>

                                    <label className="
                                        text-gray-400
                                        text-sm
                                    ">
                                        Payment Status
                                    </label>

                                    <select
                                        name="status"
                                        value={filters.status}
                                        onChange={filterChangeHandler}
                                        className="premiumInput mt-2"
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


                                <div>

                                    <label className="
                                        text-gray-400
                                        text-sm
                                    ">
                                        Payment Method
                                    </label>

                                    <select
                                        name="paymentMethod"
                                        value={filters.paymentMethod}
                                        onChange={filterChangeHandler}
                                        className="premiumInput mt-2"
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


                            {/* DATE RANGE */}

                            <div className="mt-7">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <CalendarDays
                                        size={16}
                                        className="text-red-400"
                                    />

                                    <p className="
                                        text-white
                                        font-semibold
                                    ">
                                        Invoice Date
                                    </p>

                                </div>


                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-5
                                    mt-4
                                ">

                                    <div>

                                        <label className="
                                            text-gray-500
                                            text-xs
                                        ">
                                            From
                                        </label>

                                        <input
                                            type="date"
                                            name="fromDate"
                                            value={filters.fromDate}
                                            onChange={filterChangeHandler}
                                            className="premiumInput mt-2"
                                        />

                                    </div>


                                    <div>

                                        <label className="
                                            text-gray-500
                                            text-xs
                                        ">
                                            To
                                        </label>

                                        <input
                                            type="date"
                                            name="toDate"
                                            value={filters.toDate}
                                            onChange={filterChangeHandler}
                                            className="premiumInput mt-2"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* AMOUNT RANGE */}

                            <div className="mt-7">

                                <p className="
                                    text-white
                                    font-semibold
                                ">
                                    Invoice Amount
                                </p>

                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-5
                                    mt-4
                                ">

                                    <div>

                                        <label className="
                                            text-gray-500
                                            text-xs
                                        ">
                                            Minimum Amount
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            name="minAmount"
                                            value={filters.minAmount}
                                            onChange={filterChangeHandler}
                                            placeholder="₹0"
                                            className="premiumInput mt-2"
                                        />

                                    </div>


                                    <div>

                                        <label className="
                                            text-gray-500
                                            text-xs
                                        ">
                                            Maximum Amount
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            name="maxAmount"
                                            value={filters.maxAmount}
                                            onChange={filterChangeHandler}
                                            placeholder="₹100000"
                                            className="premiumInput mt-2"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* PROCESSED BY */}

                            <div className="mt-7">

                                <label className="
                                    text-gray-400
                                    text-sm
                                ">
                                    Processed By
                                </label>

                                <input
                                    type="text"
                                    name="processedBy"
                                    value={filters.processedBy}
                                    onChange={filterChangeHandler}
                                    placeholder="Admin / Reception / Staff..."
                                    className="premiumInput mt-2"
                                />

                            </div>

                        </div>


                        {/* MODAL FOOTER */}

                        <div className="
                            px-7
                            py-6

                            border-t
                            border-[#252525]

                            flex
                            justify-between
                            items-center
                        ">

                            <button
                                onClick={clearFilters}
                                className="
                                    flex
                                    items-center
                                    gap-2

                                    text-gray-500

                                    hover:text-red-400

                                    transition
                                "
                            >

                                <RotateCcw size={16}/>

                                Clear All

                            </button>


                            <button
                                onClick={() => setFilterOpen(false)}
                                className="
                                    px-8
                                    h-12

                                    rounded-2xl

                                    bg-gradient-to-r
                                    from-red-700
                                    to-red-500

                                    text-white

                                    font-bold

                                    hover:shadow-[0_15px_30px_rgba(239,68,68,.3)]

                                    transition-all
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
                                ">

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