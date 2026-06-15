import React, { useState, useEffect } from "react";

// in this we have implemented the concept of pagination that means we will only got those data which we exactly want not every data

const Members = () => {
  const usersData = Array.from({ length: 100 }, (_, i) => ({
    _id: i + 1,
    name: `User ${i + 1}`,
    phone: `98765${String(i).padStart(5, "0")}`,
    plan: ["Basic Plan", "Standard Plan", "Premium Plan"][i % 3],
    joiningDate: "30 May 2026",
    status: i % 2 === 0 ? "Active" : "Expired",
  }));

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const Page_Size = 10;
  const total_elements = users.length;
  const total_pages = Math.ceil(total_elements / Page_Size);

  const start = currentPage * Page_Size;
  const end = start + Page_Size;

  useEffect(() => {
    setUsers(usersData);
  }, []);

  // Search States
  //here till the debouncing logic we are encountering that for the empty string also the api call se beingh made to resolve this we will implement the cache using the local state variables
  const [inputValue, setInputValue] = useState("");
  const [searchResultPopup, setSearchResultPopUp] = useState(false);
  const [results, setResults] = useState([]);
  const [cache,setCache] = useState({})

  const InputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const SearchUserHandler = () => {
    if(cache[inputValue]){
        setResults(cache[inputValue])
        console.log("Cache Detetcted")
        return
    }
    console.log("API Call For:", inputValue);

    if (!inputValue.trim()) {
      setResults([]);
      return;
    }

    const filteredUsers = users.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setResults(filteredUsers);
    setCache((prev)=>({...prev,[inputValue]:results})) //yaha hamne previous satet ko update kiya h 
  };

  // Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      SearchUserHandler();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, users]);

return (
  <div className="w-full py-8">

    {/* Search Section */}
    <div className="relative w-[500px] mx-auto z-[9999]">

      <div className="relative">
        <input
          type="search"
          value={inputValue}
          onChange={InputValueChangeHandler}
          onFocus={() => setSearchResultPopUp(true)}
          onBlur={() =>
            setTimeout(() => setSearchResultPopUp(false), 200)
          }
          placeholder="Search members by name..."
          className="
            w-full
            bg-[#08213d]
            border
            border-gray-700
            text-white
            placeholder:text-gray-400
            rounded-2xl
            py-4
            pl-14
            pr-5
            outline-none
            transition-all
            duration-300
            focus:border-red-500
            focus:ring-4
            focus:ring-red-500/20
            shadow-xl
          "
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
      </div>

      {/* Search Recommendations Popup */}
      {searchResultPopup && (
        <div
          className="
            absolute
            top-[110%]
            left-0
            w-full
            bg-[#08213d]
            border
            border-gray-700
            rounded-2xl
            shadow-2xl
            overflow-hidden
            z-[99999]
            backdrop-blur-md
            max-h-[350px]
            overflow-y-auto
          "
        >
          {inputValue.trim() && results.length > 0 ? (
            results.slice(0, 8).map((result) => (
              <div
                key={result._id}
                className="
                  px-5
                  py-4
                  border-b
                  border-gray-700
                  hover:bg-[#123963]
                  cursor-pointer
                  transition-all
                  duration-200
                "
              >
                <div className="text-white font-medium">
                  {result.name}
                </div>

                <div className="text-gray-400 text-sm mt-1">
                  {result.phone}
                </div>
              </div>
            ))
          ) : inputValue.trim() ? (
            <div className="p-6 text-center text-gray-400">
              No matching members found
            </div>
          ) : (
            <div className="p-6 text-center text-gray-400">
              Start typing to search members
            </div>
          )}
        </div>
      )}
    </div>

    {/* Table Section */}
    <div className="mt-20">
      <div className="bg-[#041b35] w-[90%] mx-auto border border-gray-700 rounded-xl">

        {/* Header */}
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] px-8 py-5 border-b border-gray-700 font-semibold text-white">
          <div>Name</div>
          <div>Phone</div>
          <div>Plan</div>
          <div>Joining Date</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        {users.slice(start, end).map((user) => (
          <div
            key={user._id}
            className="
              grid
              grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr]
              px-8
              py-5
              items-center
              border-b
              border-gray-800
              hover:bg-[#08213d]
              transition-all
            "
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>

              <span>{user.name}</span>
            </div>

            <div>{user.phone}</div>

            <div>{user.plan}</div>

            <div>{user.joiningDate}</div>

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

            <div>
              <button className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-lg">
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
              className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
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
  </div>
);
};

export default Members;