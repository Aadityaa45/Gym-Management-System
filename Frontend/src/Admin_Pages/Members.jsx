import React from "react";
import { useState,useEffect } from "react";

const Members = () =>{
    const usersData = Array.from({ length: 100 }, (_, i) => ({
  _id: i + 1,
  name: `User ${i + 1}`,
  phone: `98765${String(i).padStart(5, "0")}`,
  plan: ["Basic Plan", "Standard Plan", "Premium Plan"][i % 3],
  joiningDate: "30 May 2026",
  status: i % 2 === 0 ? "Active" : "Expired",
})); //this function is created to create a dummy data tp store later it will be replaced with the original data logic

const [users,setUsers] = useState([])
const [currentPage,setCurrentPage] = useState(0)
const Page_Size=10 //means 10 user data per page
const total_elements = users.length
const total_pages = Math.ceil(total_elements/Page_Size)
const start = currentPage*Page_Size
const end = start+Page_Size

useEffect(()=>{
    setUsers(usersData)
    console.log(users)
},[])


    return(
        <div>
            <div className="bg-[#041b35] w-[90%] mx-auto border border-gray-700 rounded-xl overflow-hidden">

                    {/* Header */}
                    <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] px-8 py-5 border-b border-gray-700 font-semibold text-white">
                        <div>Name</div>
                        <div>Phone</div>
                        <div>Plan</div>
                        <div>Joining Date</div>
                        <div>Status</div>
                        <div>Action</div>
                    </div>

                    {/* Dynamic Rows */}
                    {users?.slice(start,end).map((user) => (
                        <div
                        key={user._id}
                        className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] px-8 py-5 items-center border-b border-gray-800"
                        >
                        {/* Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-red-500"></div>
                            <span>{user.name}</span>
                        </div>

                        {/* Phone */}
                        <div>{user.phone}</div>

                        {/* Plan */}
                        <div>{user.plan}</div>

                        {/* Joining Date */}
                        <div>{user.joiningDate}</div>

                        {/* Status */}
                        <div>
                            <span
                            className={`px-4 py-1 rounded-md font-medium ${
                                user.status === "Active"
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-700"
                            }`}
                            >
                            {user.status}
                            </span>
                        </div>

                        {/* Action */}
                        <div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                            Manage
                            </button>
                        </div>
                        </div>
                    ))}
                    {/* Pagination */}
                        <div className="flex justify-center items-center gap-2 py-6 bg-[#041b35]">
                        {[...Array(total_pages).keys()].map((page) => (
                            <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200
                            ${
                                currentPage === page
                                ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                                : "bg-[#0a2748] text-gray-300 hover:bg-[#123963] hover:text-white"
                            }`}
                            >
                            {page + 1}
                            </button>
                        ))}
                        </div>
                    </div>
        </div>
    )
}

export default Members