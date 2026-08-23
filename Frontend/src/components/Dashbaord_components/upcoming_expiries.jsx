import React from "react";
import {
    CalendarClock,
    ChevronRight,
    Clock3,
} from "lucide-react";

const UpcomingExpiries = ({
    data = [],
}) => {

    const getInitials = (name = "") => {
        const words = name.trim().split(" ");

        if (words.length === 1) {
            return words[0]?.charAt(0)?.toUpperCase() || "?";
        }

        return (
            (words[0]?.charAt(0) || "") +
            (words[words.length - 1]?.charAt(0) || "")
        ).toUpperCase();
    };


    const getUrgency = (days) => {

        if (days <= 3) {
            return {
                label: "Critical",
                text: "text-red-400",
                bg: "bg-red-500/10",
                border: "border-red-500/20",
            };
        }

        if (days <= 7) {
            return {
                label: "Soon",
                text: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20",
            };
        }

        return {
            label: "Upcoming",
            text: "text-slate-400",
            bg: "bg-slate-800/60",
            border: "border-slate-700/60",
        };
    };


    return (
        <div
            className="
                relative
                overflow-hidden
                bg-[#0B0B0B]
                border
                border-[#272020]
                rounded-2xl
                p-5
                w-full
                min-h-[390px]
                transition-all
                duration-300
                hover:border-[#3A2525]
            "
        >

            {/* =====================================================
                SUBTLE RED GLOW
            ===================================================== */}

            <div
                className="
                    absolute
                    -top-20
                    -right-20
                    w-40
                    h-40
                    rounded-full
                    bg-red-600
                    blur-[90px]
                    opacity-[0.05]
                    pointer-events-none
                "
            />


            {/* =====================================================
                TOP ACCENT
            ===================================================== */}

            <div
                className="
                    absolute
                    top-0
                    left-8
                    right-8
                    h-[1px]
                    bg-red-500/30
                "
            />


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                    mb-5
                "
            >

                <div>

                    <div className="
                        flex
                        items-center
                        gap-2
                        mb-1
                    ">

                        <CalendarClock
                            size={14}
                            className="text-red-500"
                        />

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            font-semibold
                            text-red-500
                        ">
                            Memberships
                        </p>

                    </div>


                    <h2 className="
                        text-lg
                        font-bold
                        text-white
                        tracking-tight
                    ">
                        Upcoming Expiries
                    </h2>


                    <p className="
                        text-[11px]
                        text-slate-600
                        mt-1
                    ">
                        Expiring within the next 30 days
                    </p>

                </div>


                {/* COUNT */}

                <div
                    className="
                        px-3
                        py-1.5
                        rounded-lg
                        bg-[#141010]
                        border
                        border-[#302020]
                    "
                >

                    <span className="
                        text-xs
                        font-semibold
                        text-slate-300
                    ">
                        {data.length}
                    </span>

                    <span className="
                        text-[10px]
                        text-slate-600
                        ml-1
                    ">
                        due
                    </span>

                </div>

            </div>


            {/* =====================================================
                MEMBERS
            ===================================================== */}

            {data.length > 0 ? (

                <div
                    className="
                        relative
                        z-10
                        space-y-1
                    "
                >

                    {data.map((member) => {

                        const days =
                            Number(
                                member.daysRemaining ?? 0
                            );

                        const urgency =
                            getUrgency(days);


                        return (
                            <div
                                key={member.memberId}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    px-2
                                    py-3
                                    rounded-xl
                                    border
                                    border-transparent
                                    hover:border-[#302020]
                                    hover:bg-[#110D0D]
                                    transition-all
                                    duration-200
                                "
                            >

                                {/* =================================================
                                    AVATAR
                                ================================================= */}

                                <div
                                    className="
                                        w-9
                                        h-9
                                        shrink-0
                                        rounded-xl
                                        bg-red-500/10
                                        border
                                        border-red-500/10
                                        text-red-400
                                        flex
                                        items-center
                                        justify-center
                                        text-[11px]
                                        font-bold
                                    "
                                >
                                    {getInitials(
                                        member.memberName
                                    )}
                                </div>


                                {/* =================================================
                                    MEMBER INFO
                                ================================================= */}

                                <div
                                    className="
                                        flex-1
                                        min-w-0
                                    "
                                >

                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            text-slate-200
                                            truncate
                                        "
                                    >
                                        {member.memberName}
                                    </p>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            mt-1
                                        "
                                    >

                                        <span
                                            className="
                                                text-[10px]
                                                text-slate-600
                                                truncate
                                            "
                                        >
                                            {member.plan}
                                        </span>

                                        <span className="
                                            text-slate-700
                                            text-[9px]
                                        ">
                                            •
                                        </span>

                                        <span className="
                                            text-[10px]
                                            text-slate-600
                                        ">
                                            {new Date(
                                                member.expiryDate
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>

                                    </div>

                                </div>


                                {/* =================================================
                                    EXPIRY STATUS
                                ================================================= */}

                                <div
                                    className="
                                        flex
                                        flex-col
                                        items-end
                                        shrink-0
                                    "
                                >

                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-1
                                            px-2
                                            py-1
                                            rounded-md
                                            border
                                            ${urgency.bg}
                                            ${urgency.border}
                                        `}
                                    >

                                        <Clock3
                                            size={11}
                                            className={
                                                urgency.text
                                            }
                                        />

                                        <span
                                            className={`
                                                text-[10px]
                                                font-semibold
                                                ${urgency.text}
                                            `}
                                        >
                                            {days === 0
                                                ? "Today"
                                                : `${days}d left`}
                                        </span>

                                    </div>

                                    <span
                                        className="
                                            text-[9px]
                                            text-slate-700
                                            mt-1
                                        "
                                    >
                                        {urgency.label}
                                    </span>

                                </div>


                                {/* =================================================
                                    ARROW
                                ================================================= */}

                                <ChevronRight
                                    size={14}
                                    className="
                                        text-slate-700
                                        group-hover:text-red-500
                                        transition-colors
                                    "
                                />

                            </div>
                        );

                    })}

                </div>

            ) : (

                /* =====================================================
                   EMPTY STATE
                ================================================= */

                <div
                    className="
                        relative
                        z-10
                        h-[260px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-green-500/10
                            border
                            border-green-500/10
                            flex
                            items-center
                            justify-center
                            mb-3
                        "
                    >

                        <span
                            className="
                                text-green-400
                                text-lg
                            "
                        >
                            ✓
                        </span>

                    </div>


                    <p
                        className="
                            text-sm
                            font-semibold
                            text-slate-300
                        "
                    >
                        No upcoming expiries
                    </p>


                    <p
                        className="
                            text-[10px]
                            text-slate-600
                            mt-1
                        "
                    >
                        No membership expires within the next 30 days.
                    </p>

                </div>

            )}

        </div>
    );
};

export default UpcomingExpiries;