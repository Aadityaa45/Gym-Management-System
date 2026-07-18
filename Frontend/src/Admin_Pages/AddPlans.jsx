// import React, { useState } from "react";

// const PlanAddForm = () =>{
//     const [planData,setPlanData] = useState({
//         PlanName:"",
//         PlanPrice:"",
//         PlanDuration:"",
//         PlanFeatures:""
//     })

//     const onChangeHandler = (e) =>{
//         const {name,value} = e.target
//         setPlanData((prev)=>({
//             ...prev,
//             [name]:value
//         }))
//     }
//     return(
//         <div className="min-h-screen  text-white p-8">
//             <h1 className="text-4xl font-bold text-center mb-16">
//                 Add New Plan
//             </h1>

//         {/* Form */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Plan Title */}
//             <div className="flex flex-col gap-2">
//                 <label className="text-gray-300">
//                     Plan Name
//                 </label>

//                 <input
//                     type="text"
//                     name="PlanName"
//                     onChange={onChangeHandler}
//                     value={planData.PlanName}
//                     className="
//                         bg-[#162235]
//                         border border-gray-700
//                         rounded-lg
//                         p-3
//                         text-white
//                         outline-none
//                     "
//                 />
//             </div>

//             {/* Price */}
//             <div className="flex flex-col gap-2">
//                 <label className="text-gray-300">
//                     Price
//                 </label>

//                 <input
//                     type="number"
//                     name="PlanPrice"
//                     onChange={onChangeHandler}
//                     value={planData.PlanPrice}
//                     className="
//                         bg-[#162235]
//                         border border-gray-700
//                         rounded-lg
//                         p-3
//                         text-white
//                         outline-none
//                     "
//                 />
//             </div>

//             {/* Duration */}
//             <div className="flex flex-col gap-2">
//                 <label className="text-gray-300">
//                     Duration
//                 </label>

//                 <input
//                     type="text"
//                     name="PlanDuration"
//                     onChange={onChangeHandler}
//                     value={planData.PlanDuration}
//                     className="
//                         bg-[#162235]
//                         border border-gray-700
//                         rounded-lg
//                         p-3
//                         text-white
//                         outline-none
//                     "
//                 />
//             </div>

            

//         </div>

//         {/* Features */}
//         <div className="mt-8">
//             <label className="text-gray-300 block mb-3">
//                 Features (One Per Line)
//             </label>

//             <textarea
//                 name="PlanFeatures"
//                 onChange={onChangeHandler}
//                 rows={8}
//                 value={setPlanData.PlanFeatures}
//                 className="
//                     w-full
//                     bg-[#162235]
//                     border border-gray-700
//                     rounded-lg
//                     p-4
//                     text-white
//                     outline-none
//                     resize-none
//                 "
//             />
//         </div>

//     </div>

//     )
// }

// export default PlanAddForm
import React, { useState } from "react";
import {
    BadgePlus,
    CreditCard,
    CalendarDays,
    ClipboardList,
    Sparkles,
} from "lucide-react";

const PlanAddForm = () => {

    const [planData, setPlanData] = useState({
        PlanName: "",
        PlanPrice: "",
        PlanDuration: "",
        PlanFeatures: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setPlanData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (

<div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

    {/* Background */}

    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#090909] to-[#050505]" />

    <div className="absolute -left-44 top-0 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-[180px]" />

    <div className="absolute -right-44 bottom-0 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-[180px]" />

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

    <div className="relative z-10 px-8 py-10">

        {/* Header */}

        <div className="mb-12">

            <p className="text-sm uppercase tracking-[5px] text-red-500">

                Fitness Beast

            </p>

            <h1 className="mt-3 text-5xl font-black tracking-wide">

                Create Membership Plan

            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-gray-400">

                Design premium membership plans with pricing,
                duration and exclusive benefits.
                Every plan becomes instantly available
                for new member registrations.

            </p>

        </div>

        {/* Main Container */}

        <div
            className="
                overflow-hidden
                rounded-[34px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-3xl
                shadow-[0_35px_90px_rgba(0,0,0,.6)]
            "
        >

            <div className="grid xl:grid-cols-[2fr_1fr]">

                {/* LEFT PANEL */}

                <div className="p-10">

                    <div className="mb-10 flex items-center gap-4">

                        <div className="rounded-2xl bg-red-600/20 p-4">

                            <BadgePlus
                                className="text-red-500"
                                size={26}
                            />

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold">

                                Membership Information

                            </h2>

                            <p className="mt-1 text-gray-400">

                                Configure every detail of your membership plan.

                            </p>

                        </div>

                    </div>

                    <form className="space-y-8">

                        {/* Plan Name */}

                        <div className="space-y-3">

                            <label className="text-sm font-medium text-gray-300">

                                Plan Name

                            </label>

                            <input
                                type="text"
                                name="PlanName"
                                value={planData.PlanName}
                                onChange={onChangeHandler}
                                placeholder="Premium Elite"
                                className="
                                    h-14
                                    w-full
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    px-5
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    focus:border-red-500
                                    focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
                                "
                            />

                        </div>

                        {/* Price */}

                        <div className="space-y-3">

                            <label className="text-sm font-medium text-gray-300">

                                Membership Fee

                            </label>

                            <input
                                type="number"
                                name="PlanPrice"
                                value={planData.PlanPrice}
                                onChange={onChangeHandler}
                                placeholder="₹1999"
                                className="
                                    h-14
                                    w-full
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    px-5
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    focus:border-red-500
                                    focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
                                "
                            />

                        </div>
                                                {/* Duration */}

                        <div className="space-y-3">

                            <label className="text-sm font-medium text-gray-300">

                                Duration (Days)

                            </label>

                            <input
                                type="number"
                                name="PlanDuration"
                                value={planData.PlanDuration}
                                onChange={onChangeHandler}
                                placeholder="30"
                                className="
                                    h-14
                                    w-full
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    px-5
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    focus:border-red-500
                                    focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
                                "
                            />

                        </div>

                        {/* Features */}

                        <div className="space-y-3">

                            <label className="text-sm font-medium text-gray-300">

                                Plan Features

                            </label>

                            <textarea
                                rows={8}
                                name="PlanFeatures"
                                value={planData.PlanFeatures}
                                onChange={onChangeHandler}
                                placeholder={`Unlimited Gym Access
Personal Trainer
Locker Facility
Steam Bath
Cardio Zone`}
                                className="
                                    w-full
                                    resize-none
                                    rounded-3xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    p-6
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    focus:border-red-500
                                    focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
                                "
                            />

                        </div>

                        {/* Bottom Buttons */}

                        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">

                            <div>

                                <p className="font-semibold text-gray-300">

                                    💡 Pro Tip

                                </p>

                                <p className="mt-2 max-w-md text-sm leading-7 text-gray-400">

                                    Write one feature per line.
                                    Each line will automatically become
                                    a bullet point inside the membership
                                    plan card.

                                </p>

                            </div>

                            <div className="flex gap-4">

                                <button
                                    type="button"
                                    className="
                                        h-14
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-white/5
                                        px-8
                                        font-medium
                                        transition-all
                                        duration-300
                                        hover:bg-white/10
                                    "
                                >

                                    Cancel

                                </button>

                                <button
                                    type="submit"
                                    className="
                                        group
                                        flex
                                        h-14
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        bg-gradient-to-r
                                        from-red-600
                                        to-red-500
                                        px-10
                                        text-lg
                                        font-semibold
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-[0_20px_45px_rgba(239,68,68,.35)]
                                    "
                                >

                                    Create Plan

                                    <span className="transition-transform duration-300 group-hover:translate-x-2">

                                        →

                                    </span>

                                </button>

                            </div>

                        </div>

                    </form>

                </div>

                {/* RIGHT PANEL */}

                <div className="border-l border-white/10 bg-black/20 p-8">

                    <div className="sticky top-10">
                                                <p className="text-sm uppercase tracking-[4px] text-red-500">

                            Live Preview

                        </p>

                        <h2 className="mt-2 text-3xl font-bold">

                            Membership Card

                        </h2>

                        <div
                            className="
                                mt-8
                                overflow-hidden
                                rounded-[32px]
                                border
                                border-red-500/20
                                bg-gradient-to-br
                                from-red-600/15
                                via-black/40
                                to-black/70
                                p-8
                                shadow-[0_25px_60px_rgba(239,68,68,.15)]
                            "
                        >

                            {/* Premium Badge */}

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-xs uppercase tracking-[4px] text-red-400">

                                        Fitness Beast

                                    </p>

                                    <h3 className="mt-2 text-3xl font-black">

                                        {planData.PlanName || "Premium Elite"}

                                    </h3>

                                </div>

                                <div className="rounded-2xl bg-red-600/20 p-4">

                                    <Sparkles
                                        className="text-red-500"
                                        size={28}
                                    />

                                </div>

                            </div>

                            {/* Price */}

                            <div className="mt-10">

                                <h1 className="text-6xl font-black text-red-500">

                                    ₹{planData.PlanPrice || "0"}

                                </h1>

                                <p className="mt-2 text-lg text-gray-400">

                                    {planData.PlanDuration || "0"} Days Membership

                                </p>

                            </div>

                            {/* Divider */}

                            <div className="my-8 h-px bg-gradient-to-r from-red-500/30 via-white/10 to-transparent" />

                            {/* Features */}

                            <div className="space-y-4">

                                {(planData.PlanFeatures
                                    ? planData.PlanFeatures.split("\n")
                                    : [
                                          "Unlimited Gym Access",
                                          "Personal Trainer",
                                          "Cardio Zone",
                                          "Steam Bath",
                                          "Locker Facility",
                                      ]
                                ).map((feature, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >

                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20">

                                            ✓

                                        </div>

                                        <span className="text-gray-300">

                                            {feature}

                                        </span>

                                    </div>

                                ))}

                            </div>

                            {/* Footer */}

                            <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-xs uppercase tracking-[3px] text-gray-500">

                                            Status

                                        </p>

                                        <h4 className="mt-1 font-semibold text-green-400">

                                            Ready To Publish

                                        </h4>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-[3px] text-gray-500">

                                            Created For

                                        </p>

                                        <h4 className="mt-1 font-semibold">

                                            Fitness Beast

                                        </h4>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                                        </div>

                </div>

            </div>

        </div>

    </div>


    );
};

export default PlanAddForm;