import React from "react";

import {
    ShoppingBag,
    TrendingUp,
    Package,
    ChevronRight,
} from "lucide-react";


const ProductSales = ({
    data = [],
}) => {

    /* ------------------------------------------------------------
       TOTAL UNITS
    ------------------------------------------------------------ */

    const totalUnits = data.reduce(
        (sum, item) =>
            sum + Number(item.quantity || 0),
        0
    );


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
                min-h-[390px]
                transition-all
                duration-300
                hover:border-[#3A2525]
            "
        >

            {/* =====================================================
                BACKGROUND GLOW
            ===================================================== */}

            <div
                className="
                    absolute
                    -top-20
                    -right-20
                    w-44
                    h-44
                    rounded-full
                    bg-red-600
                    blur-[100px]
                    opacity-[0.04]
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
                    bg-red-500/25
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

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            mb-1
                        "
                    >

                        <ShoppingBag
                            size={13}
                            className="text-red-500"
                        />

                        <p
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.18em]
                                font-semibold
                                text-red-500
                            "
                        >
                            Products
                        </p>

                    </div>


                    <h2
                        className="
                            text-lg
                            font-bold
                            text-white
                            tracking-tight
                        "
                    >
                        Product Sales
                    </h2>


                    <p
                        className="
                            text-[11px]
                            text-slate-600
                            mt-1
                        "
                    >
                        Best performing products
                    </p>

                </div>


                {/* TOTAL */}

                <div
                    className="
                        px-3
                        py-2
                        rounded-xl
                        bg-[#141010]
                        border
                        border-[#302020]
                        text-right
                    "
                >

                    <p
                        className="
                            text-sm
                            font-bold
                            text-white
                        "
                    >
                        {totalUnits}
                    </p>

                    <p
                        className="
                            text-[9px]
                            uppercase
                            tracking-wider
                            text-slate-600
                        "
                    >
                        Units
                    </p>

                </div>

            </div>


            {/* =====================================================
                PRODUCT LIST
            ===================================================== */}

            {data.length > 0 ? (

                <div
                    className="
                        relative
                        z-10
                        space-y-1
                    "
                >

                    {data.slice(0, 5).map(
                        (item, index) => (

                            <div
                                key={
                                    item._id ||
                                    item.product ||
                                    index
                                }
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
                                    hover:bg-[#110D0D]
                                    hover:border-[#302020]
                                    transition-all
                                    duration-200
                                "
                            >

                                {/* =================================================
                                    RANK
                                ================================================= */}

                                <div
                                    className="
                                        w-5
                                        shrink-0
                                        text-center
                                    "
                                >

                                    <span
                                        className={`
                                            text-[10px]
                                            font-bold
                                            ${
                                                index === 0
                                                    ? "text-red-400"
                                                    : "text-slate-600"
                                            }
                                        `}
                                    >
                                        {String(
                                            index + 1
                                        ).padStart(2, "0")}
                                    </span>

                                </div>


                                {/* =================================================
                                    PRODUCT ICON
                                ================================================= */}

                                <div
                                    className={`
                                        w-10
                                        h-10
                                        shrink-0
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        border
                                        ${
                                            index === 0
                                                ? "bg-red-500/10 border-red-500/20"
                                                : "bg-[#141010] border-[#302020]"
                                        }
                                    `}
                                >

                                    <Package
                                        size={16}
                                        className={
                                            index === 0
                                                ? "text-red-400"
                                                : "text-slate-500"
                                        }
                                    />

                                </div>


                                {/* =================================================
                                    PRODUCT INFO
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
                                        {item.product ||
                                            "Unknown Product"}
                                    </p>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            mt-1
                                        "
                                    >

                                        <TrendingUp
                                            size={10}
                                            className="text-green-500"
                                        />

                                        <span
                                            className="
                                                text-[10px]
                                                text-slate-600
                                            "
                                        >
                                            {Number(
                                                item.quantity || 0
                                            )}{" "}
                                            units sold
                                        </span>

                                    </div>

                                </div>


                                {/* =================================================
                                    REVENUE
                                ================================================= */}

                                <div
                                    className="
                                        text-right
                                        shrink-0
                                    "
                                >

                                    <p
                                        className="
                                            text-xs
                                            font-bold
                                            text-slate-200
                                        "
                                    >
                                        ₹
                                        {Number(
                                            item.amount || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>


                                    <p
                                        className="
                                            text-[9px]
                                            text-slate-700
                                            mt-1
                                        "
                                    >
                                        Revenue
                                    </p>

                                </div>


                                {/* =================================================
                                    ARROW
                                ================================================= */}

                                <ChevronRight
                                    size={13}
                                    className="
                                        text-slate-700
                                        group-hover:text-red-500
                                        transition-colors
                                    "
                                />

                            </div>

                        )
                    )}

                </div>

            ) : (

                /* =================================================
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
                            bg-[#141010]
                            border
                            border-[#302020]
                            flex
                            items-center
                            justify-center
                            mb-3
                        "
                    >

                        <ShoppingBag
                            size={20}
                            className="text-slate-600"
                        />

                    </div>


                    <p
                        className="
                            text-sm
                            font-semibold
                            text-slate-400
                        "
                    >
                        No product sales
                    </p>


                    <p
                        className="
                            text-[10px]
                            text-slate-700
                            mt-1
                        "
                    >
                        Product sales will appear here.
                    </p>

                </div>

            )}

        </div>
    );
};


export default ProductSales;