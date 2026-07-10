import React, { useEffect } from "react";
import { products as DummyProducts } from "../assets/hardcoded_content.js/dummyProductsData";
import ProductCard from "../components/AdminComponents/ProductCards"
import { useState } from "react";
const Products = () =>{
  const [products,setProducts] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  // const [totalPages,setTotalPages] = useState(1)

  const page_size = 10
  const total_elements = products.length
  const total_pages = Math.ceil(total_elements/page_size)
  const start = (currentPage-1) * page_size
  const end = start + page_size

  const inputValueHandler = (e) =>{
    
  }
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
    mt-20
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    2xl:grid-cols-5
    gap-8
    "
  >
    {products.slice(start,end).map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        onSell={(product) => console.log("Sell Product", product)}
        onEdit={(product) => console.log("Edit Product", product)}
        onRestock={(product)=>console.log("restocking")}
      />
    ))}
  </div>
  <div className="flex justify-center items-center gap-2 py-6 bg-[#041b35]">
          {[...Array(total_pages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page+1)}
              className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                currentPage === page+1
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                  : "bg-[#0a2748] text-gray-300 hover:bg-[#123963] hover:text-white"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>

</div>
        </div>
    )
}

export default Products