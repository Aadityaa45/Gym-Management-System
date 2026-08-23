// import React from "react";

// const ProductSales = ({
//     data = []
// }) => {

//     return (

//         <div
//             className="
//                 bg-[#0B1220]
//                 border border-slate-800/80
//                 rounded-2xl
//                 p-5
//             "
//         >

//             <div className="flex justify-between mb-5">

//                 <h2 className="text-white font-semibold">
//                     Product Sales
//                 </h2>

//                 <select
//                     className="
//                         bg-[#111827]
//                         border border-slate-700
//                         text-xs
//                         text-slate-400
//                         rounded-lg
//                         px-2
//                         py-1
//                     "
//                 >

//                     <option>This Week</option>
//                     <option>This Month</option>

//                 </select>

//             </div>


//             <div className="space-y-3">

//                 {data.map((item, index) => (

//                     <div
//                         key={index}
//                         className="
//                             flex
//                             items-center
//                             gap-3
//                             py-2
//                             border-b
//                             border-slate-800
//                         "
//                     >

//                         <div
//                             className="
//                                 w-9
//                                 h-9
//                                 rounded-full
//                                 bg-red-500
//                             "
//                         />


//                         <div className="flex-1">

//                             <p className="text-xs text-white">
//                                 {item.product}
//                             </p>

//                             <p className="text-[10px] text-slate-500">
//                                 Qty: {item.quantity}
//                             </p>

//                         </div>


//                         <p className="text-xs text-green-400 font-semibold">

//                             ₹{Number(
//                                 item.amount
//                             ).toLocaleString("en-IN")}

//                         </p>

//                     </div>

//                 ))}

//             </div>

//         </div>

//     );

// };

// export default ProductSales;
import React from "react";
import {
    Package,
    AlertTriangle,
    Boxes,
} from "lucide-react";

const ProductSales = ({ data = [] }) => {

    return (
        <div
            className="
                bg-[#0B1220]
                border border-slate-800
                rounded-2xl
                p-5
            "
        >

            <div className="
                flex
                items-center
                justify-between
                mb-5
            ">

                <div>

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-wider
                        text-slate-500
                    ">
                        Inventory
                    </p>

                    <h2 className="
                        text-white
                        font-semibold
                        mt-1
                    ">
                        Product Stock
                    </h2>

                </div>

                <Package
                    size={18}
                    className="text-cyan-400"
                />

            </div>


            <div className="space-y-3">

                {data.slice(0, 5).map(
                    (item, index) => (

                        <div
                            key={
                                item._id ||
                                index
                            }
                            className="
                                flex
                                items-center
                                gap-3
                                py-3
                                border-b
                                border-slate-800/70
                            "
                        >

                            <div className="
                                w-9
                                h-9
                                rounded-xl
                                bg-cyan-500/10
                                text-cyan-400
                                flex
                                items-center
                                justify-center
                            ">
                                <Boxes size={16} />
                            </div>


                            <div className="flex-1 min-w-0">

                                <p className="
                                    text-xs
                                    text-white
                                    truncate
                                ">
                                    {item.name}
                                </p>

                                <p className="
                                    text-[10px]
                                    text-slate-600
                                    mt-1
                                ">
                                    {item.category}
                                </p>

                            </div>


                            <div className="text-right">

                                <p className="
                                    text-xs
                                    font-semibold
                                    text-white
                                ">
                                    {item.quantity}
                                </p>

                                <p className="
                                    text-[10px]
                                    text-slate-600
                                ">
                                    units
                                </p>

                            </div>

                        </div>

                    )
                )}

            </div>


            {data.length === 0 && (

                <div className="
                    py-12
                    text-center
                    text-slate-600
                    text-sm
                ">
                    No products available
                </div>

            )}

        </div>
    );
};

export default ProductSales;