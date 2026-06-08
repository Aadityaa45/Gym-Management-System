import React, { useState } from "react";

const PlanAddForm = () =>{
    const [planData,setPlanData] = useState({
        PlanName:"",
        PlanPrice:"",
        PlanDuration:"",
        PlanFeatures:""
    })

    const onChangeHandler = (e) =>{
        const {name,value} = e.target
        setPlanData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    return(
        <div className="min-h-screen  text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-16">
                Add New Plan
            </h1>

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
                    onChange={onChangeHandler}
                    value={planData.PlanName}
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
                    onChange={onChangeHandler}
                    value={planData.PlanPrice}
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
                    onChange={onChangeHandler}
                    value={planData.PlanDuration}
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
                onChange={onChangeHandler}
                rows={8}
                value={setPlanData.PlanFeatures}
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

    </div>

    )
}

export default PlanAddForm