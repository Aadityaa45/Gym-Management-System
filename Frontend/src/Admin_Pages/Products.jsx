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
  const [openEditPopUp,setEditPopUp] = useState(false)
  const [editProductData,setEditProductData] = useState({
    productName:"",
    productPrice:"",
    productCategory:"",
    productImage:"",
    productDescription:"",
    productPriorityOrder:"",
  })
  const [selectedProduct,setSelectedProduct] = useState(null)
  // const [totalPages,setTotalPages] = useState(1)

  const page_size = 10
  const total_elements = products.length
  const total_pages = Math.ceil(total_elements/page_size)
  const start = (currentPage-1) * page_size
  const end = start + page_size

  const onEditChanegHandler = (e) =>{
    const {name,value} = e.target

    setEditProductData({
      ...editProductData,
      [name]:value
    })
  }

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
        onEdit={() => {
          setEditProductData({
            productName:product.name,
            productCategory:product.category,
            productImage:product.image,
            productPrice:product.price,
            productDescription:product.description,
            productPriorityOrder:product.priorityOrder
          })
          setSelectedProduct(product)
          setEditPopUp(true)
        }}
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

      {/* edit popup section */}
      {
openEditPopUp && (

<>
    {/* Overlay */}

    <div
        onClick={() => setEditPopUp(false)}
        className="
        fixed
        inset-0
        bg-black/70
        backdrop-blur-sm
        z-[60]
    "
    />

    {/* Popup */}

    <div
        className="
        fixed
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[900px]
        bg-[#091729]
        border
        border-[#1f3554]
        rounded-3xl
        overflow-hidden
        shadow-[0_25px_70px_rgba(0,0,0,.5)]
        z-[70]
        animate-[popup_.25s_ease]
    "
    >

        {/* Header */}

        <div className="px-8 py-6 border-b border-[#203a5d] flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-bold text-white">
                    Edit Product
                </h2>

                <p className="text-gray-400 mt-1">
                    Update the product information.
                </p>

            </div>

            <button
                onClick={() => setEditPopUp(false)}
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
                <X size={20}/>
            </button>

        </div>

        {/* Body */}

        <div className="grid grid-cols-2 gap-8 p-8">

            {/* Left */}

            <div className="space-y-5">

                <div>

                    <label className="text-gray-400 text-sm">
                        Product Name
                    </label>

                    <input
                        name="productName"
                        value={editProductData.name}
                        onChange={onEditChanegHandler}
                        className="input mt-2"
                        placeholder="Protein Powder"
                    />

                </div>

                <div>

                    <label className="text-gray-400 text-sm">
                        Category
                    </label>

                    <input
                        name="productCategory"
                        value={editProductData.productCategory}
                        onChange={onEditChanegHandler}
                        className="input mt-2"
                        placeholder="Supplements"
                    />

                </div>

                <div>

                    <label className="text-gray-400 text-sm">
                        Description
                    </label>

                    <textarea
                        name="productDescription"
                        value={editProductData.productDescription}
                        onChange={onEditChanegHandler}
                        rows={5}
                        className="input mt-2 resize-none"
                        placeholder="Enter description..."
                    />

                </div>

                <div>

                    <label className="text-gray-400 text-sm">
                        Image URL
                    </label>

                    <input
                        name="productImage"
                        value={editProductData.productImage}
                        onChange={onEditChanegHandler}
                        className="input mt-2"
                        placeholder="https://..."
                    />

                </div>

            </div>

            {/* Right */}

            <div className="space-y-5">

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <label className="text-gray-400 text-sm">
                            Quantity
                        </label>

                        <input
                            type="number"
                            className="input mt-2"
                        />

                    </div>

                    <div>

                        <label className="text-gray-400 text-sm">
                            Status
                        </label>

                        <select className="input mt-2">

                            <option>
                                Available
                            </option>

                            <option>
                                Coming Soon
                            </option>

                        </select>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <label className="text-gray-400 text-sm">
                            Selling Price
                        </label>

                        <input
                            type="number"
                            className="input mt-2"
                        />

                    </div>

                    <div>

                        <label className="text-gray-400 text-sm">
                            Wholesale Price
                        </label>

                        <input
                            type="number"
                            className="input mt-2"
                        />

                    </div>

                </div>

                <div>

                    <label className="text-gray-400 text-sm">
                        Priority Order
                    </label>

                    <input
                        type="number"
                        className="input mt-2"
                    />

                </div>

                {/* Preview */}

                <div className="mt-8 bg-[#10243d] rounded-2xl border border-[#294872] p-5">

                    <div className="h-52 rounded-xl bg-[#132842] flex justify-center items-center">

                        <span className="text-gray-500">
                            Product Preview
                        </span>

                    </div>

                    <h3 className="text-xl font-semibold mt-5 text-white">
                        Product Name
                    </h3>

                    <p className="text-violet-400 text-3xl font-bold mt-3">
                        ₹999
                    </p>

                </div>

            </div>

        </div>

        {/* Footer */}

        <div className="border-t border-[#203a5d] px-8 py-6 flex justify-end gap-4">

            <button
                onClick={() => setEditPopUp(false)}
                className="
                px-7
                py-3
                rounded-xl
                bg-[#132842]
                hover:bg-[#1d3557]
                transition
                "
            >
                Cancel
            </button>

            <button
                className="
                px-8
                py-3
                rounded-xl
                bg-violet-600
                hover:bg-violet-500
                transition
                text-white
                font-semibold
                "
            >
                Save Changes
            </button>

        </div>

    </div>

    <style>{`
        .input{
            width:100%;
            background:#0d2036;
            border:1px solid #294872;
            border-radius:14px;
            padding:14px 18px;
            color:white;
            outline:none;
            transition:.25s;
        }

        .input:focus{
            border-color:#8b5cf6;
            box-shadow:0 0 0 3px rgba(139,92,246,.2);
        }

        @keyframes popup{
            from{
                opacity:0;
                transform:translate(-50%,-45%) scale(.95);
            }
            to{
                opacity:1;
                transform:translate(-50%,-50%) scale(1);
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