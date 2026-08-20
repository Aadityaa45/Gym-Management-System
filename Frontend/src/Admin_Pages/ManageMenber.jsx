import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { gymAppContext } from "../contexts/gymAuthContext";
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
    ShieldCheck,
    AlertCircle,
    ChevronRight,
    RefreshCw,
    X,
    CheckCircle2,
    IndianRupee,
    WalletCards,
    ArrowUpCircle,
    Sparkles
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ManageMember = () => {

    const { memberId } = useParams();
    const navigate = useNavigate();

    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

    const { membershipPlans, setMembershipPlans } = useContext(gymAppContext);

    const [plansLoading, setPlansLoading] = useState(false);

    const [selectedPlan, setSelectedPlan] = useState(null);

    const [upgradeForm, setUpgradeForm] = useState({
        startDate: "",
        oldDuePayment: 0,
        discount: 0,
        newPayment: 0
    });

const [upgradeSubmitting, setUpgradeSubmitting] = useState(false);

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL;

        const openUpgradeModal = async () => {

    setUpgradeModalOpen(true);

    setSelectedPlan(null);

    setUpgradeForm({
        startDate: new Date().toISOString().split("T")[0],
        oldDuePayment: 0,
        discount: 0,
        newPayment: 0
    });

};

const handlePlanSelection = (planId) => {

    const plan = membershipPlans.find(
        (item) => item._id === planId
    );

    if (!plan) {

        setSelectedPlan(null);

        return;

    }

    setSelectedPlan(plan);

    setUpgradeForm((prev) => ({
        ...prev,
        newPayment: Number(plan.price || 0)
    }));

};


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

//     const handleUpgradeMembership = async () => {

//     try {

//         setUpgradeSubmitting(true);

//         const response = await axios.post(
//             `${backendUrl}/api/admin/members/upgrade-membership`,
//             {
//                 memberId: memberId,
//                 planId: selectedPlan?._id,
//                 startDate: upgradeForm.startDate,
//                 oldDuePayment: Number(upgradeForm.oldDuePayment || 0),
//                 discount: Number(upgradeForm.discount || 0),
//                 newPayment: Number(upgradeForm.newPayment || 0)
//             },
//             {
//                 withCredentials: true
//             }
//         );

//         if (response.data.success) {

//             toast.success(
//                 response.data.message ||
//                 "Membership upgraded successfully"
//             );

//             setUpgradeModalOpen(false);

//             // Important:
//             // latest membership/payment data reload karo
//             await fetchMember();

//         } else {

//             toast.error(
//                 response.data.message ||
//                 "Unable to upgrade membership"
//             );

//         }

//     } catch (error) {

//         console.error(
//             "UPGRADE MEMBERSHIP ERROR:",
//             error
//         );

//         toast.error(
//             error.response?.data?.message ||
//             "Something went wrong while upgrading membership"
//         );

//     } finally {

//         setUpgradeSubmitting(false);

//     }

// };

const handleUpgradeMembership = async () => {

    try {

        setUpgradeSubmitting(true);

        const response = await axios.post(
            `${backendUrl}/api/admin/members/upgrade-membership`,
            {
                memberId: memberId,

                // IMPORTANT
                newPlanId: selectedPlan?._id || null,

                startDate: upgradeForm.startDate,

                oldDuePayment:
                    Number(upgradeForm.oldDuePayment || 0),

                discount:
                    Number(upgradeForm.discount || 0),

                newMembershipPayment:
                    Number(upgradeForm.newPayment || 0)
            },
            {
                withCredentials: true
            }
        );

        if (!response.data.success) {

            toast.error(
                response.data.message ||
                "Unable to process request"
            );

            return;
        }

        toast.success(
            response.data.message ||
            "Membership updated successfully"
        );

        setUpgradeModalOpen(false);

        // Open generated invoice
    const invoiceId =
        response.data.invoices?.membership ||
        response.data.invoiceId;

    if (invoiceId) {
        window.open(
            `${backendUrl}/api/admin/invoice/${invoiceId}`,
            "_blank"
        );
    }

        // Refresh complete member profile
        await fetchMember();

    } catch (error) {

        console.error(
            "MEMBERSHIP UPGRADE ERROR:",
            error
        );

        toast.error(
            error.response?.data?.message ||
            "Unable to process membership upgrade"
        );

    } finally {

        setUpgradeSubmitting(false);

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

    const oldDueAmount =
    Number(member.payment?.remaining || 0);

const oldDuePayment =
    Math.min(
        Number(upgradeForm.oldDuePayment || 0),
        oldDueAmount
    );

const oldDueRemaining =
    Math.max(
        oldDueAmount - oldDuePayment,
        0
    );

const newPlanPrice =
    Number(selectedPlan?.price || 0);

const discountAmount =
    Number(upgradeForm.discount || 0);

const newMembershipAmount =
    Math.max(
        newPlanPrice - discountAmount,
        0
    );

const newMembershipPayment =
    Math.min(
        Number(upgradeForm.newPayment || 0),
        newMembershipAmount
    );

const newMembershipRemaining =
    Math.max(
        newMembershipAmount - newMembershipPayment,
        0
    );

const totalPayableNow =
    oldDuePayment +
    newMembershipPayment;


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
    onClick={openUpgradeModal}
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
                    {upgradeModalOpen && (
    <UpgradeMembershipModal
        member={member}

        plans={membershipPlans}

        plansLoading={plansLoading}

        selectedPlan={selectedPlan}

        upgradeForm={upgradeForm}

        setUpgradeForm={setUpgradeForm}

        handlePlanSelection={handlePlanSelection}

        oldDueAmount={oldDueAmount}

        oldDuePayment={
            Number(upgradeForm.oldDuePayment || 0)
        }

        oldDueRemaining={oldDueRemaining}

        newPlanPrice={newPlanPrice}

        discountAmount={discountAmount}

        newMembershipAmount={newMembershipAmount}

        newMembershipPayment={
            Number(upgradeForm.newPayment || 0)
        }

        newMembershipRemaining={
            newMembershipRemaining
        }

        totalPayableNow={totalPayableNow}

        upgradeSubmitting={upgradeSubmitting}

        handleUpgradeMembership={
            handleUpgradeMembership
        }

        onClose={() => {
            setUpgradeModalOpen(false);
        }}
    />
)}
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

const UpgradeMembershipModal = ({
     member,
    plans,
    plansLoading,
    selectedPlan,
    upgradeForm,
    setUpgradeForm,
    handlePlanSelection,

    oldDueAmount,
    oldDuePayment,
    oldDueRemaining,

    newPlanPrice,
    discountAmount,
    newMembershipAmount,
    newMembershipPayment,
    newMembershipRemaining,

    totalPayableNow,

    upgradeSubmitting,

    handleUpgradeMembership,

    onClose
}) => {

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


    return (

        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/75
                p-4
                backdrop-blur-md
            "
        >

            <div
                className="
                    relative
                    flex
                    max-h-[92vh]
                    w-full
                    max-w-5xl
                    flex-col
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-white/10
                    bg-[#111111]
                    shadow-[0_30px_120px_rgba(0,0,0,.65)]
                "
            >

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/10
                        px-7
                        py-6
                        lg:px-8
                    "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-500/10
                                text-red-400
                            "
                        >

                            <ArrowUpCircle size={22} />

                        </div>

                        <div>

                            <h2 className="
                                text-xl
                                font-black
                                text-white
                            ">
                                Upgrade Membership
                            </h2>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-500
                            ">
                                Update membership and manage outstanding payment
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={onClose}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-white/5
                            text-gray-400
                            transition
                            hover:bg-white/10
                            hover:text-white
                        "
                    >

                        <X size={19} />

                    </button>

                </div>


                {/* =====================================================
                    BODY
                ===================================================== */}

                <div className="
                    flex-1
                    overflow-y-auto
                    p-7
                    lg:p-8
                ">


                    {/* =================================================
                        CURRENT MEMBERSHIP
                    ================================================= */}

                    <div className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-5
                    ">

                        <div className="
                            mb-4
                            flex
                            items-center
                            gap-2
                        ">

                            <Crown
                                size={17}
                                className="text-red-400"
                            />

                            <p className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[2px]
                                text-gray-500
                            ">
                                Current Membership
                            </p>

                        </div>


                        <div className="
                            grid
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-4
                        ">

                            <UpgradeInfo
                                label="Member"
                                value={member.fullName}
                            />

                            <UpgradeInfo
                                label="Current Plan"
                                value={
                                    member.membership?.plan?.name ||
                                    "No Membership"
                                }
                            />

                            <UpgradeInfo
                                label="Expiry"
                                value={
                                    formatDate(
                                        member.membership?.planEndDate
                                    )
                                }
                            />

                            <UpgradeInfo
                                label="Outstanding"
                                value={formatCurrency(oldDueAmount)}
                                danger={oldDueAmount > 0}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        PLAN SELECTION
                    ================================================= */}

                    <div className="mt-6">

                        <div className="mb-4">

                            <p className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[2px]
                                text-red-500
                            ">
                                Membership Upgrade
                            </p>

                            <h3 className="
                                mt-1
                                text-lg
                                font-bold
                                text-white
                            ">
                                Select New Plan
                            </h3>

                        </div>


                        {plansLoading ? (

                            <div className="
                                flex
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/[0.025]
                                py-12
                            ">

                                <RefreshCw
                                    size={22}
                                    className="
                                        animate-spin
                                        text-red-400
                                    "
                                />

                            </div>

                        ) : (

                            <div className="
                                grid
                                gap-4
                                sm:grid-cols-2
                                lg:grid-cols-3
                            ">

                                {plans.map((plan) => {

                                    const selected =
                                        selectedPlan?._id === plan._id;

                                    const currentPlan =
                                        member.membership?.plan?._id ===
                                        plan._id;


                                    return (

                                        <button
                                            key={plan._id}
                                            type="button"
                                            disabled={currentPlan}
                                            onClick={() =>
                                                handlePlanSelection(
                                                    plan._id
                                                )
                                            }
                                            className={`
                                                relative
                                                rounded-2xl
                                                border
                                                p-5
                                                text-left
                                                transition-all
                                                duration-200

                                                ${
                                                    selected

                                                    ? `
                                                        border-red-500/60
                                                        bg-red-500/10
                                                        shadow-[0_15px_40px_rgba(239,68,68,.12)]
                                                    `

                                                    : `
                                                        border-white/10
                                                        bg-white/[0.025]
                                                        hover:border-white/20
                                                        hover:bg-white/[0.05]
                                                    `
                                                }

                                                ${
                                                    currentPlan
                                                        ? "cursor-not-allowed opacity-40"
                                                        : ""
                                                }
                                            `}
                                        >

                                            {selected && (

                                                <div className="
                                                    absolute
                                                    right-4
                                                    top-4
                                                ">

                                                    <CheckCircle2
                                                        size={19}
                                                        className="
                                                            text-red-400
                                                        "
                                                    />

                                                </div>

                                            )}


                                            <p className="
                                                pr-7
                                                font-bold
                                                text-white
                                            ">

                                                {plan.name}

                                            </p>


                                            <p className="
                                                mt-3
                                                text-2xl
                                                font-black
                                                text-white
                                            ">

                                                {formatCurrency(
                                                    plan.price
                                                )}

                                            </p>


                                            <p className="
                                                mt-1
                                                text-xs
                                                text-gray-500
                                            ">

                                                {plan.durationInDays} days

                                            </p>


                                            {currentPlan && (

                                                <span className="
                                                    mt-4
                                                    inline-block
                                                    rounded-full
                                                    bg-white/5
                                                    px-3
                                                    py-1
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-500
                                                ">

                                                    Current Plan

                                                </span>

                                            )}

                                        </button>

                                    );

                                })}

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        UPGRADE DETAILS
                    ================================================= */}

                    <div className="
                        mt-6
                        grid
                        gap-6
                        lg:grid-cols-2
                    ">


                        {/* LEFT */}

                        <div className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.025]
                            p-6
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-5
                            ">

                                <CalendarDays
                                    size={18}
                                    className="text-red-400"
                                />

                                <div>

                                    <h3 className="
                                        font-bold
                                        text-white
                                    ">
                                        Membership Details
                                    </h3>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-gray-500
                                    ">
                                        Configure the new membership
                                    </p>

                                </div>

                            </div>


                            <div className="space-y-5">

                                <FormField label="Membership Start Date">

                                    <input
                                        type="date"
                                        value={
                                            upgradeForm.startDate
                                        }
                                        onChange={(e) =>
                                            setUpgradeForm(
                                                (prev) => ({
                                                    ...prev,
                                                    startDate:
                                                        e.target.value
                                                })
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-black/30
                                            px-4
                                            py-3
                                            text-sm
                                            text-white
                                            outline-none
                                            transition
                                            focus:border-red-500/50
                                        "
                                    />

                                </FormField>


                                {selectedPlan && (

                                    <div className="
                                        rounded-xl
                                        border
                                        border-red-500/10
                                        bg-red-500/5
                                        p-4
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <span className="
                                                text-sm
                                                text-gray-400
                                            ">
                                                New Plan
                                            </span>

                                            <span className="
                                                font-bold
                                                text-white
                                            ">
                                                {selectedPlan.name}
                                            </span>

                                        </div>


                                        <div className="
                                            mt-3
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <span className="
                                                text-sm
                                                text-gray-400
                                            ">
                                                Duration
                                            </span>

                                            <span className="
                                                font-semibold
                                                text-gray-200
                                            ">
                                                {
                                                    selectedPlan.durationInDays
                                                } days
                                            </span>

                                        </div>


                                        <div className="
                                            mt-3
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <span className="
                                                text-sm
                                                text-gray-400
                                            ">
                                                Plan Price
                                            </span>

                                            <span className="
                                                font-bold
                                                text-white
                                            ">
                                                {
                                                    formatCurrency(
                                                        newPlanPrice
                                                    )
                                                }
                                            </span>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* RIGHT */}

                        <div className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.025]
                            p-6
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-5
                            ">

                                <WalletCards
                                    size={18}
                                    className="text-red-400"
                                />

                                <div>

                                    <h3 className="
                                        font-bold
                                        text-white
                                    ">
                                        Payment
                                    </h3>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-gray-500
                                    ">
                                        Manage existing and new payment
                                    </p>

                                </div>

                            </div>


                            {/* OLD DUE */}

                            {oldDueAmount > 0 && (

                                <div className="
                                    rounded-xl
                                    border
                                    border-orange-500/20
                                    bg-orange-500/5
                                    p-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                    ">

                                        <div>

                                            <p className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-orange-400
                                            ">
                                                Previous Due
                                            </p>

                                            <p className="
                                                mt-1
                                                text-lg
                                                font-black
                                                text-white
                                            ">
                                                {
                                                    formatCurrency(
                                                        oldDueAmount
                                                    )
                                                }
                                            </p>

                                        </div>


                                        <AlertCircle
                                            size={21}
                                            className="
                                                text-orange-400
                                            "
                                        />

                                    </div>


                                    <div className="mt-4">

                                        <label className="
                                            mb-2
                                            block
                                            text-xs
                                            text-gray-500
                                        ">
                                            Pay Previous Due
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            max={oldDueAmount}
                                            value={
                                                upgradeForm.oldDuePayment
                                            }
                                            onChange={(e) =>
                                                setUpgradeForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        oldDuePayment:
                                                            Math.min(
                                                                Number(
                                                                    e.target.value
                                                                ) || 0,
                                                                oldDueAmount
                                                            )
                                                    })
                                                )
                                            }
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-white/10
                                                bg-black/30
                                                px-4
                                                py-3
                                                text-sm
                                                text-white
                                                outline-none
                                                focus:border-orange-500/40
                                            "
                                        />

                                    </div>


                                    <div className="
                                        mt-3
                                        flex
                                        justify-between
                                        text-xs
                                    ">

                                        <span className="text-gray-500">
                                            Remaining after payment
                                        </span>

                                        <span className="
                                            font-bold
                                            text-orange-400
                                        ">
                                            {
                                                formatCurrency(
                                                    oldDueRemaining
                                                )
                                            }
                                        </span>

                                    </div>

                                </div>

                            )}


                            {/* NEW MEMBERSHIP */}

                            {selectedPlan && (

                                <div className="
                                    mt-4
                                    space-y-4
                                ">

                                    <FormField label="Discount">

                                        <input
                                            type="number"
                                            min="0"
                                            max={newPlanPrice}
                                            value={
                                                upgradeForm.discount
                                            }
                                            onChange={(e) =>
                                                setUpgradeForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        discount:
                                                            Math.min(
                                                                Number(
                                                                    e.target.value
                                                                ) || 0,
                                                                newPlanPrice
                                                            )
                                                    })
                                                )
                                            }
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-white/10
                                                bg-black/30
                                                px-4
                                                py-3
                                                text-sm
                                                text-white
                                                outline-none
                                                focus:border-red-500/40
                                            "
                                        />

                                    </FormField>


                                    <FormField label="New Membership Payment">

                                        <input
                                            type="number"
                                            min="0"
                                            max={newMembershipAmount}
                                            value={
                                                upgradeForm.newPayment
                                            }
                                            onChange={(e) =>
                                                setUpgradeForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        newPayment:
                                                            Math.min(
                                                                Number(
                                                                    e.target.value
                                                                ) || 0,
                                                                newMembershipAmount
                                                            )
                                                    })
                                                )
                                            }
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-white/10
                                                bg-black/30
                                                px-4
                                                py-3
                                                text-sm
                                                text-white
                                                outline-none
                                                focus:border-red-500/40
                                            "
                                        />

                                    </FormField>


                                    <div className="
                                        rounded-xl
                                        border
                                        border-white/5
                                        bg-black/20
                                        p-4
                                    ">

                                        <PaymentSummaryRow
                                            label="Plan Price"
                                            value={formatCurrency(
                                                newPlanPrice
                                            )}
                                        />

                                        <PaymentSummaryRow
                                            label="Discount"
                                            value={`- ${formatCurrency(
                                                discountAmount
                                            )}`}
                                        />

                                        <PaymentSummaryRow
                                            label="Payable"
                                            value={formatCurrency(
                                                newMembershipAmount
                                            )}
                                        />

                                        <div className="
                                            my-3
                                            border-t
                                            border-white/5
                                        " />

                                        <PaymentSummaryRow
                                            label="Paid Now"
                                            value={formatCurrency(
                                                newMembershipPayment
                                            )}
                                            positive
                                        />

                                        <PaymentSummaryRow
                                            label="Remaining"
                                            value={formatCurrency(
                                                newMembershipRemaining
                                            )}
                                            danger={
                                                newMembershipRemaining > 0
                                            }
                                        />

                                    </div>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* =================================================
                        TOTAL
                    ================================================= */}

                    <div className="
                        mt-6
                        rounded-2xl
                        border
                        border-red-500/20
                        bg-gradient-to-r
                        from-red-500/10
                        to-transparent
                        p-5
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[2px]
                                    text-red-400
                                ">
                                    Total Payment Today
                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-gray-500
                                ">
                                    Previous due + new membership payment
                                </p>

                            </div>


                            <p className="
                                text-3xl
                                font-black
                                text-white
                            ">

                                {
                                    formatCurrency(
                                        totalPayableNow
                                    )
                                }

                            </p>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    FOOTER
                ===================================================== */}

                <div
                    className="
                        flex
                        flex-col-reverse
                        gap-3
                        border-t
                        border-white/10
                        bg-black/20
                        px-7
                        py-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-end
                        lg:px-8
                    "
                >

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-gray-300
                            transition
                            hover:bg-white/10
                            hover:text-white
                        "
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        disabled={
                            !selectedPlan ||
                            upgradeSubmitting
                        }
                        onClick={handleUpgradeMembership}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-red-700
                            to-red-500
                            px-7
                            py-3
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_10px_30px_rgba(239,68,68,.2)]
                            transition
                            hover:-translate-y-0.5
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >

                        {upgradeSubmitting ? (

                            <RefreshCw
                                size={17}
                                className="animate-spin"
                            />

                        ) : (

                            <Sparkles size={17} />

                        )}

                        Confirm Upgrade

                    </button>

                </div>

            </div>

        </div>

    );

};
const UpgradeInfo = ({
    label,
    value,
    danger = false
}) => {

    return (

        <div>

            <p className="
                text-[10px]
                font-bold
                uppercase
                tracking-[1.5px]
                text-gray-600
            ">
                {label}
            </p>

            <p className={`
                mt-1
                truncate
                text-sm
                font-bold
                ${
                    danger
                        ? "text-orange-400"
                        : "text-gray-200"
                }
            `}>
                {value}
            </p>

        </div>

    );

};


const FormField = ({
    label,
    children
}) => {

    return (

        <div>

            <label className="
                mb-2
                block
                text-xs
                font-semibold
                text-gray-500
            ">
                {label}
            </label>

            {children}

        </div>

    );

};


const PaymentSummaryRow = ({
    label,
    value,
    positive = false,
    danger = false
}) => {

    return (

        <div className="
            flex
            items-center
            justify-between
            py-1.5
        ">

            <span className="
                text-xs
                text-gray-500
            ">
                {label}
            </span>

            <span className={`
                text-sm
                font-bold
                ${
                    danger
                        ? "text-orange-400"
                        : positive
                            ? "text-green-400"
                            : "text-gray-200"
                }
            `}>
                {value}
            </span>

        </div>

    );

};

export default ManageMember;