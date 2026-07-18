// import React from "react";
// import { Edit2, CheckCircle } from "lucide-react";

// const PlanCard = ({
//   name,
//   price,
//   durationInDays,
//   features,
//   accentColor,
//   icon: Icon,
//   onEdit,
//   totalMembers = 0,
// }) => {
//   return (
//     <div
//       className="
//         group
//         relative
//         overflow-hidden
//         rounded-[32px]
//         border
//         border-white/10
//         bg-white/5
//         backdrop-blur-3xl
//         p-7
//         min-h-[560px]
//         flex
//         flex-col
//         justify-between
//         transition-all
//         duration-500
//         hover:-translate-y-2
//       "
//       style={{
//         boxShadow: `0 25px 60px rgba(0,0,0,.45),0 0 40px ${accentColor}15`,
//       }}
//     >
//       {/* Glow */}
//       <div
//         className="absolute -right-20 -top-20 h-52 w-52 rounded-full blur-[90px] opacity-25"
//         style={{
//           background: accentColor,
//         }}
//       />

//       <div className="relative z-10">

//         {/* Header */}

//         <div className="flex justify-between items-start">

//           <div>

//             <p
//               className="text-xs uppercase tracking-[4px]"
//               style={{ color: accentColor }}
//             >
//               Membership
//             </p>

//             <h2 className="mt-2 text-3xl font-black text-white">
//               {name}
//             </h2>

//           </div>

//           <div
//             className="
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               rounded-2xl
//             "
//             style={{
//               background: `${accentColor}20`,
//             }}
//           >
//             <Icon
//               size={30}
//               color={accentColor}
//             />
//           </div>

//         </div>

//         {/* Price */}

//         <div className="mt-10">

//           <div className="flex items-end gap-2">

//             <h1 className="text-6xl font-black text-white">
//               ₹{price}
//             </h1>

//             <span className="pb-2 text-gray-400">
//               / {durationInDays} Days
//             </span>

//           </div>

//         </div>

//         {/* Divider */}

//         <div
//           className="my-8 h-px w-full"
//           style={{
//             background: "rgba(255,255,255,.08)",
//           }}
//         />

//         {/* Features */}

//         <div className="space-y-5">

//           {features.map((feature, index) => (

//             <div
//               key={index}
//               className="flex items-start gap-3"
//             >
//               <CheckCircle
//                 size={20}
//                 color={accentColor}
//                 className="mt-0.5 shrink-0"
//               />

//               <span className="text-[15px] leading-6 text-gray-300">
//                 {feature}
//               </span>

//             </div>

//           ))}

//         </div>

//       </div>

//       {/* Footer */}

//       <div className="relative z-10 mt-10">

//         <div
//           className="
//             rounded-2xl
//             border
//             border-white/10
//             bg-black/20
//             p-5
//             mb-6
//           "
//         >

//           <p className="text-xs uppercase tracking-[3px] text-gray-500">
//             Active Members
//           </p>

//           <h3 className="mt-2 text-4xl font-black text-white">
//             {totalMembers}
//           </h3>

//         </div>

//         <button
//           onClick={onEdit}
//           className="
//             group
//             flex
//             h-14
//             w-full
//             items-center
//             justify-center
//             gap-3
//             rounded-2xl
//             font-semibold
//             transition-all
//             duration-300
//             hover:scale-[1.02]
//             cursor-pointer
//           "
//           style={{
//             background: accentColor,
//             color: "#fff",
//           }}
//         >
//           <Edit2
//             size={18}
//             className="transition-transform duration-300 group-hover:rotate-12"
//           />

//           Edit Membership

//         </button>

//       </div>

//     </div>
//   );
// };

// export default PlanCard;
import React from "react";
import { Edit2, CheckCircle, Users, Sparkles } from "lucide-react";

const PlanCard = ({
  name,
  price,
  durationInDays,
  features,
  accentColor,
  icon: Icon,
  totalMembers = 0,
  onEdit,
}) => {

  const perDayPrice = Math.ceil(price / durationInDays);

  return (

    <div
      className="
      group
      relative
      overflow-hidden
      rounded-[34px]
      border
      border-white/10
      bg-gradient-to-br
      from-white/[0.06]
      via-white/[0.03]
      to-black/30
      backdrop-blur-3xl
      p-8
      w-[340px]
      transition-all
      duration-500
      hover:-translate-y-3
      hover:border-white/20
      "
      style={{
        boxShadow: `
        0 30px 70px rgba(0,0,0,.55),
        inset 0 1px rgba(255,255,255,.05),
        0 0 60px ${accentColor}20
        `,
      }}
    >

      {/* Glow */}

      <div
        className="
        absolute
        -right-20
        -top-20
        h-60
        w-60
        rounded-full
        blur-[120px]
        opacity-30
        transition-all
        duration-500
        group-hover:opacity-50
        "
        style={{
          background: accentColor,
        }}
      />

      <div
        className="
        absolute
        -left-16
        bottom-0
        h-40
        w-40
        rounded-full
        blur-[100px]
        opacity-20
        "
        style={{
          background: accentColor,
        }}
      />

      {/* Content */}

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1
              text-[11px]
              uppercase
              tracking-[4px]
              "
              style={{
                borderColor: `${accentColor}50`,
                color: accentColor,
                background: `${accentColor}12`,
              }}
            >

              <Sparkles size={12} />

              Membership

            </div>

            <h2 className="mt-5 text-[38px] font-black leading-none text-white">

              {name}

            </h2>

          </div>

          <div
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-[24px]
            transition-all
            duration-500
            group-hover:rotate-12
            group-hover:scale-110
            "
            style={{
              background: `${accentColor}18`,
            }}
          >

            <Icon
              size={36}
              color={accentColor}
            />

          </div>

        </div>

        {/* Price */}

        <div className="mt-12">

          <div className="flex items-end gap-2">

            <h1 className="text-7xl font-black tracking-tight text-white">

              ₹{price}

            </h1>

            <span className="pb-3 text-lg text-gray-400">

              / {durationInDays} Days

            </span>

          </div>

          <p
            className="mt-3 text-lg font-semibold"
            style={{
              color: accentColor,
            }}
          >

            ₹{perDayPrice} / day

          </p>

        </div>

        <div className="my-8 h-px bg-white/10"></div>
                {/* Features */}

        <div className="space-y-5">

          <p className="text-sm uppercase tracking-[4px] text-gray-500">

            Included Benefits

          </p>

          <div className="space-y-4">

            {features.map((feature, index) => (

              <div
                key={index}
                className="
                  group/item
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  px-4
                  py-4
                  transition-all
                  duration-300
                  hover:border-white/10
                  hover:bg-white/[0.05]
                "
              >

                <div
                  className="
                    mt-0.5
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-300
                    group-hover/item:scale-110
                  "
                  style={{
                    background: `${accentColor}18`,
                  }}
                >

                  <CheckCircle
                    size={18}
                    color={accentColor}
                  />

                </div>

                <div>

                  <h4 className="font-semibold text-white">

                    {feature}

                  </h4>

                  <p className="mt-1 text-sm text-gray-500">

                    Included with this membership plan.

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Statistics */}

        <div className="grid grid-cols-2 gap-4">

          {/* Members */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
            "
          >

            <div className="flex items-center gap-2">

              <Users
                size={18}
                color={accentColor}
              />

              <span className="text-xs uppercase tracking-[3px] text-gray-500">

                Members

              </span>

            </div>

            <h3 className="mt-4 text-4xl font-black text-white">

              {totalMembers}

            </h3>

          </div>

          {/* Revenue */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-5
            "
          >

            <span className="text-xs uppercase tracking-[3px] text-gray-500">

              Revenue

            </span>

            <h3
              className="mt-4 text-2xl font-black"
              style={{
                color: accentColor,
              }}
            >

              ₹0

            </h3>

            <p className="mt-1 text-xs text-gray-500">

              Total Generated

            </p>

          </div>

        </div>
                {/* Bottom CTA */}

        <div className="mt-10">

          <button
            onClick={onEdit}
            className="
              group/button
              relative
              flex
              h-16
              w-full
              items-center
              justify-center
              gap-3
              overflow-hidden
              rounded-2xl
              font-semibold
              text-lg
              text-white
              transition-all
              duration-500
              hover:scale-[1.02]
              active:scale-[0.98]
            "
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
              boxShadow: `0 15px 35px ${accentColor}40`,
            }}
          >

            {/* Animated Shine */}

            <span
              className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                transition-transform
                duration-700
                group-hover/button:translate-x-full
              "
            />

            <Edit2
              size={19}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover/button:rotate-12
              "
            />

            <span className="relative z-10">

              Manage Membership

            </span>

            <svg
              className="
                relative
                z-10
                h-5
                w-5
                transition-transform
                duration-300
                group-hover/button:translate-x-2
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 5l7 7-7 7"
              />
            </svg>

          </button>

        </div>

      </div>
    </div>

  );
};

export default PlanCard;