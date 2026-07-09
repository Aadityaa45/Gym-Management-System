import React, { useEffect } from "react";
import { products as DummyProducts } from "../assets/hardcoded_content.js/dummyProductsData";
import ProductCard from "../components/AdminComponents/ProductCards"
import { useState } from "react";
const Products = () =>{
  const [products,setProducts] = useState([])
  useEffect(()=>{
    setProducts(DummyProducts)
    console.log(products)
  },[])
    return(
        <div>
            {/* search bar section */}
            <div className="relative w-[500px] mx-auto z-[9999]">
                <input
          type="search"
          placeholder="Search the Product by name,category...."
          className="
            w-full
            bg-[#08213d]
            border
            border-gray-700
            text-white
            placeholder:text-gray-400
            rounded-2xl
            py-4
            pl-14
            pr-5
            outline-none
            transition-all
            duration-300
            focus:border-red-500
            focus:ring-4
            focus:ring-red-500/20
            shadow-xl
          "
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
            </div>

            {/* products section  */}
            <div className="mt-10 w-[95%] mx-auto">
  <div
    className="
      w-full
    mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    2xl:grid-cols-5
    gap-6
    "
  >
    {products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        onSell={(product) => console.log("Sell Product", product)}
        onEdit={(product) => console.log("Edit Product", product)}
      />
    ))}
  </div>
</div>
        </div>
    )
}

export default Products