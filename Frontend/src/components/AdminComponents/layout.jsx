import React, { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Plus, BellIcon, Cross, HomeIcon, UsersIcon, TrainTrackIcon, ShoppingBag, XIcon } from 'lucide-react'
import Logo from '../../assets/Fitness_Beast_Logo.png'
import { sidebarConfig } from '../../assets/hardcoded_content.js/LayoutNavbarConfig.js'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {io} from "socket.io-client"

const Layout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    // const [selectedButton, setSelectedButton] = useState(0)  //we have used it in ordet to change the background color or to show the selected button
    const [profileIconPopUp, setProfileIconPopUp] = useState(false)
    const [notificationPopup,setNotificationPopup] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    // const SideBarButtons = [
    //     {name:"Dashboard",icon:HomeIcon},
    //     {name:"Members",icon:UsersIcon},
    //     {name:"Membership Plans",icon:TrainTrackIcon},
    //     {name:"Products",icon:ShoppingBag},
    //     {name:"Competitions",icon:TrainTrackIcon},
    //     {name:"Diet Plans",icon:TrainTrackIcon},
    //     {name:"Billed/Invoices",icon:TrainTrackIcon},
    // ]

    const currentPage =
  sidebarConfig.find(
    (item) => item.path === location.pathname
  ) || sidebarConfig[0];

    //implementing the realtime notification and number of notifications on the bell icon
    //here we have two approaches at the time of page load we update the set of notification by useffecting the logs data on ui change 
    //another option is that instead of just implementing the effect once we should call that from backend after sometimes check that existing notiification array has the same elements or not 
    //another option is we can use socket.io 
    // WebSocket ek protocol hai jo client aur server ke beech permanent two-way connection banata hai. Socket.IO us protocol ke upar bana hua ek library/framework hai jo reconnect, rooms, events, broadcasting jaise features provide karke WebSocket ko use karna bahut aasan bana deta hai.
    // we will be using socket.io here so we will update our notification functionality accordingly

    const [notifications, setNotifications] = useState([
    {
        id: 1,
        message: "New member joined",
        createdAt: new Date()
    },
    {
        id: 2,
        message: "Membership expires in 3 days",
        createdAt: new Date()
    }
]);

    useEffect(() => {

    const interval = setInterval(() => {

        setNotifications(prev => [
            {
                id: Date.now(),
                message: "Test Notification",
                createdAt: new Date()
            },
            ...prev
        ]);

    }, 5000);

    return () => clearInterval(interval);

}, []);  //this is for now for frontend testing later we will going to replace it with our socket io code

    // useEffect(()=>{
    //     socket.on("new-notification",(notification)=>{
    //         setNotifications(prev=>[
    //             notification,
    //             ...prev
    //         ])
    //     });
    //     return()=>{
    //         socket.off("new-notification")
    //     }
    // },[])
    // currently this wont work as we didnot connected our backend and due to which it is giving the errorfor now we are just implementing the dummy notifications as of now

    return (
        <div className="flex min-h-screen">

            {/* Sidebar Section */}
            <div
                className={`fixed top-0 left-0 z-50 bg-[#0B1625] h-screen shadow w-64 transition-transform duration-300 ${
                    isSideBarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                {/* logo and cross section */}
                {/* logo and cross section */}
                <div className="relative w-full py-4 border-b border-gray-700">

                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-30 h-auto mx-auto"
                    />

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl lg:hidden"
                        onClick={() => setIsSideBarOpen(false)}
                    >
                        X
                    </button>

                </div>

                {/* sidebar buttons section */}
                <div className='mt-8 flex flex-col items-center justify-between gap-5'>
                    {sidebarConfig.map((button)=>{
                        const Icon = button.icon
                        return(
                            <button key={button.path} onClick={()=>navigate(button.path)} className={`w-[80%] cursor-pointer flex items-center gap-3 p-3 rounded-lg tranisition-all border
                                ${location.pathname==button.path?"bg-[#E72023] text-white border-white rounded-lg":"bg-none text-white border-white rounded-lg"}
                            `}>
                                <Icon size={20}/>
                                <span>{button.name}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">

                {/* Navbar Section */}
                <div className=" w-full h-24 flex items-center justify-between px-4">

                    <Menu
                        className="w-6 h-6 cursor-pointer text-white lg:hidden"
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    />

                    <div className="flex flex-col gap-1 flex-1 lg:flex-none lg:ml-0 ml-4">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                            {currentPage.heading}
                        </h1>

                        <p className="text-xs sm:text-sm text-gray-300">
                            {currentPage.subHeading}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5 lg:gap-7">

                        <div
                            className="
                                hidden
                                sm:flex
                                items-center
                                gap-2
                                bg-[#E72023]
                                text-white
                                px-3
                                sm:px-5
                                py-2
                                sm:py-3
                                rounded-lg
                                cursor-pointer
                                hover:opacity-90
                                transition
                            "
                        >
                            <h3 onClick={()=>navigate('/admin/registration')} className="font-medium">
                                {currentPage.actionButton}
                            </h3>

                            <Plus className="w-4 h-4" />
                        </div>

                        {/* <BellIcon onClick={()=>setNotificationPopup(!notificationPopup)} className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer p-2 rounded-lg" /> */}
                        <div className="relative">
    
    <BellIcon
        onClick={() => setNotificationPopup(!notificationPopup)}
        className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer p-2 rounded-lg"
    />

    {notifications.length > 0 && (
        <span
            className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-[10px]
                font-bold
                min-w-5
                h-5
                px-1
                rounded-full
                flex
                items-center
                justify-center
            "
        >
            {notifications.length}
        </span>
    )}

</div>

                        <div onClick={()=>setProfileIconPopUp(true)} className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer rounded-full"></div>

                    </div>

                </div>

                {/* Page Content */}
                <Outlet />

            </div>

            {/* profile Icon popup that shows logout and edit info options */}
            <div
    className={`bg-[#0B1625] mt-5 mr-3 fixed right-0 top-0 rounded-xl border border-cyan-400
    
    z-50
    ${
        profileIconPopUp
            ? "flex flex-col w-72 p-5"
            : "hidden"
    }`}
>
    {/* Close Button */}
    <button
        onClick={() => setProfileIconPopUp(false)}
        className="self-end text-white text-lg hover:text-red-500 transition"
    >
        ✕
    </button>

    {/* Profile Section */}
    <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-16 h-16 rounded-full bg-[#E72023] flex items-center justify-center text-white text-xl font-bold">
            A
        </div>

        <div className="text-center">
            <h3 className="text-white font-semibold text-lg">
                Admin
            </h3>

            <p className="text-gray-400 text-sm">
                Gym Administrator
            </p>
        </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col gap-3">
        <button
            className="w-full py-3 rounded-lg bg-cyan-500 text-white font-medium
            hover:bg-cyan-600 transition"
        >
            Manage Profile
        </button>

        <button
            className="w-full py-3 rounded-lg bg-[#E72023] text-white font-medium
            hover:bg-red-700 transition"
        >
            Logout
        </button>
    </div>
</div>

        {/* here, is the block of notification popup */}
        <div className={`fixed top-20 right-5 z-50
        bg-[#0B1625]
        border border-white
        rounded-lg
        p-4
        w-80 ${notificationPopup?"flex flex-col gap-3":"hidden"}`}>
    {notifications.length > 0 ? (
        notifications.map((notification) => (
            <div
                key={notification.id}
                className="bg-[#162235] p-3 rounded-lg border border-gray-700 relative"
            >
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                >
                    <XIcon onClick={()=>setNotificationPopup(false)} size={16} />
                </button>

                <p className="text-white">
                    {notification.message}
                </p>

                <p className="text-gray-400 text-xs mt-1">
                    {new Date(
                        notification.createdAt
                    ).toLocaleString()}
                </p>
            </div>
        ))
    ) : (
        <p className="text-gray-400 text-center">
            No Notifications
        </p>
    )}
</div>

        </div>
    )
}

export default Layout