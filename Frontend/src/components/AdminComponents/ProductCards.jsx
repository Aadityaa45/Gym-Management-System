import React from "react";
import { Pencil } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div
      className="
      bg-[#071a2f]
      border border-[#122b46]
      rounded-xl
      p-4
      hover:border-cyan-500
      hover:shadow-lg
      hover:shadow-cyan-500/10
      transition-all duration-300
    "
    >
      {/* Tags */}
      <div className="flex justify-between items-center mb-3">
        <span
          className="
          text-[11px]
          px-2 py-1
          rounded-md
          bg-purple-500/20
          text-purple-300
        "
        >
          {product.category}
        </span>

        <span
          className="
          text-[11px]
          px-2 py-1
          rounded-md
          bg-green-500/20
          text-green-300
        "
        >
          In Stock
        </span>
      </div>

      {/* Product Image */}
      <div className="h-[140px] flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-white text-sm font-medium">
          {product.brand}
        </h3>

        <p className="text-gray-300 text-sm mt-1">
          {product.name}
        </p>

        <p className="text-purple-400 font-bold text-xl mt-2">
          ₹{product.price}
        </p>
      </div>

      <div className="border-t border-[#1c3552] my-4"></div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Quantity</p>

          <p className="text-white font-semibold text-2xl">
            {product.quantity}
            <span className="text-sm text-gray-400 ml-1">
              units
            </span>
          </p>
        </div>

        <button
          className="
          flex items-center gap-2
          px-4 py-2
          border border-purple-500/30
          rounded-lg
          text-purple-400
          hover:bg-purple-500/10
          transition-all
        "
        >
          <Pencil size={14} />
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard;