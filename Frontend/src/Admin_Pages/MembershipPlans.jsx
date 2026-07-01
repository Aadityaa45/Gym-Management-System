import React, { useState } from "react";
import PlanCard from "../components/AdminComponents/PlanCards";
import { plans } from "../assets/hardcoded_content.js/dummyPlansData";
import { useContext } from "react";
import { gymAppContext } from "../contexts/gymAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getPlanTheme } from "../utils/planthemes";
const MemberShipPlans = () =>{

    const [membershipPlans, setMembershipPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [editPopUp, setEditPopUp] = useState(false);

    const [editPlansData, setEditPlansData] = useState({
        PlanName: "",
        PlanPrice: "",
        PlanDuration: "",
        PlanFeatures: ""
    });

    const {isLoggedIn} = useContext(gymAppContext)
    //---------------------------------------Function to get all the plans from the backend---------------------------------
    const getPlans = async () =>{
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const {data} = await axios.get(
                `${backendUrl}/api/gym/membership-plans`,
                {
                    withCredentials:true
                }
            )
            if(data.success){
                setMembershipPlans(data.plans)
            }
        } catch (error) {
            return toast.error("Something went wrong")
        }
    }

    //--------------------------------------Useffect hook to fetch the plans data whenever page renders-------------------
    useEffect(()=>{
        if(isLoggedIn){
            getPlans()
        }
    },[isLoggedIn])

    const HandleOnChangeEdit = (e) =>{
        const {name,value} = e.target
        setEditPlansData((prev)=>({
            ...prev,
            [name]:value
        }))
    }


return (
    <div className="flex flex-wrap gap-8 justify-center mt-20">

        {/* {membershipPlans.map((plan) => (
            <PlanCard
                key={plan._id}
                {...plan}
                onEdit={() => {
                    //HERE WE HAVE TO UPDATE THE FATA OF EDITFORMDATA STATE
                    setEditPlansData({
                        PlanName:plan.name,
                        PlanPrice:plan.price,
                        PlanDuration:plan.durationInDays,
                        PlanFeatures:plan.features
                    })
                    setSelectedPlan(plan);
                    setEditPopUp(true);
                }}
            />
        ))} */}
        {membershipPlans.map((plan,index)=>{

    const {
        accentColor,
        icon
    } = getPlanTheme(index);

    return(

        <PlanCard
            key={plan._id}

            {...plan}

            accentColor={accentColor}

            icon={icon}

            onEdit={()=>{
                //HERE WE HAVE TO UPDATE THE FATA OF EDITFORMDATA STATE
                    setEditPlansData({
                        PlanName:plan.name,
                        PlanPrice:plan.price,
                        PlanDuration:plan.durationInDays,
                        PlanFeatures:plan.features
                    })
                    setSelectedPlan(plan);
                    setEditPopUp(true);
            }}

        />

    )

})}

        {/* edit plans popup section */}
        <div
    className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-md ${
        editPopUp ? "flex items-center justify-center" : "hidden"
    }`}
>
    <div className="relative w-[90%] md:w-[70%] lg:w-[55%] bg-[#0B1625] border border-gray-700 rounded-2xl p-8 shadow-2xl">

        {/* Close Button */}
        <button
            onClick={() => setEditPopUp(false)}
            className="
                absolute top-4 right-4
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-red-500/20
                text-red-400
                hover:bg-red-500
                hover:text-white
                transition-all
            "
        >
            ✕
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-8">
            Edit Membership Plan
        </h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Plan Title */}
            <div className="flex flex-col gap-2">
                <label className="text-gray-300">
                    Plan Name
                </label>

                <input
                    type="text"
                    name="PlanName"
                    onChange={HandleOnChangeEdit}
                    value={editPlansData.PlanName}
                    className="
                        bg-[#162235]
                        border border-gray-700
                        rounded-lg
                        p-3
                        text-white
                        outline-none
                    "
                />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
                <label className="text-gray-300">
                    Price
                </label>

                <input
                    type="number"
                    name="PlanPrice"
                    onChange={HandleOnChangeEdit}
                    value={editPlansData.PlanPrice}
                    className="
                        bg-[#162235]
                        border border-gray-700
                        rounded-lg
                        p-3
                        text-white
                        outline-none
                    "
                />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
                <label className="text-gray-300">
                    Duration
                </label>

                <input
                    type="text"
                    name="PlanDuration"
                    onChange={HandleOnChangeEdit}
                    value={editPlansData.PlanDuration}
                    className="
                        bg-[#162235]
                        border border-gray-700
                        rounded-lg
                        p-3
                        text-white
                        outline-none
                    "
                />
            </div>

            

        </div>

        {/* Features */}
        <div className="mt-8">
            <label className="text-gray-300 block mb-3">
                Features (One Per Line)
            </label>

            <textarea
                name="PlanFeatures"
                onChange={HandleOnChangeEdit}
                rows={8}
                value={editPlansData.PlanFeatures}
                className="
                    w-full
                    bg-[#162235]
                    border border-gray-700
                    rounded-lg
                    p-4
                    text-white
                    outline-none
                    resize-none
                "
            />
        </div>

        

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">

            <button
                onClick={() => setEditPopUp(false)}
                className="
                    px-6 py-3
                    rounded-lg
                    border border-gray-600
                    text-gray-300
                    hover:bg-gray-800
                    transition
                "
            >
                Cancel
            </button>

            <button
                className="
                    px-8 py-3
                    rounded-lg
                    bg-[#E72023]
                    text-white
                    hover:bg-red-700
                    transition
                    font-semibold
                "
            >
                Save Changes
            </button>

        </div>
    </div>
</div>

    </div>
);
}

export default MemberShipPlans