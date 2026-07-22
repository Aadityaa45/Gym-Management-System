// // import {
// //   Edit2,
// //   ShoppingCart,
// //   Package,
// //   AlertTriangle,
// // } from "lucide-react";

// // const ProductCard = ({ product, onEdit, onSell }) => {
// //   const getStatus = () => {
// //     if (product.quantity === 0)
// //       return {
// //         label: "Out of Stock",
// //         color: "bg-red-500/15 text-red-400 border-red-500/30",
// //       };

// //     if (product.quantity <= 10)
// //       return {
// //         label: "Low Stock",
// //         color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
// //       };

// //     return {
// //       label: "In Stock",
// //       color: "bg-green-500/15 text-green-400 border-green-500/30",
// //     };
// //   };

// //   const status = getStatus();

// //   return (
// //     <div
// //       className="
// //        w-full
// //     max-w-[310px]
// //     mx-auto
// //     bg-[#091729]
// //     border
// //     border-[#1d3557]
// //     rounded-3xl
// //     overflow-hidden
// //     transition-all
// //     duration-300
// //     hover:-translate-y-2
// //     hover:border-violet-500
// //     hover:shadow-[0_20px_45px_rgba(0,0,0,.45)]
// //     "
// //     >
// //       {/* Top */}
// //       <div className="flex justify-between items-center p-4">
// //         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300">
// //           {product.category}
// //         </span>

// //         <span
// //           className={`px-3 py-1 rounded-full border text-xs font-semibold ${status.color}`}
// //         >
// //           {status.label}
// //         </span>
// //       </div>

// //       {/* Image */}

// //       <div className="flex justify-center items-center h-48 px-5">
// //         <img
// //           src={product.image}
// //           alt={product.name}
// //           className="
// //             h-full
// //             object-contain
// //             transition-all
// //             duration-300
// //             group-hover:scale-110
// //           "
// //         />
// //       </div>

// //       {/* Body */}

// //       <div className="px-5 pb-5">

// //         <p className="text-gray-400 text-sm truncate">
// //           {product.brand}
// //         </p>

// //         <h3 className="text-white font-semibold text-lg leading-6 mt-1 line-clamp-2 h-12">
// //           {product.name}
// //         </h3>

// //         <h2 className="text-2xl font-bold text-violet-400 mt-3">
// //           ₹{product.price}
// //         </h2>

// //         {/* Quantity */}

// //         <div className="mt-5">

// //           <div className="flex justify-between text-sm mb-2">

// //             <span className="text-gray-400">
// //               Available Stock
// //             </span>

// //             <span className="font-semibold text-white">
// //               {product.quantity} Units
// //             </span>

// //           </div>

// //           <div className="w-full h-2 rounded-full bg-[#162842] overflow-hidden">

// //             <div
// //               className={`h-full rounded-full transition-all duration-500 ${
// //                 product.quantity === 0
// //                   ? "bg-red-500 w-0"
// //                   : product.quantity <= 10
// //                   ? "bg-yellow-500 w-1/4"
// //                   : "bg-green-500 w-3/4"
// //               }`}
// //             />

// //           </div>

// //         </div>

// //         {/* Actions */}

// //         <div className="grid grid-cols-2 gap-3 mt-6">

// //           <button
// //             onClick={() => onEdit(product)}
// //             className="
// //             flex
// //             items-center
// //             justify-center
// //             gap-2
// //             py-3
// //             rounded-xl
// //             bg-[#12233d]
// //             border
// //             border-[#294872]
// //             text-indigo-300
// //             hover:bg-indigo-500
// //             hover:text-white
// //             transition-all
// //           "
// //           >
// //             <Edit2 size={18} />
// //             Edit
// //           </button>

// //           <button
// //             onClick={() => onSell(product)}
// //             disabled={product.quantity === 0}
// //             className="
// //             flex
// //             items-center
// //             justify-center
// //             gap-2
// //             py-3
// //             rounded-xl
// //             bg-violet-600
// //             hover:bg-violet-500
// //             disabled:bg-gray-700
// //             disabled:cursor-not-allowed
// //             text-white
// //             transition-all
// //           "
// //           >
// //             <ShoppingCart size={18} />
// //             Sell
// //           </button>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;
// import { Edit2, ShoppingCart } from "lucide-react";

// const ProductCard = ({ product, onEdit, onSell }) => {
//   const getStatus = () => {
//     if (product.quantity === 0) {
//       return {
//         label: "Out of Stock",
//         color: "bg-red-500/15 text-red-400 border-red-500/30",
//       };
//     }

//     if (product.quantity <= 10) {
//       return {
//         label: "Low Stock",
//         color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
//       };
//     }

//     return {
//       label: "In Stock",
//       color: "bg-green-500/15 text-green-400 border-green-500/30",
//     };
//   };

//   const status = getStatus();

//   return (
//     <div
//       className="
//       w-full
//       max-w-[280px]
//       bg-[#091729]
//       border
//       border-[#1d3557]
//       rounded-2xl
//       overflow-hidden
//       transition-all
//       duration-300
//       hover:-translate-y-2
//       hover:border-violet-500
//       hover:shadow-[0_15px_35px_rgba(0,0,0,.45)]
//       "
//     >
//       {/* Top */}

//       <div className="flex justify-between items-center px-4 pt-4 pb-2">
//         <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-300">
//           {product.category}
//         </span>

//         <span
//           className={`px-3 py-1 rounded-full border text-[11px] font-semibold ${status.color}`}
//         >
//           {status.label}
//         </span>
//       </div>

//       {/* Product Image */}

//       <div className="flex justify-center items-center h-36 p-4">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="
//           h-full
//           object-contain
//           transition-all
//           duration-300
//           hover:scale-105
//         "
//         />
//       </div>

//       {/* Body */}

//       <div className="px-4 pb-4">

//         {/* Brand */}

//         <p className="text-xs text-gray-400 truncate">
//           {product.brand}
//         </p>

//         {/* Product Name */}

//         <h3
//           className="
//           text-white
//           font-semibold
//           text-base
//           leading-5
//           mt-1
//           line-clamp-2
//           min-h-[40px]
//         "
//         >
//           {product.name}
//         </h3>

//         {/* Price */}

//         <h2 className="text-xl font-bold text-violet-400 mt-2">
//           ₹{product.price}
//         </h2>

//         {/* Stock */}

//         <div className="mt-3 flex justify-between items-center">

//           <div className="text-sm text-gray-400">
//             Stock
//           </div>

//           <div
//             className={`px-2 py-1 rounded-lg text-xs font-semibold ${status.color}`}
//           >
//             {product.quantity} Units
//           </div>

//         </div>

//         {/* Action Buttons */}

//         <div className="grid grid-cols-2 gap-3 mt-4">

//           <button
//             onClick={() => onEdit(product)}
//             className="
//             flex
//             items-center
//             justify-center
//             gap-2
//             py-2.5
//             rounded-xl
//             bg-[#12233d]
//             border
//             border-[#294872]
//             text-indigo-300
//             hover:bg-indigo-500
//             hover:text-white
//             transition-all
//           "
//           >
//             <Edit2 size={17} />
//             <span className="text-sm font-medium">
//               Edit
//             </span>
//           </button>

//           <button
//             onClick={() => onSell(product)}
//             disabled={product.quantity === 0}
//             className="
//             flex
//             items-center
//             justify-center
//             gap-2
//             py-2.5
//             rounded-xl
//             bg-violet-600
//             hover:bg-violet-500
//             disabled:bg-gray-700
//             disabled:cursor-not-allowed
//             text-white
//             transition-all
//           "
//           >
//             <ShoppingCart size={17} />
//             <span className="text-sm font-medium">
//               Sell
//             </span>
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import {
//   Edit2,
//   ShoppingCart,
//   PackagePlus,
// } from "lucide-react";

// const ProductCard = ({
//   product,
//   onEdit,
//   onSell,
//   onRestock,
// }) => {
//   const getStatus = () => {
//     if (product.quantity === 0)
//       return {
//         label: "Out of Stock",
//         color: "bg-red-500/15 text-red-400 border-red-500/30",
//       };

//     if (product.quantity <= 10)
//       return {
//         label: "Low Stock",
//         color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
//       };

//     return {
//       label: "In Stock",
//       color: "bg-green-500/15 text-green-400 border-green-500/30",
//     };
//   };

//   const status = getStatus();

//   return (
//     <div
//       className="
//       w-full
//       max-w-[300px]
//       bg-[#091729]
//       border
//       border-[#1d3557]
//       rounded-2xl
//       overflow-hidden
//       transition-all
//       duration-300
//       hover:-translate-y-1
//       hover:border-violet-500
//       hover:shadow-xl
//     "
//     >
//       {/* Top */}
//       <div className="flex justify-between items-center px-4 pt-4">
//         <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-indigo-500/15 text-indigo-300">
//           {product.category}
//         </span>

//         <span
//           className={`px-3 py-1 rounded-full border text-[11px] font-medium ${status.color}`}
//         >
//           {status.label}
//         </span>
//       </div>

//       {/* Image */}
//       <div className="h-36 flex items-center justify-center px-5 mt-2">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="max-h-full object-contain transition duration-300 hover:scale-105"
//         />
//       </div>

//       {/* Content */}
//       <div className="px-4 pb-4">

//         <p className="text-xs text-gray-400 truncate">
//           {product.brand}
//         </p>

//         <h3 className="text-white text-base font-semibold mt-1 truncate">
//           {product.name}
//         </h3>

//         <div className="flex justify-between items-center mt-3">
//           <h2 className="text-xl font-bold text-violet-400">
//             ₹{product.price}
//           </h2>

//           <span className="text-xs text-gray-300">
//             {product.quantity} pcs
//           </span>
//         </div>

//         {/* Stock Bar */}

//         <div className="mt-3">

//           <div className="w-full h-1.5 bg-[#162842] rounded-full overflow-hidden">

//             <div
//               className={`h-full rounded-full ${
//                 product.quantity === 0
//                   ? "bg-red-500 w-0"
//                   : product.quantity <= 10
//                   ? "bg-yellow-500 w-1/4"
//                   : product.quantity <= 30
//                   ? "bg-green-500 w-2/4"
//                   : "bg-green-500 w-full"
//               }`}
//             />

//           </div>

//         </div>

//         {/* Buttons */}

//         <div className="grid grid-cols-3 gap-2 mt-4">

//           <button
//             onClick={() => onEdit(product)}
//             className="
//             h-10
//             rounded-lg
//             bg-[#12233d]
//             border
//             border-[#294872]
//             flex
//             items-center
//             justify-center
//             hover:bg-indigo-500
//             transition
//           "
//           >
//             <Edit2 size={17} />
//           </button>

//           <button
//             onClick={() => onRestock(product)}
//             className="
//             h-10
//             rounded-lg
//             bg-emerald-500/10
//             border
//             border-emerald-500/30
//             text-emerald-400
//             flex
//             items-center
//             justify-center
//             hover:bg-emerald-500
//             hover:text-white
//             transition
//           "
//           >
//             <PackagePlus size={17} />
//           </button>

//           <button
//             onClick={() => onSell(product)}
//             disabled={product.quantity === 0}
//             className="
//             h-10
//             rounded-lg
//             bg-violet-600
//             text-white
//             flex
//             items-center
//             justify-center
//             hover:bg-violet-500
//             disabled:bg-gray-700
//             transition
//           "
//           >
//             <ShoppingCart size={17} />
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import {
  Edit2,
  ShoppingCart,
  PackagePlus,
  ShieldCheck,
} from "lucide-react";

const ProductCard = ({
  product,
  onEdit,
  onSell,
  onRestock,
}) => {

  const getStatus = () => {

    if (product.quantity === 0)
      return {
        label: "Out of Stock",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
      };

    if (product.quantity <= 10)
      return {
        label: "Low Stock",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
      };

    return {
      label: "In Stock",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    };
  };

  const status = getStatus();

  const stockPercentage = Math.min(
    (product.quantity / 40) * 100,
    100
  );

  return (

<div
className="

group
relative

w-full
max-w-[300px]

overflow-hidden

rounded-[26px]

border
border-[#2a2a2a]

bg-gradient-to-b
from-[#171717]
via-[#121212]
to-[#0c0c0c]

transition-all
duration-500

hover:-translate-y-1
hover:border-red-500/40

hover:shadow-[0_20px_50px_rgba(255,0,0,.08)]

"
>

{/* Ambient Glow */}

<div
className="
absolute
inset-0
opacity-0
group-hover:opacity-100
transition-all
duration-500
bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,.08),transparent_45%)]
"
/>

{/* Top Section */}

<div className="relative z-10 p-4">

<div className="flex justify-between items-center">

<div
className="
px-3
py-1.5

rounded-full

bg-red-500/10

border
border-red-500/20

text-red-400

text-[10px]

uppercase
tracking-[2px]

font-semibold
"
>

{product.category}

</div>

<div
className={`
flex
items-center
gap-1.5

px-3
py-1.5

rounded-full

border

${status.bg}
${status.border}
`}
>

<ShieldCheck
size={12}
className={status.color}
/>

<span
className={`
text-[10px]
font-semibold
uppercase
tracking-wide
${status.color}
`}
>

{status.label}

</span>

</div>

</div>

{/* Product Image */}

<div
className="
relative

mt-3

h-[125px]

rounded-2xl

overflow-hidden

bg-gradient-to-br
from-[#1a1a1a]
to-[#131313]

border
border-[#242424]

flex
items-center
justify-center
"
>

{/* Glow */}

<div
className="
absolute

w-40
h-40

rounded-full

bg-red-500/10

blur-3xl
"
/>

<img
src={product.image}
alt={product.name}
className="
relative
z-10

h-[110px]

object-contain

transition-all
duration-500

group-hover:scale-105
group-hover:-translate-y-1
"
/>

</div>
{/* Product Details */}

<div className="mt-5">

  {/* Brand */}

  <p
    className="
    text-[10px]
    uppercase
    tracking-[2px]
    text-red-400
    font-semibold
    truncate
  "
  >
    {product.brand || "Premium Brand"}
  </p>

  {/* Product Name */}

  <h2
    className="
    mt-1.5
text-[18px]
leading-[28px]
min-h-[56px]
  "
  >
    {product.name}
  </h2>

</div>

{/* Divider */}

<div
className="
my-1

h-px

bg-gradient-to-r
from-transparent
via-[#272727]
to-transparent
"
/>

{/* Price & Stock */}

<div className="flex justify-between items-end">

  {/* Price */}

  <div>

    <p
      className="
      text-[10px]

      uppercase

      tracking-[3px]

      text-gray-500
    "
    >
      Price
    </p>

    <h2
      className="
      mt-1

      text-[32px]

      font-black

      leading-none

      text-red-500
    "
    >
      ₹{product.price}
    </h2>

  </div>

  {/* Stock */}

  <div className="text-right">

    <p
      className="
      text-[10px]

      uppercase

      tracking-[3px]

      text-gray-500
    "
    >
      Available
    </p>

    <h3
      className="
      text-[24px]

      font-black

      leading-none

      text-white
    "
    >
      {product.quantity}
    </h3>

    <p
      className="
      text-xs
      text-gray-400
      mt-1
    "
    >
      pcs
    </p>

  </div>

</div>

{/* Stock Bar */}

<div className="mt-4">

  <div className="flex justify-between mb-1">

    <span
      className="
      text-xs
      text-gray-500
    "
    >
      Inventory
    </span>

    <span
      className={`
      text-xs
      font-semibold

      ${status.color}
    `}
    >
      {product.quantity} Left
    </span>

  </div>

  <div
    className="
    h-2

    rounded-full

    overflow-hidden

    bg-[#1c1c1c]
  "
  >

    <div
      className={`
      h-full

      rounded-full

      transition-all
      duration-700

      ${
        product.quantity === 0
          ? "bg-red-600"
          : product.quantity <= 10
          ? "bg-yellow-500"
          : "bg-gradient-to-r from-red-600 via-red-500 to-red-400"
      }
      `}
      style={{
        width: `${stockPercentage}%`,
      }}
    />

  </div>

</div>

{/* Divider */}

<div
className="
mt-4
mb-4

border-t

border-[#242424]
"
/>
{/* Action Buttons */}

<div className="grid grid-cols-2 gap-3">

  {/* Edit */}

  <button
    onClick={() => onEdit(product)}
    className="
    h-10

    rounded-xl

    border
    border-[#2a2a2a]

    bg-[#181818]

    hover:border-red-500/40
    hover:bg-[#1e1e1e]

    transition-all
    duration-300

    flex
    items-center
    justify-center
    gap-2

    text-white
  "
  >

    <Edit2 size={17} />

    <span className="font-semibold text-[13px]">
      Edit
    </span>

  </button>

  {/* Restock */}

  <button
    onClick={() => onRestock(product)}
    className="
    h-11

    rounded-xl

    border
    border-[#2a2a2a]

    bg-[#181818]

    hover:border-emerald-500/40
    hover:bg-[#1e1e1e]

    transition-all
    duration-300

    flex
    items-center
    justify-center
    gap-2

    text-white
  "
  >

    <PackagePlus
      size={17}
      className="text-emerald-400"
    />

    <span className="font-semibold text-sm">
      Restock
    </span>

  </button>

</div>

{/* Primary Button */}

<button
  onClick={() => onSell(product)}
  disabled={product.quantity === 0}
  className="
  mt-3

  w-full
  h-11

  rounded-xl

  bg-gradient-to-r
  from-red-700
  via-red-600
  to-red-500

  text-white

  font-bold
  tracking-wide

  flex
  items-center
  justify-center
  gap-3

  transition-all
  duration-300

  hover:shadow-[0_15px_30px_rgba(255,0,0,.30)]
  hover:scale-[1.02]

  disabled:bg-gray-700
  disabled:cursor-not-allowed
  disabled:hover:scale-100
"
>

  <ShoppingCart size={17} />

  Add To Selling Cart

</button>

</div>

</div>

);

};

export default ProductCard;