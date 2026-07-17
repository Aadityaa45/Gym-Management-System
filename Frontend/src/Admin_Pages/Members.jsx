// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import axios from "axios"

// // in this we have implemented the concept of pagination that means we will only got those data which we exactly want not every data

// const Members = () => {
//   const [currentPage,setCurrentPage] = useState(1)
//   const [members,setMembers] = useState([])
//   const [totalPages,setTotalPages] = useState(1)
//   const [search,setSearch]=useState("")

//   const fetchMembers = async () =>{
//     try {
//       const backendUrl = import.meta.env.VITE_BACKEND_URL;
//       const response = await axios.get(`${backendUrl}/api/admin/members/fetch-members?page=${currentPage}&limit=10&search=${search}`,
//         {
//           withCredentials:true
//         }
//       )

//       if(response.data.success){
//         setMembers(response.data.members)
//         setTotalPages(response.data.pagination.totalPages)
//       }
//     } catch (error) {
//       toast.error("Something went Wrong")
//     }
//   }
//   // useEffect(()=>{
//   //   fetchMembers()
//   // },[currentPage])
//   // const [users, setUsers] = useState([]);
//   // const [currentPage, setCurrentPage] = useState(0);

//   // const Page_Size = 10;
//   // const total_elements = users.length;
//   // const total_pages = Math.ceil(total_elements / Page_Size);

//   // const start = currentPage * Page_Size;
//   // const end = start + Page_Size;

//   // useEffect(() => {
//   //   setUsers(usersData);
//   // }, []);

//   // Search States
//   //here till the debouncing logic we are encountering that for the empty string also the api call se beingh made to resolve this we will implement the cache using the local state variables
//   // const [inputValue, setInputValue] = useState("");
//   // const [searchResultPopup, setSearchResultPopUp] = useState(false);
//   // const [results, setResults] = useState([]);
//   // const [cache,setCache] = useState({})

//   const InputValueChangeHandler = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1)
//   };

//   // const SearchUserHandler = () => {
//   //   if(cache[inputValue]){
//   //       setResults(cache[inputValue])
//   //       console.log("Cache Detetcted")
//   //       return
//   //   }
//   //   console.log("API Call For:", inputValue);

//   //   if (!inputValue.trim()) {
//   //     setResults([]);
//   //     return;
//   //   }

//   //   const filteredUsers = users.filter((item) =>
//   //     item.name.toLowerCase().includes(inputValue.toLowerCase())
//   //   );

//   //   setResults(filteredUsers);
//   //   setCache((prev)=>({...prev,[inputValue]:results})) //yaha hamne previous satet ko update kiya h 
//   // };

//   // Debouncing
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchMembers();
//     }, 500);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [search,currentPage]);

// return (
//   <div className="w-full py-8">

//     {/* Search Section */}
//     <div className="relative w-[500px] mx-auto z-[9999]">

//       <div className="relative">
//         <input
//           type="search"
//           value={search}
//           onChange={InputValueChangeHandler}
//           // onFocus={() => setSearchResultPopUp(true)}
//           // onBlur={() =>
//           //   setTimeout(() => setSearchResultPopUp(false), 200)
//           // }
//           placeholder="Search members by name..."
//           className="
//             w-full
//             bg-[#08213d]
//             border
//             border-gray-700
//             text-white
//             placeholder:text-gray-400
//             rounded-2xl
//             py-4
//             pl-14
//             pr-5
//             outline-none
//             transition-all
//             duration-300
//             focus:border-red-500
//             focus:ring-4
//             focus:ring-red-500/20
//             shadow-xl
//           "
//         />

//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
//           />
//         </svg>
//       </div>

//       {/* {searchResultPopup && (
//         <div
//           className="
//             absolute
//             top-[110%]
//             left-0
//             w-full
//             bg-[#08213d]
//             border
//             border-gray-700
//             rounded-2xl
//             shadow-2xl
//             overflow-hidden
//             z-[99999]
//             backdrop-blur-md
//             max-h-[350px]
//             overflow-y-auto
//           "
//         >
//           {inputValue.trim() && results.length > 0 ? (
//             results.slice(0, 8).map((result) => (
//               <div
//                 key={result._id}
//                 className="
//                   px-5
//                   py-4
//                   border-b
//                   border-gray-700
//                   hover:bg-[#123963]
//                   cursor-pointer
//                   transition-all
//                   duration-200
//                 "
//               >
//                 <div className="text-white font-medium">
//                   {result.name}
//                 </div>

//                 <div className="text-gray-400 text-sm mt-1">
//                   {result.phone}
//                 </div>
//               </div>
//             ))
//           ) : inputValue.trim() ? (
//             <div className="p-6 text-center text-gray-400">
//               No matching members found
//             </div>
//           ) : (
//             <div className="p-6 text-center text-gray-400">
//               Start typing to search members
//             </div>
//           )}
//         </div>
//       )} */}
//     </div>

//     {/* Filters */}
// <div className="w-[90%] mx-auto mt-10 mb-5 flex flex-wrap items-center gap-5">

//   {/* Status */}
//   <select
//     className="
//       bg-[#08213d]
//       border
//       border-gray-700
//       rounded-lg
//       px-4
//       py-3
//       text-white
//       outline-none
//       focus:border-red-500
//     "
//   >
//     <option value="">All Status</option>
//     <option value="active">Active</option>
//     <option value="expired">Expired</option>
//   </select>

//   {/* Plans */}
//   <select
//     className="
//       bg-[#08213d]
//       border
//       border-gray-700
//       rounded-lg
//       px-4
//       py-3
//       text-white
//       outline-none
//       focus:border-red-500
//     "
//   >
//     <option value="">All Plans</option>

//     {/* Dynamic Plans */}
//     {/* {membershipPlans.map(plan => (
//       <option key={plan._id} value={plan._id}>
//         {plan.name}
//       </option>
//     ))} */}

//     {/* Temporary */}
//     <option>Monthly</option>
//     <option>Quarterly</option>
//     <option>Half Yearly</option>
//     <option>Yearly</option>
//   </select>

//   {/* Payment Left */}
//   <label className="flex items-center gap-2 text-white cursor-pointer">
//     <input
//       type="checkbox"
//       className="accent-red-500 w-4 h-4"
//     />
//     <span>Payment Left</span>
//   </label>

// </div>

//     {/* Table Section */}
//     <div className="mt-20">
//       <div className="bg-[#041b35] w-[90%] mx-auto border border-gray-700 rounded-xl">

//         {/* Header */}
//         <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] px-8 py-5 border-b border-gray-700 font-semibold text-white">
//           <div>Name</div>
//           <div>Phone</div>
//           <div>Plan</div>
//           <div>Joining Date</div>
//           <div>Status</div>
//           <div>Action</div>
//         </div>

//         {/* Rows */}
//         {/* {users.slice(start, end).map((user) => ( */}
//         {members.map((member)=>(
//           <div
//             key={member._id}
//             className="
//               grid
//               grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr]
//               px-8
//               py-5
//               items-center
//               border-b
//               border-gray-800
//               hover:bg-[#08213d]
//               transition-all
//             "
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
//                 {member.fullName.charAt(0)}
//               </div>

//               <span>{member.fullName}</span>
//             </div>

//             <div>{member.phone}</div>

//             <div>{member.membership?.plan?.name}</div>

//             <div>{member.joiningdate}</div>

//             <div>
//               <span
//                 className={`px-4 py-1 rounded-md font-medium ${
//                   member.status === "Active"
//                     ? "bg-green-200 text-green-700"
//                     : "bg-red-200 text-red-700"
//                 }`}
//               >
//                 {member.status}
//               </span>
//             </div>

//             <div>
//               <button className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-lg">
//                 Manage
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-2 py-6 bg-[#041b35]">
//           {[...Array(totalPages).keys()].map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page+1)}
//               className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
//                 currentPage === page+1
//                   ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
//                   : "bg-[#0a2748] text-gray-300 hover:bg-[#123963] hover:text-white"
//               }`}
//             >
//               {page + 1}
//             </button>
//           ))}
//         </div>

//       </div>
//     </div>
//   </div>
// );
// };

// export default Members;

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import { useContext } from "react";
import { gymAppContext } from "../contexts/gymAuthContext";

// in this we have implemented the concept of pagination that means we will only got those data which we exactly want not every data

const Members = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const [members,setMembers] = useState([])
  const [totalPages,setTotalPages] = useState(1)
  const [search,setSearch]=useState("")
  const [selectedPlan,setSelectedPlan] = useState("")
  const { membershipPlans, setMembershipPlans } = useContext(gymAppContext); //here we fetched the memberhsip plans data now we will use this as dynamic filters
  const [status,setStatus] = useState("")

  const fetchMembers = async () =>{
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/api/admin/members/fetch-members?page=${currentPage}&limit=10&search=${search}&plan=${selectedPlan}&status=${status}`,
        {
          withCredentials:true
        }
      )

      if(response.data.success){
        setMembers(response.data.members)
        setTotalPages(response.data.pagination.totalPages)
      }
    } catch (error) {
      toast.error("Something went Wrong")
    }
  }
  // useEffect(()=>{
  //   fetchMembers()
  // },[currentPage])
  // const [users, setUsers] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0);

  // const Page_Size = 10;
  // const total_elements = users.length;
  // const total_pages = Math.ceil(total_elements / Page_Size);

  // const start = currentPage * Page_Size;
  // const end = start + Page_Size;

  // useEffect(() => {
  //   setUsers(usersData);
  // }, []);

  // Search States
  //here till the debouncing logic we are encountering that for the empty string also the api call se beingh made to resolve this we will implement the cache using the local state variables
  // const [inputValue, setInputValue] = useState("");
  // const [searchResultPopup, setSearchResultPopUp] = useState(false);
  // const [results, setResults] = useState([]);
  // const [cache,setCache] = useState({})

  const InputValueChangeHandler = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1)
  };

  const handleMembershipPlanChange = (e) =>{
    setSelectedPlan(e.target.value)
    setCurrentPage(1)
  }

  const handleStatusChange = (e) =>{
    setStatus(e.target.value)
    setCurrentPage(1)
  }

  // const SearchUserHandler = () => {
  //   if(cache[inputValue]){
  //       setResults(cache[inputValue])
  //       console.log("Cache Detetcted")
  //       return
  //   }
  //   console.log("API Call For:", inputValue);

  //   if (!inputValue.trim()) {
  //     setResults([]);
  //     return;
  //   }

  //   const filteredUsers = users.filter((item) =>
  //     item.name.toLowerCase().includes(inputValue.toLowerCase())
  //   );

  //   setResults(filteredUsers);
  //   setCache((prev)=>({...prev,[inputValue]:results})) //yaha hamne previous satet ko update kiya h 
  // };

  // Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMembers();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search,currentPage,status,selectedPlan]);

return (
<div className="relative">

    {/* Page Header */}

    <div className="mb-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

        <div>

            <p className="text-sm uppercase tracking-[5px] text-red-500">

                Fitness Beast

            </p>

            <h1 className="mt-2 text-5xl font-black tracking-wide text-white">

                Members Directory

            </h1>

            <p className="mt-3 max-w-3xl text-gray-400">

                Search, filter and manage all registered members from a
                single premium dashboard.

            </p>

        </div>

    </div>

    {/* Search & Filters Card */}

    <div
        className="
            rounded-[30px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            shadow-[0_25px_70px_rgba(0,0,0,.45)]
            p-8
            mb-10
        "
    >

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center">

            {/* Search */}

            <div className="relative flex-1">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                    />
                </svg>

                <input
                    type="search"
                    value={search}
                    onChange={InputValueChangeHandler}
                    placeholder="Search by member name..."
                    className="
                        h-16
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        pl-14
                        pr-5
                        text-white
                        placeholder:text-gray-500
                        outline-none
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        focus:border-red-500
                        focus:shadow-[0_0_20px_rgba(239,68,68,.15)]
                    "
                />

            </div>

            {/* Filters */}

            <div className="flex flex-wrap gap-4">

                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="
                        h-16
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        px-5
                        text-white
                        outline-none
                        backdrop-blur-xl
                        focus:border-red-500
                    "
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Expired</option>
                </select>

                <select
                    value={selectedPlan}
                    onChange={handleMembershipPlanChange}
                    className="
                        h-16
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        px-5
                        text-white
                        outline-none
                        backdrop-blur-xl
                        focus:border-red-500
                    "
                >
                    <option value="">
                        Select a Plan
                    </option>
                    {/* <option>All Plans</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Half Yearly</option>
                    <option>Yearly</option> */}
                    {membershipPlans.map((plan)=>(
                        <option key={plan._id} value={plan._id}>
                            {plan.name}
                        </option>
                    ))}
                </select>

                <label
                    className="
                        flex
                        h-16
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        px-6
                        text-gray-300
                    "
                >

                    <input
                        type="checkbox"
                        className="h-5 w-5 accent-red-500"
                    />

                    Payment Left

                </label>

            </div>

        </div>

    </div>

    {/* Table Section */}

    {/* ================= MEMBERS TABLE ================= */}

<div
    className="
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
        shadow-[0_25px_70px_rgba(0,0,0,.45)]
    "
>

    {/* Table Header */}

    <div
        className="
            grid
            grid-cols-[2.2fr_1.3fr_1.4fr_1.5fr_1fr_1fr]
            border-b
            border-white/10
            bg-black/20
            px-8
            py-6
            text-sm
            uppercase
            tracking-[3px]
            text-gray-400
        "
    >

        <div>Member</div>

        <div>Phone</div>

        <div>Plan</div>

        <div>Joining</div>

        <div>Status</div>

        <div className="text-center">

            Action

        </div>

    </div>

    {/* Rows */}

    {members.length > 0 ? (

        members.map((member) => (

            <div
                key={member._id}
                className="
                    grid
                    grid-cols-[2.2fr_1.3fr_1.4fr_1.5fr_1fr_1fr]
                    items-center
                    border-b
                    border-white/5
                    px-8
                    py-6
                    transition-all
                    duration-300
                    hover:bg-white/5
                "
            >

                {/* Member */}

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-red-500
                            to-red-700
                            text-lg
                            font-bold
                            shadow-[0_12px_30px_rgba(239,68,68,.35)]
                        "
                    >

                        {member.fullName?.charAt(0)}

                    </div>

                    <div>

                        <h3 className="font-semibold text-white">

                            {member.fullName}

                        </h3>

                        <p className="mt-1 text-sm text-gray-500">

                            Gym Member

                        </p>

                    </div>

                </div>

                {/* Phone */}

                <div className="font-medium text-gray-300">

                    {member.phone}

                </div>

                {/* Plan */}

                <div>

                    <span
                        className="
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-600/10
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-red-400
                        "
                    >

                        {member.membership?.plan?.name}

                    </span>

                </div>

                {/* Joining */}

                <div className="text-gray-300">

                    {new Date(member.joiningdate).toLocaleDateString()}

                </div>

                {/* Status */}

                <div>

                    <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold

                        ${
                            member.status === "Active"
                                ? "bg-green-500/15 text-green-400 border border-green-500/20"
                                : "bg-red-500/15 text-red-400 border border-red-500/20"
                        }
                        `}
                    >

                        {member.status}

                    </span>

                </div>

                {/* Action */}

                <div className="flex justify-center">

                    <button
                        className="
                            rounded-2xl
                            bg-gradient-to-r
                            from-red-600
                            to-red-500
                            px-6
                            py-3
                            font-semibold
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_15px_35px_rgba(239,68,68,.35)]
                        "
                    >

                        Manage

                    </button>

                </div>

            </div>

        ))

    ) : (

        <div className="py-20 text-center">

            <h3 className="text-2xl font-bold text-white">

                No Members Found

            </h3>

            <p className="mt-3 text-gray-500">

                Try changing your search or filters.

            </p>

        </div>

    )}
        {/* Pagination */}
        {/* ================= PAGINATION ================= */}

<div
    className="
        flex
        items-center
        justify-between
        border-t
        border-white/10
        bg-black/20
        px-8
        py-6
    "
>

    {/* Left */}

    <div className="text-sm text-gray-400">

        Showing

        <span className="mx-2 font-semibold text-white">

            {members.length}

        </span>

        Members

    </div>

    {/* Right */}

    <div className="flex items-center gap-3">

        {/* Previous */}

        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                text-gray-300
                transition-all
                duration-300
                hover:bg-white/10
                disabled:cursor-not-allowed
                disabled:opacity-40
            "
        >

            Previous

        </button>

        {/* Page Numbers */}

        {[...Array(totalPages).keys()].map((page) => (

            <button
                key={page}
                onClick={() => setCurrentPage(page + 1)}
                className={`

                    h-12
                    w-12
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300

                    ${
                        currentPage === page + 1
                            ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_12px_30px_rgba(239,68,68,.35)]"
                            : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                    }

                `}
            >

                {page + 1}

            </button>

        ))}

        {/* Next */}

        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                text-gray-300
                transition-all
                duration-300
                hover:bg-white/10
                disabled:cursor-not-allowed
                disabled:opacity-40
            "
        >

            Next

        </button>

    </div>

</div>

</div>

</div>
      
);
};

export default Members;