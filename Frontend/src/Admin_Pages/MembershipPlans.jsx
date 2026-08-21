
import React, { useState, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    Plus,
    Sparkles,
    Pencil,
    X,
    BadgePlus,
    CreditCard,
    CalendarDays,
    ClipboardList
} from "lucide-react";

import PlanCard from "../components/AdminComponents/PlanCards";
import { gymAppContext } from "../contexts/gymAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getPlanTheme } from "../utils/planthemes";

const MemberShipPlans = () => {

    const navigate = useNavigate();

    const { isLoggedIn } = useContext(gymAppContext);

    const [membershipPlans, setMembershipPlans] = useState([]);

    const [selectedPlan, setSelectedPlan] = useState(null);

    const [editPopUp, setEditPopUp] = useState(false);

    const [editPlansData, setEditPlansData] = useState({
        PlanName: "",
        PlanPrice: "",
        PlanDuration: "",
        PlanFeatures: "",
    });

    //---------------------------------------------
    // Fetch Plans
    //---------------------------------------------

    const getPlans = async () => {

        try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const { data } = await axios.get(

                `${backendUrl}/api/gym/membership-plans`,

                {
                    withCredentials: true,
                }

            );

            if (data.success) {

                setMembershipPlans(data.plans);

            }

        }

        catch (error) {

            toast.error("Something went wrong");

        }

    };

    //---------------------------------------------
    // Page Load
    //---------------------------------------------

    useEffect(() => {

        if (isLoggedIn) {

            getPlans();

        }

    }, [isLoggedIn]);

    //---------------------------------------------
    // Edit Form Change
    //---------------------------------------------

    const HandleOnChangeEdit = (e) => {

        const { name, value } = e.target;

        setEditPlansData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    return (

<div className="relative min-h-screen overflow-hidden text-white">

    {/* Background */}

    <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#090909] to-black" />

    <div className="absolute -left-52 top-0 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[170px]" />

    <div className="absolute -right-52 bottom-0 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[170px]" />

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

        {/* ================= HEADER ================= */}

        <div className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

            <div>

                <p className="text-sm uppercase tracking-[5px] text-red-500">

                    Fitness Beast

                </p>

                <h1 className="mt-3 text-5xl font-black tracking-wide">

                    Membership Plans

                </h1>

                <p className="mt-4 max-w-3xl leading-7 text-gray-400">

                    Create, manage and update all membership plans
                    offered by your gym. Every modification instantly
                    reflects throughout your member onboarding system.

                </p>

            </div>

            <button

                onClick={() => navigate("/admin/add-plans")}

                className="group flex h-16 items-center gap-4 rounded-2xl
                bg-gradient-to-r from-red-600 to-red-500
                px-8 font-semibold transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_rgba(239,68,68,.35)]"

            >

                <Plus size={22} />

                Create New Plan

            </button>

        </div>

        {/* ================= Plans Grid ================= */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {/* ================= Plans ================= */}

{membershipPlans.length > 0 ? (

    membershipPlans.map((plan, index) => {

        const {
            accentColor,
            icon
        } = getPlanTheme(index);

        return (

            <div
                key={plan._id}
                className="
                    group
                    transition-all
                    duration-500
                    hover:-translate-y-2
                "
            >

                <PlanCard

                    {...plan}

                    totalMembers={plan.totalMembers}

                    accentColor={accentColor}

                    icon={icon}

                    onEdit={() => {

                        setEditPlansData({

                            PlanName: plan.name,

                            PlanPrice: plan.price,

                            PlanDuration: plan.durationInDays,

                            PlanFeatures: Array.isArray(plan.features)
                                ? plan.features.join("\n")
                                : plan.features,

                        });

                        setSelectedPlan(plan);

                        setEditPopUp(true);

                    }}

                />

            </div>

        );

    })

) : (

    <div
        className="
            col-span-full
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-white/5
            p-20
            text-center
            backdrop-blur-3xl
        "
    >

        <div
            className="
                mx-auto
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-red-500/10
            "
        >

            <Sparkles
                className="text-red-500"
                size={40}
            />

        </div>

        <h2 className="mt-8 text-4xl font-black">

            No Membership Plans

        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-8 text-gray-400">

            Your gym doesn't have any membership plans yet.
            Create your first premium plan and start onboarding
            members with different pricing and benefits.

        </p>

        <button

            onClick={() => navigate("/admin/add-plan")}

            className="
                mt-10
                inline-flex
                items-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-red-600
                to-red-500
                px-8
                py-4
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_rgba(239,68,68,.35)]
            "

        >

            <Plus size={20} />

            Create First Plan

        </button>

    </div>

)}

</div>

{/* ===========================================================
                        EDIT POPUP
=========================================================== */}

{createPortal(
    <div
        className={`
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            p-4
            sm:p-6
            transition-all
            duration-300
            ${
                editPopUp
                    ? "visible opacity-100"
                    : "pointer-events-none invisible opacity-0"
            }
        `}
    >

        {/* ================= BACKDROP ================= */}

        <div
            onClick={() => setEditPopUp(false)}
            className="
                absolute
                inset-0
                bg-black/75
                backdrop-blur-lg
            "
        />

        {/* ================= POPUP ================= */}

        <div
            onClick={(e) => e.stopPropagation()}
            className="
                relative
                z-10
                flex
                w-full
                max-w-6xl
                max-h-[92vh]
                flex-col
                overflow-hidden
                rounded-[34px]
                border
                border-white/10
                bg-[#0B0B0B]
                shadow-[0_35px_90px_rgba(0,0,0,.7)]
                transition-all
                duration-300
            "
        >

            {/* ================= CLOSE BUTTON ================= */}

            <button
                onClick={() => setEditPopUp(false)}
                className="
                    absolute
                    right-6
                    top-6
                    z-30
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-red-500/20
                    bg-red-500/10
                    text-red-400
                    transition-all
                    duration-300
                    hover:bg-red-500
                    hover:text-white
                    hover:shadow-[0_0_25px_rgba(239,68,68,.25)]
                "
            >
                <X size={18} />
            </button>

            {/* ================= CONTENT ================= */}

            <div className="grid min-h-0 flex-1 xl:grid-cols-[2fr_1fr]">

                {/* =====================================================
                                    LEFT SIDE
                ===================================================== */}

                <div className="min-h-0 overflow-y-auto p-6 sm:p-8 lg:p-10">

                    {/* ================= HEADER ================= */}

                    <div className="mb-10 flex items-start gap-4 pr-14">

                        <div
                            className="
                                shrink-0
                                rounded-2xl
                                bg-red-600/20
                                p-4
                            "
                        >
                            <Pencil
                                className="text-red-500"
                                size={25}
                            />
                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    uppercase
                                    tracking-[5px]
                                    text-red-500
                                "
                            >
                                Fitness Beast
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-black
                                    sm:text-4xl
                                "
                            >
                                Edit Membership Plan
                            </h2>

                            <p className="mt-2 text-gray-400">
                                Update plan pricing, duration and features.
                            </p>

                        </div>

                    </div>

                    {/* ================= FORM ================= */}

                    <form className="space-y-7">

                        {/* ================= PLAN NAME ================= */}

                        <div className="space-y-3">

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >

                                <BadgePlus
                                    size={17}
                                    className="text-red-500"
                                />

                                Plan Name

                            </label>

                            <input
                                type="text"
                                name="PlanName"
                                value={editPlansData.PlanName}
                                onChange={HandleOnChangeEdit}
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

                        {/* ================= PRICE ================= */}

                        <div className="space-y-3">

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >

                                <CreditCard
                                    size={17}
                                    className="text-red-500"
                                />

                                Membership Fee

                            </label>

                            <input
                                type="number"
                                name="PlanPrice"
                                value={editPlansData.PlanPrice}
                                onChange={HandleOnChangeEdit}
                                placeholder="2500"
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

                        {/* ================= DURATION ================= */}

                        <div className="space-y-3">

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >

                                <CalendarDays
                                    size={17}
                                    className="text-red-500"
                                />

                                Duration (Days)

                            </label>

                            <input
                                type="number"
                                name="PlanDuration"
                                value={editPlansData.PlanDuration}
                                onChange={HandleOnChangeEdit}
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

                        {/* ================= FEATURES ================= */}

                        <div className="space-y-3">

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >

                                <ClipboardList
                                    size={17}
                                    className="text-red-500"
                                />

                                Membership Features

                            </label>

                            <textarea
                                rows={7}
                                name="PlanFeatures"
                                value={editPlansData.PlanFeatures}
                                onChange={HandleOnChangeEdit}
                                placeholder={`Unlimited Gym Access
Locker Facility
Steam Bath
Cardio Zone
Personal Trainer`}
                                className="
                                    min-h-[180px]
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

                            <p className="text-sm text-gray-500">
                                Enter one feature per line.
                            </p>

                        </div>

                        {/* ================= BUTTONS ================= */}

                        <div
                            className="
                                mt-8
                                flex
                                flex-col-reverse
                                gap-4
                                border-t
                                border-white/10
                                pt-8
                                sm:flex-row
                                sm:items-center
                                sm:justify-end
                            "
                        >

                            <button
                                type="button"
                                onClick={() => setEditPopUp(false)}
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
                                className="
                                    group
                                    flex
                                    h-14
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-red-600
                                    to-red-500
                                    px-10
                                    font-semibold
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-[0_20px_45px_rgba(239,68,68,.35)]
                                "
                            >

                                Save Changes

                                <span
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-2
                                    "
                                >
                                    →
                                </span>

                            </button>

                        </div>

                    </form>

                </div>


                {/* =====================================================
                                    RIGHT PANEL
                ===================================================== */}

                <div
                    className="
                        hidden
                        min-h-0
                        overflow-y-auto
                        border-l
                        border-white/10
                        bg-black/20
                        p-8
                        xl:block
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                uppercase
                                tracking-[4px]
                                text-red-500
                            "
                        >
                            Live Preview
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            Membership Card
                        </h2>

                        {/* ================= PREVIEW CARD ================= */}

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

                            {/* Header */}

                            <div className="flex items-start justify-between gap-4">

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-[4px]
                                            text-red-400
                                        "
                                    >
                                        Fitness Beast
                                    </p>

                                    <h3
                                        className="
                                            mt-2
                                            break-words
                                            text-3xl
                                            font-black
                                        "
                                    >
                                        {editPlansData.PlanName ||
                                            "Premium Elite"}
                                    </h3>

                                </div>

                                <div
                                    className="
                                        shrink-0
                                        rounded-2xl
                                        bg-red-600/20
                                        p-4
                                    "
                                >
                                    <Sparkles
                                        className="text-red-500"
                                        size={28}
                                    />
                                </div>

                            </div>

                            {/* Price */}

                            <div className="mt-10">

                                <h1
                                    className="
                                        break-words
                                        text-5xl
                                        font-black
                                        text-red-500
                                    "
                                >
                                    ₹{editPlansData.PlanPrice || "0"}
                                </h1>

                                <p className="mt-2 text-lg text-gray-400">
                                    {editPlansData.PlanDuration || "0"} Days
                                    Membership
                                </p>

                            </div>

                            {/* Divider */}

                            <div
                                className="
                                    my-8
                                    h-px
                                    bg-gradient-to-r
                                    from-red-500/30
                                    via-white/10
                                    to-transparent
                                "
                            />

                            {/* Features */}

                            <div className="space-y-4">

                                {(editPlansData.PlanFeatures
                                    ? (
                                        Array.isArray(
                                            editPlansData.PlanFeatures
                                        )
                                            ? editPlansData.PlanFeatures
                                            : editPlansData.PlanFeatures
                                                  .split("\n")
                                    )
                                    : [
                                          "Unlimited Gym Access",
                                          "Locker Facility",
                                          "Steam Bath",
                                          "Personal Trainer",
                                      ]
                                )
                                    .filter(
                                        (feature) =>
                                            feature.trim() !== ""
                                    )
                                    .map((feature, index) => (

                                        <div
                                            key={index}
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-7
                                                    w-7
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-red-500/20
                                                "
                                            >
                                                ✓
                                            </div>

                                            <span
                                                className="
                                                    break-words
                                                    text-gray-300
                                                "
                                            >
                                                {feature}
                                            </span>

                                        </div>

                                    ))}

                            </div>

                            {/* Footer */}

                            <div
                                className="
                                    mt-10
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    p-5
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-5
                                    "
                                >

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                uppercase
                                                tracking-[3px]
                                                text-gray-500
                                            "
                                        >
                                            Status
                                        </p>

                                        <h4
                                            className="
                                                mt-1
                                                font-semibold
                                                text-green-400
                                            "
                                        >
                                            Ready To Save
                                        </h4>

                                    </div>

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                uppercase
                                                tracking-[3px]
                                                text-gray-500
                                            "
                                        >
                                            Gym
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

    </div>,

    document.body
)}
</div>
</div>
    );

};

export default MemberShipPlans;
