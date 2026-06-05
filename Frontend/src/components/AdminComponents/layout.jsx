import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Plus, BellIcon, Cross, HomeIcon, UsersIcon, TrainTrackIcon, ShoppingBag } from 'lucide-react'
import Logo from '../../assets/Fitness_Beast_Logo.png'
import { sidebarConfig } from '../../assets/hardcoded_content.js/LayoutNavbarConfig.js'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Layout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    // const [selectedButton, setSelectedButton] = useState(0)  //we have used it in ordet to change the background color or to show the selected button
    const [profileIconPopUp, setProfileIconPopUp] = useState(false)

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
                            <h3 className="font-medium">
                                {currentPage.actionButton}
                            </h3>

                            <Plus className="w-4 h-4" />
                        </div>

                        <BellIcon className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer p-2 rounded-lg" />

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
        </div>
    )
}

export default Layout