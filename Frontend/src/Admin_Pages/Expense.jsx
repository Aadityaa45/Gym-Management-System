import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
    Search,
    Plus,
    Receipt,
    Wallet,
    TrendingDown,
    Clock3,
    Repeat,
    ChevronDown,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    Download,
    CalendarDays,
    Filter,
    X,
    ArrowDownRight,
    Zap,
    Wrench,
    Users,
    Building2,
    ShieldCheck,
    CreditCard,
    Banknote,
    Landmark,
    FileText,
    Upload,
    CheckCircle2,
    AlertCircle,
    XCircle,
    RotateCcw,
} from "lucide-react";


const ExpenseManagement = () => {

    const [search, setSearch] = useState("");

    const [filterOpen, setFilterOpen] = useState(false);

    const [expenseModalOpen, setExpenseModalOpen] = useState(false);

    const [selectedExpense, setSelectedExpense] = useState(null);

    const [filters, setFilters] = useState({
        category: "",
        status: "",
        paymentMethod: "",
        dateFrom: "",
        dateTo: "",
        minAmount: "",
        maxAmount: "",
        recurring: "",
    });

    const [newExpanseData, setNewExpanseData] = useState({
        title: "",
        category: "",
        amount: "",
        expenseDate: "",
        paidTo: "",
        paymentMethod: "",
        isRecurring: false,
        notes: "",
    });

    const handleNewExpanseChange = (e) =>{
        const {name,value,type,checked} = e.target
        setNewExpanseData((prev)=>({
            ...prev,
            [name]:type==="checkbox"?checked:value
        }))
    }

    //THIS IS THE FUNCTION TO CRREATE A NEW EXPANSE AND SAVE IT TO OUR DB THROUGH OUR BACKEND 
    const createNewExpanse = async () =>{
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(
                `${backendUrl}/api/admin/expanses/create-expanse`,
                newExpanseData,
                {
                    withCredentials:true
                }
            )

            if(response.data.success){
                toast.success("New Expanse Added Successfully")
                setExpenseModalOpen(false)
            }
        } catch (error) {
            toast.error("Something went wrong!!")
            console.log(error)
        }
    }


    // --------------------------------------------------
    // SAMPLE DATA
    // --------------------------------------------------

    const expenses = [
        {
            id: "EXP-00041",
            title: "Electricity Bill",
            category: "Utilities",
            description: "Monthly electricity bill",
            amount: 18450,
            date: "2026-08-18",
            paymentMethod: "Bank Transfer",
            paidTo: "Madhya Pradesh Electricity Board",
            status: "Paid",
            recurring: true,
            processedBy: "Aaditya",
        },
        {
            id: "EXP-00040",
            title: "AC Maintenance",
            category: "Maintenance",
            description: "Quarterly AC servicing",
            amount: 8500,
            date: "2026-08-17",
            paymentMethod: "UPI",
            paidTo: "CoolTech Services",
            status: "Paid",
            recurring: false,
            processedBy: "Rahul",
        },
        {
            id: "EXP-00039",
            title: "Trainer Salary",
            category: "Employee",
            description: "Monthly trainer payment",
            amount: 42000,
            date: "2026-08-15",
            paymentMethod: "Bank Transfer",
            paidTo: "Fitness Staff",
            status: "Paid",
            recurring: true,
            processedBy: "Admin",
        },
        {
            id: "EXP-00038",
            title: "Cleaning Supplies",
            category: "Supplies",
            description: "Cleaning materials and consumables",
            amount: 4250,
            date: "2026-08-13",
            paymentMethod: "Cash",
            paidTo: "CleanMart",
            status: "Paid",
            recurring: false,
            processedBy: "Reception",
        },
        {
            id: "EXP-00037",
            title: "Internet Subscription",
            category: "Utilities",
            description: "Monthly broadband subscription",
            amount: 2499,
            date: "2026-08-10",
            paymentMethod: "UPI",
            paidTo: "Internet Provider",
            status: "Pending",
            recurring: true,
            processedBy: "Admin",
        },
    ];


    // --------------------------------------------------
    // CATEGORY CONFIG
    // --------------------------------------------------

    const categoryConfig = {

        Utilities: {
            icon: Zap,
        },

        Maintenance: {
            icon: Wrench,
        },

        Employee: {
            icon: Users,
        },

        Supplies: {
            icon: Receipt,
        },

        Rent: {
            icon: Building2,
        },

        Marketing: {
            icon: TrendingDown,
        },

        Equipment: {
            icon: ShieldCheck,
        },

        Other: {
            icon: FileText,
        },

    };


    // --------------------------------------------------
    // FILTERED EXPENSES
    // --------------------------------------------------

    const filteredExpenses = useMemo(() => {

        return expenses.filter((expense) => {

            const matchesSearch =
                !search ||
                expense.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                expense.paidTo
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                expense.id
                    .toLowerCase()
                    .includes(search.toLowerCase());


            const matchesCategory =
                !filters.category ||
                expense.category === filters.category;


            const matchesStatus =
                !filters.status ||
                expense.status === filters.status;


            const matchesPayment =
                !filters.paymentMethod ||
                expense.paymentMethod === filters.paymentMethod;


            const matchesRecurring =
                !filters.recurring ||
                String(expense.recurring) === filters.recurring;


            const matchesMin =
                !filters.minAmount ||
                expense.amount >= Number(filters.minAmount);


            const matchesMax =
                !filters.maxAmount ||
                expense.amount <= Number(filters.maxAmount);


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus &&
                matchesPayment &&
                matchesRecurring &&
                matchesMin &&
                matchesMax
            );

        });

    }, [search, filters]);


    // --------------------------------------------------
    // HANDLERS
    // --------------------------------------------------

    const filterChangeHandler = (e) => {

        const {
            name,
            value
        } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const clearFilters = () => {

        setFilters({
            category: "",
            status: "",
            paymentMethod: "",
            dateFrom: "",
            dateTo: "",
            minAmount: "",
            maxAmount: "",
            recurring: "",
        });

    };


    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(amount);

    };


    return (

        <div className="
            min-h-screen
            bg-[#080808]
            text-white
            px-6
            py-7
        ">


            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
            ">

                <div>

                    <div className="
                        flex
                        items-center
                        gap-2
                        text-red-400
                        text-xs
                        font-bold
                        uppercase
                        tracking-[4px]
                    ">

                        <Wallet size={14}/>

                        Financial Management

                    </div>


                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-black
                        tracking-tight
                        mt-2
                    ">

                        Expense Tracking

                    </h1>


                    <p className="
                        text-gray-500
                        mt-2
                        text-sm
                    ">

                        Monitor, manage and analyze every expense of your gym.

                    </p>

                </div>


                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <button
                        className="
                            h-11
                            px-5
                            rounded-xl
                            border
                            border-[#292929]
                            bg-[#111111]
                            text-gray-300
                            hover:bg-[#181818]
                            transition
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Download size={17}/>

                        Export

                    </button>


                    <button
                        onClick={() => setExpenseModalOpen(true)}
                        className="
                            h-11
                            px-5
                            rounded-xl
                            bg-gradient-to-r
                            from-red-700
                            to-red-500
                            text-white
                            font-bold
                            shadow-[0_10px_30px_rgba(239,68,68,.18)]
                            hover:shadow-[0_14px_35px_rgba(239,68,68,.28)]
                            transition
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Plus size={18}/>

                        Add Expense

                    </button>

                </div>

            </div>



            {/* ================================================= */}
            {/* KPI CARDS */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-4
                mt-8
            ">


                {/* TOTAL EXPENSE */}

                <div className="
                    rounded-2xl
                    border
                    border-[#242424]
                    bg-[#111111]
                    p-5
                    relative
                    overflow-hidden
                ">

                    <div className="
                        absolute
                        right-0
                        top-0
                        w-24
                        h-24
                        bg-red-500/5
                        blur-2xl
                    "/>


                    <div className="
                        flex
                        items-center
                        justify-between
                    ">

                        <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-red-500/10
                            text-red-400
                            flex
                            items-center
                            justify-center
                        ">

                            <TrendingDown size={19}/>

                        </div>


                        <span className="
                            text-xs
                            text-red-400
                            bg-red-500/10
                            px-2
                            py-1
                            rounded-lg
                        ">

                            This Month

                        </span>

                    </div>


                    <p className="
                        text-gray-500
                        text-sm
                        mt-5
                    ">

                        Total Expenses

                    </p>


                    <h2 className="
                        text-2xl
                        font-black
                        mt-1
                    ">

                        ₹1,42,850

                    </h2>


                    <div className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        text-red-400
                        mt-2
                    ">

                        <ArrowDownRight size={14}/>

                        8.4% from last month

                    </div>

                </div>



                {/* PAID */}

                <div className="
                    rounded-2xl
                    border
                    border-[#242424]
                    bg-[#111111]
                    p-5
                ">

                    <div className="
                        w-10
                        h-10
                        rounded-xl
                        bg-emerald-500/10
                        text-emerald-400
                        flex
                        items-center
                        justify-center
                    ">

                        <CheckCircle2 size={19}/>

                    </div>


                    <p className="
                        text-gray-500
                        text-sm
                        mt-5
                    ">

                        Paid Expenses

                    </p>


                    <h2 className="
                        text-2xl
                        font-black
                        mt-1
                    ">

                        ₹1,24,600

                    </h2>


                    <p className="
                        text-xs
                        text-gray-600
                        mt-2
                    ">

                        38 transactions

                    </p>

                </div>



                {/* PENDING */}

                <div className="
                    rounded-2xl
                    border
                    border-[#242424]
                    bg-[#111111]
                    p-5
                ">

                    <div className="
                        w-10
                        h-10
                        rounded-xl
                        bg-yellow-500/10
                        text-yellow-400
                        flex
                        items-center
                        justify-center
                    ">

                        <Clock3 size={19}/>

                    </div>


                    <p className="
                        text-gray-500
                        text-sm
                        mt-5
                    ">

                        Pending Expenses

                    </p>


                    <h2 className="
                        text-2xl
                        font-black
                        mt-1
                    ">

                        ₹18,250

                    </h2>


                    <p className="
                        text-xs
                        text-gray-600
                        mt-2
                    ">

                        5 awaiting payment

                    </p>

                </div>



                {/* RECURRING */}

                <div className="
                    rounded-2xl
                    border
                    border-[#242424]
                    bg-[#111111]
                    p-5
                ">

                    <div className="
                        w-10
                        h-10
                        rounded-xl
                        bg-blue-500/10
                        text-blue-400
                        flex
                        items-center
                        justify-center
                    ">

                        <Repeat size={19}/>

                    </div>


                    <p className="
                        text-gray-500
                        text-sm
                        mt-5
                    ">

                        Recurring Expenses

                    </p>


                    <h2 className="
                        text-2xl
                        font-black
                        mt-1
                    ">

                        ₹67,400

                    </h2>


                    <p className="
                        text-xs
                        text-gray-600
                        mt-2
                    ">

                        Expected monthly

                    </p>

                </div>

            </div>



            {/* ================================================= */}
            {/* ANALYTICS */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-3
                gap-5
                mt-5
            ">


                {/* EXPENSE TREND */}

                <div className="
                    xl:col-span-2
                    rounded-2xl
                    border
                    border-[#242424]
                    bg-[#111111]
                    p-6
                ">

                    <div className="
                        flex
                        justify-between
                        items-start
                    ">

                        <div>

                            <h3 className="
                                font-bold
                                text-lg
                            ">

                                Expense Overview

                            </h3>

                            <p className="
                                text-gray-600
                                text-xs
                                mt-1
                            ">

                                Monthly spending trend

                            </p>

                        </div>


                        <select
                            className="
                                bg-[#181818]
                                border
                                border-[#2b2b2b]
                                rounded-lg
                                px-3
                                py-2
                                text-xs
                                text-gray-400
                                outline-none
                            "
                        >

                            <option>Last 6 Months</option>
                            <option>This Year</option>
                            <option>Last 12 Months</option>

                        </select>

                    </div>


                    {/* GRAPH PLACEHOLDER */}

                    <div className="
                        h-52
                        mt-7
                        flex
                        items-end
                        gap-4
                        px-3
                    ">

                        {[42, 65, 48, 82, 61, 92, 74, 88, 68, 96, 78, 85].map(
                            (height, index) => (

                                <div
                                    key={index}
                                    className="
                                        flex-1
                                        h-full
                                        flex
                                        items-end
                                    "
                                >

                                    <div
                                        style={{
                                            height: `${height}%`
                                        }}
                                        className="
                                            w-full
                                            rounded-t-lg
                                            bg-gradient-to-t
                                            from-red-700/30
                                            to-red-500
                                            hover:from-red-700
                                            transition
                                        "
                                    />

                                </div>

                            )
                        )}

                    </div>


                    <div className="
                        flex
                        justify-between
                        text-[10px]
                        text-gray-600
                        mt-3
                    ">

                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>

                    </div>

                </div>



                {/* CATEGORY BREAKDOWN */}

                <div className="
                    rounded-2xl
                    border
                    border-[#242424]
                    bg-[#111111]
                    p-6
                ">

                    <h3 className="
                        font-bold
                        text-lg
                    ">

                        Spending Categories

                    </h3>


                    <p className="
                        text-gray-600
                        text-xs
                        mt-1
                    ">

                        Where your money goes

                    </p>


                    <div className="
                        space-y-5
                        mt-7
                    ">

                        {[
                            ["Employee", "₹58,000", "41%"],
                            ["Utilities", "₹31,450", "22%"],
                            ["Maintenance", "₹22,800", "16%"],
                            ["Supplies", "₹15,600", "11%"],
                            ["Other", "₹14,000", "10%"],
                        ].map(
                            ([category, amount, percentage]) => (

                                <div key={category}>

                                    <div className="
                                        flex
                                        justify-between
                                        text-sm
                                        mb-2
                                    ">

                                        <span className="text-gray-400">
                                            {category}
                                        </span>

                                        <span className="text-gray-300">
                                            {amount}
                                        </span>

                                    </div>


                                    <div className="
                                        h-1.5
                                        rounded-full
                                        bg-[#222222]
                                        overflow-hidden
                                    ">

                                        <div
                                            style={{
                                                width: percentage
                                            }}
                                            className="
                                                h-full
                                                rounded-full
                                                bg-red-500
                                            "
                                        />

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </div>



            {/* ================================================= */}
            {/* EXPENSE TABLE */}
            {/* ================================================= */}

            <div className="
                mt-5
                rounded-2xl
                border
                border-[#242424]
                bg-[#111111]
                overflow-hidden
            ">


                {/* TABLE HEADER */}

                <div className="
                    p-5
                    border-b
                    border-[#242424]
                    flex
                    flex-col
                    xl:flex-row
                    gap-4
                    xl:items-center
                    xl:justify-between
                ">


                    <div>

                        <h3 className="
                            font-bold
                            text-lg
                        ">

                            Expense Records

                        </h3>

                        <p className="
                            text-gray-600
                            text-xs
                            mt-1
                        ">

                            Complete history of gym expenses

                        </p>

                    </div>



                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                    ">


                        {/* SEARCH */}

                        <div className="
                            relative
                            w-full
                            sm:w-72
                        ">

                            <Search
                                size={17}
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-600
                                "
                            />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search expenses..."
                                className="
                                    w-full
                                    h-10
                                    pl-10
                                    pr-4
                                    rounded-xl
                                    bg-[#181818]
                                    border
                                    border-[#292929]
                                    text-sm
                                    text-white
                                    placeholder:text-gray-600
                                    outline-none
                                    focus:border-red-500/50
                                "
                            />

                        </div>


                        {/* FILTER */}

                        <button
                            onClick={() => setFilterOpen(true)}
                            className="
                                h-10
                                px-4
                                rounded-xl
                                border
                                border-[#292929]
                                bg-[#181818]
                                text-gray-400
                                hover:text-white
                                hover:border-[#3b3b3b]
                                flex
                                items-center
                                justify-center
                                gap-2
                                transition
                            "
                        >

                            <Filter size={16}/>

                            Filters

                        </button>

                    </div>

                </div>



                {/* TABLE */}

                <div className="
                    overflow-x-auto
                ">

                    <table className="
                        w-full
                        min-w-[1050px]
                    ">

                        <thead>

                            <tr className="
                                text-left
                                text-[11px]
                                uppercase
                                tracking-wider
                                text-gray-600
                                border-b
                                border-[#202020]
                            ">

                                <th className="px-5 py-4">
                                    Expense
                                </th>

                                <th className="px-5 py-4">
                                    Category
                                </th>

                                <th className="px-5 py-4">
                                    Paid To
                                </th>

                                <th className="px-5 py-4">
                                    Date
                                </th>

                                <th className="px-5 py-4">
                                    Payment
                                </th>

                                <th className="px-5 py-4">
                                    Amount
                                </th>

                                <th className="px-5 py-4">
                                    Status
                                </th>

                                <th className="px-5 py-4">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredExpenses.map((expense) => {

                                const CategoryIcon =
                                    categoryConfig[
                                        expense.category
                                    ]?.icon || Receipt;


                                return (

                                    <tr
                                        key={expense.id}
                                        className="
                                            border-b
                                            border-[#1d1d1d]
                                            hover:bg-[#151515]
                                            transition
                                        "
                                    >


                                        {/* EXPENSE */}

                                        <td className="px-5 py-4">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <div className="
                                                    w-10
                                                    h-10
                                                    rounded-xl
                                                    bg-[#1b1b1b]
                                                    border
                                                    border-[#292929]
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-red-400
                                                ">

                                                    <Receipt size={17}/>

                                                </div>


                                                <div>

                                                    <p className="
                                                        font-semibold
                                                        text-sm
                                                    ">

                                                        {expense.title}

                                                    </p>

                                                    <p className="
                                                        text-[11px]
                                                        text-gray-600
                                                        mt-1
                                                    ">

                                                        {expense.id}

                                                    </p>

                                                </div>

                                            </div>

                                        </td>



                                        {/* CATEGORY */}

                                        <td className="px-5 py-4">

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                text-sm
                                                text-gray-400
                                            ">

                                                <CategoryIcon
                                                    size={15}
                                                />

                                                {expense.category}

                                            </div>

                                        </td>



                                        {/* PAID TO */}

                                        <td className="px-5 py-4">

                                            <div>

                                                <p className="
                                                    text-sm
                                                    text-gray-300
                                                ">

                                                    {expense.paidTo}

                                                </p>

                                                {expense.recurring && (

                                                    <span className="
                                                        inline-flex
                                                        items-center
                                                        gap-1
                                                        text-[10px]
                                                        text-blue-400
                                                        mt-1
                                                    ">

                                                        <Repeat size={10}/>

                                                        Recurring

                                                    </span>

                                                )}

                                            </div>

                                        </td>



                                        {/* DATE */}

                                        <td className="px-5 py-4">

                                            <span className="
                                                text-sm
                                                text-gray-400
                                            ">

                                                {new Date(
                                                    expense.date
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}

                                            </span>

                                        </td>



                                        {/* PAYMENT */}

                                        <td className="px-5 py-4">

                                            <span className="
                                                text-xs
                                                text-gray-400
                                                flex
                                                items-center
                                                gap-2
                                            ">

                                                <CreditCard size={14}/>

                                                {expense.paymentMethod}

                                            </span>

                                        </td>



                                        {/* AMOUNT */}

                                        <td className="px-5 py-4">

                                            <span className="
                                                font-bold
                                                text-sm
                                            ">

                                                {formatCurrency(
                                                    expense.amount
                                                )}

                                            </span>

                                        </td>



                                        {/* STATUS */}

                                        <td className="px-5 py-4">

                                            {expense.status === "Paid" ? (

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    gap-1.5
                                                    px-2.5
                                                    py-1
                                                    rounded-lg
                                                    text-[11px]
                                                    font-semibold
                                                    bg-emerald-500/10
                                                    text-emerald-400
                                                ">

                                                    <CheckCircle2 size={12}/>

                                                    Paid

                                                </span>

                                            ) : (

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    gap-1.5
                                                    px-2.5
                                                    py-1
                                                    rounded-lg
                                                    text-[11px]
                                                    font-semibold
                                                    bg-yellow-500/10
                                                    text-yellow-400
                                                ">

                                                    <Clock3 size={12}/>

                                                    Pending

                                                </span>

                                            )}

                                        </td>



                                        {/* ACTION */}

                                        <td className="px-5 py-4">

                                            <button
                                                onClick={() =>
                                                    setSelectedExpense(
                                                        expense
                                                    )
                                                }
                                                className="
                                                    w-9
                                                    h-9
                                                    rounded-lg
                                                    bg-[#191919]
                                                    border
                                                    border-[#292929]
                                                    text-gray-500
                                                    hover:text-white
                                                    hover:border-[#444]
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <MoreVertical
                                                    size={16}
                                                />

                                            </button>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>



                {/* TABLE FOOTER */}

                <div className="
                    px-5
                    py-4
                    border-t
                    border-[#242424]
                    flex
                    items-center
                    justify-between
                    text-xs
                    text-gray-600
                ">

                    <span>
                        Showing {filteredExpenses.length} expenses
                    </span>

                    <div className="
                        flex
                        items-center
                        gap-2
                    ">

                        <button className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#181818]
                            border
                            border-[#292929]
                            disabled:opacity-40
                        ">

                            ‹

                        </button>

                        <span className="
                            w-8
                            h-8
                            rounded-lg
                            bg-red-500
                            text-white
                            flex
                            items-center
                            justify-center
                            font-semibold
                        ">

                            1

                        </span>

                        <button className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#181818]
                            border
                            border-[#292929]
                        ">

                            ›

                        </button>

                    </div>

                </div>

            </div>



            {/* ================================================= */}
            {/* ADD EXPENSE MODAL */}
            {/* ================================================= */}

            {expenseModalOpen && (

    <>

        {/* =========================================================
                            BACKDROP
        ========================================================== */}

        <div
            onClick={() => setExpenseModalOpen(false)}
            className="
                fixed
                inset-0
                z-[80]
                bg-black/80
                backdrop-blur-xl
                transition-opacity
            "
        />


        {/* =========================================================
                            MODAL
        ========================================================== */}

        <div
            className="
                fixed
                left-1/2
                top-1/2
                z-[90]

                w-[720px]
                max-w-[95vw]
                max-h-[92vh]

                -translate-x-1/2
                -translate-y-1/2

                overflow-hidden

                rounded-[30px]

                border
                border-white/[0.08]

                bg-[#0b0b0b]

                shadow-[0_40px_120px_rgba(0,0,0,.8)]

                flex
                flex-col
            "
        >

            {/* =====================================================
                                TOP GLOW
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-red-600/10
                    blur-[110px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    bottom-20
                    h-64
                    w-64
                    rounded-full
                    bg-red-600/[0.06]
                    blur-[100px]
                "
            />


            {/* =====================================================
                                HEADER
            ====================================================== */}

            <div
                className="
                    relative
                    shrink-0

                    border-b
                    border-white/[0.07]

                    bg-white/[0.015]

                    px-7
                    py-6
                "
            >

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-4">

                        {/* Icon */}

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center

                                rounded-2xl

                                border
                                border-red-500/20

                                bg-red-500/10

                                shadow-[0_0_30px_rgba(239,68,68,.08)]
                            "
                        >

                            <Receipt
                                size={21}
                                className="text-red-400"
                            />

                        </div>


                        {/* Heading */}

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[4px]
                                    text-red-400
                                "
                            >
                                Expense Management
                            </p>

                            <h2
                                className="
                                    mt-1
                                    text-2xl
                                    font-black
                                    tracking-tight
                                    text-white
                                "
                            >
                                Record New Expense
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                "
                            >
                                Add a financial expense to your gym records.
                            </p>

                        </div>

                    </div>


                    {/* Close */}

                    <button
                        type="button"
                        onClick={() => setExpenseModalOpen(false)}
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center

                            rounded-xl

                            border
                            border-white/[0.07]

                            bg-white/[0.03]

                            text-gray-500

                            transition-all
                            duration-200

                            hover:border-red-500/30
                            hover:bg-red-500/10
                            hover:text-red-400
                        "
                    >

                        <X size={18} />

                    </button>

                </div>

            </div>


            {/* =====================================================
                                FORM BODY
            ====================================================== */}

            <div
                className="
                    relative
                    min-h-0
                    flex-1
                    overflow-y-auto

                    px-7
                    py-7

                    scrollbar-thin
                    scrollbar-track-transparent
                    scrollbar-thumb-white/10
                "
            >

                <div className="space-y-7">


                    {/* =================================================
                                BASIC INFORMATION
                    ================================================== */}

                    <div>

                        <div className="mb-4 flex items-center gap-3">

                            <div className="h-px flex-1 bg-white/[0.06]" />

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[3px]
                                    text-gray-600
                                "
                            >
                                Basic Information
                            </span>

                            <div className="h-px flex-1 bg-white/[0.06]" />

                        </div>


                        <div className="grid grid-cols-2 gap-5">


                            {/* TITLE */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        text-gray-400
                                    "
                                >
                                    Expense Title
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <div className="relative">

                                    <FileText
                                        size={16}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-600
                                        "
                                    />

                                    <input
                                        name="title"
                                        onChange={handleNewExpanseChange}
                                        value={newExpanseData.title}
                                        placeholder="Electricity Bill"
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            pl-11
                                            pr-4
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-gray-700

                                            transition-all

                                            focus:border-red-500/40
                                            focus:bg-white/[0.04]
                                            focus:ring-4
                                            focus:ring-red-500/[0.06]
                                        "
                                    />

                                </div>

                            </div>


                            {/* CATEGORY */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        text-gray-400
                                    "
                                >
                                    Category
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <div className="relative">

                                    <Wallet
                                        size={16}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-600
                                        "
                                    />

                                    <select
                                        name="category"
                                        onChange={handleNewExpanseChange}
                                        value={newExpanseData.category}
                                        className="
                                            h-12
                                            w-full
                                            appearance-none
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            pl-11
                                            pr-10
                                            text-sm
                                            text-white
                                            outline-none

                                            focus:border-red-500/40
                                            focus:bg-white/[0.04]
                                            focus:ring-4
                                            focus:ring-red-500/[0.06]
                                        "
                                    >

                                        <option value="">
                                            Select category
                                        </option>

                                        <option value="utilities">
                                            Utilities
                                        </option>

                                        <option value="maintenance">
                                            Maintenance
                                        </option>

                                        <option value="employee">
                                            Employee
                                        </option>

                                        <option value="rent">
                                            Rent
                                        </option>

                                        <option value="equipment">
                                            Equipment
                                        </option>

                                        <option value="supplies">
                                            Supplies
                                        </option>

                                        <option value="marketing">
                                            Marketing
                                        </option>

                                        <option value="other">
                                            Other
                                        </option>

                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="
                                            pointer-events-none
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-600
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                                PAYMENT INFORMATION
                    ================================================== */}

                    <div>

                        <div className="mb-4 flex items-center gap-3">

                            <div className="h-px flex-1 bg-white/[0.06]" />

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[3px]
                                    text-gray-600
                                "
                            >
                                Payment Details
                            </span>

                            <div className="h-px flex-1 bg-white/[0.06]" />

                        </div>


                        <div className="grid grid-cols-2 gap-5">


                            {/* AMOUNT */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        text-gray-400
                                    "
                                >
                                    Amount
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <div className="relative">

                                    <span
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-sm
                                            font-bold
                                            text-red-400
                                        "
                                    >
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        name="amount"
                                        value={newExpanseData.amount}
                                        onChange={handleNewExpanseChange}
                                        min="0"
                                        placeholder="0.00"
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            pl-9
                                            pr-4
                                            text-sm
                                            font-semibold
                                            text-white
                                            outline-none
                                            placeholder:text-gray-700

                                            focus:border-red-500/40
                                            focus:bg-white/[0.04]
                                            focus:ring-4
                                            focus:ring-red-500/[0.06]
                                        "
                                    />

                                </div>

                            </div>


                            {/* DATE */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        text-gray-400
                                    "
                                >
                                    Expense Date
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <div className="relative">

                                    <CalendarDays
                                        size={16}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-600
                                        "
                                    />

                                    <input
                                        type="date"
                                        name="expenseDate"
                                        onChange={handleNewExpanseChange}
                                        value={newExpanseData.expenseDate}
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            pl-11
                                            pr-4
                                            text-sm
                                            text-white
                                            outline-none

                                            focus:border-red-500/40
                                            focus:bg-white/[0.04]
                                            focus:ring-4
                                            focus:ring-red-500/[0.06]
                                        "
                                    />

                                </div>

                            </div>


                            {/* VENDOR */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        text-gray-400
                                    "
                                >
                                    Paid To / Vendor
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <div className="relative">

                                    <Building2
                                        size={16}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-600
                                        "
                                    />

                                    <input
                                        placeholder="Vendor or organization"
                                        name="paidTo"
                                        value={newExpanseData.paidTo}
                                        onChange={handleNewExpanseChange}
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            pl-11
                                            pr-4
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-gray-700

                                            focus:border-red-500/40
                                            focus:bg-white/[0.04]
                                            focus:ring-4
                                            focus:ring-red-500/[0.06]
                                        "
                                    />

                                </div>

                            </div>


                            {/* PAYMENT METHOD */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        text-gray-400
                                    "
                                >
                                    Payment Method
                                    <span className="ml-1 text-red-400">*</span>
                                </label>

                                <div className="relative">

                                    <CreditCard
                                        size={16}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-600
                                        "
                                    />

                                    <select
                                        name="paymentMethod"
                                        onChange={handleNewExpanseChange}
                                        value={newExpanseData.paymentMethod}
                                        className="
                                            h-12
                                            w-full
                                            appearance-none
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            pl-11
                                            pr-10
                                            text-sm
                                            text-white
                                            outline-none

                                            focus:border-red-500/40
                                            focus:bg-white/[0.04]
                                            focus:ring-4
                                            focus:ring-red-500/[0.06]
                                        "
                                    >

                                        <option value="">
                                            Select method
                                        </option>

                                        <option value="cash">
                                            Cash
                                        </option>

                                        <option value="upi">
                                            UPI
                                        </option>

                                        <option value="cheque">
                                            Cheque
                                        </option>

                                        <option value="bank_transfer">
                                            Bank Transfer
                                        </option>

                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="
                                            pointer-events-none
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-600
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                                RECURRING
                    ================================================== */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between

                            rounded-2xl

                            border
                            border-blue-500/10

                            bg-blue-500/[0.04]

                            px-5
                            py-4
                        "
                    >

                        <div className="flex items-center gap-4">

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center

                                    rounded-xl

                                    bg-blue-500/10

                                    text-blue-400
                                "
                            >

                                <Repeat size={18} />

                            </div>


                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    Recurring Expense
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-gray-600
                                    "
                                >
                                    Track this expense automatically every month.
                                </p>

                            </div>

                        </div>


                        <label
                            className="
                                relative
                                inline-flex
                                cursor-pointer
                                items-center
                            "
                        >

                            <input
                                type="checkbox"
                                name="isRecurring"
                                checked={newExpanseData.isRecurring}
                                onChange={handleNewExpanseChange}
                                className="peer sr-only"
                            />

                            <div
                                className="
                                    h-6
                                    w-11
                                    rounded-full
                                    bg-white/10
                                    transition-all

                                    peer-checked:bg-red-500

                                    after:absolute
                                    after:left-[3px]
                                    after:top-[3px]
                                    after:h-4
                                    after:w-4
                                    after:rounded-full
                                    after:bg-white
                                    after:transition-all

                                    peer-checked:after:translate-x-5
                                "
                            />

                        </label>

                    </div>


                    {/* =================================================
                                NOTES
                    ================================================== */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-xs
                                font-medium
                                text-gray-400
                            "
                        >
                            Notes
                        </label>

                        <textarea
                            rows={4}
                            name="notes"
                            onChange={handleNewExpanseChange}
                            value={newExpanseData.notes}
                            placeholder="Add additional information about this expense..."
                            className="
                                w-full
                                resize-none
                                rounded-2xl

                                border
                                border-white/[0.08]

                                bg-white/[0.025]

                                px-5
                                py-4

                                text-sm
                                leading-6
                                text-white

                                outline-none

                                placeholder:text-gray-700

                                transition-all

                                focus:border-red-500/40
                                focus:bg-white/[0.04]
                                focus:ring-4
                                focus:ring-red-500/[0.06]
                            "
                        />

                    </div>

                </div>

            </div>


            {/* =====================================================
                                FOOTER
            ====================================================== */}

            <div
                className="
                    relative
                    shrink-0

                    flex
                    items-center
                    justify-between

                    border-t
                    border-white/[0.07]

                    bg-[#0b0b0b]

                    px-7
                    py-5
                "
            >

                <div className="flex items-center gap-2">

                    <ShieldCheck
                        size={15}
                        className="text-emerald-500"
                    />

                    <span
                        className="
                            text-xs
                            text-gray-600
                        "
                    >
                        Expense will be securely recorded.
                    </span>

                </div>


                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={() => setExpenseModalOpen(false)}
                        className="
                            h-11
                            rounded-xl

                            border
                            border-white/[0.08]

                            bg-white/[0.03]

                            px-5

                            text-sm
                            font-medium
                            text-gray-400

                            transition-all

                            hover:bg-white/[0.07]
                            hover:text-white
                        "
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        onClick={createNewExpanse}
                        className="
                            group

                            flex
                            h-11
                            items-center
                            gap-2

                            rounded-xl

                            bg-gradient-to-r
                            from-red-600
                            to-red-500

                            px-6

                            text-sm
                            font-bold
                            text-white

                            shadow-[0_12px_30px_rgba(239,68,68,.18)]

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:shadow-[0_16px_35px_rgba(239,68,68,.28)]

                            active:translate-y-0
                        "
                    >

                        <Plus
                            size={17}
                            className="
                                transition-transform
                                duration-300
                                group-hover:rotate-90
                            "
                        />

                        Record Expense

                    </button>

                </div>

            </div>

        </div>

    </>

)}
        </div>

    );

};

export default ExpenseManagement;