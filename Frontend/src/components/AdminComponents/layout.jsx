// import React, { useState,useEffect } from 'react'
// import { Outlet } from 'react-router-dom'
// import { Menu, Plus, BellIcon, Cross, HomeIcon, UsersIcon, TrainTrackIcon, ShoppingBag, XIcon } from 'lucide-react'
// import Logo from '../../assets/Fitness_Beast_Logo.png'
// import { sidebarConfig } from '../../assets/hardcoded_content.js/LayoutNavbarConfig.js'
// import { useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import {io} from "socket.io-client"

// const Layout = () => {
//     const [isSideBarOpen, setIsSideBarOpen] = useState(false)
//     // const [selectedButton, setSelectedButton] = useState(0)  //we have used it in ordet to change the background color or to show the selected button
//     const [profileIconPopUp, setProfileIconPopUp] = useState(false)
//     const [notificationPopup,setNotificationPopup] = useState(false)

//     const location = useLocation()
//     const navigate = useNavigate()
//     // const SideBarButtons = [
//     //     {name:"Dashboard",icon:HomeIcon},
//     //     {name:"Members",icon:UsersIcon},
//     //     {name:"Membership Plans",icon:TrainTrackIcon},
//     //     {name:"Products",icon:ShoppingBag},
//     //     {name:"Competitions",icon:TrainTrackIcon},
//     //     {name:"Diet Plans",icon:TrainTrackIcon},
//     //     {name:"Billed/Invoices",icon:TrainTrackIcon},
//     // ]

//     const currentPage =
//   sidebarConfig.find(
//     (item) => item.path === location.pathname
//   ) || sidebarConfig[0];

//     //implementing the realtime notification and number of notifications on the bell icon
//     //here we have two approaches at the time of page load we update the set of notification by useffecting the logs data on ui change 
//     //another option is that instead of just implementing the effect once we should call that from backend after sometimes check that existing notiification array has the same elements or not 
//     //another option is we can use socket.io 
//     // WebSocket ek protocol hai jo client aur server ke beech permanent two-way connection banata hai. Socket.IO us protocol ke upar bana hua ek library/framework hai jo reconnect, rooms, events, broadcasting jaise features provide karke WebSocket ko use karna bahut aasan bana deta hai.
//     // we will be using socket.io here so we will update our notification functionality accordingly

//     const [notifications, setNotifications] = useState([
//     {
//         id: 1,
//         message: "New member joined",
//         createdAt: new Date()
//     },
//     {
//         id: 2,
//         message: "Membership expires in 3 days",
//         createdAt: new Date()
//     }
// ]);

//     useEffect(() => {

//     const interval = setInterval(() => {

//         setNotifications(prev => [
//             {
//                 id: Date.now(),
//                 message: "Test Notification",
//                 createdAt: new Date()
//             },
//             ...prev
//         ]);

//     }, 5000);

//     return () => clearInterval(interval);

// }, []);  //this is for now for frontend testing later we will going to replace it with our socket io code

//     // useEffect(()=>{
//     //     socket.on("new-notification",(notification)=>{
//     //         setNotifications(prev=>[
//     //             notification,
//     //             ...prev
//     //         ])
//     //     });
//     //     return()=>{
//     //         socket.off("new-notification")
//     //     }
//     // },[])
//     // currently this wont work as we didnot connected our backend and due to which it is giving the errorfor now we are just implementing the dummy notifications as of now

//     return (
//         <div className="flex min-h-screen">

//             {/* Sidebar Section */}
//             <div
//                 className={`fixed top-0 left-0 z-50 bg-[#0B1625] h-screen shadow w-64 transition-transform duration-300 ${
//                     isSideBarOpen ? "translate-x-0" : "-translate-x-full"
//                 } lg:translate-x-0`}
//             >
//                 {/* logo and cross section */}
//                 {/* logo and cross section */}
//                 <div className="relative w-full py-4 border-b border-gray-700">

//                     <img
//                         src={Logo}
//                         alt="Logo"
//                         className="w-30 h-auto mx-auto"
//                     />

//                     <button
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl lg:hidden"
//                         onClick={() => setIsSideBarOpen(false)}
//                     >
//                         X
//                     </button>

//                 </div>

//                 {/* sidebar buttons section */}
//                 <div className='mt-8 flex flex-col items-center justify-between gap-5'>
//                     {sidebarConfig.map((button)=>{
//                         const Icon = button.icon
//                         return(
//                             <button key={button.path} onClick={()=>navigate(button.path)} className={`w-[80%] cursor-pointer flex items-center gap-3 p-3 rounded-lg tranisition-all border
//                                 ${location.pathname==button.path?"bg-[#E72023] text-white border-white rounded-lg":"bg-none text-white border-white rounded-lg"}
//                             `}>
//                                 <Icon size={20}/>
//                                 <span>{button.name}</span>
//                             </button>
//                         )
//                     })}
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 lg:ml-64">

//                 {/* Navbar Section */}
//                 <div className=" w-full h-24 flex items-center justify-between px-4">

//                     <Menu
//                         className="w-6 h-6 cursor-pointer text-white lg:hidden"
//                         onClick={() => setIsSideBarOpen(!isSideBarOpen)}
//                     />

//                     <div className="flex flex-col gap-1 flex-1 lg:flex-none lg:ml-0 ml-4">
//                         <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
//                             {currentPage.heading}
//                         </h1>

//                         <p className="text-xs sm:text-sm text-gray-300">
//                             {currentPage.subHeading}
//                         </p>
//                     </div>

//                     <div className="flex items-center gap-3 sm:gap-5 lg:gap-7">

//                         <div
//                             className="
//                                 hidden
//                                 sm:flex
//                                 items-center
//                                 gap-2
//                                 bg-[#E72023]
//                                 text-white
//                                 px-3
//                                 sm:px-5
//                                 py-2
//                                 sm:py-3
//                                 rounded-lg
//                                 cursor-pointer
//                                 hover:opacity-90
//                                 transition
//                             "
//                         >
//                             <h3 onClick={()=>navigate(currentPage.actionButtonRoute)} className="font-medium">
//                                 {currentPage.actionButton}
//                             </h3>

//                             <Plus className="w-4 h-4" />
//                         </div>

//                         {/* <BellIcon onClick={()=>setNotificationPopup(!notificationPopup)} className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer p-2 rounded-lg" /> */}
//                         <div className="relative">
    
//     <BellIcon
//         onClick={() => setNotificationPopup(!notificationPopup)}
//         className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer p-2 rounded-lg"
//     />

//     {notifications.length > 0 && (
//         <span
//             className="
//                 absolute
//                 -top-2
//                 -right-2
//                 bg-red-500
//                 text-white
//                 text-[10px]
//                 font-bold
//                 min-w-5
//                 h-5
//                 px-1
//                 rounded-full
//                 flex
//                 items-center
//                 justify-center
//             "
//         >
//             {notifications.length}
//         </span>
//     )}

// </div>

//                         <div onClick={()=>setProfileIconPopUp(true)} className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer rounded-full"></div>

//                     </div>

//                 </div>

//                 {/* Page Content */}
//                 <Outlet />

//             </div>

//             {/* profile Icon popup that shows logout and edit info options */}
//             <div
//     className={`bg-[#0B1625] mt-5 mr-3 fixed right-0 top-0 rounded-xl border border-cyan-400
    
//     z-50
//     ${
//         profileIconPopUp
//             ? "flex flex-col w-72 p-5"
//             : "hidden"
//     }`}
// >
//     {/* Close Button */}
//     <button
//         onClick={() => setProfileIconPopUp(false)}
//         className="self-end text-white text-lg hover:text-red-500 transition"
//     >
//         ✕
//     </button>

//     {/* Profile Section */}
//     <div className="flex flex-col items-center gap-3 mb-6">
//         <div className="w-16 h-16 rounded-full bg-[#E72023] flex items-center justify-center text-white text-xl font-bold">
//             A
//         </div>

//         <div className="text-center">
//             <h3 className="text-white font-semibold text-lg">
//                 Admin
//             </h3>

//             <p className="text-gray-400 text-sm">
//                 Gym Administrator
//             </p>
//         </div>
//     </div>

//     {/* Buttons */}
//     <div className="flex flex-col gap-3">
//         <button
//             className="w-full py-3 rounded-lg bg-cyan-500 text-white font-medium
//             hover:bg-cyan-600 transition"
//         >
//             Manage Profile
//         </button>

//         <button
//             className="w-full py-3 rounded-lg bg-[#E72023] text-white font-medium
//             hover:bg-red-700 transition"
//         >
//             Logout
//         </button>
//     </div>
// </div>

//         {/* here, is the block of notification popup */}
//         <div className={`fixed top-20 right-5 z-50
//         bg-[#0B1625]
//         border border-white
//         rounded-lg
//         p-4
//         w-80 ${notificationPopup?"flex flex-col gap-3":"hidden"}`}>
//     {notifications.length > 0 ? (
//         notifications.map((notification) => (
//             <div
//                 key={notification.id}
//                 className="bg-[#162235] p-3 rounded-lg border border-gray-700 relative"
//             >
//                 <button
//                     className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
//                 >
//                     <XIcon onClick={()=>setNotificationPopup(false)} size={16} />
//                 </button>

//                 <p className="text-white">
//                     {notification.message}
//                 </p>

//                 <p className="text-gray-400 text-xs mt-1">
//                     {new Date(
//                         notification.createdAt
//                     ).toLocaleString()}
//                 </p>
//             </div>
//         ))
//     ) : (
//         <p className="text-gray-400 text-center">
//             No Notifications
//         </p>
//     )}
// </div>

//         </div>
//     )
// }

// export default Layout



import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Plus,
  Bell,
  X,
  Clock3,
} from "lucide-react";

import Logo from "../../assets/Fitness_Beast_Logo.png";
import { sidebarConfig } from "../../assets/hardcoded_content.js/LayoutNavbarConfig.js";

const Layout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const [profileIconPopUp, setProfileIconPopUp] = useState(false);

  const [notificationPopup, setNotificationPopup] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New member joined",
      createdAt: new Date(),
    },
    {
      id: 2,
      message: "Membership expires in 3 days",
      createdAt: new Date(),
    },
  ]);

  const location = useLocation();

  const navigate = useNavigate();

  const currentPage =
    sidebarConfig.find(
      (item) => item.path === location.pathname
    ) || sidebarConfig[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "Test Notification",
          createdAt: new Date(),
        },
        ...prev,
      ]);
    }, 5000);

    return () => clearInterval(interval);
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

  {/* Premium Background */}

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
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >

      {/* Logo */}

      <div className="border-b border-white/10 px-6 py-8 relative">

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

      {/* Navigation */}

      <div className="mt-8 flex flex-col gap-3 px-4">

        {sidebarConfig.map((button) => {

          const Icon = button.icon;

          const active =
            location.pathname === button.path;

          return (

            <button
              key={button.path}
              onClick={() => navigate(button.path)}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300

              ${
                active
                  ? "bg-red-600 shadow-[0_12px_35px_rgba(239,68,68,.35)]"
                  : "hover:bg-white/10"
              }
              `}
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

      {/* Bottom Card */}

      <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-600/20 to-transparent p-5 backdrop-blur-xl">

        <p className="text-sm uppercase tracking-[4px] text-red-400">

          System Status

        </p>

        <h3 className="mt-2 text-xl font-bold">

          All Systems Operational

        </h3>

        <div className="mt-4 flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

          <span className="text-sm text-gray-300">

            Backend Connected

          </span>

        </div>

      </div>

    </div>

    {/* ================= MAIN CONTENT ================= */}

    <div className="flex-1 lg:ml-72">
        {/* ===================== PREMIUM NAVBAR ===================== */}

<div className="sticky top-5 z-40 mx-6 mt-5">

  <div className="flex h-24 items-center justify-between rounded-[28px] border border-white/10 bg-white/5 px-8 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">

    {/* LEFT */}

    <div className="flex flex-1 items-center gap-6">

      <button
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
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

    {/* CENTER SEARCH */}

    {/* <div className="hidden xl:flex">

      <div className="flex h-14 w-[420px] items-center rounded-2xl border border-white/10 bg-black/20 px-5 backdrop-blur-xl">

        <Search
          className="mr-4 text-gray-500"
          size={20}
        />

        <input
          type="text"
          placeholder="Search members, products, invoices..."
          className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
        />

      </div>

    </div> */}

    {/* RIGHT */}

    <div className="flex items-center gap-5">

      {/* TIME */}

      {/* <div className="hidden lg:flex flex-col items-end">

        <div className="flex items-center gap-2">

          <Clock3
            size={18}
            className="text-red-500"
          />

          <span className="text-xl font-bold tracking-wider">

            {time}

          </span>

        </div>

        <span className="text-xs text-gray-400">

          {day} • {date}

        </span>

      </div> */}

      {/* ACTION BUTTON */}

      <button
        onClick={() =>
          navigate(currentPage.actionButtonRoute)
        }
        className="hidden md:flex h-12 items-center gap-3 rounded-2xl bg-red-600 px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_12px_35px_rgba(239,68,68,.4)]"
      >
        {currentPage.actionButton}

        <Plus size={18} />

      </button>

      {/* NOTIFICATION */}

      <div className="relative">

        <button
          onClick={() =>
            setNotificationPopup(!notificationPopup)
          }
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
        >
          <Bell size={20} />
        </button>

        {notifications.length > 0 && (

          <span
            className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-red-600
            px-1
            text-[10px]
            font-bold
            shadow-lg
            "
          >
            {notifications.length}
          </span>

        )}

      </div>

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

<div className="px-6 pb-8 mt-6">

  <Outlet />

</div>
    </div>

                

            {/* profile Icon popup that shows logout and edit info options */}
            {/* ================= PROFILE POPUP ================= */}

<div
  className={`fixed top-24 right-6 z-[60] transition-all duration-300 ${
    profileIconPopUp
      ? "opacity-100 scale-100"
      : "pointer-events-none opacity-0 scale-95"
  }`}
>
  <div className="w-80 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,.55)] overflow-hidden">

    {/* Header */}

    <div className="relative border-b border-white/10 p-6">

      <button
        onClick={() => setProfileIconPopUp(false)}
        className="absolute right-5 top-5 text-gray-400 hover:text-red-400 transition"
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

    {/* Body */}

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
        {/* here, is the block of notification popup */}
        {/* ================= NOTIFICATION POPUP ================= */}

<div
  className={`fixed right-6 top-24 z-[60] transition-all duration-300 ${
    notificationPopup
      ? "opacity-100 scale-100"
      : "pointer-events-none opacity-0 scale-95"
  }`}
>
  <div className="w-[380px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,.55)]">

    {/* Header */}

    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

      <div>

        <h2 className="text-xl font-bold">

          Notifications

        </h2>

        <p className="text-sm text-gray-400">

          Latest updates

        </p>

      </div>

      <button
        onClick={() => setNotificationPopup(false)}
        className="rounded-xl p-2 transition hover:bg-white/10"
      >
        <X size={18} />
      </button>

    </div>

    {/* Body */}

    <div className="max-h-[420px] overflow-y-auto p-5">

      {notifications.length > 0 ? (

        <div className="space-y-4">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/5"
            >

              <div className="flex items-start gap-3">

                <div className="mt-2 h-3 w-3 rounded-full bg-red-500" />

                <div>

                  <p className="font-medium text-white">

                    {notification.message}

                  </p>

                  <p className="mt-2 text-xs text-gray-500">

                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="py-16 text-center">

          <p className="text-gray-400">

            No Notifications

          </p>

        </div>

      )}

    </div>

  </div>
</div>

</div>

</div>

  );
};

export default Layout;