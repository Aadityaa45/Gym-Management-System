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
import {
  Edit2,
  ShoppingCart,
  PackagePlus,
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
        color: "bg-red-500/15 text-red-400 border-red-500/30",
      };

    if (product.quantity <= 10)
      return {
        label: "Low Stock",
        color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
      };

    return {
      label: "In Stock",
      color: "bg-green-500/15 text-green-400 border-green-500/30",
    };
  };

  const status = getStatus();

  return (
    <div
      className="
      w-full
      max-w-[300px]
      bg-[#091729]
      border
      border-[#1d3557]
      rounded-2xl
      overflow-hidden
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-violet-500
      hover:shadow-xl
    "
    >
      {/* Top */}
      <div className="flex justify-between items-center px-4 pt-4">
        <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-indigo-500/15 text-indigo-300">
          {product.category}
        </span>

        <span
          className={`px-3 py-1 rounded-full border text-[11px] font-medium ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      {/* Image */}
      <div className="h-36 flex items-center justify-center px-5 mt-2">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain transition duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="px-4 pb-4">

        <p className="text-xs text-gray-400 truncate">
          {product.brand}
        </p>

        <h3 className="text-white text-base font-semibold mt-1 truncate">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <h2 className="text-xl font-bold text-violet-400">
            ₹{product.price}
          </h2>

          <span className="text-xs text-gray-300">
            {product.quantity} pcs
          </span>
        </div>

        {/* Stock Bar */}

        <div className="mt-3">

          <div className="w-full h-1.5 bg-[#162842] rounded-full overflow-hidden">

            <div
              className={`h-full rounded-full ${
                product.quantity === 0
                  ? "bg-red-500 w-0"
                  : product.quantity <= 10
                  ? "bg-yellow-500 w-1/4"
                  : product.quantity <= 30
                  ? "bg-green-500 w-2/4"
                  : "bg-green-500 w-full"
              }`}
            />

          </div>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-3 gap-2 mt-4">

          <button
            onClick={() => onEdit(product)}
            className="
            h-10
            rounded-lg
            bg-[#12233d]
            border
            border-[#294872]
            flex
            items-center
            justify-center
            hover:bg-indigo-500
            transition
          "
          >
            <Edit2 size={17} />
          </button>

          <button
            onClick={() => onRestock(product)}
            className="
            h-10
            rounded-lg
            bg-emerald-500/10
            border
            border-emerald-500/30
            text-emerald-400
            flex
            items-center
            justify-center
            hover:bg-emerald-500
            hover:text-white
            transition
          "
          >
            <PackagePlus size={17} />
          </button>

          <button
            onClick={() => onSell(product)}
            disabled={product.quantity === 0}
            className="
            h-10
            rounded-lg
            bg-violet-600
            text-white
            flex
            items-center
            justify-center
            hover:bg-violet-500
            disabled:bg-gray-700
            transition
          "
          >
            <ShoppingCart size={17} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;