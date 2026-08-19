import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    UserRound,
    Mail,
    Phone,
    CalendarDays,
    MapPin,
    CreditCard,
    Package,
    Receipt,
    Crown,
    Clock3,
    IndianRupee,
    ShieldCheck,
    AlertCircle,
    ChevronRight,
    Dumbbell,
    Pencil,
    RefreshCw
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ManageMember = () => {

    const { memberId } = useParams();
    const navigate = useNavigate();

    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL;


    // ==========================================================
    // FETCH MEMBER
    // ==========================================================

    const fetchMember = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${backendUrl}/api/admin/members/member-details/${memberId}`,
                {
                    withCredentials: true
                }
            );

            if (response.data.success) {

                setMember(response.data.member);

            } else {

                toast.error(
                    response.data.message ||
                    "Unable to fetch member"
                );

            }

        } catch (error) {

            console.error(
                "FETCH MEMBER ERROR:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to load member"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (memberId) {
            fetchMember();
        }

    }, [memberId]);


    // ==========================================================
    // LOADING
    // ==========================================================

    if (loading) {

        return (

            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="flex flex-col items-center gap-4">

                    <RefreshCw
                        size={28}
                        className="animate-spin text-red-500"
                    />

                    <p className="text-gray-500">
                        Loading member profile...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================================
    // MEMBER NOT FOUND
    // ==========================================================

    if (!member) {

        return (

            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="text-center">

                    <AlertCircle
                        size={45}
                        className="mx-auto text-red-500"
                    />

                    <h2 className="mt-5 text-2xl font-bold text-white">
                        Member Not Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        The requested member could not be found.
                    </p>

                    <button
                        onClick={() => navigate("/members")}
                        className="
                            mt-6
                            rounded-2xl
                            bg-red-600
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-500
                        "
                    >
                        Back to Members
                    </button>

                </div>

            </div>

        );

    }


    // ==========================================================
    // DERIVED DATA
    // ==========================================================

    const daysRemaining =
        member.membershipDaysRemaining;

    const membershipStatus =
        member.membershipStatus;

    const isExpired =
        membershipStatus === "expired";

    const isExpiringSoon =
        membershipStatus === "expiring_soon";

    const isExpiresToday =
        membershipStatus === "expires_today";


    const membershipName =
        member.membership?.plan?.name ||
        "No Membership";


    const totalFee =
    Number(member.payment?.total || 0);

const paidAmount =
    Number(member.payment?.paid || 0);

const remainingAmount =
    Number(member.payment?.remaining || 0);


    // ==========================================================
    // DATE FORMATTER
    // ==========================================================

    const formatDate = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // ==========================================================
    // CURRENCY FORMATTER
    // ==========================================================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(amount);

    };


    // ==========================================================
    // STATUS
    // ==========================================================

    const statusLabel = {

        active: "Active",

        expired: "Expired",

        expiring_soon: "Expiring Soon",

        expires_today: "Expires Today",

        not_assigned: "No Membership"

    }[membershipStatus] || "Unknown";


    return (

        <div className="relative pb-16">


            {/* ==================================================
                BACK BUTTON
            ================================================== */}

            <button
                onClick={() => navigate("/members")}
                className="
                    mb-8
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-gray-500
                    transition
                    hover:text-white
                "
            >

                <ArrowLeft size={17} />

                Back to Members

            </button>


            {/* ==================================================
                PROFILE HERO
            ================================================== */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-white/10
                    bg-white/[0.035]
                    backdrop-blur-3xl
                    shadow-[0_30px_100px_rgba(0,0,0,.45)]
                "
            >

                {/* subtle glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-72
                        w-72
                        rounded-full
                        bg-red-600/10
                        blur-[100px]
                    "
                />


                <div className="
                    relative
                    flex
                    flex-col
                    gap-8
                    p-8
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    lg:p-10
                ">


                    {/* PROFILE */}

                    <div className="
                        flex
                        items-center
                        gap-6
                    ">

                        <div
                            className="
                                flex
                                h-24
                                w-24
                                shrink-0
                                items-center
                                justify-center
                                rounded-[28px]
                                bg-gradient-to-br
                                from-red-500
                                to-red-800
                                text-4xl
                                font-black
                                text-white
                                shadow-[0_20px_50px_rgba(239,68,68,.3)]
                            "
                        >

                            {member.fullName
                                ?.charAt(0)
                                ?.toUpperCase()
                            }

                        </div>


                        <div>

                            <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                            ">

                                <h1 className="
                                    text-3xl
                                    font-black
                                    tracking-tight
                                    text-white
                                    lg:text-4xl
                                ">

                                    {member.fullName}

                                </h1>


                                <span
                                    className={`
                                        rounded-full
                                        border
                                        px-3
                                        py-1
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wider

                                        ${
                                            member.status === "active"

                                            ? `
                                                border-green-500/20
                                                bg-green-500/10
                                                text-green-400
                                            `

                                            : `
                                                border-red-500/20
                                                bg-red-500/10
                                                text-red-400
                                            `
                                        }
                                    `}
                                >

                                    {member.status}

                                </span>

                            </div>


                            <p className="
                                mt-2
                                text-sm
                                text-gray-500
                            ">

                                Gym Member

                            </p>


                            <div className="
                                mt-4
                                flex
                                flex-wrap
                                gap-5
                                text-sm
                                text-gray-400
                            ">

                                <span className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <CalendarDays
                                        size={15}
                                    />

                                    Joined {formatDate(
                                        member.joiningDate
                                    )}

                                </span>


                                <span className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <ShieldCheck
                                        size={15}
                                    />

                                    Registered by {
                                        member.registeredBy ||
                                        "Admin"
                                    }

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* UPGRADE BUTTON */}

                    <button
                        onClick={() => {
                            // later open upgrade modal
                            toast("Membership upgrade flow coming next");
                        }}
                        className="
                            group
                            relative
                            flex
                            h-14
                            items-center
                            justify-center
                            gap-3
                            overflow-hidden
                            rounded-2xl
                            bg-gradient-to-r
                            from-red-700
                            to-red-500
                            px-7
                            font-bold
                            text-white
                            shadow-[0_15px_40px_rgba(239,68,68,.25)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_20px_50px_rgba(239,68,68,.35)]
                        "
                    >

                        <Crown
                            size={19}
                            className="
                                transition
                                group-hover:rotate-12
                            "
                        />

                        Upgrade Membership

                        <ChevronRight
                            size={17}
                            className="
                                transition
                                group-hover:translate-x-1
                            "
                        />

                    </button>

                </div>

            </div>


            {/* ==================================================
                MEMBERSHIP OVERVIEW
            ================================================== */}

            <div className="mt-8">

                <div className="
                    mb-5
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <p className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[4px]
                            text-red-500
                        ">
                            Membership
                        </p>

                        <h2 className="
                            mt-1
                            text-2xl
                            font-black
                            text-white
                        ">
                            Membership Overview
                        </h2>

                    </div>

                </div>


                <div className="
                    grid
                    gap-5
                    md:grid-cols-2
                    xl:grid-cols-4
                ">


                    {/* PLAN */}

                    <ProfileStat
                        icon={<Crown size={19} />}
                        label="Current Plan"
                        value={membershipName}
                        subtext={
                            member.membership?.plan
                                ?.durationInDays
                                ? `${member.membership.plan.durationInDays} days`
                                : "No plan assigned"
                        }
                    />


                    {/* DAYS */}

                    <ProfileStat
                        icon={<Clock3 size={19} />}
                        label="Membership"
                        value={
                            daysRemaining === null
                                ? "—"
                                : isExpired
                                    ? `${Math.abs(daysRemaining)} days`
                                    : daysRemaining === 0
                                        ? "Expires Today"
                                        : `${daysRemaining} days`
                        }
                        subtext={
                            isExpired
                                ? "Membership expired"
                                : isExpiresToday
                                    ? "Renew today"
                                    : isExpiringSoon
                                        ? "Renew soon"
                                        : statusLabel
                        }
                        danger={
                            isExpired ||
                            isExpiresToday ||
                            isExpiringSoon
                        }
                    />


                    {/* START DATE */}

                    <ProfileStat
                        icon={<CalendarDays size={19} />}
                        label="Start Date"
                        value={formatDate(
                            member.membership?.planStartDate
                        )}
                        subtext="Membership started"
                    />


                    {/* EXPIRY */}

                    <ProfileStat
                        icon={<CalendarDays size={19} />}
                        label="Expiry Date"
                        value={formatDate(
                            member.membershipExpiryDate
                        )}
                        subtext={
                            isExpired
                                ? "Membership expired"
                                : "Membership end date"
                        }
                        danger={isExpired}
                    />

                </div>

            </div>


            {/* ==================================================
                PERSONAL + PAYMENT
            ================================================== */}

            <div className="
                mt-8
                grid
                gap-6
                xl:grid-cols-2
            ">


                {/* PERSONAL INFORMATION */}

                <SectionCard
                    icon={<UserRound size={19} />}
                    title="Personal Information"
                    subtitle="Member's registered details"
                >

                    <div className="
                        grid
                        gap-6
                        sm:grid-cols-2
                    ">

                        <InfoItem
                            icon={<UserRound size={16} />}
                            label="Full Name"
                            value={member.fullName}
                        />

                        <InfoItem
                            icon={<Mail size={16} />}
                            label="Email"
                            value={member.email}
                        />

                        <InfoItem
                            icon={<Phone size={16} />}
                            label="Phone"
                            value={member.phone}
                        />

                        <InfoItem
                            icon={<CalendarDays size={16} />}
                            label="Date of Birth"
                            value={formatDate(member.dob)}
                        />

                        <InfoItem
                            icon={<MapPin size={16} />}
                            label="Address"
                            value={member.address || "Not provided"}
                            full
                        />

                    </div>

                </SectionCard>


                {/* PAYMENT */}

                <SectionCard
                    icon={<CreditCard size={19} />}
                    title="Payment Overview"
                    subtitle="Membership financial summary"
                >

                    <div className="
                        grid
                        grid-cols-3
                        gap-4
                    ">

                        <MoneyCard
                            label="Total"
                            amount={totalFee}
                        />

                        <MoneyCard
                            label="Paid"
                            amount={paidAmount}
                            positive
                        />

                        <MoneyCard
                            label="Remaining"
                            amount={remainingAmount}
                            danger={remainingAmount > 0}
                        />

                    </div>


                    {/* PAYMENT PROGRESS */}

                    <div className="mt-7">

                        <div className="
                            mb-2
                            flex
                            justify-between
                            text-xs
                        ">

                            <span className="text-gray-500">
                                Payment Progress
                            </span>

                            <span className="font-semibold text-gray-300">
                                {
                                    totalFee > 0
                                        ? Math.min(
                                            100,
                                            Math.round(
                                                (
                                                    paidAmount /
                                                    totalFee
                                                ) * 100
                                            )
                                        )
                                        : 0
                                }%
                            </span>

                        </div>


                        <div className="
                            h-2
                            overflow-hidden
                            rounded-full
                            bg-white/10
                        ">

                            <div
                                className="
                                    h-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-red-700
                                    to-red-400
                                    transition-all
                                "
                                style={{
                                    width: `${
                                        totalFee > 0
                                            ? Math.min(
                                                100,
                                                (
                                                    paidAmount /
                                                    totalFee
                                                ) * 100
                                            )
                                            : 0
                                    }%`
                                }}
                            />

                        </div>

                    </div>

                </SectionCard>

            </div>


            {/* ==================================================
                PURCHASE HISTORY
            ================================================== */}

            <div className="mt-8">

                <SectionCard
                    icon={<Package size={19} />}
                    title="Purchase History"
                    subtitle="Products purchased by this member"
                >

                    {
                        member.purchaseHistory?.length > 0

                            ? (

                                <div className="
                                    overflow-x-auto
                                ">

                                    <table className="
                                        w-full
                                        min-w-[700px]
                                    ">

                                        <thead>

                                            <tr className="
                                                border-b
                                                border-white/10
                                                text-left
                                                text-xs
                                                uppercase
                                                tracking-[2px]
                                                text-gray-500
                                            ">

                                                <th className="pb-4">
                                                    Product
                                                </th>

                                                <th className="pb-4">
                                                    Quantity
                                                </th>

                                                <th className="pb-4">
                                                    Amount
                                                </th>

                                                <th className="pb-4">
                                                    Payment
                                                </th>

                                                <th className="pb-4">
                                                    Date
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {
                                                member.purchaseHistory.map(
                                                    (purchase, index) => (

                                                        <tr
                                                            key={
                                                                purchase._id ||
                                                                index
                                                            }
                                                            className="
                                                                border-b
                                                                border-white/5
                                                                text-sm
                                                                text-gray-300
                                                            "
                                                        >

                                                            <td className="
                                                                py-5
                                                                font-semibold
                                                                text-white
                                                            ">

                                                                {
                                                                    purchase.productName
                                                                }

                                                            </td>

                                                            <td className="py-5">

                                                                {
                                                                    purchase.quantity
                                                                }

                                                            </td>

                                                            <td className="
                                                                py-5
                                                                font-semibold
                                                            ">

                                                                {
                                                                    formatCurrency(
                                                                        purchase.amount
                                                                    )
                                                                }

                                                            </td>

                                                            <td className="py-5">

                                                                {
                                                                    purchase.paymentMethod ||
                                                                    "—"
                                                                }

                                                            </td>

                                                            <td className="py-5">

                                                                {
                                                                    formatDate(
                                                                        purchase.createdAt
                                                                    )
                                                                }

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            )

                            : (

                                <EmptyState
                                    icon={<Package size={24} />}
                                    title="No purchases yet"
                                    description="Products purchased by this member will appear here."
                                />

                            )
                    }

                </SectionCard>

            </div>


            {/* ==================================================
                TRANSACTION HISTORY
            ================================================== */}

            <div className="mt-8">

                <SectionCard
                    icon={<Receipt size={19} />}
                    title="Transaction History"
                    subtitle="Invoices and payments associated with this member"
                >

                    {
                        member.invoiceHistory?.length > 0

                            ? (

                                <div className="overflow-x-auto">

                                    <table className="
                                        w-full
                                        min-w-[800px]
                                    ">

                                        <thead>

                                            <tr className="
                                                border-b
                                                border-white/10
                                                text-left
                                                text-xs
                                                uppercase
                                                tracking-[2px]
                                                text-gray-500
                                            ">

                                                <th className="pb-4">
                                                    Invoice
                                                </th>

                                                <th className="pb-4">
                                                    Category
                                                </th>

                                                <th className="pb-4">
                                                    Amount
                                                </th>

                                                <th className="pb-4">
                                                    Status
                                                </th>

                                                <th className="pb-4">
                                                    Date
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {
                                                member.invoiceHistory.map(
                                                    (invoice, index) => (

                                                        <tr
                                                            key={
                                                                invoice._id ||
                                                                index
                                                            }
                                                            className="
                                                                border-b
                                                                border-white/5
                                                                text-sm
                                                            "
                                                        >

                                                            <td className="
                                                                py-5
                                                                font-semibold
                                                                text-white
                                                            ">

                                                                {
                                                                    invoice.billNumber ||
                                                                    "—"
                                                                }

                                                            </td>


                                                            <td className="
                                                                py-5
                                                                capitalize
                                                                text-gray-400
                                                            ">

                                                                {
                                                                    invoice.category ||
                                                                    "—"
                                                                }

                                                            </td>


                                                            <td className="
                                                                py-5
                                                                font-semibold
                                                                text-gray-200
                                                            ">

                                                                {
                                                                    formatCurrency(
                                                                        invoice.finalAmount ||
                                                                        invoice.amount ||
                                                                        0
                                                                    )
                                                                }

                                                            </td>


                                                            <td className="py-5">

                                                                <span className="
                                                                    rounded-full
                                                                    border
                                                                    border-green-500/20
                                                                    bg-green-500/10
                                                                    px-3
                                                                    py-1.5
                                                                    text-xs
                                                                    font-semibold
                                                                    text-green-400
                                                                ">

                                                                    {
                                                                        invoice.status ||
                                                                        "—"
                                                                    }

                                                                </span>

                                                            </td>


                                                            <td className="
                                                                py-5
                                                                text-gray-400
                                                            ">

                                                                {
                                                                    formatDate(
                                                                        invoice.invoiceDate ||
                                                                        invoice.createdAt
                                                                    )
                                                                }

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            )

                            : (

                                <EmptyState
                                    icon={<Receipt size={24} />}
                                    title="No transactions found"
                                    description="Invoices and payment records will appear here."
                                />

                            )
                    }

                </SectionCard>

            </div>

        </div>

    );

};


// ==========================================================
// PROFILE STAT
// ==========================================================

const ProfileStat = ({
    icon,
    label,
    value,
    subtext,
    danger = false
}) => {

    return (

        <div className="
            rounded-[24px]
            border
            border-white/10
            bg-white/[0.035]
            p-6
            backdrop-blur-xl
            transition
            hover:bg-white/[0.055]
        ">

            <div className="
                flex
                items-center
                justify-between
            ">

                <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/10
                    text-red-400
                ">

                    {icon}

                </div>

                <div className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[2px]
                    text-gray-600
                ">

                    {label}

                </div>

            </div>


            <p className={`
                mt-5
                truncate
                text-xl
                font-black

                ${
                    danger
                        ? "text-orange-400"
                        : "text-white"
                }
            `}>

                {value}

            </p>


            <p className="
                mt-1
                text-xs
                text-gray-500
            ">

                {subtext}

            </p>

        </div>

    );

};


// ==========================================================
// SECTION CARD
// ==========================================================

const SectionCard = ({
    icon,
    title,
    subtitle,
    children
}) => {

    return (

        <div
            className="
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.035]
                p-7
                backdrop-blur-3xl
                shadow-[0_20px_60px_rgba(0,0,0,.25)]
                lg:p-8
            "
        >

            <div className="
                mb-7
                flex
                items-center
                gap-4
            ">

                <div className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/10
                    text-red-400
                ">

                    {icon}

                </div>


                <div>

                    <h2 className="
                        font-bold
                        text-white
                    ">

                        {title}

                    </h2>

                    <p className="
                        mt-1
                        text-xs
                        text-gray-500
                    ">

                        {subtitle}

                    </p>

                </div>

            </div>


            {children}

        </div>

    );

};


// ==========================================================
// INFO ITEM
// ==========================================================

const InfoItem = ({
    icon,
    label,
    value,
    full = false
}) => {

    return (

        <div
            className={
                full
                    ? "sm:col-span-2"
                    : ""
            }
        >

            <p className="
                mb-2
                flex
                items-center
                gap-2
                text-xs
                uppercase
                tracking-[1.5px]
                text-gray-600
            ">

                {icon}

                {label}

            </p>

            <p className="
                break-words
                text-sm
                font-medium
                text-gray-200
            ">

                {value}

            </p>

        </div>

    );

};


// ==========================================================
// MONEY CARD
// ==========================================================

const MoneyCard = ({
    label,
    amount,
    positive = false,
    danger = false
}) => {

    return (

        <div className="
            rounded-2xl
            border
            border-white/5
            bg-black/20
            p-4
        ">

            <p className="
                text-xs
                text-gray-500
            ">

                {label}

            </p>

            <p className={`
                mt-2
                text-lg
                font-black

                ${
                    danger
                        ? "text-orange-400"
                        : positive
                            ? "text-green-400"
                            : "text-white"
                }
            `}>

                {formatMoney(amount)}

            </p>

        </div>

    );

};


// ==========================================================
// EMPTY STATE
// ==========================================================

const EmptyState = ({
    icon,
    title,
    description
}) => {

    return (

        <div className="
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-black/10
            py-12
            text-center
        ">

            <div className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-white/5
                text-gray-500
            ">

                {icon}

            </div>

            <h3 className="
                mt-4
                font-semibold
                text-gray-300
            ">

                {title}

            </h3>

            <p className="
                mt-1
                text-sm
                text-gray-600
            ">

                {description}

            </p>

        </div>

    );

};


// ==========================================================
// MONEY HELPER
// ==========================================================

const formatMoney = (amount) => {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(amount);

};


export default ManageMember;