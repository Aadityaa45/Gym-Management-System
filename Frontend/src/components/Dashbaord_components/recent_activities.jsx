// import React from "react";

// const RecentActivities = ({
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
//                     Recent Activities
//                 </h2>

//                 <button className="text-xs text-blue-400">
//                     View All
//                 </button>

//             </div>


//             <div className="space-y-3">

//                 {data.map((activity, index) => (

//                     <div
//                         key={index}
//                         className="
//                             flex
//                             gap-3
//                             items-center
//                             py-2
//                             border-b
//                             border-slate-800
//                         "
//                     >

//                         <div
//                             className="
//                                 w-8
//                                 h-8
//                                 rounded-lg
//                                 bg-purple-500/20
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-purple-400
//                             "
//                         >
//                             •
//                         </div>


//                         <div>

//                             <p className="text-xs text-slate-300">
//                                 {activity.message}
//                             </p>

//                             <p className="text-[10px] text-slate-500 mt-1">
//                                 {activity.time}
//                             </p>

//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </div>

//     );

// };

// export default RecentActivities;
import React from "react";
import {
    Activity,
} from "lucide-react";

const RecentActivities = ({
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
                        Activity
                    </p>

                    <h2 className="
                        text-white
                        font-semibold
                        mt-1
                    ">
                        Recent Activities
                    </h2>

                </div>

                <Activity
                    size={18}
                    className="text-purple-400"
                />

            </div>


            {data.length > 0 ? (

                <div className="space-y-2">

                    {data.map(
                        (activity, index) => (

                            <div
                                key={
                                    activity._id ||
                                    index
                                }
                                className="
                                    flex
                                    gap-3
                                    items-center
                                    py-3
                                    border-b
                                    border-slate-800/70
                                "
                            >

                                <div className="
                                    w-9
                                    h-9
                                    rounded-xl
                                    bg-purple-500/10
                                    text-purple-400
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    •
                                </div>


                                <div>

                                    <p className="
                                        text-xs
                                        text-slate-300
                                    ">
                                        {
                                            activity.message
                                        }
                                    </p>

                                    <p className="
                                        text-[10px]
                                        text-slate-600
                                        mt-1
                                    ">
                                        {
                                            activity.time
                                        }
                                    </p>

                                </div>

                            </div>

                        )
                    )}

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
                        bg-purple-500/10
                        text-purple-400
                        flex
                        items-center
                        justify-center
                        mb-3
                    ">
                        <Activity size={20} />
                    </div>

                    <p className="
                        text-sm
                        text-slate-400
                    ">
                        No recent activities
                    </p>

                    <p className="
                        text-[10px]
                        text-slate-600
                        mt-1
                    ">
                        Activity will appear here.
                    </p>

                </div>

            )}

        </div>
    );
};

export default RecentActivities;