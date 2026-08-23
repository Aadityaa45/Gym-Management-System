
// import React, { useState, useEffect } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   Plus,
//   Bell,
//   X,
//   Clock3,
// } from "lucide-react";

// import Logo from "../../assets/Fitness_Beast_Logo.png";
// import { sidebarConfig } from "../../assets/hardcoded_content.js/LayoutNavbarConfig.js";

// const Layout = () => {
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false);

//   const [profileIconPopUp, setProfileIconPopUp] = useState(false);

//   const [notificationPopup, setNotificationPopup] = useState(false);

//   const [currentTime, setCurrentTime] = useState(new Date());

//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       message: "New member joined",
//       createdAt: new Date(),
//     },
//     {
//       id: 2,
//       message: "Membership expires in 3 days",
//       createdAt: new Date(),
//     },
//   ]);

//   const location = useLocation();

//   const navigate = useNavigate();

//   const currentPage =
//     sidebarConfig.find(
//       (item) => item.path === location.pathname
//     ) || sidebarConfig[0];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNotifications((prev) => [
//         {
//           id: Date.now(),
//           message: "Test Notification",
//           createdAt: new Date(),
//         },
//         ...prev,
//       ]);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const day = currentTime.toLocaleDateString("en-US", {
//     weekday: "long",
//   });

//   const date = currentTime.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   const time = currentTime.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   });

//     return (
//         <div className="relative flex min-h-screen overflow-hidden bg-[#060606] text-white">

//   {/* Premium Background */}

//   <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0c0c0c] to-[#090909]" />

//   <div className="absolute -left-48 -top-32 h-[550px] w-[550px] rounded-full bg-red-600/10 blur-[180px]" />

//   <div className="absolute bottom-[-220px] right-[-150px] h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[180px]" />

//   <div
//     className="absolute inset-0 opacity-[0.04]"
//     style={{
//       backgroundImage: `
//       linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
//       `,
//       backgroundSize: "60px 60px",
//     }}
//   />

//   <div className="relative z-10 flex w-full">

//     {/* ================= SIDEBAR ================= */}

//     <div
//       className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,.55)] transition-all duration-300 ${
//         isSideBarOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0`}
//     >

//       {/* Logo */}

//       <div className="border-b border-white/10 px-6 py-8 relative">

//         <img
//           src={Logo}
//           alt="Logo"
//           className="mx-auto w-28 drop-shadow-[0_0_20px_rgba(239,68,68,.45)]"
//         />

//         <h2 className="mt-5 text-center text-2xl font-black tracking-wide">

//           FITNESS BEAST

//         </h2>

//         <p className="mt-1 text-center text-sm text-gray-400">

//           Admin Dashboard

//         </p>

//         <button
//           onClick={() => setIsSideBarOpen(false)}
//           className="absolute right-5 top-6 lg:hidden"
//         >
//           <X />
//         </button>

//       </div>

//       {/* Navigation */}

//       <div className="mt-8 flex flex-col gap-3 px-4">

//         {sidebarConfig.map((button) => {

//           const Icon = button.icon;

//           const active =
//             location.pathname === button.path;

//           return (

//             <button
//               key={button.path}
//               onClick={() => navigate(button.path)}
//               className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300

//               ${
//                 active
//                   ? "bg-red-600 shadow-[0_12px_35px_rgba(239,68,68,.35)]"
//                   : "hover:bg-white/10"
//               }
//               `}
//             >

//               <Icon
//                 size={21}
//                 className="transition-transform duration-300 group-hover:scale-110"
//               />

//               <span className="font-medium tracking-wide">

//                 {button.name}

//               </span>

//             </button>

//           );

//         })}

//       </div>

//       {/* Bottom Card */}

//       <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-600/20 to-transparent p-5 backdrop-blur-xl">

//         <p className="text-sm uppercase tracking-[4px] text-red-400">

//           System Status

//         </p>

//         <h3 className="mt-2 text-xl font-bold">

//           All Systems Operational

//         </h3>

//         <div className="mt-4 flex items-center gap-3">

//           <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

//           <span className="text-sm text-gray-300">

//             Backend Connected

//           </span>

//         </div>

//       </div>

//     </div>

//     {/* ================= MAIN CONTENT ================= */}

//     <div className="flex-1 lg:ml-72">
//         {/* ===================== PREMIUM NAVBAR ===================== */}

// <div className="sticky top-5 z-40 mx-6 mt-5">

//   <div className="flex h-24 items-center justify-between rounded-[28px] border border-white/10 bg-white/5 px-8 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">

//     {/* LEFT */}

//     <div className="flex flex-1 items-center gap-6">

//       <button
//         onClick={() => setIsSideBarOpen(!isSideBarOpen)}
//         className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10 lg:hidden"
//       >
//         <Menu size={22} />
//       </button>

//       <div>

//         <h1 className="text-3xl font-black tracking-wide text-white">
//           {currentPage.heading}
//         </h1>

//         <p className="mt-1 text-sm text-gray-400">
//           {currentPage.subHeading}
//         </p>

//       </div>

//     </div>

//     {/* CENTER SEARCH */}

//     {/* <div className="hidden xl:flex">

//       <div className="flex h-14 w-[420px] items-center rounded-2xl border border-white/10 bg-black/20 px-5 backdrop-blur-xl">

//         <Search
//           className="mr-4 text-gray-500"
//           size={20}
//         />

//         <input
//           type="text"
//           placeholder="Search members, products, invoices..."
//           className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
//         />

//       </div>

//     </div> */}

//     {/* RIGHT */}

//     <div className="flex items-center gap-5">

//       {/* TIME */}

//       {/* <div className="hidden lg:flex flex-col items-end">

//         <div className="flex items-center gap-2">

//           <Clock3
//             size={18}
//             className="text-red-500"
//           />

//           <span className="text-xl font-bold tracking-wider">

//             {time}

//           </span>

//         </div>

//         <span className="text-xs text-gray-400">

//           {day} • {date}

//         </span>

//       </div> */}

//       {/* ACTION BUTTON */}

//       <button
//         onClick={() =>
//           navigate(currentPage.actionButtonRoute)
//         }
//         className="hidden md:flex h-12 items-center gap-3 rounded-2xl bg-red-600 px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_12px_35px_rgba(239,68,68,.4)]"
//       >
//         {currentPage.actionButton}

//         <Plus size={18} />

//       </button>

//       {/* NOTIFICATION */}

//       <div className="relative">

//         <button
//           onClick={() =>
//             setNotificationPopup(!notificationPopup)
//           }
//           className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
//         >
//           <Bell size={20} />
//         </button>

//         {notifications.length > 0 && (

//           <span
//             className="
//             absolute
//             -right-1
//             -top-1
//             flex
//             h-5
//             min-w-5
//             items-center
//             justify-center
//             rounded-full
//             bg-red-600
//             px-1
//             text-[10px]
//             font-bold
//             shadow-lg
//             "
//           >
//             {notifications.length}
//           </span>

//         )}

//       </div>

//       {/* PROFILE */}

//       <button
//         onClick={() =>
//           setProfileIconPopUp(true)
//         }
//         className="group"
//       >

//         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 font-bold shadow-[0_10px_25px_rgba(239,68,68,.35)] ring-2 ring-red-500/30 transition-all duration-300 group-hover:scale-105">

//           A

//         </div>

//       </button>

//     </div>

//   </div>

// </div>

// {/* ================= PAGE CONTENT ================= */}

// <div className="px-6 pb-8 mt-6">

//   <Outlet />

// </div>
//     </div>

                

//             {/* profile Icon popup that shows logout and edit info options */}
//             {/* ================= PROFILE POPUP ================= */}

// <div
//   className={`fixed top-24 right-6 z-[60] transition-all duration-300 ${
//     profileIconPopUp
//       ? "opacity-100 scale-100"
//       : "pointer-events-none opacity-0 scale-95"
//   }`}
// >
//   <div className="w-80 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,.55)] overflow-hidden">

//     {/* Header */}

//     <div className="relative border-b border-white/10 p-6">

//       <button
//         onClick={() => setProfileIconPopUp(false)}
//         className="absolute right-5 top-5 text-gray-400 hover:text-red-400 transition"
//       >
//         <X size={20} />
//       </button>

//       <div className="flex flex-col items-center">

//         <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-2xl font-bold shadow-[0_15px_40px_rgba(239,68,68,.4)]">

//           A

//         </div>

//         <h3 className="mt-5 text-2xl font-bold">

//           Admin

//         </h3>

//         <p className="text-gray-400">

//           Gym Administrator

//         </p>

//       </div>

//     </div>

//     {/* Body */}

//     <div className="space-y-3 p-5">

//       <button
//         className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-4 font-medium transition-all duration-300 hover:bg-white/10"
//       >
//         Manage Profile
//       </button>

//       <button
//         className="flex w-full items-center justify-center rounded-2xl bg-red-600 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_15px_35px_rgba(239,68,68,.35)]"
//       >
//         Logout
//       </button>

//     </div>

//   </div>
// </div>
//         {/* here, is the block of notification popup */}
//         {/* ================= NOTIFICATION POPUP ================= */}

// <div
//   className={`fixed right-6 top-24 z-[60] transition-all duration-300 ${
//     notificationPopup
//       ? "opacity-100 scale-100"
//       : "pointer-events-none opacity-0 scale-95"
//   }`}
// >
//   <div className="w-[380px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,.55)]">

//     {/* Header */}

//     <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

//       <div>

//         <h2 className="text-xl font-bold">

//           Notifications

//         </h2>

//         <p className="text-sm text-gray-400">

//           Latest updates

//         </p>

//       </div>

//       <button
//         onClick={() => setNotificationPopup(false)}
//         className="rounded-xl p-2 transition hover:bg-white/10"
//       >
//         <X size={18} />
//       </button>

//     </div>

//     {/* Body */}

//     <div className="max-h-[420px] overflow-y-auto p-5">

//       {notifications.length > 0 ? (

//         <div className="space-y-4">

//           {notifications.map((notification) => (

//             <div
//               key={notification.id}
//               className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/5"
//             >

//               <div className="flex items-start gap-3">

//                 <div className="mt-2 h-3 w-3 rounded-full bg-red-500" />

//                 <div>

//                   <p className="font-medium text-white">

//                     {notification.message}

//                   </p>

//                   <p className="mt-2 text-xs text-gray-500">

//                     {new Date(
//                       notification.createdAt
//                     ).toLocaleString()}

//                   </p>

//                 </div>

//               </div>

//             </div>

//           ))}

//         </div>

//       ) : (

//         <div className="py-16 text-center">

//           <p className="text-gray-400">

//             No Notifications

//           </p>

//         </div>

//       )}

//     </div>

//   </div>
// </div>

// </div>

// </div>

//   );
// };

// export default Layout;

import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Plus,
  X,
} from "lucide-react";

import Logo from "../../assets/Fitness_Beast_Logo.png";
import { sidebarConfig } from "../../assets/hardcoded_content.js/LayoutNavbarConfig.js";

const Layout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [profileIconPopUp, setProfileIconPopUp] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const location = useLocation();
  const navigate = useNavigate();

  const currentPage =
    sidebarConfig.find(
      (item) => item.path === location.pathname
    ) || sidebarConfig[0];

  // ================= CURRENT TIME =================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const day = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const date = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#060606] text-white">

      {/* ================= PREMIUM BACKGROUND ================= */}

      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0c0c0c] to-[#090909]" />

      <div className="absolute -left-48 -top-32 h-[550px] w-[550px] rounded-full bg-red-600/10 blur-[180px]" />

      <div className="absolute bottom-[-220px] right-[-150px] h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[180px]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex w-full">

        {/* ================= SIDEBAR ================= */}

        <div
          className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,.55)] transition-all duration-300 ${
            isSideBarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          } lg:translate-x-0`}
        >

          {/* ================= LOGO ================= */}

          <div className="relative border-b border-white/10 px-6 py-8">

            <img
              src={Logo}
              alt="Logo"
              className="mx-auto w-28 drop-shadow-[0_0_20px_rgba(239,68,68,.45)]"
            />

            <h2 className="mt-5 text-center text-2xl font-black tracking-wide">
              FITNESS BEAST
            </h2>

            <p className="mt-1 text-center text-sm text-gray-400">
              Admin Dashboard
            </p>

            <button
              onClick={() => setIsSideBarOpen(false)}
              className="absolute right-5 top-6 lg:hidden"
            >
              <X />
            </button>

          </div>


          {/* ================= NAVIGATION ================= */}

          <div className="mt-8 flex flex-col gap-3 px-4">

            {sidebarConfig.map((button) => {

              const Icon = button.icon;

              const active =
                location.pathname === button.path;

              return (
                <button
                  key={button.path}
                  onClick={() => navigate(button.path)}
                  className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? "bg-red-600 shadow-[0_12px_35px_rgba(239,68,68,.35)]"
                      : "hover:bg-white/10"
                  }`}
                >

                  <Icon
                    size={21}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="font-medium tracking-wide">
                    {button.name}
                  </span>

                </button>
              );

            })}

          </div>


          {/* ================= COMPACT SYSTEM STATUS ================= */}

          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-600/15 to-transparent px-4 py-3 backdrop-blur-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[2px] text-red-400">
                  System Status
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  All Systems Operational
                </p>

              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">

                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />

              </div>

            </div>

            <p className="mt-1 text-[11px] text-gray-400">
              Backend Connected
            </p>

          </div>

        </div>


        {/* ================= MAIN CONTENT ================= */}

        <div className="flex-1 lg:ml-72">

          {/* ================= PREMIUM NAVBAR ================= */}

          <div className="sticky top-5 z-40 mx-6 mt-5">

            <div className="flex h-24 items-center justify-between rounded-[28px] border border-white/10 bg-white/5 px-8 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">

              {/* ================= LEFT ================= */}

              <div className="flex flex-1 items-center gap-6">

                <button
                  onClick={() =>
                    setIsSideBarOpen(!isSideBarOpen)
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10 lg:hidden"
                >
                  <Menu size={22} />
                </button>

                <div>

                  <h1 className="text-3xl font-black tracking-wide text-white">
                    {currentPage.heading}
                  </h1>

                  <p className="mt-1 text-sm text-gray-400">
                    {currentPage.subHeading}
                  </p>

                </div>

              </div>


              {/* ================= RIGHT ================= */}

              <div className="flex items-center gap-5">

                {/* ACTION BUTTON */}

                <button
                  onClick={() =>
                    navigate(
                      currentPage.actionButtonRoute
                    )
                  }
                  className="hidden md:flex h-12 items-center gap-3 rounded-2xl bg-red-600 px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_12px_35px_rgba(239,68,68,.4)]"
                >

                  {currentPage.actionButton}

                  <Plus size={18} />

                </button>


                {/* PROFILE */}

                <button
                  onClick={() =>
                    setProfileIconPopUp(true)
                  }
                  className="group"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 font-bold shadow-[0_10px_25px_rgba(239,68,68,.35)] ring-2 ring-red-500/30 transition-all duration-300 group-hover:scale-105">

                    A

                  </div>

                </button>

              </div>

            </div>

          </div>


          {/* ================= PAGE CONTENT ================= */}

          <div className="mt-6 px-6 pb-8">

            <Outlet />

          </div>

        </div>


        {/* ================= PROFILE POPUP ================= */}

        <div
          className={`fixed top-24 right-6 z-[60] transition-all duration-300 ${
            profileIconPopUp
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >

          <div className="w-80 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,.55)]">

            {/* HEADER */}

            <div className="relative border-b border-white/10 p-6">

              <button
                onClick={() =>
                  setProfileIconPopUp(false)
                }
                className="absolute right-5 top-5 text-gray-400 transition hover:text-red-400"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-2xl font-bold shadow-[0_15px_40px_rgba(239,68,68,.4)]">

                  A

                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Admin
                </h3>

                <p className="text-gray-400">
                  Gym Administrator
                </p>

              </div>

            </div>


            {/* BODY */}

            <div className="space-y-3 p-5">

              <button
                className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-4 font-medium transition-all duration-300 hover:bg-white/10"
              >
                Manage Profile
              </button>

              <button
                className="flex w-full items-center justify-center rounded-2xl bg-red-600 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_15px_35px_rgba(239,68,68,.35)]"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Layout;