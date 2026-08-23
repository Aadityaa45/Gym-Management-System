// // import React, { useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// // import axios from "axios";
// // import {
// //     Search,
// //     Plus,
// //     Receipt,
// //     Wallet,
// //     TrendingDown,
// //     Clock3,
// //     Repeat,
// //     ChevronDown,
// //     MoreVertical,
// //     Eye,
// //     Pencil,
// //     Trash2,
// //     Download,
// //     CalendarDays,
// //     Filter,
// //     X,
// //     ArrowDownRight,
// //     Zap,
// //     Wrench,
// //     Users,
// //     Building2,
// //     ShieldCheck,
// //     CreditCard,
// //     Banknote,
// //     Landmark,
// //     FileText,
// //     Upload,
// //     CheckCircle2,
// //     AlertCircle,
// //     XCircle,
// //     RotateCcw,
// // } from "lucide-react";


// // const ExpenseManagement = () => {

// //     const [search, setSearch] = useState("");

// //     const [filterOpen, setFilterOpen] = useState(false);

// //     const [expenseModalOpen, setExpenseModalOpen] = useState(false);

// //     const [selectedExpense, setSelectedExpense] = useState(null);

// //     const [debouncedSearch, setDebouncedSearch] = useState("");

// //     const [filters, setFilters] = useState({
// //         category: "",
// //         status: "",
// //         paymentMethod: "",
// //         dateFrom: "",
// //         dateTo: "",
// //         minAmount: "",
// //         maxAmount: "",
// //         recurring: "",
// //     });

// //     const [dashboardData, setDashboardData] = useState({
// //     summary: {
// //         totalExpenses: 0,
// //         paidExpenses: 0,
// //         pendingExpenses: 0,
// //         recurringExpenses: 0,
// //         totalTransactions: 0,
// //         pendingTransactions: 0,
// //         monthlyChange: 0,
// //     },
// //     monthlyTrend: [],
// //     categoryBreakdown: [],
// // });

// // const [expenses, setExpenses] = useState([]);

// // const [loading, setLoading] = useState(false);

// // const [tableLoading, setTableLoading] = useState(false);

// // const [pagination, setPagination] = useState({
// //     page: 1,
// //     limit: 10,
// //     total: 0,
// //     totalPages: 0,
// // });

// //     const [newExpanseData, setNewExpanseData] = useState({
// //         title: "",
// //         category: "",
// //         amount: "",
// //         expenseDate: "",
// //         paidTo: "",
// //         paymentMethod: "",
// //         isRecurring: false,
// //         notes: "",
// //     });

// //     const handleNewExpanseChange = (e) =>{
// //         const {name,value,type,checked} = e.target
// //         setNewExpanseData((prev)=>({
// //             ...prev,
// //             [name]:type==="checkbox"?checked:value
// //         }))
// //     }

// //     //THIS IS THE FUNCTION TO CRREATE A NEW EXPANSE AND SAVE IT TO OUR DB THROUGH OUR BACKEND 
// //     const createNewExpanse = async () =>{
// //         try {
// //             const backendUrl = import.meta.env.VITE_BACKEND_URL;
// //             const response = await axios.post(
// //                 `${backendUrl}/api/admin/expanses/create-expanse`,
// //                 newExpanseData,
// //                 {
// //                     withCredentials:true
// //                 }
// //             )

// //             if(response.data.success){
// //                 toast.success("New Expanse Added Successfully")
// //                 setExpenseModalOpen(false)
// //                 setNewExpanseData({
// //                     title: "",
// //                     category: "",
// //                     amount: "",
// //                     expenseDate: "",
// //                     paidTo: "",
// //                     paymentMethod: "",
// //                     isRecurring: false,
// //                     notes: "",
// //                 });

// //                 await Promise.all([
// //                     fetchExpenseDashboard(),
// //                     fetchExpenses(),
// //                 ]);
// //             }
// //         } catch (error) {
// //             toast.error("Something went wrong!!")
// //             console.log(error)
// //         }
// //     }

// //     const fetchExpenseDashboard = async () => {

// //     try {

// //         setLoading(true);

// //         const backendUrl = import.meta.env.VITE_BACKEND_URL;

// //         const response = await axios.get(
// //             `${backendUrl}/api/expenses/dashboard`,
// //             {
// //                 withCredentials: true,
// //             }
// //         );

// //         if (response.data.success) {

// //             setDashboardData(response.data.data);

// //         }

// //     } catch (error) {

// //         console.error(
// //             "Failed to fetch expense dashboard:",
// //             error
// //         );

// //         toast.error(
// //             error.response?.data?.message ||
// //             "Failed to load expense dashboard"
// //         );

// //     } finally {

// //         setLoading(false);

// //     }
// // };

// // const fetchExpenses = async () => {

// //     try {

// //         setTableLoading(true);

// //         const backendUrl = import.meta.env.VITE_BACKEND_URL;

// //         const params = new URLSearchParams();

// //         if (debouncedSearch.trim()) {
// //             params.append(
// //                 "search",
// //                 debouncedSearch.trim()
// //             );
// //         }

// //         if (filters.category) {
// //             params.append(
// //                 "category",
// //                 filters.category
// //             );
// //         }

// //         if (filters.status) {
// //             params.append(
// //                 "status",
// //                 filters.status
// //             );
// //         }

// //         if (filters.paymentMethod) {
// //             params.append(
// //                 "paymentMethod",
// //                 filters.paymentMethod
// //             );
// //         }

// //         if (filters.dateFrom) {
// //             params.append(
// //                 "dateFrom",
// //                 filters.dateFrom
// //             );
// //         }

// //         if (filters.dateTo) {
// //             params.append(
// //                 "dateTo",
// //                 filters.dateTo
// //             );
// //         }

// //         if (filters.minAmount) {
// //             params.append(
// //                 "minAmount",
// //                 filters.minAmount
// //             );
// //         }

// //         if (filters.maxAmount) {
// //             params.append(
// //                 "maxAmount",
// //                 filters.maxAmount
// //             );
// //         }

// //         if (filters.recurring !== "") {
// //             params.append(
// //                 "recurring",
// //                 filters.recurring
// //             );
// //         }

// //         params.append(
// //             "page",
// //             pagination.page
// //         );

// //         params.append(
// //             "limit",
// //             pagination.limit
// //         );

// //         const response = await axios.get(
// //             `${backendUrl}/api/expenses?${params.toString()}`,
// //             {
// //                 withCredentials: true,
// //             }
// //         );

// //         if (response.data.success) {

// //             setExpenses(
// //                 response.data.data.expenses
// //             );

// //             setPagination((prev) => ({
// //                 ...prev,
// //                 total:
// //                     response.data.data.pagination.total,
// //                 totalPages:
// //                     response.data.data.pagination.totalPages,
// //             }));

// //         }

// //     } catch (error) {

// //         console.error(
// //             "Failed to fetch expenses:",
// //             error
// //         );

// //         toast.error(
// //             error.response?.data?.message ||
// //             "Failed to load expenses"
// //         );

// //     } finally {

// //         setTableLoading(false);

// //     }
// // };



// //     // --------------------------------------------------
// //     // CATEGORY CONFIG
// //     // --------------------------------------------------

// //     const categoryConfig = {

// //         Utilities: {
// //             icon: Zap,
// //         },

// //         Maintenance: {
// //             icon: Wrench,
// //         },

// //         Employee: {
// //             icon: Users,
// //         },

// //         Supplies: {
// //             icon: Receipt,
// //         },

// //         Rent: {
// //             icon: Building2,
// //         },

// //         Marketing: {
// //             icon: TrendingDown,
// //         },

// //         Equipment: {
// //             icon: ShieldCheck,
// //         },

// //         Other: {
// //             icon: FileText,
// //         },

// //     };



// //     // --------------------------------------------------
// //     // HANDLERS
// //     // --------------------------------------------------

// //     const filterChangeHandler = (e) => {

// //         const {
// //             name,
// //             value
// //         } = e.target;

// //         setFilters((prev) => ({
// //             ...prev,
// //             [name]: value
// //         }));

// //     };

// //     useEffect(() => {

// //     const timer = setTimeout(() => {
// //         setDebouncedSearch(search);
// //     }, 500);

// //     return () => clearTimeout(timer);

// // }, [search]);

// // useEffect(() => {

// //     setPagination((prev) => ({
// //         ...prev,
// //         page: 1,
// //     }));

// // }, [debouncedSearch]);

// // useEffect(() => {

// //     setPagination((prev) => ({
// //         ...prev,
// //         page: 1,
// //     }));

// // }, [
// //     filters.category,
// //     filters.status,
// //     filters.paymentMethod,
// //     filters.dateFrom,
// //     filters.dateTo,
// //     filters.minAmount,
// //     filters.maxAmount,
// //     filters.recurring,
// // ]);
// // useEffect(() => {

// //     fetchExpenses();

// // }, [
// //     debouncedSearch,
// //     filters.category,
// //     filters.status,
// //     filters.paymentMethod,
// //     filters.dateFrom,
// //     filters.dateTo,
// //     filters.minAmount,
// //     filters.maxAmount,
// //     filters.recurring,
// //     pagination.page,
// //     pagination.limit,
// // ]);
// // useEffect(() => {

// //     fetchExpenseDashboard();

// // }, []);


// //     const clearFilters = () => {

// //         setFilters({
// //             category: "",
// //             status: "",
// //             paymentMethod: "",
// //             dateFrom: "",
// //             dateTo: "",
// //             minAmount: "",
// //             maxAmount: "",
// //             recurring: "",
// //         });

// //     };


// //     const formatCurrency = (amount) => {

// //         return new Intl.NumberFormat(
// //             "en-IN",
// //             {
// //                 style: "currency",
// //                 currency: "INR",
// //                 maximumFractionDigits: 0
// //             }
// //         ).format(amount);

// //     };


// //     return (

// //         <div className="
// //             min-h-screen
// //             bg-[#080808]
// //             text-white
// //             px-6
// //             py-7
// //         ">


// //             {/* ================================================= */}
// //             {/* PAGE HEADER */}
// //             {/* ================================================= */}

// //             <div className="
// //                 flex
// //                 flex-col
// //                 lg:flex-row
// //                 lg:items-center
// //                 lg:justify-between
// //                 gap-5
// //             ">

// //                 <div>

// //                     <div className="
// //                         flex
// //                         items-center
// //                         gap-2
// //                         text-red-400
// //                         text-xs
// //                         font-bold
// //                         uppercase
// //                         tracking-[4px]
// //                     ">

// //                         <Wallet size={14}/>

// //                         Financial Management

// //                     </div>


// //                     <h1 className="
// //                         text-3xl
// //                         md:text-4xl
// //                         font-black
// //                         tracking-tight
// //                         mt-2
// //                     ">

// //                         Expense Tracking

// //                     </h1>


// //                     <p className="
// //                         text-gray-500
// //                         mt-2
// //                         text-sm
// //                     ">

// //                         Monitor, manage and analyze every expense of your gym.

// //                     </p>

// //                 </div>


// //                 <div className="
// //                     flex
// //                     items-center
// //                     gap-3
// //                 ">

// //                     <button
// //                         className="
// //                             h-11
// //                             px-5
// //                             rounded-xl
// //                             border
// //                             border-[#292929]
// //                             bg-[#111111]
// //                             text-gray-300
// //                             hover:bg-[#181818]
// //                             transition
// //                             flex
// //                             items-center
// //                             gap-2
// //                         "
// //                     >

// //                         <Download size={17}/>

// //                         Export

// //                     </button>


// //                     <button
// //                         onClick={() => setExpenseModalOpen(true)}
// //                         className="
// //                             h-11
// //                             px-5
// //                             rounded-xl
// //                             bg-gradient-to-r
// //                             from-red-700
// //                             to-red-500
// //                             text-white
// //                             font-bold
// //                             shadow-[0_10px_30px_rgba(239,68,68,.18)]
// //                             hover:shadow-[0_14px_35px_rgba(239,68,68,.28)]
// //                             transition
// //                             flex
// //                             items-center
// //                             gap-2
// //                         "
// //                     >

// //                         <Plus size={18}/>

// //                         Add Expense

// //                     </button>

// //                 </div>

// //             </div>



// //             {/* ================================================= */}
// //             {/* KPI CARDS */}
// //             {/* ================================================= */}

// //             <div className="
// //                 grid
// //                 grid-cols-1
// //                 sm:grid-cols-2
// //                 xl:grid-cols-4
// //                 gap-4
// //                 mt-8
// //             ">


// //                 {/* TOTAL EXPENSE */}

// //                 <div className="
// //                     rounded-2xl
// //                     border
// //                     border-[#242424]
// //                     bg-[#111111]
// //                     p-5
// //                     relative
// //                     overflow-hidden
// //                 ">

// //                     <div className="
// //                         absolute
// //                         right-0
// //                         top-0
// //                         w-24
// //                         h-24
// //                         bg-red-500/5
// //                         blur-2xl
// //                     "/>


// //                     <div className="
// //                         flex
// //                         items-center
// //                         justify-between
// //                     ">

// //                         <div className="
// //                             w-10
// //                             h-10
// //                             rounded-xl
// //                             bg-red-500/10
// //                             text-red-400
// //                             flex
// //                             items-center
// //                             justify-center
// //                         ">

// //                             <TrendingDown size={19}/>

// //                         </div>


// //                         <span className="
// //                             text-xs
// //                             text-red-400
// //                             bg-red-500/10
// //                             px-2
// //                             py-1
// //                             rounded-lg
// //                         ">

// //                             This Month

// //                         </span>

// //                     </div>


// //                     <p className="
// //                         text-gray-500
// //                         text-sm
// //                         mt-5
// //                     ">

// //                         Total Expenses

// //                     </p>


// //                     <h2 className="
// //                         text-2xl
// //                         font-black
// //                         mt-1
// //                     ">

// //                         ₹1,42,850

// //                     </h2>


// //                     <div className="
// //                         flex
// //                         items-center
// //                         gap-1
// //                         text-xs
// //                         text-red-400
// //                         mt-2
// //                     ">

// //                         <ArrowDownRight size={14}/>

// //                         8.4% from last month

// //                     </div>

// //                 </div>



// //                 {/* PAID */}

// //                 <div className="
// //                     rounded-2xl
// //                     border
// //                     border-[#242424]
// //                     bg-[#111111]
// //                     p-5
// //                 ">

// //                     <div className="
// //                         w-10
// //                         h-10
// //                         rounded-xl
// //                         bg-emerald-500/10
// //                         text-emerald-400
// //                         flex
// //                         items-center
// //                         justify-center
// //                     ">

// //                         <CheckCircle2 size={19}/>

// //                     </div>


// //                     <p className="
// //                         text-gray-500
// //                         text-sm
// //                         mt-5
// //                     ">

// //                         Paid Expenses

// //                     </p>


// //                     <h2 className="
// //                         text-2xl
// //                         font-black
// //                         mt-1
// //                     ">

// //                         ₹1,24,600

// //                     </h2>


// //                     <p className="
// //                         text-xs
// //                         text-gray-600
// //                         mt-2
// //                     ">

// //                         38 transactions

// //                     </p>

// //                 </div>



// //                 {/* PENDING */}

// //                 <div className="
// //                     rounded-2xl
// //                     border
// //                     border-[#242424]
// //                     bg-[#111111]
// //                     p-5
// //                 ">

// //                     <div className="
// //                         w-10
// //                         h-10
// //                         rounded-xl
// //                         bg-yellow-500/10
// //                         text-yellow-400
// //                         flex
// //                         items-center
// //                         justify-center
// //                     ">

// //                         <Clock3 size={19}/>

// //                     </div>


// //                     <p className="
// //                         text-gray-500
// //                         text-sm
// //                         mt-5
// //                     ">

// //                         Pending Expenses

// //                     </p>


// //                     <h2 className="
// //                         text-2xl
// //                         font-black
// //                         mt-1
// //                     ">

// //                         ₹18,250

// //                     </h2>


// //                     <p className="
// //                         text-xs
// //                         text-gray-600
// //                         mt-2
// //                     ">

// //                         5 awaiting payment

// //                     </p>

// //                 </div>



// //                 {/* RECURRING */}

// //                 <div className="
// //                     rounded-2xl
// //                     border
// //                     border-[#242424]
// //                     bg-[#111111]
// //                     p-5
// //                 ">

// //                     <div className="
// //                         w-10
// //                         h-10
// //                         rounded-xl
// //                         bg-blue-500/10
// //                         text-blue-400
// //                         flex
// //                         items-center
// //                         justify-center
// //                     ">

// //                         <Repeat size={19}/>

// //                     </div>


// //                     <p className="
// //                         text-gray-500
// //                         text-sm
// //                         mt-5
// //                     ">

// //                         Recurring Expenses

// //                     </p>


// //                     <h2 className="
// //                         text-2xl
// //                         font-black
// //                         mt-1
// //                     ">

// //                         ₹67,400

// //                     </h2>


// //                     <p className="
// //                         text-xs
// //                         text-gray-600
// //                         mt-2
// //                     ">

// //                         Expected monthly

// //                     </p>

// //                 </div>

// //             </div>



// //             {/* ================================================= */}
// //             {/* ANALYTICS */}
// //             {/* ================================================= */}

// //             <div className="
// //                 grid
// //                 grid-cols-1
// //                 xl:grid-cols-3
// //                 gap-5
// //                 mt-5
// //             ">


// //                 {/* EXPENSE TREND */}

// //                 <div className="
// //                     xl:col-span-2
// //                     rounded-2xl
// //                     border
// //                     border-[#242424]
// //                     bg-[#111111]
// //                     p-6
// //                 ">

// //                     <div className="
// //                         flex
// //                         justify-between
// //                         items-start
// //                     ">

// //                         <div>

// //                             <h3 className="
// //                                 font-bold
// //                                 text-lg
// //                             ">

// //                                 Expense Overview

// //                             </h3>

// //                             <p className="
// //                                 text-gray-600
// //                                 text-xs
// //                                 mt-1
// //                             ">

// //                                 Monthly spending trend

// //                             </p>

// //                         </div>


// //                         <select
// //                             className="
// //                                 bg-[#181818]
// //                                 border
// //                                 border-[#2b2b2b]
// //                                 rounded-lg
// //                                 px-3
// //                                 py-2
// //                                 text-xs
// //                                 text-gray-400
// //                                 outline-none
// //                             "
// //                         >

// //                             <option>Last 6 Months</option>
// //                             <option>This Year</option>
// //                             <option>Last 12 Months</option>

// //                         </select>

// //                     </div>


// //                     {/* GRAPH PLACEHOLDER */}

// //                     <div className="
// //                         h-52
// //                         mt-7
// //                         flex
// //                         items-end
// //                         gap-4
// //                         px-3
// //                     ">

// //                         {[42, 65, 48, 82, 61, 92, 74, 88, 68, 96, 78, 85].map(
// //                             (height, index) => (

// //                                 <div
// //                                     key={index}
// //                                     className="
// //                                         flex-1
// //                                         h-full
// //                                         flex
// //                                         items-end
// //                                     "
// //                                 >

// //                                     <div
// //                                         style={{
// //                                             height: `${height}%`
// //                                         }}
// //                                         className="
// //                                             w-full
// //                                             rounded-t-lg
// //                                             bg-gradient-to-t
// //                                             from-red-700/30
// //                                             to-red-500
// //                                             hover:from-red-700
// //                                             transition
// //                                         "
// //                                     />

// //                                 </div>

// //                             )
// //                         )}

// //                     </div>


// //                     <div className="
// //                         flex
// //                         justify-between
// //                         text-[10px]
// //                         text-gray-600
// //                         mt-3
// //                     ">

// //                         <span>Mar</span>
// //                         <span>Apr</span>
// //                         <span>May</span>
// //                         <span>Jun</span>
// //                         <span>Jul</span>
// //                         <span>Aug</span>

// //                     </div>

// //                 </div>



// //                 {/* CATEGORY BREAKDOWN */}

// //                 <div className="
// //                     rounded-2xl
// //                     border
// //                     border-[#242424]
// //                     bg-[#111111]
// //                     p-6
// //                 ">

// //                     <h3 className="
// //                         font-bold
// //                         text-lg
// //                     ">

// //                         Spending Categories

// //                     </h3>


// //                     <p className="
// //                         text-gray-600
// //                         text-xs
// //                         mt-1
// //                     ">

// //                         Where your money goes

// //                     </p>


// //                     <div className="
// //                         space-y-5
// //                         mt-7
// //                     ">

// //                         {[
// //                             ["Employee", "₹58,000", "41%"],
// //                             ["Utilities", "₹31,450", "22%"],
// //                             ["Maintenance", "₹22,800", "16%"],
// //                             ["Supplies", "₹15,600", "11%"],
// //                             ["Other", "₹14,000", "10%"],
// //                         ].map(
// //                             ([category, amount, percentage]) => (

// //                                 <div key={category}>

// //                                     <div className="
// //                                         flex
// //                                         justify-between
// //                                         text-sm
// //                                         mb-2
// //                                     ">

// //                                         <span className="text-gray-400">
// //                                             {category}
// //                                         </span>

// //                                         <span className="text-gray-300">
// //                                             {amount}
// //                                         </span>

// //                                     </div>


// //                                     <div className="
// //                                         h-1.5
// //                                         rounded-full
// //                                         bg-[#222222]
// //                                         overflow-hidden
// //                                     ">

// //                                         <div
// //                                             style={{
// //                                                 width: percentage
// //                                             }}
// //                                             className="
// //                                                 h-full
// //                                                 rounded-full
// //                                                 bg-red-500
// //                                             "
// //                                         />

// //                                     </div>

// //                                 </div>

// //                             )
// //                         )}

// //                     </div>

// //                 </div>

// //             </div>



// //             {/* ================================================= */}
// //             {/* EXPENSE TABLE */}
// //             {/* ================================================= */}

// //             <div className="
// //                 mt-5
// //                 rounded-2xl
// //                 border
// //                 border-[#242424]
// //                 bg-[#111111]
// //                 overflow-hidden
// //             ">


// //                 {/* TABLE HEADER */}

// //                 <div className="
// //                     p-5
// //                     border-b
// //                     border-[#242424]
// //                     flex
// //                     flex-col
// //                     xl:flex-row
// //                     gap-4
// //                     xl:items-center
// //                     xl:justify-between
// //                 ">


// //                     <div>

// //                         <h3 className="
// //                             font-bold
// //                             text-lg
// //                         ">

// //                             Expense Records

// //                         </h3>

// //                         <p className="
// //                             text-gray-600
// //                             text-xs
// //                             mt-1
// //                         ">

// //                             Complete history of gym expenses

// //                         </p>

// //                     </div>



// //                     <div className="
// //                         flex
// //                         flex-col
// //                         sm:flex-row
// //                         gap-3
// //                     ">


// //                         {/* SEARCH */}

// //                         <div className="
// //                             relative
// //                             w-full
// //                             sm:w-72
// //                         ">

// //                             <Search
// //                                 size={17}
// //                                 className="
// //                                     absolute
// //                                     left-3
// //                                     top-1/2
// //                                     -translate-y-1/2
// //                                     text-gray-600
// //                                 "
// //                             />

// //                             <input
// //                                 value={search}
// //                                 onChange={(e) => setSearch(e.target.value)}
// //                                 placeholder="Search expenses..."
// //                                 className="
// //                                     w-full
// //                                     h-10
// //                                     pl-10
// //                                     pr-4
// //                                     rounded-xl
// //                                     bg-[#181818]
// //                                     border
// //                                     border-[#292929]
// //                                     text-sm
// //                                     text-white
// //                                     placeholder:text-gray-600
// //                                     outline-none
// //                                     focus:border-red-500/50
// //                                 "
// //                             />

// //                         </div>


// //                         {/* FILTER */}

// //                         <button
// //                             onClick={() => setFilterOpen(true)}
// //                             className="
// //                                 h-10
// //                                 px-4
// //                                 rounded-xl
// //                                 border
// //                                 border-[#292929]
// //                                 bg-[#181818]
// //                                 text-gray-400
// //                                 hover:text-white
// //                                 hover:border-[#3b3b3b]
// //                                 flex
// //                                 items-center
// //                                 justify-center
// //                                 gap-2
// //                                 transition
// //                             "
// //                         >

// //                             <Filter size={16}/>

// //                             Filters

// //                         </button>

// //                     </div>

// //                 </div>



// //                 {/* TABLE */}

// //                 <div className="
// //                     overflow-x-auto
// //                 ">

// //                     <table className="
// //                         w-full
// //                         min-w-[1050px]
// //                     ">

// //                         <thead>

// //                             <tr className="
// //                                 text-left
// //                                 text-[11px]
// //                                 uppercase
// //                                 tracking-wider
// //                                 text-gray-600
// //                                 border-b
// //                                 border-[#202020]
// //                             ">

// //                                 <th className="px-5 py-4">
// //                                     Expense
// //                                 </th>

// //                                 <th className="px-5 py-4">
// //                                     Category
// //                                 </th>

// //                                 <th className="px-5 py-4">
// //                                     Paid To
// //                                 </th>

// //                                 <th className="px-5 py-4">
// //                                     Date
// //                                 </th>

// //                                 <th className="px-5 py-4">
// //                                     Payment
// //                                 </th>

// //                                 <th className="px-5 py-4">
// //                                     Amount
// //                                 </th>

// //                                 <th className="px-5 py-4">
// //                                     Status
// //                                 </th>

// //                                 <th className="px-5 py-4">
// //                                     Action
// //                                 </th>

// //                             </tr>

// //                         </thead>


// //                         <tbody>

// //                             {filteredExpenses.map((expense) => {

// //                                 const CategoryIcon =
// //                                     categoryConfig[
// //                                         expense.category
// //                                     ]?.icon || Receipt;


// //                                 return (

// //                                     <tr
// //                                         key={expense.id}
// //                                         className="
// //                                             border-b
// //                                             border-[#1d1d1d]
// //                                             hover:bg-[#151515]
// //                                             transition
// //                                         "
// //                                     >


// //                                         {/* EXPENSE */}

// //                                         <td className="px-5 py-4">

// //                                             <div className="
// //                                                 flex
// //                                                 items-center
// //                                                 gap-3
// //                                             ">

// //                                                 <div className="
// //                                                     w-10
// //                                                     h-10
// //                                                     rounded-xl
// //                                                     bg-[#1b1b1b]
// //                                                     border
// //                                                     border-[#292929]
// //                                                     flex
// //                                                     items-center
// //                                                     justify-center
// //                                                     text-red-400
// //                                                 ">

// //                                                     <Receipt size={17}/>

// //                                                 </div>


// //                                                 <div>

// //                                                     <p className="
// //                                                         font-semibold
// //                                                         text-sm
// //                                                     ">

// //                                                         {expense.title}

// //                                                     </p>

// //                                                     <p className="
// //                                                         text-[11px]
// //                                                         text-gray-600
// //                                                         mt-1
// //                                                     ">

// //                                                         {expense.id}

// //                                                     </p>

// //                                                 </div>

// //                                             </div>

// //                                         </td>



// //                                         {/* CATEGORY */}

// //                                         <td className="px-5 py-4">

// //                                             <div className="
// //                                                 flex
// //                                                 items-center
// //                                                 gap-2
// //                                                 text-sm
// //                                                 text-gray-400
// //                                             ">

// //                                                 <CategoryIcon
// //                                                     size={15}
// //                                                 />

// //                                                 {expense.category}

// //                                             </div>

// //                                         </td>



// //                                         {/* PAID TO */}

// //                                         <td className="px-5 py-4">

// //                                             <div>

// //                                                 <p className="
// //                                                     text-sm
// //                                                     text-gray-300
// //                                                 ">

// //                                                     {expense.paidTo}

// //                                                 </p>

// //                                                 {expense.recurring && (

// //                                                     <span className="
// //                                                         inline-flex
// //                                                         items-center
// //                                                         gap-1
// //                                                         text-[10px]
// //                                                         text-blue-400
// //                                                         mt-1
// //                                                     ">

// //                                                         <Repeat size={10}/>

// //                                                         Recurring

// //                                                     </span>

// //                                                 )}

// //                                             </div>

// //                                         </td>



// //                                         {/* DATE */}

// //                                         <td className="px-5 py-4">

// //                                             <span className="
// //                                                 text-sm
// //                                                 text-gray-400
// //                                             ">

// //                                                 {new Date(
// //                                                     expense.date
// //                                                 ).toLocaleDateString(
// //                                                     "en-IN",
// //                                                     {
// //                                                         day: "2-digit",
// //                                                         month: "short",
// //                                                         year: "numeric"
// //                                                     }
// //                                                 )}

// //                                             </span>

// //                                         </td>



// //                                         {/* PAYMENT */}

// //                                         <td className="px-5 py-4">

// //                                             <span className="
// //                                                 text-xs
// //                                                 text-gray-400
// //                                                 flex
// //                                                 items-center
// //                                                 gap-2
// //                                             ">

// //                                                 <CreditCard size={14}/>

// //                                                 {expense.paymentMethod}

// //                                             </span>

// //                                         </td>



// //                                         {/* AMOUNT */}

// //                                         <td className="px-5 py-4">

// //                                             <span className="
// //                                                 font-bold
// //                                                 text-sm
// //                                             ">

// //                                                 {formatCurrency(
// //                                                     expense.amount
// //                                                 )}

// //                                             </span>

// //                                         </td>



// //                                         {/* STATUS */}

// //                                         <td className="px-5 py-4">

// //                                             {expense.status === "Paid" ? (

// //                                                 <span className="
// //                                                     inline-flex
// //                                                     items-center
// //                                                     gap-1.5
// //                                                     px-2.5
// //                                                     py-1
// //                                                     rounded-lg
// //                                                     text-[11px]
// //                                                     font-semibold
// //                                                     bg-emerald-500/10
// //                                                     text-emerald-400
// //                                                 ">

// //                                                     <CheckCircle2 size={12}/>

// //                                                     Paid

// //                                                 </span>

// //                                             ) : (

// //                                                 <span className="
// //                                                     inline-flex
// //                                                     items-center
// //                                                     gap-1.5
// //                                                     px-2.5
// //                                                     py-1
// //                                                     rounded-lg
// //                                                     text-[11px]
// //                                                     font-semibold
// //                                                     bg-yellow-500/10
// //                                                     text-yellow-400
// //                                                 ">

// //                                                     <Clock3 size={12}/>

// //                                                     Pending

// //                                                 </span>

// //                                             )}

// //                                         </td>



// //                                         {/* ACTION */}

// //                                         <td className="px-5 py-4">

// //                                             <button
// //                                                 onClick={() =>
// //                                                     setSelectedExpense(
// //                                                         expense
// //                                                     )
// //                                                 }
// //                                                 className="
// //                                                     w-9
// //                                                     h-9
// //                                                     rounded-lg
// //                                                     bg-[#191919]
// //                                                     border
// //                                                     border-[#292929]
// //                                                     text-gray-500
// //                                                     hover:text-white
// //                                                     hover:border-[#444]
// //                                                     flex
// //                                                     items-center
// //                                                     justify-center
// //                                                 "
// //                                             >

// //                                                 <MoreVertical
// //                                                     size={16}
// //                                                 />

// //                                             </button>

// //                                         </td>

// //                                     </tr>

// //                                 );

// //                             })}

// //                         </tbody>

// //                     </table>

// //                 </div>



// //                 {/* TABLE FOOTER */}

// //                 <div className="
// //                     px-5
// //                     py-4
// //                     border-t
// //                     border-[#242424]
// //                     flex
// //                     items-center
// //                     justify-between
// //                     text-xs
// //                     text-gray-600
// //                 ">

// //                     <span>
// //                         Showing {filteredExpenses.length} expenses
// //                     </span>

// //                     <div className="
// //                         flex
// //                         items-center
// //                         gap-2
// //                     ">

// //                         <button className="
// //                             w-8
// //                             h-8
// //                             rounded-lg
// //                             bg-[#181818]
// //                             border
// //                             border-[#292929]
// //                             disabled:opacity-40
// //                         ">

// //                             ‹

// //                         </button>

// //                         <span className="
// //                             w-8
// //                             h-8
// //                             rounded-lg
// //                             bg-red-500
// //                             text-white
// //                             flex
// //                             items-center
// //                             justify-center
// //                             font-semibold
// //                         ">

// //                             1

// //                         </span>

// //                         <button className="
// //                             w-8
// //                             h-8
// //                             rounded-lg
// //                             bg-[#181818]
// //                             border
// //                             border-[#292929]
// //                         ">

// //                             ›

// //                         </button>

// //                     </div>

// //                 </div>

// //             </div>



// //             {/* ================================================= */}
// //             {/* ADD EXPENSE MODAL */}
// //             {/* ================================================= */}

// //             {expenseModalOpen && (

// //     <>

// //         {/* =========================================================
// //                             BACKDROP
// //         ========================================================== */}

// //         <div
// //             onClick={() => setExpenseModalOpen(false)}
// //             className="
// //                 fixed
// //                 inset-0
// //                 z-[80]
// //                 bg-black/80
// //                 backdrop-blur-xl
// //                 transition-opacity
// //             "
// //         />


// //         {/* =========================================================
// //                             MODAL
// //         ========================================================== */}

// //         <div
// //             className="
// //                 fixed
// //                 left-1/2
// //                 top-1/2
// //                 z-[90]

// //                 w-[720px]
// //                 max-w-[95vw]
// //                 max-h-[92vh]

// //                 -translate-x-1/2
// //                 -translate-y-1/2

// //                 overflow-hidden

// //                 rounded-[30px]

// //                 border
// //                 border-white/[0.08]

// //                 bg-[#0b0b0b]

// //                 shadow-[0_40px_120px_rgba(0,0,0,.8)]

// //                 flex
// //                 flex-col
// //             "
// //         >

// //             {/* =====================================================
// //                                 TOP GLOW
// //             ====================================================== */}

// //             <div
// //                 className="
// //                     pointer-events-none
// //                     absolute
// //                     -right-24
// //                     -top-24
// //                     h-72
// //                     w-72
// //                     rounded-full
// //                     bg-red-600/10
// //                     blur-[110px]
// //                 "
// //             />

// //             <div
// //                 className="
// //                     pointer-events-none
// //                     absolute
// //                     -left-24
// //                     bottom-20
// //                     h-64
// //                     w-64
// //                     rounded-full
// //                     bg-red-600/[0.06]
// //                     blur-[100px]
// //                 "
// //             />


// //             {/* =====================================================
// //                                 HEADER
// //             ====================================================== */}

// //             <div
// //                 className="
// //                     relative
// //                     shrink-0

// //                     border-b
// //                     border-white/[0.07]

// //                     bg-white/[0.015]

// //                     px-7
// //                     py-6
// //                 "
// //             >

// //                 <div className="flex items-start justify-between">

// //                     <div className="flex items-center gap-4">

// //                         {/* Icon */}

// //                         <div
// //                             className="
// //                                 flex
// //                                 h-12
// //                                 w-12
// //                                 shrink-0
// //                                 items-center
// //                                 justify-center

// //                                 rounded-2xl

// //                                 border
// //                                 border-red-500/20

// //                                 bg-red-500/10

// //                                 shadow-[0_0_30px_rgba(239,68,68,.08)]
// //                             "
// //                         >

// //                             <Receipt
// //                                 size={21}
// //                                 className="text-red-400"
// //                             />

// //                         </div>


// //                         {/* Heading */}

// //                         <div>

// //                             <p
// //                                 className="
// //                                     text-[10px]
// //                                     font-bold
// //                                     uppercase
// //                                     tracking-[4px]
// //                                     text-red-400
// //                                 "
// //                             >
// //                                 Expense Management
// //                             </p>

// //                             <h2
// //                                 className="
// //                                     mt-1
// //                                     text-2xl
// //                                     font-black
// //                                     tracking-tight
// //                                     text-white
// //                                 "
// //                             >
// //                                 Record New Expense
// //                             </h2>

// //                             <p
// //                                 className="
// //                                     mt-1
// //                                     text-sm
// //                                     text-gray-500
// //                                 "
// //                             >
// //                                 Add a financial expense to your gym records.
// //                             </p>

// //                         </div>

// //                     </div>


// //                     {/* Close */}

// //                     <button
// //                         type="button"
// //                         onClick={() => setExpenseModalOpen(false)}
// //                         className="
// //                             flex
// //                             h-10
// //                             w-10
// //                             shrink-0
// //                             items-center
// //                             justify-center

// //                             rounded-xl

// //                             border
// //                             border-white/[0.07]

// //                             bg-white/[0.03]

// //                             text-gray-500

// //                             transition-all
// //                             duration-200

// //                             hover:border-red-500/30
// //                             hover:bg-red-500/10
// //                             hover:text-red-400
// //                         "
// //                     >

// //                         <X size={18} />

// //                     </button>

// //                 </div>

// //             </div>


// //             {/* =====================================================
// //                                 FORM BODY
// //             ====================================================== */}

// //             <div
// //                 className="
// //                     relative
// //                     min-h-0
// //                     flex-1
// //                     overflow-y-auto

// //                     px-7
// //                     py-7

// //                     scrollbar-thin
// //                     scrollbar-track-transparent
// //                     scrollbar-thumb-white/10
// //                 "
// //             >

// //                 <div className="space-y-7">


// //                     {/* =================================================
// //                                 BASIC INFORMATION
// //                     ================================================== */}

// //                     <div>

// //                         <div className="mb-4 flex items-center gap-3">

// //                             <div className="h-px flex-1 bg-white/[0.06]" />

// //                             <span
// //                                 className="
// //                                     text-[10px]
// //                                     font-bold
// //                                     uppercase
// //                                     tracking-[3px]
// //                                     text-gray-600
// //                                 "
// //                             >
// //                                 Basic Information
// //                             </span>

// //                             <div className="h-px flex-1 bg-white/[0.06]" />

// //                         </div>


// //                         <div className="grid grid-cols-2 gap-5">


// //                             {/* TITLE */}

// //                             <div>

// //                                 <label
// //                                     className="
// //                                         mb-2
// //                                         block
// //                                         text-xs
// //                                         font-medium
// //                                         text-gray-400
// //                                     "
// //                                 >
// //                                     Expense Title
// //                                     <span className="ml-1 text-red-400">*</span>
// //                                 </label>

// //                                 <div className="relative">

// //                                     <FileText
// //                                         size={16}
// //                                         className="
// //                                             pointer-events-none
// //                                             absolute
// //                                             left-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-gray-600
// //                                         "
// //                                     />

// //                                     <input
// //                                         name="title"
// //                                         onChange={handleNewExpanseChange}
// //                                         value={newExpanseData.title}
// //                                         placeholder="Electricity Bill"
// //                                         className="
// //                                             h-12
// //                                             w-full
// //                                             rounded-xl
// //                                             border
// //                                             border-white/[0.08]
// //                                             bg-white/[0.025]
// //                                             pl-11
// //                                             pr-4
// //                                             text-sm
// //                                             text-white
// //                                             outline-none
// //                                             placeholder:text-gray-700

// //                                             transition-all

// //                                             focus:border-red-500/40
// //                                             focus:bg-white/[0.04]
// //                                             focus:ring-4
// //                                             focus:ring-red-500/[0.06]
// //                                         "
// //                                     />

// //                                 </div>

// //                             </div>


// //                             {/* CATEGORY */}

// //                             <div>

// //                                 <label
// //                                     className="
// //                                         mb-2
// //                                         block
// //                                         text-xs
// //                                         font-medium
// //                                         text-gray-400
// //                                     "
// //                                 >
// //                                     Category
// //                                     <span className="ml-1 text-red-400">*</span>
// //                                 </label>

// //                                 <div className="relative">

// //                                     <Wallet
// //                                         size={16}
// //                                         className="
// //                                             pointer-events-none
// //                                             absolute
// //                                             left-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-gray-600
// //                                         "
// //                                     />

// //                                     <select
// //                                         name="category"
// //                                         onChange={handleNewExpanseChange}
// //                                         value={newExpanseData.category}
// //                                         className="
// //                                             h-12
// //                                             w-full
// //                                             appearance-none
// //                                             rounded-xl
// //                                             border
// //                                             border-white/[0.08]
// //                                             bg-white/[0.025]
// //                                             pl-11
// //                                             pr-10
// //                                             text-sm
// //                                             text-white
// //                                             outline-none

// //                                             focus:border-red-500/40
// //                                             focus:bg-white/[0.04]
// //                                             focus:ring-4
// //                                             focus:ring-red-500/[0.06]
// //                                         "
// //                                     >

// //                                         <option value="">
// //                                             Select category
// //                                         </option>

// //                                         <option value="utilities">
// //                                             Utilities
// //                                         </option>

// //                                         <option value="maintenance">
// //                                             Maintenance
// //                                         </option>

// //                                         <option value="employee">
// //                                             Employee
// //                                         </option>

// //                                         <option value="rent">
// //                                             Rent
// //                                         </option>

// //                                         <option value="equipment">
// //                                             Equipment
// //                                         </option>

// //                                         <option value="supplies">
// //                                             Supplies
// //                                         </option>

// //                                         <option value="marketing">
// //                                             Marketing
// //                                         </option>

// //                                         <option value="other">
// //                                             Other
// //                                         </option>

// //                                     </select>

// //                                     <ChevronDown
// //                                         size={16}
// //                                         className="
// //                                             pointer-events-none
// //                                             absolute
// //                                             right-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-gray-600
// //                                         "
// //                                     />

// //                                 </div>

// //                             </div>

// //                         </div>

// //                     </div>


// //                     {/* =================================================
// //                                 PAYMENT INFORMATION
// //                     ================================================== */}

// //                     <div>

// //                         <div className="mb-4 flex items-center gap-3">

// //                             <div className="h-px flex-1 bg-white/[0.06]" />

// //                             <span
// //                                 className="
// //                                     text-[10px]
// //                                     font-bold
// //                                     uppercase
// //                                     tracking-[3px]
// //                                     text-gray-600
// //                                 "
// //                             >
// //                                 Payment Details
// //                             </span>

// //                             <div className="h-px flex-1 bg-white/[0.06]" />

// //                         </div>


// //                         <div className="grid grid-cols-2 gap-5">


// //                             {/* AMOUNT */}

// //                             <div>

// //                                 <label
// //                                     className="
// //                                         mb-2
// //                                         block
// //                                         text-xs
// //                                         font-medium
// //                                         text-gray-400
// //                                     "
// //                                 >
// //                                     Amount
// //                                     <span className="ml-1 text-red-400">*</span>
// //                                 </label>

// //                                 <div className="relative">

// //                                     <span
// //                                         className="
// //                                             absolute
// //                                             left-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-sm
// //                                             font-bold
// //                                             text-red-400
// //                                         "
// //                                     >
// //                                         ₹
// //                                     </span>

// //                                     <input
// //                                         type="number"
// //                                         name="amount"
// //                                         value={newExpanseData.amount}
// //                                         onChange={handleNewExpanseChange}
// //                                         min="0"
// //                                         placeholder="0.00"
// //                                         className="
// //                                             h-12
// //                                             w-full
// //                                             rounded-xl
// //                                             border
// //                                             border-white/[0.08]
// //                                             bg-white/[0.025]
// //                                             pl-9
// //                                             pr-4
// //                                             text-sm
// //                                             font-semibold
// //                                             text-white
// //                                             outline-none
// //                                             placeholder:text-gray-700

// //                                             focus:border-red-500/40
// //                                             focus:bg-white/[0.04]
// //                                             focus:ring-4
// //                                             focus:ring-red-500/[0.06]
// //                                         "
// //                                     />

// //                                 </div>

// //                             </div>


// //                             {/* DATE */}

// //                             <div>

// //                                 <label
// //                                     className="
// //                                         mb-2
// //                                         block
// //                                         text-xs
// //                                         font-medium
// //                                         text-gray-400
// //                                     "
// //                                 >
// //                                     Expense Date
// //                                     <span className="ml-1 text-red-400">*</span>
// //                                 </label>

// //                                 <div className="relative">

// //                                     <CalendarDays
// //                                         size={16}
// //                                         className="
// //                                             pointer-events-none
// //                                             absolute
// //                                             left-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-gray-600
// //                                         "
// //                                     />

// //                                     <input
// //                                         type="date"
// //                                         name="expenseDate"
// //                                         onChange={handleNewExpanseChange}
// //                                         value={newExpanseData.expenseDate}
// //                                         className="
// //                                             h-12
// //                                             w-full
// //                                             rounded-xl
// //                                             border
// //                                             border-white/[0.08]
// //                                             bg-white/[0.025]
// //                                             pl-11
// //                                             pr-4
// //                                             text-sm
// //                                             text-white
// //                                             outline-none

// //                                             focus:border-red-500/40
// //                                             focus:bg-white/[0.04]
// //                                             focus:ring-4
// //                                             focus:ring-red-500/[0.06]
// //                                         "
// //                                     />

// //                                 </div>

// //                             </div>


// //                             {/* VENDOR */}

// //                             <div>

// //                                 <label
// //                                     className="
// //                                         mb-2
// //                                         block
// //                                         text-xs
// //                                         font-medium
// //                                         text-gray-400
// //                                     "
// //                                 >
// //                                     Paid To / Vendor
// //                                     <span className="ml-1 text-red-400">*</span>
// //                                 </label>

// //                                 <div className="relative">

// //                                     <Building2
// //                                         size={16}
// //                                         className="
// //                                             pointer-events-none
// //                                             absolute
// //                                             left-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-gray-600
// //                                         "
// //                                     />

// //                                     <input
// //                                         placeholder="Vendor or organization"
// //                                         name="paidTo"
// //                                         value={newExpanseData.paidTo}
// //                                         onChange={handleNewExpanseChange}
// //                                         className="
// //                                             h-12
// //                                             w-full
// //                                             rounded-xl
// //                                             border
// //                                             border-white/[0.08]
// //                                             bg-white/[0.025]
// //                                             pl-11
// //                                             pr-4
// //                                             text-sm
// //                                             text-white
// //                                             outline-none
// //                                             placeholder:text-gray-700

// //                                             focus:border-red-500/40
// //                                             focus:bg-white/[0.04]
// //                                             focus:ring-4
// //                                             focus:ring-red-500/[0.06]
// //                                         "
// //                                     />

// //                                 </div>

// //                             </div>


// //                             {/* PAYMENT METHOD */}

// //                             <div>

// //                                 <label
// //                                     className="
// //                                         mb-2
// //                                         block
// //                                         text-xs
// //                                         font-medium
// //                                         text-gray-400
// //                                     "
// //                                 >
// //                                     Payment Method
// //                                     <span className="ml-1 text-red-400">*</span>
// //                                 </label>

// //                                 <div className="relative">

// //                                     <CreditCard
// //                                         size={16}
// //                                         className="
// //                                             pointer-events-none
// //                                             absolute
// //                                             left-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-gray-600
// //                                         "
// //                                     />

// //                                     <select
// //                                         name="paymentMethod"
// //                                         onChange={handleNewExpanseChange}
// //                                         value={newExpanseData.paymentMethod}
// //                                         className="
// //                                             h-12
// //                                             w-full
// //                                             appearance-none
// //                                             rounded-xl
// //                                             border
// //                                             border-white/[0.08]
// //                                             bg-white/[0.025]
// //                                             pl-11
// //                                             pr-10
// //                                             text-sm
// //                                             text-white
// //                                             outline-none

// //                                             focus:border-red-500/40
// //                                             focus:bg-white/[0.04]
// //                                             focus:ring-4
// //                                             focus:ring-red-500/[0.06]
// //                                         "
// //                                     >

// //                                         <option value="">
// //                                             Select method
// //                                         </option>

// //                                         <option value="cash">
// //                                             Cash
// //                                         </option>

// //                                         <option value="upi">
// //                                             UPI
// //                                         </option>

// //                                         <option value="cheque">
// //                                             Cheque
// //                                         </option>

// //                                         <option value="bank_transfer">
// //                                             Bank Transfer
// //                                         </option>

// //                                     </select>

// //                                     <ChevronDown
// //                                         size={16}
// //                                         className="
// //                                             pointer-events-none
// //                                             absolute
// //                                             right-4
// //                                             top-1/2
// //                                             -translate-y-1/2
// //                                             text-gray-600
// //                                         "
// //                                     />

// //                                 </div>

// //                             </div>

// //                         </div>

// //                     </div>


// //                     {/* =================================================
// //                                 RECURRING
// //                     ================================================== */}

// //                     <div
// //                         className="
// //                             flex
// //                             items-center
// //                             justify-between

// //                             rounded-2xl

// //                             border
// //                             border-blue-500/10

// //                             bg-blue-500/[0.04]

// //                             px-5
// //                             py-4
// //                         "
// //                     >

// //                         <div className="flex items-center gap-4">

// //                             <div
// //                                 className="
// //                                     flex
// //                                     h-10
// //                                     w-10
// //                                     items-center
// //                                     justify-center

// //                                     rounded-xl

// //                                     bg-blue-500/10

// //                                     text-blue-400
// //                                 "
// //                             >

// //                                 <Repeat size={18} />

// //                             </div>


// //                             <div>

// //                                 <p
// //                                     className="
// //                                         text-sm
// //                                         font-semibold
// //                                         text-white
// //                                     "
// //                                 >
// //                                     Recurring Expense
// //                                 </p>

// //                                 <p
// //                                     className="
// //                                         mt-1
// //                                         text-xs
// //                                         text-gray-600
// //                                     "
// //                                 >
// //                                     Track this expense automatically every month.
// //                                 </p>

// //                             </div>

// //                         </div>


// //                         <label
// //                             className="
// //                                 relative
// //                                 inline-flex
// //                                 cursor-pointer
// //                                 items-center
// //                             "
// //                         >

// //                             <input
// //                                 type="checkbox"
// //                                 name="isRecurring"
// //                                 checked={newExpanseData.isRecurring}
// //                                 onChange={handleNewExpanseChange}
// //                                 className="peer sr-only"
// //                             />

// //                             <div
// //                                 className="
// //                                     h-6
// //                                     w-11
// //                                     rounded-full
// //                                     bg-white/10
// //                                     transition-all

// //                                     peer-checked:bg-red-500

// //                                     after:absolute
// //                                     after:left-[3px]
// //                                     after:top-[3px]
// //                                     after:h-4
// //                                     after:w-4
// //                                     after:rounded-full
// //                                     after:bg-white
// //                                     after:transition-all

// //                                     peer-checked:after:translate-x-5
// //                                 "
// //                             />

// //                         </label>

// //                     </div>


// //                     {/* =================================================
// //                                 NOTES
// //                     ================================================== */}

// //                     <div>

// //                         <label
// //                             className="
// //                                 mb-2
// //                                 block
// //                                 text-xs
// //                                 font-medium
// //                                 text-gray-400
// //                             "
// //                         >
// //                             Notes
// //                         </label>

// //                         <textarea
// //                             rows={4}
// //                             name="notes"
// //                             onChange={handleNewExpanseChange}
// //                             value={newExpanseData.notes}
// //                             placeholder="Add additional information about this expense..."
// //                             className="
// //                                 w-full
// //                                 resize-none
// //                                 rounded-2xl

// //                                 border
// //                                 border-white/[0.08]

// //                                 bg-white/[0.025]

// //                                 px-5
// //                                 py-4

// //                                 text-sm
// //                                 leading-6
// //                                 text-white

// //                                 outline-none

// //                                 placeholder:text-gray-700

// //                                 transition-all

// //                                 focus:border-red-500/40
// //                                 focus:bg-white/[0.04]
// //                                 focus:ring-4
// //                                 focus:ring-red-500/[0.06]
// //                             "
// //                         />

// //                     </div>

// //                 </div>

// //             </div>


// //             {/* =====================================================
// //                                 FOOTER
// //             ====================================================== */}

// //             <div
// //                 className="
// //                     relative
// //                     shrink-0

// //                     flex
// //                     items-center
// //                     justify-between

// //                     border-t
// //                     border-white/[0.07]

// //                     bg-[#0b0b0b]

// //                     px-7
// //                     py-5
// //                 "
// //             >

// //                 <div className="flex items-center gap-2">

// //                     <ShieldCheck
// //                         size={15}
// //                         className="text-emerald-500"
// //                     />

// //                     <span
// //                         className="
// //                             text-xs
// //                             text-gray-600
// //                         "
// //                     >
// //                         Expense will be securely recorded.
// //                     </span>

// //                 </div>


// //                 <div className="flex items-center gap-3">

// //                     <button
// //                         type="button"
// //                         onClick={() => setExpenseModalOpen(false)}
// //                         className="
// //                             h-11
// //                             rounded-xl

// //                             border
// //                             border-white/[0.08]

// //                             bg-white/[0.03]

// //                             px-5

// //                             text-sm
// //                             font-medium
// //                             text-gray-400

// //                             transition-all

// //                             hover:bg-white/[0.07]
// //                             hover:text-white
// //                         "
// //                     >
// //                         Cancel
// //                     </button>


// //                     <button
// //                         type="button"
// //                         onClick={createNewExpanse}
// //                         className="
// //                             group

// //                             flex
// //                             h-11
// //                             items-center
// //                             gap-2

// //                             rounded-xl

// //                             bg-gradient-to-r
// //                             from-red-600
// //                             to-red-500

// //                             px-6

// //                             text-sm
// //                             font-bold
// //                             text-white

// //                             shadow-[0_12px_30px_rgba(239,68,68,.18)]

// //                             transition-all
// //                             duration-300

// //                             hover:-translate-y-0.5
// //                             hover:shadow-[0_16px_35px_rgba(239,68,68,.28)]

// //                             active:translate-y-0
// //                         "
// //                     >

// //                         <Plus
// //                             size={17}
// //                             className="
// //                                 transition-transform
// //                                 duration-300
// //                                 group-hover:rotate-90
// //                             "
// //                         />

// //                         Record Expense

// //                     </button>

// //                 </div>

// //             </div>

// //         </div>

// //     </>

// // )}
// //         </div>

// //     );

// // };

// // export default ExpenseManagement;

// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// import {
//     Search,
//     Plus,
//     Receipt,
//     Wallet,
//     TrendingDown,
//     Clock3,
//     Repeat,
//     ChevronDown,
//     MoreVertical,
//     Eye,
//     Pencil,
//     Trash2,
//     Download,
//     CalendarDays,
//     Filter,
//     X,
//     ArrowDownRight,
//     Zap,
//     Wrench,
//     Users,
//     Building2,
//     ShieldCheck,
//     CreditCard,
//     Banknote,
//     Landmark,
//     FileText,
//     Upload,
//     CheckCircle2,
//     AlertCircle,
//     XCircle,
//     RotateCcw,
// } from "lucide-react";


// const ExpenseManagement = () => {

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;


//     // =========================================================
//     // SEARCH
//     // =========================================================

//     const [search, setSearch] = useState("");
//     const [debouncedSearch, setDebouncedSearch] = useState("");


//     // =========================================================
//     // UI STATES
//     // =========================================================

//     const [filterOpen, setFilterOpen] = useState(false);
//     const [expenseModalOpen, setExpenseModalOpen] = useState(false);
//     const [selectedExpense, setSelectedExpense] = useState(null);


//     // =========================================================
//     // FILTERS
//     // =========================================================

//     const [filters, setFilters] = useState({
//         category: "",
//         status: "",
//         paymentMethod: "",
//         dateFrom: "",
//         dateTo: "",
//         minAmount: "",
//         maxAmount: "",
//         recurring: "",
//     });


//     // =========================================================
//     // DASHBOARD DATA
//     // =========================================================

//     const [dashboardData, setDashboardData] = useState({
//         summary: {
//             totalExpenses: 0,
//             paidExpenses: 0,
//             pendingExpenses: 0,
//             recurringExpenses: 0,
//             totalTransactions: 0,
//             pendingTransactions: 0,
//             monthlyChange: 0,
//         },

//         monthlyTrend: [],

//         categoryBreakdown: [],
//     });


//     // =========================================================
//     // EXPENSE TABLE
//     // =========================================================

//     const [expenses, setExpenses] = useState([]);


//     // =========================================================
//     // LOADING
//     // =========================================================

//     const [loading, setLoading] = useState(false);
//     const [tableLoading, setTableLoading] = useState(false);


//     // =========================================================
//     // PAGINATION
//     // =========================================================

//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 10,
//         total: 0,
//         totalPages: 0,
//     });


//     // =========================================================
//     // NEW EXPENSE
//     // =========================================================

//     const [newExpanseData, setNewExpanseData] = useState({
//         title: "",
//         category: "",
//         amount: "",
//         expenseDate: "",
//         paidTo: "",
//         paymentMethod: "",
//         isRecurring: false,
//         notes: "",
//     });


//     // =========================================================
//     // FORM SUBMIT LOADING
//     // =========================================================

//     const [creatingExpense, setCreatingExpense] = useState(false);


//     // =========================================================
//     // CATEGORY CONFIG
//     // =========================================================

//     const categoryConfig = {

//         utilities: {
//             icon: Zap,
//         },

//         maintenance: {
//             icon: Wrench,
//         },

//         employee: {
//             icon: Users,
//         },

//         supplies: {
//             icon: Receipt,
//         },

//         rent: {
//             icon: Building2,
//         },

//         marketing: {
//             icon: TrendingDown,
//         },

//         equipment: {
//             icon: ShieldCheck,
//         },

//         other: {
//             icon: FileText,
//         },

//     };


//     // =========================================================
//     // HANDLE NEW EXPENSE
//     // =========================================================

//     const handleNewExpanseChange = (e) => {

//         const {
//             name,
//             value,
//             type,
//             checked
//         } = e.target;

//         setNewExpanseData((prev) => ({
//             ...prev,
//             [name]: type === "checkbox"
//                 ? checked
//                 : value,
//         }));

//     };


//     // =========================================================
//     // CREATE NEW EXPENSE
//     // =========================================================

//     const createNewExpanse = async () => {

//         try {

//             if (!newExpanseData.title.trim()) {
//                 toast.error("Expense title is required");
//                 return;
//             }

//             if (!newExpanseData.category) {
//                 toast.error("Please select an expense category");
//                 return;
//             }

//             if (
//                 !newExpanseData.amount ||
//                 Number(newExpanseData.amount) <= 0
//             ) {
//                 toast.error("Please enter a valid expense amount");
//                 return;
//             }

//             if (!newExpanseData.expenseDate) {
//                 toast.error("Expense date is required");
//                 return;
//             }

//             if (!newExpanseData.paidTo.trim()) {
//                 toast.error("Paid To / Vendor is required");
//                 return;
//             }

//             if (!newExpanseData.paymentMethod) {
//                 toast.error("Please select a payment method");
//                 return;
//             }


//             setCreatingExpense(true);


//             const payload = {
//                 ...newExpanseData,

//                 title: newExpanseData.title.trim(),

//                 amount: Number(newExpanseData.amount),

//                 paidTo: newExpanseData.paidTo.trim(),

//                 notes: newExpanseData.notes.trim(),
//             };


//             const response = await axios.post(
//                 `${backendUrl}/api/admin/expanses/create-expanse`,
//                 payload,
//                 {
//                     withCredentials: true,
//                 }
//             );


//             if (response.data.success) {

//                 toast.success(
//                     "New Expense Added Successfully"
//                 );


//                 setExpenseModalOpen(false);


//                 resetExpenseForm();


//                 /*
//                  * Refresh dashboard and table
//                  * because both are affected by
//                  * the newly created expense.
//                  */

//                 await Promise.all([
//                     fetchExpenseDashboard(),
//                     fetchExpenses(),
//                 ]);

//             }

//         } catch (error) {

//             console.error(
//                 "Create expense error:",
//                 error
//             );


//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to create expense"
//             );

//         } finally {

//             setCreatingExpense(false);

//         }

//     };


//     // =========================================================
//     // RESET EXPENSE FORM
//     // =========================================================

//     const resetExpenseForm = () => {

//         setNewExpanseData({
//             title: "",
//             category: "",
//             amount: "",
//             expenseDate: "",
//             paidTo: "",
//             paymentMethod: "",
//             isRecurring: false,
//             notes: "",
//         });

//     };


//     // =========================================================
//     // FETCH DASHBOARD
//     // =========================================================

//     const fetchExpenseDashboard = async () => {

//         try {

//             setLoading(true);


//             const response = await axios.get(
//                 `${backendUrl}/api/admin/expanses/dashboard`,
//                 {
//                     withCredentials: true,
//                 }
//             );


//             if (response.data.success) {

//                 setDashboardData(
//                     response.data.data
//                 );

//             }

//         } catch (error) {

//             console.error(
//                 "Failed to fetch expense dashboard:",
//                 error
//             );


//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to load expense dashboard"
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // =========================================================
//     // FETCH EXPENSES
//     // SERVER SIDE SEARCH + FILTER + PAGINATION
//     // =========================================================

//     const fetchExpenses = async () => {

//         try {

//             setTableLoading(true);


//             const params = new URLSearchParams();


//             // SEARCH

//             if (debouncedSearch.trim()) {

//                 params.append(
//                     "search",
//                     debouncedSearch.trim()
//                 );

//             }


//             // CATEGORY

//             if (filters.category) {

//                 params.append(
//                     "category",
//                     filters.category
//                 );

//             }


//             // STATUS

//             if (filters.status) {

//                 params.append(
//                     "status",
//                     filters.status
//                 );

//             }


//             // PAYMENT METHOD

//             if (filters.paymentMethod) {

//                 params.append(
//                     "paymentMethod",
//                     filters.paymentMethod
//                 );

//             }


//             // DATE FROM

//             if (filters.dateFrom) {

//                 params.append(
//                     "dateFrom",
//                     filters.dateFrom
//                 );

//             }


//             // DATE TO

//             if (filters.dateTo) {

//                 params.append(
//                     "dateTo",
//                     filters.dateTo
//                 );

//             }


//             // MIN AMOUNT

//             if (filters.minAmount) {

//                 params.append(
//                     "minAmount",
//                     filters.minAmount
//                 );

//             }


//             // MAX AMOUNT

//             if (filters.maxAmount) {

//                 params.append(
//                     "maxAmount",
//                     filters.maxAmount
//                 );

//             }


//             // RECURRING

//             if (filters.recurring !== "") {

//                 params.append(
//                     "recurring",
//                     filters.recurring
//                 );

//             }


//             // PAGINATION

//             params.append(
//                 "page",
//                 pagination.page
//             );

//             params.append(
//                 "limit",
//                 pagination.limit
//             );


//             const response = await axios.get(
//                 `${backendUrl}/api/admin/expanses?${params.toString()}`,
//                 {
//                     withCredentials: true,
//                 }
//             );


//             if (response.data.success) {

//                 const data = response.data.data;


//                 setExpenses(
//                     data.expenses || []
//                 );


//                 setPagination((prev) => ({
//                     ...prev,

//                     total:
//                         data.pagination?.total || 0,

//                     totalPages:
//                         data.pagination?.totalPages || 0,
//                 }));

//             }

//         } catch (error) {

//             console.error(
//                 "Failed to fetch expenses:",
//                 error
//             );


//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to load expenses"
//             );

//         } finally {

//             setTableLoading(false);

//         }

//     };


//     // =========================================================
//     // INITIAL DASHBOARD LOAD
//     // =========================================================

//     useEffect(() => {

//         fetchExpenseDashboard();

//     }, []);


//     // =========================================================
//     // DEBOUNCE SEARCH
//     // =========================================================

//     useEffect(() => {

//         const timer = setTimeout(() => {

//             setDebouncedSearch(search);

//         }, 500);


//         return () => {

//             clearTimeout(timer);

//         };

//     }, [search]);


//     // =========================================================
//     // RESET PAGE WHEN SEARCH / FILTER CHANGES
//     // =========================================================

//     useEffect(() => {

//         setPagination((prev) => ({
//             ...prev,
//             page: 1,
//         }));

//     }, [
//         debouncedSearch,
//         filters.category,
//         filters.status,
//         filters.paymentMethod,
//         filters.dateFrom,
//         filters.dateTo,
//         filters.minAmount,
//         filters.maxAmount,
//         filters.recurring,
//     ]);


//     // =========================================================
//     // FETCH TABLE DATA
//     // =========================================================

//     useEffect(() => {

//         fetchExpenses();

//     }, [
//         debouncedSearch,
//         filters.category,
//         filters.status,
//         filters.paymentMethod,
//         filters.dateFrom,
//         filters.dateTo,
//         filters.minAmount,
//         filters.maxAmount,
//         filters.recurring,
//         pagination.page,
//         pagination.limit,
//     ]);


//     // =========================================================
//     // FILTER CHANGE
//     // =========================================================

//     const filterChangeHandler = (e) => {

//         const {
//             name,
//             value
//         } = e.target;


//         setFilters((prev) => ({
//             ...prev,
//             [name]: value,
//         }));

//     };


//     // =========================================================
//     // CLEAR FILTERS
//     // =========================================================

//     const clearFilters = () => {

//         setFilters({
//             category: "",
//             status: "",
//             paymentMethod: "",
//             dateFrom: "",
//             dateTo: "",
//             minAmount: "",
//             maxAmount: "",
//             recurring: "",
//         });


//         setSearch("");

//         setFilterOpen(false);

//     };


//     // =========================================================
//     // PAGINATION
//     // =========================================================

//     const goToPage = (page) => {

//         if (
//             page < 1 ||
//             page > pagination.totalPages
//         ) {
//             return;
//         }


//         setPagination((prev) => ({
//             ...prev,
//             page,
//         }));

//     };


//     // =========================================================
//     // FORMAT CURRENCY
//     // =========================================================

//     const formatCurrency = (amount) => {

//         return new Intl.NumberFormat(
//             "en-IN",
//             {
//                 style: "currency",
//                 currency: "INR",
//                 maximumFractionDigits: 0,
//             }
//         ).format(
//             Number(amount || 0)
//         );

//     };


//     // =========================================================
//     // FORMAT DATE
//     // =========================================================

//     const formatDate = (date) => {

//         if (!date) {
//             return "-";
//         }


//         return new Date(date).toLocaleDateString(
//             "en-IN",
//             {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//             }
//         );

//     };


//     // =========================================================
//     // MONTHLY CHANGE
//     // =========================================================

//     const monthlyChange =
//         Number(
//             dashboardData.summary?.monthlyChange || 0
//         );


//     // =========================================================
//     // RENDER
//     // =========================================================

//     return (

//         <div className="min-h-screen bg-[#080808] text-white">

//             {/* ================================================= */}
//             {/* PAGE HEADER */}
//             {/* ================================================= */}

//             <div className="px-7 pt-7">

//                 <div className="flex items-start justify-between">

//                     <div>

//                         <div className="
//                             flex
//                             items-center
//                             gap-2
//                             text-red-400
//                             text-[11px]
//                             font-bold
//                             uppercase
//                             tracking-[4px]
//                         ">

//                             <Receipt size={14} />

//                             Financial Management

//                         </div>


//                         <h1 className="
//                             mt-2
//                             text-4xl
//                             font-black
//                             tracking-tight
//                         ">

//                             Expense Tracking

//                         </h1>


//                         <p className="
//                             mt-2
//                             text-gray-500
//                             text-sm
//                         ">

//                             Monitor, manage and analyze every expense of your gym.

//                         </p>

//                     </div>


//                     <div className="flex gap-3">

//                         <button
//                             className="
//                                 h-12
//                                 px-5
//                                 rounded-xl
//                                 border
//                                 border-[#292929]
//                                 bg-[#111111]
//                                 text-gray-300
//                                 flex
//                                 items-center
//                                 gap-2
//                                 hover:bg-[#181818]
//                                 transition
//                             "
//                         >

//                             <Download size={17} />

//                             Export

//                         </button>


//                         <button
//                             onClick={() => {
//                                 resetExpenseForm();
//                                 setExpenseModalOpen(true);
//                             }}
//                             className="
//                                 h-12
//                                 px-6
//                                 rounded-xl
//                                 bg-gradient-to-r
//                                 from-red-700
//                                 to-red-500
//                                 font-bold
//                                 flex
//                                 items-center
//                                 gap-2
//                                 shadow-lg
//                                 shadow-red-900/20
//                             "
//                         >

//                             <Plus size={18} />

//                             Add Expense

//                         </button>

//                     </div>

//                 </div>


//                 {/* ================================================= */}
//                 {/* KPI CARDS */}
//                 {/* ================================================= */}

//                 <div className="
//                     grid
//                     grid-cols-1
//                     md:grid-cols-2
//                     xl:grid-cols-4
//                     gap-5
//                     mt-10
//                 ">


//                     {/* TOTAL */}

//                     <div className="
//                         rounded-2xl
//                         border
//                         border-[#282828]
//                         bg-[#111111]
//                         p-6
//                     ">

//                         <div className="flex justify-between">

//                             <div className="
//                                 w-11
//                                 h-11
//                                 rounded-xl
//                                 bg-red-500/10
//                                 text-red-400
//                                 flex
//                                 items-center
//                                 justify-center
//                             ">

//                                 <TrendingDown size={20} />

//                             </div>


//                             <span className="
//                                 px-3
//                                 py-1
//                                 rounded-lg
//                                 bg-red-500/10
//                                 text-red-400
//                                 text-xs
//                                 font-semibold
//                             ">

//                                 This Month

//                             </span>

//                         </div>


//                         <p className="
//                             mt-7
//                             text-gray-500
//                             text-sm
//                         ">

//                             Total Expenses

//                         </p>


//                         <h2 className="
//                             mt-2
//                             text-2xl
//                             font-black
//                         ">

//                             {loading
//                                 ? "..."
//                                 : formatCurrency(
//                                     dashboardData.summary?.totalExpenses
//                                 )
//                             }

//                         </h2>


//                         <div className="
//                             mt-3
//                             flex
//                             items-center
//                             gap-1
//                             text-sm
//                             text-red-400"
//                         >

//                             <ArrowDownRight size={15} />

//                             {Math.abs(monthlyChange)}% from last month

//                         </div>

//                     </div>


//                     {/* PAID */}

//                     <div className="
//                         rounded-2xl
//                         border
//                         border-[#282828]
//                         bg-[#111111]
//                         p-6
//                     ">

//                         <div className="
//                             w-11
//                             h-11
//                             rounded-xl
//                             bg-emerald-500/10
//                             text-emerald-400
//                             flex
//                             items-center
//                             justify-center
//                         ">

//                             <CheckCircle2 size={20} />

//                         </div>


//                         <p className="
//                             mt-7
//                             text-gray-500
//                             text-sm
//                         ">

//                             Paid Expenses

//                         </p>


//                         <h2 className="
//                             mt-2
//                             text-2xl
//                             font-black
//                         ">

//                             {loading
//                                 ? "..."
//                                 : formatCurrency(
//                                     dashboardData.summary?.paidExpenses
//                                 )
//                             }

//                         </h2>


//                         <p className="
//                             mt-3
//                             text-sm
//                             text-gray-600
//                         ">

//                             {dashboardData.summary?.totalTransactions || 0}
//                             {" "}
//                             transactions

//                         </p>

//                     </div>


//                     {/* PENDING */}

//                     <div className="
//                         rounded-2xl
//                         border
//                         border-[#282828]
//                         bg-[#111111]
//                         p-6
//                     ">

//                         <div className="
//                             w-11
//                             h-11
//                             rounded-xl
//                             bg-yellow-500/10
//                             text-yellow-400
//                             flex
//                             items-center
//                             justify-center
//                         ">

//                             <Clock3 size={20} />

//                         </div>


//                         <p className="
//                             mt-7
//                             text-gray-500
//                             text-sm
//                         ">

//                             Pending Expenses

//                         </p>


//                         <h2 className="
//                             mt-2
//                             text-2xl
//                             font-black
//                         ">

//                             {loading
//                                 ? "..."
//                                 : formatCurrency(
//                                     dashboardData.summary?.pendingExpenses
//                                 )
//                             }

//                         </h2>


//                         <p className="
//                             mt-3
//                             text-sm
//                             text-gray-600
//                         ">

//                             {dashboardData.summary?.pendingTransactions || 0}
//                             {" "}
//                             awaiting payment

//                         </p>

//                     </div>


//                     {/* RECURRING */}

//                     <div className="
//                         rounded-2xl
//                         border
//                         border-[#282828]
//                         bg-[#111111]
//                         p-6
//                     ">

//                         <div className="
//                             w-11
//                             h-11
//                             rounded-xl
//                             bg-blue-500/10
//                             text-blue-400
//                             flex
//                             items-center
//                             justify-center
//                         ">

//                             <Repeat size={20} />

//                         </div>


//                         <p className="
//                             mt-7
//                             text-gray-500
//                             text-sm
//                         ">

//                             Recurring Expenses

//                         </p>


//                         <h2 className="
//                             mt-2
//                             text-2xl
//                             font-black
//                         ">

//                             {loading
//                                 ? "..."
//                                 : formatCurrency(
//                                     dashboardData.summary?.recurringExpenses
//                                 )
//                             }

//                         </h2>


//                         <p className="
//                             mt-3
//                             text-sm
//                             text-gray-600
//                         ">

//                             Expected monthly

//                         </p>

//                     </div>

//                 </div>


//                 {/* ================================================= */}
//                 {/* CHARTS */}
//                 {/* ================================================= */}

//                 <div className="
//                     grid
//                     grid-cols-1
//                     xl:grid-cols-[2fr_1fr]
//                     gap-5
//                     mt-6
//                 ">


//                     {/* MONTHLY TREND */}

//                     <div className="
//                         rounded-2xl
//                         border
//                         border-[#282828]
//                         bg-[#111111]
//                         p-7
//                     ">

//                         <div className="
//                             flex
//                             items-start
//                             justify-between
//                         ">

//                             <div>

//                                 <h2 className="
//                                     text-xl
//                                     font-black
//                                 ">

//                                     Expense Overview

//                                 </h2>


//                                 <p className="
//                                     mt-2
//                                     text-sm
//                                     text-gray-600
//                                 ">

//                                     Monthly spending trend

//                                 </p>

//                             </div>

//                         </div>


//                         <div className="
//                             mt-10
//                             h-[280px]
//                             flex
//                             items-end
//                             gap-4
//                             overflow-x-auto
//                         ">

//                             {dashboardData.monthlyTrend?.length === 0 ? (

//                                 <div className="
//                                     w-full
//                                     h-full
//                                     flex
//                                     items-center
//                                     justify-center
//                                     text-gray-600
//                                 ">

//                                     No monthly expense data available

//                                 </div>

//                             ) : (

//                                 dashboardData.monthlyTrend.map(
//                                     (item, index) => {

//                                         const maxValue =
//                                             Math.max(
//                                                 ...dashboardData.monthlyTrend.map(
//                                                     (x) =>
//                                                         Number(
//                                                             x.amount || 0
//                                                         )
//                                                 ),
//                                                 1
//                                             );


//                                         const height =
//                                             (
//                                                 Number(item.amount || 0) /
//                                                 maxValue
//                                             ) * 100;


//                                         return (

//                                             <div
//                                                 key={
//                                                     item.month ||
//                                                     item._id ||
//                                                     index
//                                                 }
//                                                 className="
//                                                     flex-1
//                                                     min-w-[45px]
//                                                     h-full
//                                                     flex
//                                                     flex-col
//                                                     justify-end
//                                                     items-center
//                                                 "
//                                             >

//                                                 <div
//                                                     title={formatCurrency(
//                                                         item.amount
//                                                     )}
//                                                     className="
//                                                         w-full
//                                                         max-w-[48px]
//                                                         rounded-t-xl
//                                                         bg-gradient-to-t
//                                                         from-red-800
//                                                         to-red-500
//                                                         transition-all
//                                                         duration-500
//                                                     "
//                                                     style={{
//                                                         height:
//                                                             `${Math.max(
//                                                                 height,
//                                                                 4
//                                                             )}%`,
//                                                     }}
//                                                 />

//                                                 <span className="
//                                                     mt-3
//                                                     text-[11px]
//                                                     text-gray-600
//                                                 ">

//                                                     {item.month}

//                                                 </span>

//                                             </div>

//                                         );

//                                     }
//                                 )

//                             )}

//                         </div>

//                     </div>


//                     {/* CATEGORY BREAKDOWN */}

//                     <div className="
//                         rounded-2xl
//                         border
//                         border-[#282828]
//                         bg-[#111111]
//                         p-7
//                     ">

//                         <h2 className="
//                             text-xl
//                             font-black
//                         ">

//                             Spending Categories

//                         </h2>


//                         <p className="
//                             mt-2
//                             text-sm
//                             text-gray-600
//                         ">

//                             Where your money goes

//                         </p>


//                         <div className="
//                             mt-8
//                             space-y-6
//                         ">

//                             {dashboardData.categoryBreakdown?.length === 0 ? (

//                                 <p className="
//                                     text-sm
//                                     text-gray-600
//                                 ">

//                                     No category data available.

//                                 </p>

//                             ) : (

//                                 dashboardData.categoryBreakdown.map(
//                                     (item, index) => {

//                                         const Icon =
//                                             categoryConfig[
//                                                 String(
//                                                     item.category || ""
//                                                 ).toLowerCase()
//                                             ]?.icon ||
//                                             FileText;


//                                         const maxCategory =
//                                             Math.max(
//                                                 ...dashboardData.categoryBreakdown.map(
//                                                     (x) =>
//                                                         Number(
//                                                             x.amount || 0
//                                                         )
//                                                 ),
//                                                 1
//                                             );


//                                         const percentage =
//                                             (
//                                                 Number(item.amount || 0) /
//                                                 maxCategory
//                                             ) * 100;


//                                         return (

//                                             <div
//                                                 key={
//                                                     item.category ||
//                                                     index
//                                                 }
//                                             >

//                                                 <div className="
//                                                     flex
//                                                     items-center
//                                                     justify-between
//                                                     text-sm
//                                                 ">

//                                                     <span className="
//                                                         flex
//                                                         items-center
//                                                         gap-2
//                                                         text-gray-400
//                                                     ">

//                                                         <Icon
//                                                             size={15}
//                                                         />

//                                                         {item.category}

//                                                     </span>


//                                                     <span className="
//                                                         font-semibold
//                                                         text-gray-300
//                                                     ">

//                                                         {formatCurrency(
//                                                             item.amount
//                                                         )}

//                                                     </span>

//                                                 </div>


//                                                 <div className="
//                                                     mt-2
//                                                     h-1.5
//                                                     rounded-full
//                                                     bg-[#242424]
//                                                     overflow-hidden
//                                                 ">

//                                                     <div
//                                                         className="
//                                                             h-full
//                                                             rounded-full
//                                                             bg-gradient-to-r
//                                                             from-red-700
//                                                             to-red-400
//                                                         "
//                                                         style={{
//                                                             width:
//                                                                 `${percentage}%`,
//                                                         }}
//                                                     />

//                                                 </div>

//                                             </div>

//                                         );

//                                     }
//                                 )

//                             )}

//                         </div>

//                     </div>

//                 </div>


//                 {/* ================================================= */}
//                 {/* EXPENSE TABLE */}
//                 {/* ================================================= */}

//                 <div className="
//                     mt-6
//                     rounded-2xl
//                     border
//                     border-[#282828]
//                     bg-[#111111]
//                     overflow-hidden
//                 ">


//                     {/* TABLE HEADER */}

//                     <div className="
//                         p-6
//                         border-b
//                         border-[#242424]
//                         flex
//                         flex-col
//                         lg:flex-row
//                         lg:items-center
//                         lg:justify-between
//                         gap-4
//                     ">

//                         <div>

//                             <h2 className="
//                                 text-xl
//                                 font-black
//                             ">

//                                 Expense Records

//                             </h2>


//                             <p className="
//                                 mt-1
//                                 text-sm
//                                 text-gray-600
//                             ">

//                                 Complete history of gym expenses

//                             </p>

//                         </div>


//                         <div className="
//                             flex
//                             gap-3
//                         ">

//                             {/* SEARCH */}

//                             <div className="
//                                 relative
//                                 w-[300px]
//                             ">

//                                 <Search
//                                     size={18}
//                                     className="
//                                         absolute
//                                         left-4
//                                         top-1/2
//                                         -translate-y-1/2
//                                         text-gray-600
//                                     "
//                                 />


//                                 <input
//                                     value={search}
//                                     onChange={(e) =>
//                                         setSearch(
//                                             e.target.value
//                                         )
//                                     }
//                                     placeholder="Search expenses..."
//                                     className="
//                                         w-full
//                                         h-11
//                                         pl-11
//                                         pr-4
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#0c0c0c]
//                                         text-sm
//                                         text-white
//                                         outline-none
//                                         focus:border-red-500/50
//                                     "
//                                 />

//                             </div>


//                             {/* FILTER */}

//                             <button
//                                 onClick={() =>
//                                     setFilterOpen(
//                                         !filterOpen
//                                     )
//                                 }
//                                 className="
//                                     h-11
//                                     px-5
//                                     rounded-xl
//                                     border
//                                     border-[#292929]
//                                     bg-[#151515]
//                                     text-gray-300
//                                     flex
//                                     items-center
//                                     gap-2
//                                     hover:bg-[#1b1b1b]
//                                 "
//                             >

//                                 <Filter size={16} />

//                                 Filters

//                             </button>

//                         </div>

//                     </div>


//                     {/* ================================================= */}
//                     {/* FILTER PANEL */}
//                     {/* ================================================= */}

//                     {filterOpen && (

//                         <div className="
//                             p-6
//                             border-b
//                             border-[#242424]
//                             bg-[#0d0d0d]
//                         ">

//                             <div className="
//                                 grid
//                                 grid-cols-1
//                                 md:grid-cols-2
//                                 xl:grid-cols-4
//                                 gap-4
//                             ">


//                                 {/* CATEGORY */}

//                                 <select
//                                     name="category"
//                                     value={filters.category}
//                                     onChange={filterChangeHandler}
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                         outline-none
//                                     "
//                                 >

//                                     <option value="">
//                                         All Categories
//                                     </option>

//                                     <option value="utilities">
//                                         Utilities
//                                     </option>

//                                     <option value="maintenance">
//                                         Maintenance
//                                     </option>

//                                     <option value="employee">
//                                         Employee
//                                     </option>

//                                     <option value="rent">
//                                         Rent
//                                     </option>

//                                     <option value="equipment">
//                                         Equipment
//                                     </option>

//                                     <option value="supplies">
//                                         Supplies
//                                     </option>

//                                     <option value="marketing">
//                                         Marketing
//                                     </option>

//                                     <option value="other">
//                                         Other
//                                     </option>

//                                 </select>


//                                 {/* STATUS */}

//                                 <select
//                                     name="status"
//                                     value={filters.status}
//                                     onChange={filterChangeHandler}
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                         outline-none
//                                     "
//                                 >

//                                     <option value="">
//                                         All Status
//                                     </option>

//                                     <option value="paid">
//                                         Paid
//                                     </option>

//                                     <option value="pending">
//                                         Pending
//                                     </option>

//                                     <option value="cancelled">
//                                         Cancelled
//                                     </option>

//                                 </select>


//                                 {/* PAYMENT */}

//                                 <select
//                                     name="paymentMethod"
//                                     value={filters.paymentMethod}
//                                     onChange={filterChangeHandler}
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                         outline-none
//                                     "
//                                 >

//                                     <option value="">
//                                         All Payment Methods
//                                     </option>

//                                     <option value="cash">
//                                         Cash
//                                     </option>

//                                     <option value="upi">
//                                         UPI
//                                     </option>

//                                     <option value="cheque">
//                                         Cheque
//                                     </option>

//                                     <option value="bank_transfer">
//                                         Bank Transfer
//                                     </option>

//                                 </select>


//                                 {/* RECURRING */}

//                                 <select
//                                     name="recurring"
//                                     value={filters.recurring}
//                                     onChange={filterChangeHandler}
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                         outline-none
//                                     "
//                                 >

//                                     <option value="">
//                                         All Expenses
//                                     </option>

//                                     <option value="true">
//                                         Recurring
//                                     </option>

//                                     <option value="false">
//                                         Non Recurring
//                                     </option>

//                                 </select>


//                                 {/* DATE FROM */}

//                                 <input
//                                     type="date"
//                                     name="dateFrom"
//                                     value={filters.dateFrom}
//                                     onChange={filterChangeHandler}
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                     "
//                                 />


//                                 {/* DATE TO */}

//                                 <input
//                                     type="date"
//                                     name="dateTo"
//                                     value={filters.dateTo}
//                                     onChange={filterChangeHandler}
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                     "
//                                 />


//                                 {/* MIN */}

//                                 <input
//                                     type="number"
//                                     name="minAmount"
//                                     value={filters.minAmount}
//                                     onChange={filterChangeHandler}
//                                     placeholder="Minimum amount"
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                         outline-none
//                                     "
//                                 />


//                                 {/* MAX */}

//                                 <input
//                                     type="number"
//                                     name="maxAmount"
//                                     value={filters.maxAmount}
//                                     onChange={filterChangeHandler}
//                                     placeholder="Maximum amount"
//                                     className="
//                                         h-11
//                                         px-3
//                                         rounded-xl
//                                         border
//                                         border-[#292929]
//                                         bg-[#151515]
//                                         text-gray-300
//                                         outline-none
//                                     "
//                                 />

//                             </div>


//                             <div className="
//                                 mt-5
//                                 flex
//                                 justify-end
//                             ">

//                                 <button
//                                     onClick={clearFilters}
//                                     className="
//                                         text-sm
//                                         text-gray-500
//                                         hover:text-white
//                                         flex
//                                         items-center
//                                         gap-2
//                                     "
//                                 >

//                                     <RotateCcw size={15} />

//                                     Clear Filters

//                                 </button>

//                             </div>

//                         </div>

//                     )}


//                     {/* ================================================= */}
//                     {/* TABLE */}
//                     {/* ================================================= */}

//                     <div className="overflow-x-auto">

//                         <table className="
//                             w-full
//                             min-w-[1100px]
//                         ">

//                             <thead>

//                                 <tr className="
//                                     border-b
//                                     border-[#242424]
//                                     text-left
//                                     text-[11px]
//                                     uppercase
//                                     tracking-wider
//                                     text-gray-600
//                                 ">

//                                     <th className="px-5 py-4">
//                                         Expense
//                                     </th>

//                                     <th className="px-5 py-4">
//                                         Category
//                                     </th>

//                                     <th className="px-5 py-4">
//                                         Paid To
//                                     </th>

//                                     <th className="px-5 py-4">
//                                         Date
//                                     </th>

//                                     <th className="px-5 py-4">
//                                         Payment
//                                     </th>

//                                     <th className="px-5 py-4">
//                                         Amount
//                                     </th>

//                                     <th className="px-5 py-4">
//                                         Status
//                                     </th>

//                                     <th className="px-5 py-4">
//                                         Action
//                                     </th>

//                                 </tr>

//                             </thead>


//                             <tbody>

//                                 {tableLoading ? (

//                                     <tr>

//                                         <td
//                                             colSpan="8"
//                                             className="
//                                                 py-20
//                                                 text-center
//                                                 text-gray-600
//                                             "
//                                         >

//                                             Loading expenses...

//                                         </td>

//                                     </tr>

//                                 ) : expenses.length === 0 ? (

//                                     <tr>

//                                         <td
//                                             colSpan="8"
//                                             className="
//                                                 py-20
//                                                 text-center
//                                             "
//                                         >

//                                             <Receipt
//                                                 size={36}
//                                                 className="
//                                                     mx-auto
//                                                     text-gray-700
//                                                 "
//                                             />


//                                             <p className="
//                                                 mt-4
//                                                 text-gray-500
//                                             ">

//                                                 No expenses found.

//                                             </p>

//                                         </td>

//                                     </tr>

//                                 ) : (

//                                     expenses.map((expense) => {

//                                         const Icon =
//                                             categoryConfig[
//                                                 String(
//                                                     expense.category || ""
//                                                 ).toLowerCase()
//                                             ]?.icon ||
//                                             FileText;


//                                         const expenseId =
//                                             expense.expenseId ||
//                                             expense.id ||
//                                             expense._id;


//                                         const status =
//                                             String(
//                                                 expense.status || ""
//                                             ).toLowerCase();


//                                         return (

//                                             <tr
//                                                 key={expenseId}
//                                                 className="
//                                                     border-b
//                                                     border-[#202020]
//                                                     hover:bg-[#151515]
//                                                     transition
//                                                 "
//                                             >

//                                                 {/* EXPENSE */}

//                                                 <td className="
//                                                     px-5
//                                                     py-5
//                                                 ">

//                                                     <div className="
//                                                         flex
//                                                         items-center
//                                                         gap-3
//                                                     ">

//                                                         <div className="
//                                                             w-11
//                                                             h-11
//                                                             rounded-xl
//                                                             bg-[#191919]
//                                                             border
//                                                             border-[#292929]
//                                                             flex
//                                                             items-center
//                                                             justify-center
//                                                             text-red-400
//                                                         ">

//                                                             <Receipt
//                                                                 size={18}
//                                                             />

//                                                         </div>


//                                                         <div>

//                                                             <p className="
//                                                                 font-semibold
//                                                                 text-white
//                                                             ">

//                                                                 {expense.title}

//                                                             </p>


//                                                             <p className="
//                                                                 mt-1
//                                                                 text-xs
//                                                                 text-gray-600
//                                                             ">

//                                                                 {expenseId}

//                                                             </p>

//                                                         </div>

//                                                     </div>

//                                                 </td>


//                                                 {/* CATEGORY */}

//                                                 <td className="
//                                                     px-5
//                                                     py-5
//                                                 ">

//                                                     <div className="
//                                                         flex
//                                                         items-center
//                                                         gap-2
//                                                         text-gray-400
//                                                     ">

//                                                         <Icon
//                                                             size={16}
//                                                         />

//                                                         <span className="
//                                                             capitalize
//                                                         ">

//                                                             {String(
//                                                                 expense.category ||
//                                                                 "-"
//                                                             ).replace(
//                                                                 "_",
//                                                                 " "
//                                                             )}

//                                                         </span>

//                                                     </div>

//                                                 </td>


//                                                 {/* PAID TO */}

//                                                 <td className="
//                                                     px-5
//                                                     py-5
//                                                 ">

//                                                     <div>

//                                                         <p className="
//                                                             text-gray-300
//                                                         ">

//                                                             {expense.paidTo || "-"}

//                                                         </p>


//                                                         {expense.isRecurring && (

//                                                             <p className="
//                                                                 mt-1
//                                                                 text-xs
//                                                                 text-blue-400
//                                                                 flex
//                                                                 items-center
//                                                                 gap-1
//                                                             ">

//                                                                 <Repeat
//                                                                     size={12}
//                                                                 />

//                                                                 Recurring

//                                                             </p>

//                                                         )}

//                                                     </div>

//                                                 </td>


//                                                 {/* DATE */}

//                                                 <td className="
//                                                     px-5
//                                                     py-5
//                                                     text-gray-400
//                                                 ">

//                                                     {formatDate(
//                                                         expense.expenseDate
//                                                     )}

//                                                 </td>


//                                                 {/* PAYMENT */}

//                                                 <td className="
//                                                     px-5
//                                                     py-5
//                                                 ">

//                                                     <span className="
//                                                         flex
//                                                         items-center
//                                                         gap-2
//                                                         text-gray-400
//                                                         capitalize
//                                                     ">

//                                                         {expense.paymentMethod === "cash" && (
//                                                             <Banknote size={15} />
//                                                         )}

//                                                         {expense.paymentMethod === "upi" && (
//                                                             <CreditCard size={15} />
//                                                         )}

//                                                         {expense.paymentMethod === "cheque" && (
//                                                             <Receipt size={15} />
//                                                         )}

//                                                         {expense.paymentMethod === "bank_transfer" && (
//                                                             <Landmark size={15} />
//                                                         )}

//                                                         {String(
//                                                             expense.paymentMethod ||
//                                                             "-"
//                                                         ).replace(
//                                                             "_",
//                                                             " "
//                                                         )}

//                                                     </span>

//                                                 </td>


//                                                 {/* AMOUNT */}

//                                                 <td className="
//                                                     px-5
//                                                     py-5
//                                                     font-bold
//                                                     text-white
//                                                 ">

//                                                     {formatCurrency(
//                                                         expense.amount
//                                                     )}

//                                                 </td>


//                                                 {/* STATUS */}

//                                                 <td className="px-5 py-5">

//                                                     {status === "paid" && (

//                                                         <span className="
//                                                             inline-flex
//                                                             items-center
//                                                             gap-1.5
//                                                             px-3
//                                                             py-1.5
//                                                             rounded-lg
//                                                             bg-emerald-500/10
//                                                             text-emerald-400
//                                                             text-xs
//                                                             font-semibold
//                                                         ">

//                                                             <CheckCircle2
//                                                                 size={13}
//                                                             />

//                                                             Paid

//                                                         </span>

//                                                     )}


//                                                     {status === "pending" && (

//                                                         <span className="
//                                                             inline-flex
//                                                             items-center
//                                                             gap-1.5
//                                                             px-3
//                                                             py-1.5
//                                                             rounded-lg
//                                                             bg-yellow-500/10
//                                                             text-yellow-400
//                                                             text-xs
//                                                             font-semibold
//                                                         ">

//                                                             <Clock3
//                                                                 size={13}
//                                                             />

//                                                             Pending

//                                                         </span>

//                                                     )}


//                                                     {status === "cancelled" && (

//                                                         <span className="
//                                                             inline-flex
//                                                             items-center
//                                                             gap-1.5
//                                                             px-3
//                                                             py-1.5
//                                                             rounded-lg
//                                                             bg-red-500/10
//                                                             text-red-400
//                                                             text-xs
//                                                             font-semibold
//                                                         ">

//                                                             <XCircle
//                                                                 size={13}
//                                                             />

//                                                             Cancelled

//                                                         </span>

//                                                     )}

//                                                 </td>


//                                                 {/* ACTION */}

//                                                 <td className="px-5 py-5">

//                                                     <button
//                                                         onClick={() =>
//                                                             setSelectedExpense(
//                                                                 expense
//                                                             )
//                                                         }
//                                                         className="
//                                                             w-10
//                                                             h-10
//                                                             rounded-xl
//                                                             border
//                                                             border-[#292929]
//                                                             bg-[#161616]
//                                                             flex
//                                                             items-center
//                                                             justify-center
//                                                             text-gray-500
//                                                             hover:text-white
//                                                             hover:bg-[#1d1d1d]
//                                                         "
//                                                     >

//                                                         <MoreVertical
//                                                             size={17}
//                                                         />

//                                                     </button>

//                                                 </td>

//                                             </tr>

//                                         );

//                                     })

//                                 )}

//                             </tbody>

//                         </table>

//                     </div>


//                     {/* ================================================= */}
//                     {/* PAGINATION */}
//                     {/* ================================================= */}

//                     <div className="
//                         px-6
//                         py-5
//                         border-t
//                         border-[#242424]
//                         flex
//                         items-center
//                         justify-between
//                     ">

//                         <p className="
//                             text-sm
//                             text-gray-600
//                         ">

//                             Showing {expenses.length} of{" "}
//                             {pagination.total} expenses

//                         </p>


//                         <div className="
//                             flex
//                             items-center
//                             gap-2
//                         ">

//                             <button
//                                 disabled={
//                                     pagination.page <= 1
//                                 }
//                                 onClick={() =>
//                                     goToPage(
//                                         pagination.page - 1
//                                     )
//                                 }
//                                 className="
//                                     w-10
//                                     h-10
//                                     rounded-xl
//                                     border
//                                     border-[#292929]
//                                     bg-[#151515]
//                                     text-gray-400
//                                     disabled:opacity-30
//                                 "
//                             >

//                                 ‹

//                             </button>


//                             <span className="
//                                 min-w-10
//                                 h-10
//                                 px-3
//                                 rounded-xl
//                                 bg-red-500
//                                 flex
//                                 items-center
//                                 justify-center
//                                 font-bold
//                             ">

//                                 {pagination.page}

//                             </span>


//                             <button
//                                 disabled={
//                                     pagination.page >=
//                                     pagination.totalPages
//                                 }
//                                 onClick={() =>
//                                     goToPage(
//                                         pagination.page + 1
//                                     )
//                                 }
//                                 className="
//                                     w-10
//                                     h-10
//                                     rounded-xl
//                                     border
//                                     border-[#292929]
//                                     bg-[#151515]
//                                     text-gray-400
//                                     disabled:opacity-30
//                                 "
//                             >

//                                 ›

//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             </div>


//             {/* ========================================================= */}
//             {/* ADD EXPENSE MODAL */}
//             {/* ========================================================= */}

//             {expenseModalOpen && (

//                 <>

//                     <div
//                         onClick={() => {
//                             if (!creatingExpense) {
//                                 setExpenseModalOpen(false);
//                             }
//                         }}
//                         className="
//                             fixed
//                             inset-0
//                             bg-black/80
//                             backdrop-blur-md
//                             z-[80]
//                         "
//                     />


//                     <div className="
//                         fixed
//                         left-1/2
//                         top-1/2
//                         -translate-x-1/2
//                         -translate-y-1/2
//                         w-[680px]
//                         max-w-[95vw]
//                         max-h-[90vh]
//                         overflow-y-auto
//                         rounded-[28px]
//                         border
//                         border-[#2b2b2b]
//                         bg-gradient-to-b
//                         from-[#181818]
//                         via-[#111111]
//                         to-[#0b0b0b]
//                         shadow-[0_40px_120px_rgba(0,0,0,.75)]
//                         z-[90]
//                     ">


//                         {/* MODAL HEADER */}

//                         <div className="
//                             px-7
//                             py-6
//                             border-b
//                             border-[#242424]
//                             flex
//                             items-start
//                             justify-between
//                         ">

//                             <div>

//                                 <p className="
//                                     uppercase
//                                     tracking-[4px]
//                                     text-red-400
//                                     text-[10px]
//                                     font-bold
//                                 ">

//                                     Expense Management

//                                 </p>


//                                 <h2 className="
//                                     text-2xl
//                                     font-black
//                                     mt-2
//                                 ">

//                                     Record New Expense

//                                 </h2>


//                                 <p className="
//                                     text-gray-600
//                                     text-sm
//                                     mt-2
//                                 ">

//                                     Document a gym expense for financial tracking.

//                                 </p>

//                             </div>


//                             <button
//                                 disabled={creatingExpense}
//                                 onClick={() =>
//                                     setExpenseModalOpen(false)
//                                 }
//                                 className="
//                                     w-10
//                                     h-10
//                                     rounded-xl
//                                     bg-[#1a1a1a]
//                                     border
//                                     border-[#2c2c2c]
//                                     text-gray-500
//                                     hover:text-white
//                                     flex
//                                     items-center
//                                     justify-center
//                                     disabled:opacity-40
//                                 "
//                             >

//                                 <X size={18} />

//                             </button>

//                         </div>


//                         {/* MODAL BODY */}

//                         <div className="p-7 space-y-6">


//                             {/* TITLE / CATEGORY */}

//                             <div className="
//                                 grid
//                                 grid-cols-2
//                                 gap-5
//                             ">

//                                 <div>

//                                     <label className="
//                                         text-xs
//                                         text-gray-500
//                                     ">

//                                         Expense Title

//                                     </label>


//                                     <input
//                                         name="title"
//                                         value={newExpanseData.title}
//                                         onChange={handleNewExpanseChange}
//                                         placeholder="e.g. Electricity Bill"
//                                         className="
//                                             premiumInput
//                                             mt-2
//                                             w-full
//                                         "
//                                     />

//                                 </div>


//                                 <div>

//                                     <label className="
//                                         text-xs
//                                         text-gray-500
//                                     ">

//                                         Category

//                                     </label>


//                                     <select
//                                         name="category"
//                                         value={newExpanseData.category}
//                                         onChange={handleNewExpanseChange}
//                                         className="
//                                             premiumInput
//                                             mt-2
//                                             w-full
//                                         "
//                                     >

//                                         <option value="">
//                                             Select category
//                                         </option>

//                                         <option value="utilities">
//                                             Utilities
//                                         </option>

//                                         <option value="maintenance">
//                                             Maintenance
//                                         </option>

//                                         <option value="employee">
//                                             Employee
//                                         </option>

//                                         <option value="rent">
//                                             Rent
//                                         </option>

//                                         <option value="equipment">
//                                             Equipment
//                                         </option>

//                                         <option value="supplies">
//                                             Supplies
//                                         </option>

//                                         <option value="marketing">
//                                             Marketing
//                                         </option>

//                                         <option value="other">
//                                             Other
//                                         </option>

//                                     </select>

//                                 </div>

//                             </div>


//                             {/* AMOUNT / DATE */}

//                             <div className="
//                                 grid
//                                 grid-cols-2
//                                 gap-5
//                             ">

//                                 <div>

//                                     <label className="
//                                         text-xs
//                                         text-gray-500
//                                     ">

//                                         Amount

//                                     </label>


//                                     <input
//                                         type="number"
//                                         name="amount"
//                                         value={newExpanseData.amount}
//                                         onChange={handleNewExpanseChange}
//                                         min="0"
//                                         placeholder="₹0.00"
//                                         className="
//                                             premiumInput
//                                             mt-2
//                                             w-full
//                                         "
//                                     />

//                                 </div>


//                                 <div>

//                                     <label className="
//                                         text-xs
//                                         text-gray-500
//                                     ">

//                                         Expense Date

//                                     </label>


//                                     <input
//                                         type="date"
//                                         name="expenseDate"
//                                         value={newExpanseData.expenseDate}
//                                         onChange={handleNewExpanseChange}
//                                         className="
//                                             premiumInput
//                                             mt-2
//                                             w-full
//                                         "
//                                     />

//                                 </div>

//                             </div>


//                             {/* PAID TO / PAYMENT */}

//                             <div className="
//                                 grid
//                                 grid-cols-2
//                                 gap-5
//                             ">

//                                 <div>

//                                     <label className="
//                                         text-xs
//                                         text-gray-500
//                                     ">

//                                         Paid To / Vendor

//                                     </label>


//                                     <input
//                                         name="paidTo"
//                                         value={newExpanseData.paidTo}
//                                         onChange={handleNewExpanseChange}
//                                         placeholder="Vendor, employee or organization"
//                                         className="
//                                             premiumInput
//                                             mt-2
//                                             w-full
//                                         "
//                                     />

//                                 </div>


//                                 <div>

//                                     <label className="
//                                         text-xs
//                                         text-gray-500
//                                     ">

//                                         Payment Method

//                                     </label>


//                                     <select
//                                         name="paymentMethod"
//                                         value={newExpanseData.paymentMethod}
//                                         onChange={handleNewExpanseChange}
//                                         className="
//                                             premiumInput
//                                             mt-2
//                                             w-full
//                                         "
//                                     >

//                                         <option value="">
//                                             Select method
//                                         </option>

//                                         <option value="cash">
//                                             Cash
//                                         </option>

//                                         <option value="upi">
//                                             UPI
//                                         </option>

//                                         <option value="cheque">
//                                             Cheque
//                                         </option>

//                                         <option value="bank_transfer">
//                                             Bank Transfer
//                                         </option>

//                                     </select>

//                                 </div>

//                             </div>


//                             {/* RECURRING */}

//                             <div className="
//                                 p-4
//                                 rounded-xl
//                                 border
//                                 border-[#272727]
//                                 bg-[#151515]
//                                 flex
//                                 items-center
//                                 justify-between
//                             ">

//                                 <div className="
//                                     flex
//                                     items-center
//                                     gap-3
//                                 ">

//                                     <div className="
//                                         w-9
//                                         h-9
//                                         rounded-lg
//                                         bg-blue-500/10
//                                         text-blue-400
//                                         flex
//                                         items-center
//                                         justify-center
//                                     ">

//                                         <Repeat size={16} />

//                                     </div>


//                                     <div>

//                                         <p className="
//                                             text-sm
//                                             font-semibold
//                                         ">

//                                             Recurring Expense

//                                         </p>


//                                         <p className="
//                                             text-xs
//                                             text-gray-600
//                                             mt-1
//                                         ">

//                                             Automatically track this expense every month.

//                                         </p>

//                                     </div>

//                                 </div>


//                                 <input
//                                     type="checkbox"
//                                     name="isRecurring"
//                                     checked={
//                                         newExpanseData.isRecurring
//                                     }
//                                     onChange={
//                                         handleNewExpanseChange
//                                     }
//                                     className="
//                                         w-5
//                                         h-5
//                                         accent-red-500
//                                     "
//                                 />

//                             </div>


//                             {/* NOTES */}

//                             <div>

//                                 <label className="
//                                     text-xs
//                                     text-gray-500
//                                 ">

//                                     Notes

//                                 </label>


//                                 <textarea
//                                     rows={3}
//                                     name="notes"
//                                     value={newExpanseData.notes}
//                                     onChange={handleNewExpanseChange}
//                                     placeholder="Add any additional information..."
//                                     className="
//                                         premiumInput
//                                         mt-2
//                                         w-full
//                                         resize-none
//                                     "
//                                 />

//                             </div>

//                         </div>


//                         {/* MODAL FOOTER */}

//                         <div className="
//                             px-7
//                             py-5
//                             border-t
//                             border-[#242424]
//                             flex
//                             justify-between
//                             items-center
//                         ">

//                             <button
//                                 disabled={creatingExpense}
//                                 onClick={() =>
//                                     setExpenseModalOpen(false)
//                                 }
//                                 className="
//                                     text-gray-500
//                                     hover:text-white
//                                     text-sm
//                                     disabled:opacity-40
//                                 "
//                             >

//                                 Cancel

//                             </button>


//                             <button
//                                 disabled={creatingExpense}
//                                 onClick={createNewExpanse}
//                                 className="
//                                     h-11
//                                     px-7
//                                     rounded-xl
//                                     bg-gradient-to-r
//                                     from-red-700
//                                     to-red-500
//                                     text-white
//                                     font-bold
//                                     flex
//                                     items-center
//                                     gap-2
//                                     disabled:opacity-50
//                                     disabled:cursor-not-allowed
//                                 "
//                             >

//                                 {creatingExpense ? (

//                                     <>
//                                         <RotateCcw
//                                             size={16}
//                                             className="animate-spin"
//                                         />

//                                         Saving...

//                                     </>

//                                 ) : (

//                                     <>
//                                         <Plus size={17} />

//                                         Record Expense
//                                     </>

//                                 )}

//                             </button>

//                         </div>

//                     </div>

//                 </>

//             )}

//         </div>

//     );

// };


// export default ExpenseManagement;

import React, { useEffect, useState } from "react";
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
    CheckCircle2,
    AlertCircle,
    XCircle,
    RotateCcw,
} from "lucide-react";


const ExpenseManagement = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    // =========================================================
    // SEARCH
    // =========================================================

    const [search, setSearch] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState("");


    // =========================================================
    // UI STATES
    // =========================================================

    const [filterOpen, setFilterOpen] = useState(false);

    const [expenseModalOpen, setExpenseModalOpen] = useState(false);

    const [selectedExpense, setSelectedExpense] = useState(null);


    // =========================================================
    // FILTERS
    // =========================================================

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


    // =========================================================
    // DASHBOARD DATA
    //
    // This shape follows getExpenseDashboard response.
    // =========================================================

    const [dashboardData, setDashboardData] = useState({

        kpis: {

            totalExpenses: {
                amount: 0,
                label: "This Month",
            },

            paidExpenses: {
                amount: 0,
                transactions: 0,
            },

            pendingExpenses: {
                amount: 0,
                transactions: 0,
            },

            recurringExpenses: {
                amount: 0,
                transactions: 0,
                label: "Expected Monthly",
            },

        },

        expenseOverview: [],

        spendingCategories: [],

    });


    // =========================================================
    // EXPENSE TABLE
    // =========================================================

    const [expenses, setExpenses] = useState([]);


    // =========================================================
    // LOADING
    // =========================================================

    const [loading, setLoading] = useState(false);

    const [tableLoading, setTableLoading] = useState(false);


    // =========================================================
    // PAGINATION
    // =========================================================

    const [pagination, setPagination] = useState({

        page: 1,

        limit: 10,

        totalRecords: 0,

        totalPages: 0,

        hasNextPage: false,

        hasPreviousPage: false,

    });


    // =========================================================
    // NEW EXPENSE
    // =========================================================

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


    // =========================================================
    // CREATE EXPENSE LOADING
    // =========================================================

    const [creatingExpense, setCreatingExpense] = useState(false);


    // =========================================================
    // CATEGORY CONFIG
    // =========================================================

    const categoryConfig = {

        utilities: {
            icon: Zap,
        },

        maintenance: {
            icon: Wrench,
        },

        employee: {
            icon: Users,
        },

        supplies: {
            icon: Receipt,
        },

        rent: {
            icon: Building2,
        },

        marketing: {
            icon: TrendingDown,
        },

        equipment: {
            icon: ShieldCheck,
        },

        other: {
            icon: FileText,
        },

    };


    // =========================================================
    // HANDLE NEW EXPENSE CHANGE
    // =========================================================

    const handleNewExpanseChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;


        setNewExpanseData((prev) => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };


    // =========================================================
    // RESET EXPENSE FORM
    // =========================================================

    const resetExpenseForm = () => {

        setNewExpanseData({

            title: "",

            category: "",

            amount: "",

            expenseDate: "",

            paidTo: "",

            paymentMethod: "",

            isRecurring: false,

            notes: "",

        });

    };


    // =========================================================
    // CREATE NEW EXPENSE
    // =========================================================

    const createNewExpanse = async () => {

        try {

            // -------------------------------------------------
            // VALIDATION
            // -------------------------------------------------

            if (!newExpanseData.title.trim()) {

                toast.error(
                    "Expense title is required"
                );

                return;

            }


            if (!newExpanseData.category) {

                toast.error(
                    "Please select an expense category"
                );

                return;

            }


            if (
                !newExpanseData.amount ||
                Number(newExpanseData.amount) <= 0
            ) {

                toast.error(
                    "Please enter a valid expense amount"
                );

                return;

            }


            if (!newExpanseData.expenseDate) {

                toast.error(
                    "Expense date is required"
                );

                return;

            }


            if (!newExpanseData.paidTo.trim()) {

                toast.error(
                    "Paid To / Vendor is required"
                );

                return;

            }


            if (!newExpanseData.paymentMethod) {

                toast.error(
                    "Please select a payment method"
                );

                return;

            }


            setCreatingExpense(true);


            // -------------------------------------------------
            // PREPARE PAYLOAD
            // -------------------------------------------------

            const payload = {

                ...newExpanseData,

                title:
                    newExpanseData.title.trim(),

                amount:
                    Number(newExpanseData.amount),

                paidTo:
                    newExpanseData.paidTo.trim(),

                notes:
                    newExpanseData.notes.trim(),

            };


            // -------------------------------------------------
            // CREATE EXPENSE
            // -------------------------------------------------

            const response = await axios.post(

                `${backendUrl}/api/admin/expanses/create-expanse`,

                payload,

                {
                    withCredentials: true,
                }

            );


            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            if (response.data.success) {

                toast.success(
                    "New Expense Added Successfully"
                );


                setExpenseModalOpen(false);


                resetExpenseForm();


                /*
                 * IMPORTANT:
                 *
                 * We have only ONE GET endpoint.
                 *
                 * Dashboard endpoint returns:
                 *
                 * - KPIs
                 * - graphs
                 * - table records
                 * - pagination
                 *
                 * So only one refresh is required.
                 */

                await fetchExpenseDashboard();

            }

        } catch (error) {

            console.error(
                "Create expense error:",
                error
            );


            toast.error(

                error.response?.data?.message ||

                "Failed to create expense"

            );

        } finally {

            setCreatingExpense(false);

        }

    };


    // =========================================================
    // BUILD DASHBOARD QUERY
    // =========================================================

    const buildDashboardQuery = () => {

        const params = new URLSearchParams();


        // -------------------------------------------------
        // SEARCH
        // -------------------------------------------------

        if (debouncedSearch.trim()) {

            params.append(
                "search",
                debouncedSearch.trim()
            );

        }


        // -------------------------------------------------
        // CATEGORY
        // -------------------------------------------------

        if (filters.category) {

            params.append(
                "category",
                filters.category
            );

        }


        // -------------------------------------------------
        // STATUS
        // -------------------------------------------------

        if (filters.status) {

            params.append(
                "status",
                filters.status
            );

        }


        // -------------------------------------------------
        // PAYMENT METHOD
        // -------------------------------------------------

        if (filters.paymentMethod) {

            params.append(
                "paymentMethod",
                filters.paymentMethod
            );

        }


        // -------------------------------------------------
        // DATE FROM
        // -------------------------------------------------

        if (filters.dateFrom) {

            params.append(
                "dateFrom",
                filters.dateFrom
            );

        }


        // -------------------------------------------------
        // DATE TO
        // -------------------------------------------------

        if (filters.dateTo) {

            params.append(
                "dateTo",
                filters.dateTo
            );

        }


        // -------------------------------------------------
        // MIN AMOUNT
        // -------------------------------------------------

        if (filters.minAmount) {

            params.append(
                "minAmount",
                filters.minAmount
            );

        }


        // -------------------------------------------------
        // MAX AMOUNT
        // -------------------------------------------------

        if (filters.maxAmount) {

            params.append(
                "maxAmount",
                filters.maxAmount
            );

        }


        // -------------------------------------------------
        // RECURRING
        // -------------------------------------------------

        if (filters.recurring !== "") {

            params.append(
                "recurring",
                filters.recurring
            );

        }


        // -------------------------------------------------
        // PAGINATION
        // -------------------------------------------------

        params.append(
            "page",
            pagination.page
        );


        params.append(
            "limit",
            pagination.limit
        );


        return params.toString();

    };


    // =========================================================
    // FETCH COMPLETE EXPENSE DASHBOARD
    //
    // SINGLE BACKEND CONTROLLER
    //
    // This replaces fetchExpenses()
    // =========================================================

    const fetchExpenseDashboard = async () => {

        try {

            setLoading(true);

            setTableLoading(true);


            const query =
                buildDashboardQuery();


            const response = await axios.get(

                `${backendUrl}/api/admin/expanses/dashboard?${query}`,

                {
                    withCredentials: true,
                }

            );


            if (response.data.success) {

                const dashboard =
                    response.data.dashboard || {};

                const expenseData =
                    response.data.expenses || {};


                // -------------------------------------------------
                // DASHBOARD
                // -------------------------------------------------

                setDashboardData({

                    kpis:
                        dashboard.kpis || {

                            totalExpenses: {
                                amount: 0,
                                label: "This Month",
                            },

                            paidExpenses: {
                                amount: 0,
                                transactions: 0,
                            },

                            pendingExpenses: {
                                amount: 0,
                                transactions: 0,
                            },

                            recurringExpenses: {
                                amount: 0,
                                transactions: 0,
                                label: "Expected Monthly",
                            },

                        },

                    expenseOverview:
                        dashboard.expenseOverview || [],

                    spendingCategories:
                        dashboard.spendingCategories || [],

                });


                // -------------------------------------------------
                // TABLE
                // -------------------------------------------------

                setExpenses(

                    expenseData.records || []

                );


                // -------------------------------------------------
                // PAGINATION
                // -------------------------------------------------

                const serverPagination =
                    expenseData.pagination || {};


                setPagination({

                    page:
                        serverPagination.page ||
                        1,

                    limit:
                        serverPagination.limit ||
                        10,

                    totalRecords:
                        serverPagination.totalRecords ||
                        0,

                    totalPages:
                        serverPagination.totalPages ||
                        0,

                    hasNextPage:
                        Boolean(
                            serverPagination.hasNextPage
                        ),

                    hasPreviousPage:
                        Boolean(
                            serverPagination.hasPreviousPage
                        ),

                });

            }

        } catch (error) {

            console.error(
                "Failed to fetch expense dashboard:",
                error
            );


            toast.error(

                error.response?.data?.message ||

                "Failed to load expense dashboard"

            );

        } finally {

            setLoading(false);

            setTableLoading(false);

        }

    };


    // =========================================================
    // SEARCH DEBOUNCING
    // =========================================================

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(search);

        }, 500);


        return () => {

            clearTimeout(timer);

        };

    }, [search]);


    // =========================================================
    // FETCH DASHBOARD
    //
    // ONE EFFECT
    //
    // Search + Filters + Pagination
    // all use same controller.
    // =========================================================

    useEffect(() => {

        fetchExpenseDashboard();

    }, [

        debouncedSearch,

        filters.category,

        filters.status,

        filters.paymentMethod,

        filters.dateFrom,

        filters.dateTo,

        filters.minAmount,

        filters.maxAmount,

        filters.recurring,

        pagination.page,

        pagination.limit,

    ]);


    // =========================================================
    // SEARCH CHANGE
    // =========================================================

    const searchChangeHandler = (e) => {

        setSearch(
            e.target.value
        );


        /*
         * Search changes should always
         * start from page 1.
         */

        setPagination((prev) => ({

            ...prev,

            page: 1,

        }));

    };


    // =========================================================
    // FILTER CHANGE
    // =========================================================

    const filterChangeHandler = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFilters((prev) => ({

            ...prev,

            [name]: value,

        }));


        /*
         * Whenever a filter changes,
         * start from page 1.
         */

        setPagination((prev) => ({

            ...prev,

            page: 1,

        }));

    };


    // =========================================================
    // CLEAR FILTERS
    // =========================================================

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


        setSearch("");


        setDebouncedSearch("");


        setPagination((prev) => ({

            ...prev,

            page: 1,

        }));


        setFilterOpen(false);

    };


    // =========================================================
    // PAGINATION
    // =========================================================

    const goToPage = (page) => {

        if (page < 1) {

            return;

        }


        if (
            pagination.totalPages > 0 &&
            page > pagination.totalPages
        ) {

            return;

        }


        setPagination((prev) => ({

            ...prev,

            page,

        }));

    };


    // =========================================================
    // FORMAT CURRENCY
    // =========================================================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(

            "en-IN",

            {

                style: "currency",

                currency: "INR",

                maximumFractionDigits: 0,

            }

        ).format(

            Number(amount || 0)

        );

    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }


        return new Date(date).toLocaleDateString(

            "en-IN",

            {

                day: "2-digit",

                month: "short",

                year: "numeric",

            }

        );

    };


    // =========================================================
    // MONTH LABEL
    //
    // Backend returns:
    //
    // {
    //   year: 2026,
    //   month: 8,
    //   total: 50000
    // }
    //
    // =========================================================

    const formatMonth = (item) => {

        if (
            item?.month &&
            item?.year
        ) {

            const date = new Date(

                Number(item.year),

                Number(item.month) - 1,

                1

            );


            return date.toLocaleDateString(

                "en-IN",

                {
                    month: "short",
                }

            );

        }


        return item?.month || "-";

    };


    // =========================================================
    // NORMALIZE MONTHLY DATA
    //
    // Backend:
    // total
    //
    // UI:
    // amount
    // =========================================================

    const monthlyTrend =
        dashboardData.expenseOverview?.map(
            (item) => ({

                ...item,

                amount:
                    Number(item.total || 0),

                month:
                    formatMonth(item),

            })
        ) || [];


    // =========================================================
    // NORMALIZE CATEGORY DATA
    //
    // Backend:
    // total
    //
    // UI:
    // amount
    // =========================================================

    const categoryBreakdown =
        dashboardData.spendingCategories?.map(
            (item) => ({

                ...item,

                amount:
                    Number(item.total || 0),

            })
        ) || [];


    // =========================================================
    // KPI VALUES
    // =========================================================

    const totalExpenses =
        dashboardData.kpis?.totalExpenses?.amount || 0;


    const paidExpenses =
        dashboardData.kpis?.paidExpenses?.amount || 0;


    const pendingExpenses =
        dashboardData.kpis?.pendingExpenses?.amount || 0;


    const recurringExpenses =
        dashboardData.kpis?.recurringExpenses?.amount || 0;


    const paidTransactions =
        dashboardData.kpis?.paidExpenses?.transactions || 0;


    const pendingTransactions =
        dashboardData.kpis?.pendingExpenses?.transactions || 0;


    const recurringTransactions =
        dashboardData.kpis?.recurringExpenses?.transactions || 0;


    // =========================================================
    // CATEGORY ICON
    // =========================================================

    const getCategoryIcon = (category) => {

        return (

            categoryConfig[
                String(category || "")
                    .toLowerCase()
            ]?.icon ||

            FileText

        );

    };


    // =========================================================
    // PAYMENT ICON
    // =========================================================

    const getPaymentIcon = (paymentMethod) => {

        switch (
            String(
                paymentMethod || ""
            ).toLowerCase()
        ) {

            case "cash":

                return Banknote;


            case "upi":

                return CreditCard;


            case "cheque":

                return Receipt;


            case "bank_transfer":

                return Landmark;


            default:

                return Wallet;

        }

    };


    // =========================================================
    // STATUS UI
    // =========================================================

    const getStatusStyle = (status) => {

        switch (
            String(status || "").toLowerCase()
        ) {

            case "paid":

                return {

                    label: "Paid",

                    className:
                        "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",

                    icon:
                        CheckCircle2,

                };


            case "pending":

                return {

                    label: "Pending",

                    className:
                        "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",

                    icon:
                        Clock3,

                };


            case "cancelled":

                return {

                    label: "Cancelled",

                    className:
                        "bg-red-500/10 border-red-500/20 text-red-400",

                    icon:
                        XCircle,

                };


            default:

                return {

                    label:
                        status || "Unknown",

                    className:
                        "bg-gray-500/10 border-gray-500/20 text-gray-400",

                    icon:
                        AlertCircle,

                };

        }

    };


    // =========================================================
    // ACTIVE FILTER COUNT
    // =========================================================

    const activeFilterCount =
        Object.values(filters)
            .filter(
                (value) => value !== ""
            )
            .length;


    // =========================================================
    // MAX MONTHLY VALUE
    // =========================================================

    const maxMonthlyValue =
        Math.max(

            ...monthlyTrend.map(
                (item) =>
                    Number(item.amount || 0)
            ),

            1

        );


    // =========================================================
    // MAX CATEGORY VALUE
    // =========================================================

    const maxCategoryValue =
        Math.max(

            ...categoryBreakdown.map(
                (item) =>
                    Number(item.amount || 0)
            ),

            1

        );


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="min-h-screen bg-[#080808] text-white">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="px-7 pt-7">

                <div className="flex items-start justify-between">

                    <div>

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-red-400
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[4px]
                        ">

                            <Receipt size={14} />

                            Financial Management

                        </div>


                        <h1 className="
                            mt-2
                            text-4xl
                            font-black
                            tracking-tight
                        ">

                            Expense Tracking

                        </h1>


                        <p className="
                            mt-2
                            text-gray-500
                            text-sm
                        ">

                            Monitor, manage and analyze every expense of your gym.

                        </p>

                    </div>


                    <div className="flex gap-3">

                        <button
                            className="
                                h-12
                                px-5
                                rounded-xl
                                border
                                border-[#292929]
                                bg-[#111111]
                                text-gray-300
                                flex
                                items-center
                                gap-2
                                hover:bg-[#181818]
                                transition
                            "
                        >

                            <Download size={17} />

                            Export

                        </button>


                        <button
                            onClick={() => {

                                resetExpenseForm();

                                setExpenseModalOpen(true);

                            }}
                            className="
                                h-12
                                px-6
                                rounded-xl
                                bg-gradient-to-r
                                from-red-700
                                to-red-500
                                font-bold
                                flex
                                items-center
                                gap-2
                                shadow-lg
                                shadow-red-900/20
                            "
                        >

                            <Plus size={18} />

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
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                    mt-10
                ">


                    {/* TOTAL */}

                    <div className="
                        rounded-2xl
                        border
                        border-[#282828]
                        bg-[#111111]
                        p-6
                    ">

                        <div className="flex justify-between">

                            <div className="
                                w-11
                                h-11
                                rounded-xl
                                bg-red-500/10
                                text-red-400
                                flex
                                items-center
                                justify-center
                            ">

                                <TrendingDown size={20} />

                            </div>


                            <span className="
                                px-3
                                py-1
                                rounded-lg
                                bg-red-500/10
                                text-red-400
                                text-xs
                                font-semibold
                            ">

                                This Month

                            </span>

                        </div>


                        <p className="
                            mt-7
                            text-gray-500
                            text-sm
                        ">

                            Total Expenses

                        </p>


                        <h2 className="
                            mt-2
                            text-2xl
                            font-black
                        ">

                            {loading
                                ? "..."
                                : formatCurrency(
                                    totalExpenses
                                )
                            }

                        </h2>


                        <div className="
                            mt-3
                            flex
                            items-center
                            gap-1
                            text-sm
                            text-red-400
                        ">

                            <ArrowDownRight size={15} />

                            Current month spending

                        </div>

                    </div>


                    {/* PAID */}

                    <div className="
                        rounded-2xl
                        border
                        border-[#282828]
                        bg-[#111111]
                        p-6
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-emerald-500/10
                            text-emerald-400
                            flex
                            items-center
                            justify-center
                        ">

                            <CheckCircle2 size={20} />

                        </div>


                        <p className="
                            mt-7
                            text-gray-500
                            text-sm
                        ">

                            Paid Expenses

                        </p>


                        <h2 className="
                            mt-2
                            text-2xl
                            font-black
                        ">

                            {loading
                                ? "..."
                                : formatCurrency(
                                    paidExpenses
                                )
                            }

                        </h2>


                        <p className="
                            mt-3
                            text-sm
                            text-gray-600
                        ">

                            {paidTransactions}

                            {" "}

                            transactions

                        </p>

                    </div>


                    {/* PENDING */}

                    <div className="
                        rounded-2xl
                        border
                        border-[#282828]
                        bg-[#111111]
                        p-6
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-yellow-500/10
                            text-yellow-400
                            flex
                            items-center
                            justify-center
                        ">

                            <Clock3 size={20} />

                        </div>


                        <p className="
                            mt-7
                            text-gray-500
                            text-sm
                        ">

                            Pending Expenses

                        </p>


                        <h2 className="
                            mt-2
                            text-2xl
                            font-black
                        ">

                            {loading
                                ? "..."
                                : formatCurrency(
                                    pendingExpenses
                                )
                            }

                        </h2>


                        <p className="
                            mt-3
                            text-sm
                            text-gray-600
                        ">

                            {pendingTransactions}

                            {" "}

                            awaiting payment

                        </p>

                    </div>


                    {/* RECURRING */}

                    <div className="
                        rounded-2xl
                        border
                        border-[#282828]
                        bg-[#111111]
                        p-6
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-blue-500/10
                            text-blue-400
                            flex
                            items-center
                            justify-center
                        ">

                            <Repeat size={20} />

                        </div>


                        <p className="
                            mt-7
                            text-gray-500
                            text-sm
                        ">

                            Recurring Expenses

                        </p>


                        <h2 className="
                            mt-2
                            text-2xl
                            font-black
                        ">

                            {loading
                                ? "..."
                                : formatCurrency(
                                    recurringExpenses
                                )
                            }

                        </h2>


                        <p className="
                            mt-3
                            text-sm
                            text-gray-600
                        ">

                            {recurringTransactions}

                            {" "}

                            recurring records

                        </p>

                    </div>

                </div>


                {/* ================================================= */}
                {/* CHARTS */}
                {/* ================================================= */}

                <div className="
                    grid
                    grid-cols-1
                    xl:grid-cols-[2fr_1fr]
                    gap-5
                    mt-6
                ">


                    {/* MONTHLY TREND */}

                    <div className="
                        rounded-2xl
                        border
                        border-[#282828]
                        bg-[#111111]
                        p-7
                    ">

                        <div className="
                            flex
                            items-start
                            justify-between
                        ">

                            <div>

                                <h2 className="
                                    text-xl
                                    font-black
                                ">

                                    Expense Overview

                                </h2>


                                <p className="
                                    mt-2
                                    text-sm
                                    text-gray-600
                                ">

                                    Monthly spending trend

                                </p>

                            </div>

                        </div>


                        <div className="
                            mt-10
                            h-[280px]
                            flex
                            items-end
                            gap-4
                            overflow-x-auto
                        ">

                            {monthlyTrend.length === 0 ? (

                                <div className="
                                    w-full
                                    h-full
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-600
                                ">

                                    No monthly expense data available

                                </div>

                            ) : (

                                monthlyTrend.map(
                                    (item, index) => {

                                        const height =

                                            (
                                                Number(
                                                    item.amount || 0
                                                ) /
                                                maxMonthlyValue
                                            ) *
                                            100;


                                        return (

                                            <div
                                                key={
                                                    `${item.year}-${item.month}-${index}`
                                                }
                                                className="
                                                    flex-1
                                                    min-w-[45px]
                                                    h-full
                                                    flex
                                                    flex-col
                                                    justify-end
                                                    items-center
                                                "
                                            >

                                                <div
                                                    title={
                                                        formatCurrency(
                                                            item.amount
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        max-w-[48px]
                                                        rounded-t-xl
                                                        bg-gradient-to-t
                                                        from-red-800
                                                        to-red-500
                                                        transition-all
                                                        duration-500
                                                    "
                                                    style={{
                                                        height:
                                                            `${Math.max(
                                                                height,
                                                                4
                                                            )}%`,
                                                    }}
                                                />


                                                <span className="
                                                    mt-3
                                                    text-[11px]
                                                    text-gray-600
                                                ">

                                                    {item.month}

                                                </span>

                                            </div>

                                        );

                                    }
                                )

                            )}

                        </div>

                    </div>


                    {/* CATEGORY BREAKDOWN */}

                    <div className="
                        rounded-2xl
                        border
                        border-[#282828]
                        bg-[#111111]
                        p-7
                    ">

                        <h2 className="
                            text-xl
                            font-black
                        ">

                            Spending Categories

                        </h2>


                        <p className="
                            mt-2
                            text-sm
                            text-gray-600
                        ">

                            Where your money goes

                        </p>


                        <div className="
                            mt-8
                            space-y-6
                        ">

                            {categoryBreakdown.length === 0 ? (

                                <p className="
                                    text-sm
                                    text-gray-600
                                ">

                                    No category data available.

                                </p>

                            ) : (

                                categoryBreakdown.map(
                                    (item, index) => {

                                        const Icon =
                                            getCategoryIcon(
                                                item.category
                                            );


                                        const percentage =

                                            (
                                                Number(
                                                    item.amount || 0
                                                ) /
                                                maxCategoryValue
                                            ) *
                                            100;


                                        return (

                                            <div
                                                key={
                                                    item.category ||
                                                    index
                                                }
                                            >

                                                <div className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    text-sm
                                                ">

                                                    <span className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-gray-400
                                                    ">

                                                        <Icon
                                                            size={15}
                                                        />

                                                        <span className="capitalize">

                                                            {String(
                                                                item.category ||
                                                                "-"
                                                            ).replace(
                                                                "_",
                                                                " "
                                                            )}

                                                        </span>

                                                    </span>


                                                    <span className="
                                                        font-semibold
                                                        text-gray-300
                                                    ">

                                                        {formatCurrency(
                                                            item.amount
                                                        )}

                                                    </span>

                                                </div>


                                                <div className="
                                                    mt-2
                                                    h-1.5
                                                    rounded-full
                                                    bg-[#242424]
                                                    overflow-hidden
                                                ">

                                                    <div
                                                        className="
                                                            h-full
                                                            rounded-full
                                                            bg-gradient-to-r
                                                            from-red-700
                                                            to-red-400
                                                        "
                                                        style={{
                                                            width:
                                                                `${percentage}%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        );

                                    }
                                )

                            )}

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* EXPENSE TABLE */}
                {/* ================================================= */}

                <div className="
                    mt-6
                    rounded-2xl
                    border
                    border-[#282828]
                    bg-[#111111]
                    overflow-hidden
                ">


                    {/* TABLE HEADER */}

                    <div className="
                        p-6
                        border-b
                        border-[#242424]
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-4
                    ">

                        <div>

                            <h2 className="
                                text-xl
                                font-black
                            ">

                                Expense Records

                            </h2>


                            <p className="
                                mt-1
                                text-sm
                                text-gray-600
                            ">

                                Complete history of gym expenses

                            </p>

                        </div>


                        <div className="
                            flex
                            gap-3
                        ">

                            {/* SEARCH */}

                            <div className="
                                relative
                                w-[300px]
                            ">

                                <Search
                                    size={18}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-600
                                    "
                                />


                                <input
                                    value={search}
                                    onChange={
                                        searchChangeHandler
                                    }
                                    placeholder="Search expenses..."
                                    className="
                                        w-full
                                        h-11
                                        pl-11
                                        pr-4
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#0c0c0c]
                                        text-sm
                                        text-white
                                        outline-none
                                        focus:border-red-500/50
                                    "
                                />

                            </div>


                            {/* FILTER */}

                            <button
                                onClick={() =>
                                    setFilterOpen(
                                        !filterOpen
                                    )
                                }
                                className="
                                    h-11
                                    px-5
                                    rounded-xl
                                    border
                                    border-[#292929]
                                    bg-[#151515]
                                    text-gray-300
                                    flex
                                    items-center
                                    gap-2
                                    hover:bg-[#1b1b1b]
                                "
                            >

                                <Filter size={16} />

                                Filters

                                {activeFilterCount > 0 && (

                                    <span className="
                                        min-w-5
                                        h-5
                                        px-1.5
                                        rounded-md
                                        bg-red-500
                                        text-white
                                        text-[10px]
                                        font-bold
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        {activeFilterCount}

                                    </span>

                                )}

                            </button>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* FILTER PANEL */}
                    {/* ================================================= */}

                    {filterOpen && (

                        <div className="
                            p-6
                            border-b
                            border-[#242424]
                            bg-[#0d0d0d]
                        ">

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                xl:grid-cols-4
                                gap-4
                            ">


                                {/* CATEGORY */}

                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={
                                        filterChangeHandler
                                    }
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                        outline-none
                                    "
                                >

                                    <option value="">
                                        All Categories
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


                                {/* STATUS */}

                                <select
                                    name="status"
                                    value={filters.status}
                                    onChange={
                                        filterChangeHandler
                                    }
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                        outline-none
                                    "
                                >

                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="paid">
                                        Paid
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>

                                </select>


                                {/* PAYMENT */}

                                <select
                                    name="paymentMethod"
                                    value={
                                        filters.paymentMethod
                                    }
                                    onChange={
                                        filterChangeHandler
                                    }
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                        outline-none
                                    "
                                >

                                    <option value="">
                                        All Payment Methods
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


                                {/* RECURRING */}

                                <select
                                    name="recurring"
                                    value={
                                        filters.recurring
                                    }
                                    onChange={
                                        filterChangeHandler
                                    }
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                        outline-none
                                    "
                                >

                                    <option value="">
                                        All Expenses
                                    </option>

                                    <option value="true">
                                        Recurring
                                    </option>

                                    <option value="false">
                                        Non Recurring
                                    </option>

                                </select>


                                {/* DATE FROM */}

                                <input
                                    type="date"
                                    name="dateFrom"
                                    value={
                                        filters.dateFrom
                                    }
                                    onChange={
                                        filterChangeHandler
                                    }
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                    "
                                />


                                {/* DATE TO */}

                                <input
                                    type="date"
                                    name="dateTo"
                                    value={
                                        filters.dateTo
                                    }
                                    onChange={
                                        filterChangeHandler
                                    }
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                    "
                                />


                                {/* MIN AMOUNT */}

                                <input
                                    type="number"
                                    name="minAmount"
                                    value={
                                        filters.minAmount
                                    }
                                    onChange={
                                        filterChangeHandler
                                    }
                                    placeholder="Minimum amount"
                                    min="0"
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                        outline-none
                                    "
                                />


                                {/* MAX AMOUNT */}

                                <input
                                    type="number"
                                    name="maxAmount"
                                    value={
                                        filters.maxAmount
                                    }
                                    onChange={
                                        filterChangeHandler
                                    }
                                    placeholder="Maximum amount"
                                    min="0"
                                    className="
                                        h-11
                                        px-3
                                        rounded-xl
                                        border
                                        border-[#292929]
                                        bg-[#151515]
                                        text-gray-300
                                        outline-none
                                    "
                                />

                            </div>


                            <div className="
                                mt-5
                                flex
                                justify-end
                            ">

                                <button
                                    onClick={
                                        clearFilters
                                    }
                                    className="
                                        text-sm
                                        text-gray-500
                                        hover:text-white
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <RotateCcw size={15} />

                                    Clear Filters

                                </button>

                            </div>

                        </div>

                    )}


                    {/* ================================================= */}
                    {/* TABLE */}
                    {/* ================================================= */}

                    <div className="overflow-x-auto">

                        <table className="
                            w-full
                            min-w-[1100px]
                        ">

                            <thead>

                                <tr className="
                                    border-b
                                    border-[#242424]
                                    text-left
                                    text-[11px]
                                    uppercase
                                    tracking-wider
                                    text-gray-600
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

                                {tableLoading ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="
                                                py-20
                                                text-center
                                                text-gray-600
                                            "
                                        >

                                            <div className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                            ">

                                                <RotateCcw
                                                    size={17}
                                                    className="
                                                        animate-spin
                                                    "
                                                />

                                                Loading expenses...

                                            </div>

                                        </td>

                                    </tr>

                                ) : expenses.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="
                                                py-20
                                                text-center
                                            "
                                        >

                                            <Receipt
                                                size={36}
                                                className="
                                                    mx-auto
                                                    text-gray-700
                                                "
                                            />


                                            <p className="
                                                mt-4
                                                text-gray-500
                                            ">

                                                No expenses found.

                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    expenses.map(
                                        (expense) => {

                                            const Icon =
                                                getCategoryIcon(
                                                    expense.category
                                                );


                                            const PaymentIcon =
                                                getPaymentIcon(
                                                    expense.paymentMethod
                                                );


                                            const expenseId =
                                                expense.expenseId ||
                                                expense.id ||
                                                expense._id;


                                            const status =
                                                String(
                                                    expense.status ||
                                                    ""
                                                ).toLowerCase();


                                            const statusStyle =
                                                getStatusStyle(
                                                    status
                                                );


                                            const StatusIcon =
                                                statusStyle.icon;


                                            return (

                                                <tr
                                                    key={
                                                        expenseId
                                                    }
                                                    className="
                                                        border-b
                                                        border-[#202020]
                                                        hover:bg-[#151515]
                                                        transition
                                                    "
                                                >


                                                    {/* EXPENSE */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                        ">

                                                            <div className="
                                                                w-11
                                                                h-11
                                                                rounded-xl
                                                                bg-[#191919]
                                                                border
                                                                border-[#292929]
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-red-400
                                                            ">

                                                                <Receipt
                                                                    size={18}
                                                                />

                                                            </div>


                                                            <div>

                                                                <p className="
                                                                    font-semibold
                                                                    text-white
                                                                ">

                                                                    {
                                                                        expense.title ||
                                                                        "-"
                                                                    }

                                                                </p>


                                                                <p className="
                                                                    mt-1
                                                                    text-xs
                                                                    text-gray-600
                                                                ">

                                                                    {
                                                                        expenseId ||
                                                                        "-"
                                                                    }

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* CATEGORY */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-gray-400
                                                        ">

                                                            <Icon
                                                                size={16}
                                                            />

                                                            <span className="
                                                                capitalize
                                                            ">

                                                                {
                                                                    String(
                                                                        expense.category ||
                                                                        "-"
                                                                    ).replace(
                                                                        "_",
                                                                        " "
                                                                    )
                                                                }

                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* PAID TO */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                    ">

                                                        <div>

                                                            <p className="
                                                                text-gray-300
                                                            ">

                                                                {
                                                                    expense.paidTo ||
                                                                    "-"
                                                                }

                                                            </p>


                                                            {expense.isRecurring && (

                                                                <p className="
                                                                    mt-1
                                                                    text-xs
                                                                    text-blue-400
                                                                    flex
                                                                    items-center
                                                                    gap-1
                                                                ">

                                                                    <Repeat
                                                                        size={12}
                                                                    />

                                                                    Recurring

                                                                </p>

                                                            )}

                                                        </div>

                                                    </td>


                                                    {/* DATE */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                        text-gray-400
                                                    ">

                                                        {
                                                            formatDate(
                                                                expense.expenseDate
                                                            )
                                                        }

                                                    </td>


                                                    {/* PAYMENT */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                    ">

                                                        <span className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-gray-400
                                                            capitalize
                                                        ">

                                                            <PaymentIcon
                                                                size={15}
                                                            />

                                                            {
                                                                String(
                                                                    expense.paymentMethod ||
                                                                    "-"
                                                                ).replace(
                                                                    "_",
                                                                    " "
                                                                )
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* AMOUNT */}

                                                    <td className="
                                                        px-5
                                                        py-5
                                                        font-bold
                                                        text-white
                                                    ">

                                                        {
                                                            formatCurrency(
                                                                expense.amount
                                                            )
                                                        }

                                                    </td>


                                                    {/* STATUS */}

                                                    <td className="px-5 py-5">

                                                        <span
                                                            className={`
                                                                inline-flex
                                                                items-center
                                                                gap-1.5
                                                                px-3
                                                                py-1.5
                                                                rounded-lg
                                                                border
                                                                text-xs
                                                                font-semibold
                                                                ${statusStyle.className}
                                                            `}
                                                        >

                                                            <StatusIcon
                                                                size={13}
                                                            />

                                                            {
                                                                statusStyle.label
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* ACTION */}

                                                    <td className="px-5 py-5">

                                                        <button
                                                            onClick={() =>
                                                                setSelectedExpense(
                                                                    expense
                                                                )
                                                            }
                                                            className="
                                                                w-10
                                                                h-10
                                                                rounded-xl
                                                                border
                                                                border-[#292929]
                                                                bg-[#161616]
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-gray-500
                                                                hover:text-white
                                                                hover:bg-[#1d1d1d]
                                                            "
                                                        >

                                                            <MoreVertical
                                                                size={17}
                                                            />

                                                        </button>

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* ================================================= */}
                    {/* PAGINATION */}
                    {/* ================================================= */}

                    <div className="
                        px-6
                        py-5
                        border-t
                        border-[#242424]
                        flex
                        items-center
                        justify-between
                    ">

                        <p className="
                            text-sm
                            text-gray-600
                        ">

                            Showing{" "}

                            {expenses.length}

                            {" "}of{" "}

                            {pagination.totalRecords}

                            {" "}expenses

                        </p>


                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <button
                                disabled={
                                    !pagination.hasPreviousPage
                                }
                                onClick={() =>
                                    goToPage(
                                        pagination.page - 1
                                    )
                                }
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-[#292929]
                                    bg-[#151515]
                                    text-gray-400
                                    disabled:opacity-30
                                "
                            >

                                ‹

                            </button>


                            <span className="
                                min-w-10
                                h-10
                                px-3
                                rounded-xl
                                bg-red-500
                                flex
                                items-center
                                justify-center
                                font-bold
                            ">

                                {pagination.page}

                            </span>


                            <button
                                disabled={
                                    !pagination.hasNextPage
                                }
                                onClick={() =>
                                    goToPage(
                                        pagination.page + 1
                                    )
                                }
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-[#292929]
                                    bg-[#151515]
                                    text-gray-400
                                    disabled:opacity-30
                                "
                            >

                                ›

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* ========================================================= */}
            {/* ADD EXPENSE MODAL */}
            {/* ========================================================= */}

            {expenseModalOpen && (

                <>

                    <div
                        onClick={() => {

                            if (!creatingExpense) {

                                setExpenseModalOpen(false);

                            }

                        }}
                        className="
                            fixed
                            inset-0
                            bg-black/80
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
                        w-[680px]
                        max-w-[95vw]
                        max-h-[90vh]
                        overflow-y-auto
                        rounded-[28px]
                        border
                        border-[#2b2b2b]
                        bg-gradient-to-b
                        from-[#181818]
                        via-[#111111]
                        to-[#0b0b0b]
                        shadow-[0_40px_120px_rgba(0,0,0,.75)]
                        z-[90]
                    ">


                        {/* MODAL HEADER */}

                        <div className="
                            px-7
                            py-6
                            border-b
                            border-[#242424]
                            flex
                            items-start
                            justify-between
                        ">

                            <div>

                                <p className="
                                    uppercase
                                    tracking-[4px]
                                    text-red-400
                                    text-[10px]
                                    font-bold
                                ">

                                    Expense Management

                                </p>


                                <h2 className="
                                    text-2xl
                                    font-black
                                    mt-2
                                ">

                                    Record New Expense

                                </h2>


                                <p className="
                                    text-gray-600
                                    text-sm
                                    mt-2
                                ">

                                    Document a gym expense for financial tracking.

                                </p>

                            </div>


                            <button
                                disabled={
                                    creatingExpense
                                }
                                onClick={() =>
                                    setExpenseModalOpen(false)
                                }
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-[#1a1a1a]
                                    border
                                    border-[#2c2c2c]
                                    text-gray-500
                                    hover:text-white
                                    flex
                                    items-center
                                    justify-center
                                    disabled:opacity-40
                                "
                            >

                                <X size={18} />

                            </button>

                        </div>


                        {/* MODAL BODY */}

                        <div className="p-7 space-y-6">


                            {/* TITLE / CATEGORY */}

                            <div className="
                                grid
                                grid-cols-2
                                gap-5
                            ">

                                <div>

                                    <label className="
                                        text-xs
                                        text-gray-500
                                    ">

                                        Expense Title

                                    </label>


                                    <input
                                        name="title"
                                        value={
                                            newExpanseData.title
                                        }
                                        onChange={
                                            handleNewExpanseChange
                                        }
                                        placeholder="e.g. Electricity Bill"
                                        className="
                                            premiumInput
                                            mt-2
                                            w-full
                                        "
                                    />

                                </div>


                                <div>

                                    <label className="
                                        text-xs
                                        text-gray-500
                                    ">

                                        Category

                                    </label>


                                    <select
                                        name="category"
                                        value={
                                            newExpanseData.category
                                        }
                                        onChange={
                                            handleNewExpanseChange
                                        }
                                        className="
                                            premiumInput
                                            mt-2
                                            w-full
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

                                </div>

                            </div>


                            {/* AMOUNT / DATE */}

                            <div className="
                                grid
                                grid-cols-2
                                gap-5
                            ">

                                <div>

                                    <label className="
                                        text-xs
                                        text-gray-500
                                    ">

                                        Amount

                                    </label>


                                    <input
                                        type="number"
                                        name="amount"
                                        value={
                                            newExpanseData.amount
                                        }
                                        onChange={
                                            handleNewExpanseChange
                                        }
                                        min="0"
                                        placeholder="₹0.00"
                                        className="
                                            premiumInput
                                            mt-2
                                            w-full
                                        "
                                    />

                                </div>


                                <div>

                                    <label className="
                                        text-xs
                                        text-gray-500
                                    ">

                                        Expense Date

                                    </label>


                                    <input
                                        type="date"
                                        name="expenseDate"
                                        value={
                                            newExpanseData.expenseDate
                                        }
                                        onChange={
                                            handleNewExpanseChange
                                        }
                                        className="
                                            premiumInput
                                            mt-2
                                            w-full
                                        "
                                    />

                                </div>

                            </div>


                            {/* PAID TO / PAYMENT */}

                            <div className="
                                grid
                                grid-cols-2
                                gap-5
                            ">

                                <div>

                                    <label className="
                                        text-xs
                                        text-gray-500
                                    ">

                                        Paid To / Vendor

                                    </label>


                                    <input
                                        name="paidTo"
                                        value={
                                            newExpanseData.paidTo
                                        }
                                        onChange={
                                            handleNewExpanseChange
                                        }
                                        placeholder="Vendor, employee or organization"
                                        className="
                                            premiumInput
                                            mt-2
                                            w-full
                                        "
                                    />

                                </div>


                                <div>

                                    <label className="
                                        text-xs
                                        text-gray-500
                                    ">

                                        Payment Method

                                    </label>


                                    <select
                                        name="paymentMethod"
                                        value={
                                            newExpanseData.paymentMethod
                                        }
                                        onChange={
                                            handleNewExpanseChange
                                        }
                                        className="
                                            premiumInput
                                            mt-2
                                            w-full
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

                                </div>

                            </div>


                            {/* RECURRING */}

                            <div className="
                                p-4
                                rounded-xl
                                border
                                border-[#272727]
                                bg-[#151515]
                                flex
                                items-center
                                justify-between
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        bg-blue-500/10
                                        text-blue-400
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        <Repeat size={16} />

                                    </div>


                                    <div>

                                        <p className="
                                            text-sm
                                            font-semibold
                                        ">

                                            Recurring Expense

                                        </p>


                                        <p className="
                                            text-xs
                                            text-gray-600
                                            mt-1
                                        ">

                                            Automatically track this expense every month.

                                        </p>

                                    </div>

                                </div>


                                <input
                                    type="checkbox"
                                    name="isRecurring"
                                    checked={
                                        newExpanseData.isRecurring
                                    }
                                    onChange={
                                        handleNewExpanseChange
                                    }
                                    className="
                                        w-5
                                        h-5
                                        accent-red-500
                                    "
                                />

                            </div>


                            {/* NOTES */}

                            <div>

                                <label className="
                                    text-xs
                                    text-gray-500
                                ">

                                    Notes

                                </label>


                                <textarea
                                    rows={3}
                                    name="notes"
                                    value={
                                        newExpanseData.notes
                                    }
                                    onChange={
                                        handleNewExpanseChange
                                    }
                                    placeholder="Add any additional information..."
                                    className="
                                        premiumInput
                                        mt-2
                                        w-full
                                        resize-none
                                    "
                                />

                            </div>

                        </div>


                        {/* MODAL FOOTER */}

                        <div className="
                            px-7
                            py-5
                            border-t
                            border-[#242424]
                            flex
                            justify-between
                            items-center
                        ">

                            <button
                                disabled={
                                    creatingExpense
                                }
                                onClick={() =>
                                    setExpenseModalOpen(false)
                                }
                                className="
                                    text-gray-500
                                    hover:text-white
                                    text-sm
                                    disabled:opacity-40
                                "
                            >

                                Cancel

                            </button>


                            <button
                                disabled={
                                    creatingExpense
                                }
                                onClick={
                                    createNewExpanse
                                }
                                className="
                                    h-11
                                    px-7
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-red-700
                                    to-red-500
                                    text-white
                                    font-bold
                                    flex
                                    items-center
                                    gap-2
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >

                                {creatingExpense ? (

                                    <>

                                        <RotateCcw
                                            size={16}
                                            className="
                                                animate-spin
                                            "
                                        />

                                        Saving...

                                    </>

                                ) : (

                                    <>

                                        <Plus size={17} />

                                        Record Expense

                                    </>

                                )}

                            </button>

                        </div>

                    </div>

                </>

            )}

        </div>

    );

};


export default ExpenseManagement;
