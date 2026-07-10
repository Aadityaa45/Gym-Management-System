import React, { useEffect } from "react";
import { products as DummyProducts } from "../assets/hardcoded_content.js/dummyProductsData";
import ProductCard from "../components/AdminComponents/ProductCards"
import { useState } from "react";
import {
    Search,
    ShoppingCart,
    X,
    Minus,
    Plus,
    Trash2
} from "lucide-react";
const Products = () =>{
  const [products,setProducts] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [cart,setCart] = useState([])
  const [cartOpen,setCartOpen] = useState(false)
  // const [totalPages,setTotalPages] = useState(1)

  const page_size = 10
  const total_elements = products.length
  const total_pages = Math.ceil(total_elements/page_size)
  const start = (currentPage-1) * page_size
  const end = start + page_size

  //here, we will create a functionality to add the selected products in the cart and alltogether we can generate the invoice 
  const addProductToCart = (product) =>{
    setCart((prev)=>{
      //first of all we will find weather the selected product already is in cart or not 
      const exist = prev.find((item) => item._id===product._id)

      //if product exist we will increase the quantity and return
       if(exist){
        return prev.map((item)=>{
          if(item._id!==product._id){
            return item
          }

          //checking the quantity doesnt exceed then the product quantity
          if(item.quantity>=item.availableStock){
            return item
          }

          return{
            ...item,
            quantity:item.quantity+1,
          }
        })
       }

       //if it doesnt exist we will simply add it in cart
        return [
      ...prev,
      {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
        availableStock: product.quantity,
      },
    ];
    })
  }

  
  useEffect(()=>{
    setProducts(DummyProducts)
    console.log(products)
  },[])
    return(
        <div>
            <div className="w-[95%] mx-auto flex justify-between items-center">

    <div className="relative w-[500px]">

        <input
            type="search"
            placeholder="Search Product..."
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

        <Search
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
            size={20}
        />

    </div>


    {/* Floating Cart */}

    <button

        onClick={()=>setCartOpen(true)}

        className="
        relative
        flex
        items-center
        gap-3
        bg-[#091729]
        border
        border-[#1c3555]
        rounded-2xl
        px-6
        py-4
        hover:border-violet-500
        transition-all
        "

    >

        <ShoppingCart
            className="text-violet-400"
            size={24}
        />

        <div className="text-left">

            <h3 className="text-white font-semibold">
                Selling Cart
            </h3>

            <p className="text-sm text-gray-400">

                {
                    cart.reduce(
                        (acc,item)=>acc+item.quantity,
                        0
                    )
                } Items

            </p>

        </div>


        {

            cart.length>0 &&

            <div
            className="
            absolute
            -top-2
            -right-2
            w-7
            h-7
            rounded-full
            bg-red-500
            flex
            items-center
            justify-center
            text-sm
            font-bold
            text-white
            "
            >

                {cart.length}

            </div>

        }

    </button>

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
        onSell={() => addProductToCart(product)}
        onEdit={(product) => console.log("Edit Product", product)}
        onRestock={(product)=>console.log("restocking")}
      />
    ))}
  </div>
</div>
<div className="flex justify-center items-center mt-5 gap-2 py-6 bg-[#041b35]">
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

          {

cartOpen && (

<>

<div
    onClick={() => setCartOpen(false)}
    className="
      fixed
      inset-0
      bg-black/60
      backdrop-blur-sm
      z-40
    "
  />

  {/* Cart Drawer */}

  <div
    className="
      fixed
      right-0
      top-0
      h-screen
      w-[420px]
      bg-[#091729]
      border-l
      border-[#203a5d]
      z-50
      flex
      flex-col
      shadow-2xl
      animate-[slideIn_.35s_ease]
    "
  >

    {/* Header */}

    <div className="px-6 py-5 border-b border-[#203a5d] flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold text-white">
          Selling Cart
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          {cart.reduce((acc, item) => acc + item.quantity, 0)} Items Selected
        </p>

      </div>

      <button
        onClick={() => setCartOpen(false)}
        className="
          w-11
          h-11
          rounded-xl
          bg-[#132842]
          hover:bg-red-500
          transition
          flex
          items-center
          justify-center
        "
      >
        <X size={20} />
      </button>

    </div>

    {/* Cart Items */}

    <div className="flex-1 overflow-y-auto px-5 py-4">

      {cart.length === 0 ? (

        <div className="h-full flex flex-col justify-center items-center">

          <ShoppingCart
            size={70}
            className="text-gray-500"
          />

          <h3 className="text-white mt-6 text-xl font-semibold">
            Cart is Empty
          </h3>

          <p className="text-gray-400 mt-2">
            Add products to continue selling.
          </p>

        </div>

      ) : (

        cart.map((item) => (

          <div
            key={item._id}
            className="
              bg-[#10243d]
              rounded-2xl
              p-4
              mb-4
              border
              border-[#1d3554]
            "
          >

            <div className="flex gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="
                  w-20
                  h-20
                  rounded-xl
                  object-cover
                  bg-white
                "
              />

              <div className="flex-1">

                <h3 className="text-white font-semibold">
                  {item.name}
                </h3>

                <p className="text-violet-400 text-lg mt-1">
                  ₹{item.price}
                </p>

                <p className="text-gray-400 text-sm">
                  Stock : {item.availableStock}
                </p>

              </div>

            </div>

            {/* Quantity */}

            <div className="flex justify-between items-center mt-5">

              <div className="flex items-center gap-2">

                <button
                  className="
                    w-9
                    h-9
                    rounded-lg
                    bg-[#1a3557]
                    hover:bg-red-500
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Minus size={16} />
                </button>

                <span className="w-10 text-center text-white font-semibold">
                  {item.quantity}
                </span>

                <button
                  className="
                    w-9
                    h-9
                    rounded-lg
                    bg-violet-600
                    hover:bg-violet-500
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Plus size={16} />
                </button>

              </div>

              <button
                className="
                  text-red-400
                  hover:text-red-500
                  transition
                "
              >
                <Trash2 size={20} />
              </button>

            </div>

            {/* Total */}

            <div className="flex justify-between mt-5">

              <span className="text-gray-400">
                Total
              </span>

              <span className="text-xl font-bold text-green-400">
                ₹{item.price * item.quantity}
              </span>

            </div>

          </div>

        ))

      )}

    </div>

    {/* Footer */}

    <div className="border-t border-[#203a5d] p-6">

      <div className="flex justify-between text-gray-300">

        <span>Total Items</span>

        <span>

          {
            cart.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
          }

        </span>

      </div>

      <div className="flex justify-between mt-5">

        <span className="text-2xl text-white font-bold">
          Grand Total
        </span>

        <span className="text-3xl font-bold text-violet-400">

          ₹
          {
            cart.reduce(
              (acc, item) =>
                acc + item.price * item.quantity,
              0
            )
          }

        </span>

      </div>

      <button
        className="
          mt-7
          w-full
          py-4
          rounded-2xl
          bg-violet-600
          hover:bg-violet-500
          text-white
          font-semibold
          text-lg
          transition
        "
      >
        Generate Invoice
      </button>

    </div>

  </div>

  <style>{`
    @keyframes slideIn{
      from{
        transform:translateX(100%);
      }
      to{
        transform:translateX(0);
      }
    }
  `}</style>


</>

)

}
        </div>
    )
}

export default Products