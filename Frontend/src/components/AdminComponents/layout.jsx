import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Plus, BellIcon, Cross, HomeIcon, UsersIcon, TrainTrackIcon, ShoppingBag } from 'lucide-react'
import Logo from '../../assets/Fitness_Beast_Logo.png'

const Layout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [selectedButton, setSelectedButton] = useState(0)
    const [profileIconPopUp, setProfileIconPopUp] = useState(false)

    const SideBarButtons = [
        {name:"Dashboard",icon:HomeIcon},
        {name:"Members",icon:UsersIcon},
        {name:"Membership Plans",icon:TrainTrackIcon},
        {name:"Products",icon:ShoppingBag},
        {name:"Competitions",icon:TrainTrackIcon},
        {name:"Diet Plans",icon:TrainTrackIcon},
        {name:"Billed/Invoices",icon:TrainTrackIcon},
    ]

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
                    {SideBarButtons.map((button,index)=>{
                        const Icon = button.icon
                        return(
                            <button key={index} onClick={()=>setSelectedButton(index)} className={`w-[80%] flex items-center gap-3 p-3 rounded-lg tranisition-all border
                                ${selectedButton==index?"bg-[#E72023] text-white border-white rounded-lg":"bg-none text-white border-white rounded-lg"}
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
                            Welcome Back, Admin
                        </h1>

                        <p className="text-xs sm:text-sm text-gray-300">
                            Here's how your gym is performing
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
                                Add Member
                            </h3>

                            <Plus className="w-4 h-4" />
                        </div>

                        <BellIcon className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer p-2 rounded-lg" />

                        <div className="bg-[#E72023] w-10 h-10 sm:w-11 sm:h-11 text-white cursor-pointer rounded-full"></div>

                    </div>

                </div>

                {/* Page Content */}
                <Outlet />

            </div>

        </div>
    )
}

export default Layout