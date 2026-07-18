// // import React from "react";
// // import {useState} from "react";
// // import toast from "react-hot-toast"
// // import axios from "axios"
// // import {useNavigate} from "react-router-dom"
// // import validatePlanFields from "../utils/validatePlanfields"
// // const AddNewPlan = () =>{
// //     const navigate = useNavigate()
// //     const [planData, setPlanData] = useState({
// //         name: "",
// //         price: "",
// //         durationInDays: "",
// //         features:"", //in backend we only allowing features to be array but in our textarea we will be taking input as string and then we will convert this feature into array 
// //         description: "",
// //     });
// //     const [errors, setErrors] = useState({
// //     name: "",
// //     price: "",
// //     durationInDays: "",
// //     description: "",
// //     features: ""
// // });

// //     const handleInputChange = (e) =>{
// //         const {name,value} = e.target
// //         setPlanData((prev)=>({
// //             ...prev,
// //             [name]:value
// //         }))

// //         const error = validatePlanFields(name,value)
// //         setErrors((prev)=>({
// //             ...prev,
// //             [name]:error
// //         }))
// //     }

// //     const handleSubmit = async () =>{
// //         const newErrors = {
// //         name: validatePlanFields("name", planData.name),
// //         price: validatePlanFields("price", planData.price),
// //         durationInDays: validatePlanFields("durationInDays", planData.durationInDays),
// //         description: validatePlanFields("description", planData.description),
// //         features: validatePlanFields("features", planData.features),
// //     };

// //     setErrors(newErrors);

// //     if (Object.values(newErrors).some(error => error !== "")) {
// //         return toast.error("Please fix the validation errors.");
// //     }
// //         try{

        
// //             //here firt we will create the payload an in that we will convert feature string into array
// //             const payLoad = {
// //                 ...planData,
// //                 features:planData.features.split('\n')
// //                 .map((features=>features.trim())) //this will remove the spaces from each entry
// //                 .filter((feature)=>feature!=="")//this will remove the empty entries or blank lines from the array
// //             }

// //             const backendUrl = import.meta.env.VITE_BACKEND_URL;
// //             const response = await axios.post(
// //                 `${backendUrl}/api/gym/new-plan`,
// //                 payLoad,
// //                 {
// //                     withCredentials:true
// //                 }
// //             )

// //             if(response.data.success){
// //                 toast.success("Plan added successfully")
// //                 navigate("/admin/membership-plans")
// //             }

            

// //         }catch{
// //             toast.error("Something went wrong! Please Try Again")
// //         }
// //     }



// //     return(
// //         <div className="min-h-screen bg-[#07111f] text-white px-10 py-8">

// //     <div className="max-w-6xl mx-auto">

// //         <h1 className="text-4xl font-bold">
// //             Add Membership Plan
// //         </h1>

// //         <p className="text-gray-400 mt-2 mb-10">
// //             Create a new membership plan for your gym.
// //         </p>

// //         <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8">

// //             {/* Row 1 */}

// //             <div className="grid grid-cols-2 gap-8">

// //                 <div>

// //                     <label className="text-gray-300 block mb-2">
// //                         Plan Name
// //                     </label>

// //                     <input
// //                         name="name"
// //                         value={planData.name}
// //                         onChange={handleInputChange}
// //                         placeholder="Gold Membership"
// //                         className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
// //         ${errors.name ? "border border-red-500" : "border border-gray-700"}
// //     `}
// //                     />
// //                     {errors.name && (
// //     <p className="text-red-500 text-sm mt-1">
// //         {errors.name}
// //     </p>
// // )}

// //                 </div>

// //                 <div>

// //                     <label className="text-gray-300 block mb-2">
// //                         Price (₹)
// //                     </label>

// //                     <input
// //                         type="number"
// //                         name="price"
// //                         value={planData.price}
// //                         onChange={handleInputChange}
// //                         placeholder="5000"
// //                         className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
// //         ${errors.price ? "border border-red-500" : "border border-gray-700"}
// //     `}
// //                     />
// //                     {errors.price && (
// //     <p className="text-red-500 text-sm mt-1">
// //         {errors.price}
// //     </p>
// // )}

// //                 </div>

// //             </div>

// //             {/* Row 2 */}

// //             <div className="grid grid-cols-2 gap-8 mt-8">

// //                 <div>

// //                     <label className="text-gray-300 block mb-2">
// //                         Duration (Days)
// //                     </label>

// //                     <input
// //                         type="number"
// //                         name="durationInDays"
// //                         value={planData.durationInDays}
// //                         onChange={handleInputChange}
// //                         placeholder="90"
// //                         className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
// //         ${errors.durationInDays ? "border border-red-500" : "border border-gray-700"}
// //     `}
// //                     />
// //                     {errors.durationInDays && (
// //     <p className="text-red-500 text-sm mt-1">
// //         {errors.durationInDays}
// //     </p>
// // )}

// //                 </div>

// //                 <div>

// //                     <label className="text-gray-300 block mb-2">
// //                         Description
// //                     </label>

// //                     <input
// //                         name="description"
// //                         value={planData.description}
// //                         onChange={handleInputChange}
// //                         placeholder="Premium Membership Plan"
// //                         className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
// //         ${errors.description ? "border border-red-500" : "border border-gray-700"}
// //     `}
// //                     />
// //                     {errors.description && (
// //     <p className="text-red-500 text-sm mt-1">
// //         {errors.description}
// //     </p>
// // )}

// //                 </div>

// //             </div>

// //             {/* Features */}

// //             <div className="mt-8">

// //                 <label className="text-gray-300 block mb-2">
// //                     Features
// //                 </label>

// //                 <textarea
// //                     rows={8}
// //                     name="features"
// //                     value={planData.features}
// //                     onChange={handleInputChange}
// //                     placeholder={`Unlimited Gym Access
// // Locker Facility
// // Steam Bath
// // Personal Trainer`}
// //                     className={`w-full rounded-xl bg-[#0B1320] border border-gray-700 p-4 outline-none resize-none focus:border-red-500
// //         ${errors.features ? "border border-red-500" : "border border-gray-700"}
// //     `}
// //                 />
// //                 {errors.features && (
// //     <p className="text-red-500 text-sm mt-1">
// //         {errors.features}
// //     </p>
// // )}

// //                 <p className="text-gray-500 text-sm mt-2">
// //                     Enter one feature per line.
// //                 </p>

// //             </div>

// //             {/* Buttons */}

// //             {/* <div>

// //                 <button
// //                     onClick={() => navigate("/admin/membership-plans")}
// //                     className="px-8 h-12 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
// //                 >
// //                     Cancel
// //                 </button>

// //                 <button
// //                     onClick={handleSubmit}
// //                     className="px-10 h-12 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold"
// //                 >
// //                     Add Plan
// //                 </button>

// //             </div> */}
// //             <div className="flex justify-end gap-4 mt-10">
// //     <button
// //         onClick={() => navigate("/admin/membership-plans")}
// //         className="px-8 h-12 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
// //     >
// //         Cancel
// //     </button>

// //     <button
// //         onClick={handleSubmit}
// //         className="px-10 h-12 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold"
// //     >
// //         Add Plan
// //     </button>
// // </div>

// //         </div>

// //     </div>
    

// // </div>
// //     )
// // }


import React, { useState } from "react";
import {
    BadgePlus,
    Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validatePlanFields from "../utils/validatePlanFields";

const PlanAddForm = () => {

    const navigate = useNavigate();

    // =========================
    // Form Data
    // =========================

    const [planData, setPlanData] = useState({
        name: "",
        price: "",
        durationInDays: "",
        description: "",
        features: "",
    });

    // =========================
    // Validation Errors
    // =========================

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        durationInDays: "",
        description: "",
        features: "",
    });

    // =========================
    // Input Change
    // =========================

    const onChangeHandler = (e) => {

        const { name, value } = e.target;

        setPlanData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const error = validatePlanFields(name, value);

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async () => {

        const newErrors = {

            name: validatePlanFields("name", planData.name),

            price: validatePlanFields("price", planData.price),

            durationInDays: validatePlanFields(
                "durationInDays",
                planData.durationInDays
            ),

            description: validatePlanFields(
                "description",
                planData.description
            ),

            features: validatePlanFields(
                "features",
                planData.features
            ),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== "")) {
            return toast.error("Please fix all validation errors.");
        }

        try {

            const payload = {

                ...planData,

                features: planData.features
                    .split("\n")
                    .map((feature) => feature.trim())
                    .filter((feature) => feature !== ""),
            };

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.post(
                `${backendUrl}/api/gym/new-plan`,
                payload,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {

                toast.success("Plan Added Successfully");

                navigate("/admin/membership-plans");
            }

        } catch (error) {

            toast.error("Something went wrong! Please Try Again");

        }
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
        name="name"
        value={planData.name}
        onChange={onChangeHandler}
        placeholder="Premium Elite"
        className={`
            h-14
            w-full
            rounded-2xl
            border
            px-5
            text-white
            placeholder:text-gray-500
            outline-none
            backdrop-blur-xl
            transition-all
            duration-300
            bg-black/20
            ${
                errors.name
                    ? "border-red-500"
                    : "border-white/10 focus:border-red-500"
            }
            focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
        `}
    />

    {errors.name && (
        <p className="text-sm text-red-500">
            {errors.name}
        </p>
    )}

</div>

{/* Price */}

<div className="space-y-3">

    <label className="text-sm font-medium text-gray-300">
        Membership Fee
    </label>

    <input
        type="number"
        name="price"
        value={planData.price}
        onChange={onChangeHandler}
        placeholder="1999"
        className={`
            h-14
            w-full
            rounded-2xl
            border
            px-5
            text-white
            placeholder:text-gray-500
            outline-none
            backdrop-blur-xl
            transition-all
            duration-300
            bg-black/20
            ${
                errors.price
                    ? "border-red-500"
                    : "border-white/10 focus:border-red-500"
            }
            focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
        `}
    />

    {errors.price && (
        <p className="text-sm text-red-500">
            {errors.price}
        </p>
    )}

</div>

{/* Duration */}

<div className="space-y-3">

    <label className="text-sm font-medium text-gray-300">
        Duration (Days)
    </label>

    <input
        type="number"
        name="durationInDays"
        value={planData.durationInDays}
        onChange={onChangeHandler}
        placeholder="30"
        className={`
            h-14
            w-full
            rounded-2xl
            border
            px-5
            text-white
            placeholder:text-gray-500
            outline-none
            backdrop-blur-xl
            transition-all
            duration-300
            bg-black/20
            ${
                errors.durationInDays
                    ? "border-red-500"
                    : "border-white/10 focus:border-red-500"
            }
            focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
        `}
    />

    {errors.durationInDays && (
        <p className="text-sm text-red-500">
            {errors.durationInDays}
        </p>
    )}

</div>

{/* Description */}

<div className="space-y-3">

    <label className="text-sm font-medium text-gray-300">
        Description
    </label>

    <input
        type="text"
        name="description"
        value={planData.description}
        onChange={onChangeHandler}
        placeholder="Premium Membership Plan"
        className={`
            h-14
            w-full
            rounded-2xl
            border
            px-5
            text-white
            placeholder:text-gray-500
            outline-none
            backdrop-blur-xl
            transition-all
            duration-300
            bg-black/20
            ${
                errors.description
                    ? "border-red-500"
                    : "border-white/10 focus:border-red-500"
            }
            focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
        `}
    />

    {errors.description && (
        <p className="text-sm text-red-500">
            {errors.description}
        </p>
    )}

</div>

{/* Features */}

<div className="space-y-3">

    <label className="text-sm font-medium text-gray-300">
        Plan Features
    </label>

    <textarea
        rows={8}
        name="features"
        value={planData.features}
        onChange={onChangeHandler}
        placeholder={`Unlimited Gym Access
Personal Trainer
Locker Facility
Steam Bath
Cardio Zone`}
        className={`
            w-full
            resize-none
            rounded-3xl
            border
            p-6
            text-white
            placeholder:text-gray-500
            outline-none
            backdrop-blur-xl
            transition-all
            duration-300
            bg-black/20
            ${
                errors.features
                    ? "border-red-500"
                    : "border-white/10 focus:border-red-500"
            }
            focus:shadow-[0_0_25px_rgba(239,68,68,.18)]
        `}
    />

    {errors.features && (
        <p className="text-sm text-red-500">
            {errors.features}
        </p>
    )}

    <p className="text-sm text-gray-500">
        Enter one feature per line.
    </p>

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
                                    card after submission.
                                </p>

                            </div>

                            <div className="flex gap-4">

                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/membership-plans")}
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
                                    type="button"
                                    onClick={handleSubmit}
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

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-xs uppercase tracking-[4px] text-red-400">
                                        Fitness Beast
                                    </p>

                                    <h3 className="mt-2 text-3xl font-black">
                                        {planData.name || "Premium Elite"}
                                    </h3>

                                </div>

                                <div className="rounded-2xl bg-red-600/20 p-4">

                                    <Sparkles
                                        className="text-red-500"
                                        size={28}
                                    />

                                </div>

                            </div>

                            <div className="mt-10">

                                <h1 className="text-6xl font-black text-red-500">
                                    ₹{planData.price || "0"}
                                </h1>

                                <p className="mt-2 text-lg text-gray-400">
                                    {planData.durationInDays || "0"} Days Membership
                                </p>

                            </div>

                            <div className="my-8 h-px bg-gradient-to-r from-red-500/30 via-white/10 to-transparent" />

                            <div className="space-y-4">

                                {(planData.features
                                    ? planData.features.split("\n")
                                    : [
                                          "Unlimited Gym Access",
                                          "Locker Facility",
                                          "Steam Bath",
                                          "Personal Trainer",
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
                    