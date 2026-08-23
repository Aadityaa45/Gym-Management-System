// import React from "react";

// const UpcomingExpiries = ({
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
//                     Upcoming Expiries
//                 </h2>

//                 <button className="text-xs text-blue-400">
//                     View All
//                 </button>

//             </div>


//             <div className="space-y-3">

//                 {data.map((member) => (

//                     <div
//                         key={member.memberId}
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
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-xs
//                                 font-bold
//                             "
//                         >
//                             {member.name
//                                 ?.charAt(0)
//                                 ?.toUpperCase()}
//                         </div>


//                         <div className="flex-1 min-w-0">

//                             <p className="text-sm text-white truncate">
//                                 {member.name}
//                             </p>

//                             <p className="text-[11px] text-slate-500">
//                                 {member.plan}
//                             </p>

//                         </div>


//                         <div className="text-right">

//                             <p className="text-xs text-yellow-400 font-semibold">
//                                 {member.daysLeft} Days Left
//                             </p>

//                             <p className="text-[10px] text-slate-500">
//                                 {new Date(
//                                     member.expiryDate
//                                 ).toLocaleDateString(
//                                     "en-IN"
//                                 )}
//                             </p>

//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </div>

//     );

// };

// export default UpcomingExpiries;
import React from "react";
import {
    CalendarClock,
} from "lucide-react";

const UpcomingExpiries = ({
    data = [],
}) => {

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
                        Memberships
                    </p>

                    <h2 className="
                        text-white
                        font-semibold
                        mt-1
                    ">
                        Upcoming Expiries
                    </h2>

                </div>

                <CalendarClock
                    size={18}
                    className="text-yellow-400"
                />

            </div>


            {data.length > 0 ? (

                <div className="space-y-2">

                    {data.map((member) => (

                        <div
                            key={member.memberId}
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
                                bg-red-500/10
                                text-red-400
                                flex
                                items-center
                                justify-center
                                text-xs
                                font-bold
                            ">
                                {member.name
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>


                            <div className="
                                flex-1
                                min-w-0
                            ">

                                <p className="
                                    text-xs
                                    text-white
                                    truncate
                                ">
                                    {member.name}
                                </p>

                                <p className="
                                    text-[10px]
                                    text-slate-600
                                    mt-1
                                ">
                                    {member.plan}
                                </p>

                            </div>


                            <div className="
                                text-right
                            ">

                                <p className="
                                    text-xs
                                    text-yellow-400
                                    font-semibold
                                ">
                                    {member.daysLeft} days
                                </p>

                                <p className="
                                    text-[10px]
                                    text-slate-600
                                ">
                                    {new Date(
                                        member.expiryDate
                                    ).toLocaleDateString(
                                        "en-IN"
                                    )}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="
                    h-[220px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                ">

                    <div className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-green-500/10
                        text-green-400
                        flex
                        items-center
                        justify-center
                        mb-3
                    ">
                        ✓
                    </div>

                    <p className="
                        text-sm
                        text-slate-400
                    ">
                        No upcoming expiries
                    </p>

                    <p className="
                        text-[10px]
                        text-slate-600
                        mt-1
                    ">
                        All memberships are currently active.
                    </p>

                </div>

            )}

        </div>
    );
};

export default UpcomingExpiries;