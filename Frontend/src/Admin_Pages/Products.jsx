// import React, { useEffect } from "react";
// import { products as DummyProducts } from "../assets/hardcoded_content.js/dummyProductsData";
// import ProductCard from "../components/AdminComponents/ProductCards"
// import { useState } from "react";
// import {
//     Search,
//     ShoppingCart,
//     X,
//     Minus,
//     Plus,
//     Trash2
// } from "lucide-react";
// const Products = () =>{
//   const [products,setProducts] = useState([])
//   const [currentPage,setCurrentPage] = useState(1)
//   const [cart,setCart] = useState([])
//   const [cartOpen,setCartOpen] = useState(false)
//   const [openEditPopUp,setEditPopUp] = useState(false)
//   const [editProductData,setEditProductData] = useState({
//     productName:"",
//     productPrice:"",
//     productCategory:"",
//     productImage:"",
//     productDescription:"",
//     productPriorityOrder:"",
//   })
//   const [selectedProduct,setSelectedProduct] = useState(null)
//   // const [totalPages,setTotalPages] = useState(1)

//   const page_size = 10
//   const total_elements = products.length
//   const total_pages = Math.ceil(total_elements/page_size)
//   const start = (currentPage-1) * page_size
//   const end = start + page_size

//   const onEditChanegHandler = (e) =>{
//     const {name,value} = e.target

//     setEditProductData({
//       ...editProductData,
//       [name]:value
//     })
//   }

//   //here, we will create a functionality to add the selected products in the cart and alltogether we can generate the invoice 
//   const addProductToCart = (product) =>{
//     setCart((prev)=>{
//       //first of all we will find weather the selected product already is in cart or not 
//       const exist = prev.find((item) => item._id===product._id)

//       //if product exist we will increase the quantity and return
//        if(exist){
//         return prev.map((item)=>{
//           if(item._id!==product._id){
//             return item
//           }

//           //checking the quantity doesnt exceed then the product quantity
//           if(item.quantity>=item.availableStock){
//             return item
//           }

//           return{
//             ...item,
//             quantity:item.quantity+1,
//           }
//         })
//        }

//        //if it doesnt exist we will simply add it in cart
//         return [
//       ...prev,
//       {
//         _id: product._id,
//         name: product.name,
//         image: product.image,
//         price: product.price,
//         quantity: 1,
//         availableStock: product.quantity,
//       },
//     ];
//     })
//   }
  
//   useEffect(()=>{
//     setProducts(DummyProducts)
//     console.log(products)
//   },[])
//     return(
//         <div>
//             <div className="w-[95%] mx-auto flex justify-between items-center">

//     <div className="relative w-[500px]">

//         <input
//             type="search"
//             placeholder="Search Product..."
//             className="
//             w-full
//             bg-[#08213d]
//             border
//             border-gray-700
//             text-white
//             placeholder:text-gray-400
//             rounded-2xl
//             py-4
//             pl-14
//             pr-5
//             outline-none
//             transition-all
//             duration-300
//             focus:border-red-500
//             focus:ring-4
//             focus:ring-red-500/20
//             shadow-xl
//             "
//         />

//         <Search
//             className="
//             absolute
//             left-5
//             top-1/2
//             -translate-y-1/2
//             text-gray-400
//             "
//             size={20}
//         />

//     </div>


//     {/* Floating Cart */}

//     <button

//         onClick={()=>setCartOpen(true)}

//         className="
//         relative
//         flex
//         items-center
//         gap-3
//         bg-[#091729]
//         border
//         border-[#1c3555]
//         rounded-2xl
//         px-6
//         py-4
//         hover:border-violet-500
//         transition-all
//         "

//     >

//         <ShoppingCart
//             className="text-violet-400"
//             size={24}
//         />

//         <div className="text-left">

//             <h3 className="text-white font-semibold">
//                 Selling Cart
//             </h3>

//             <p className="text-sm text-gray-400">

//                 {
//                     cart.reduce(
//                         (acc,item)=>acc+item.quantity,
//                         0
//                     )
//                 } Items

//             </p>

//         </div>


//         {

//             cart.length>0 &&

//             <div
//             className="
//             absolute
//             -top-2
//             -right-2
//             w-7
//             h-7
//             rounded-full
//             bg-red-500
//             flex
//             items-center
//             justify-center
//             text-sm
//             font-bold
//             text-white
//             "
//             >

//                 {cart.length}

//             </div>

//         }

//     </button>

// </div>

//             {/* products section  */}
//             <div className="mt-10 w-[95%] mx-auto">
//   <div
//     className="
//       w-full
//     mt-20
//     grid
//     grid-cols-1
//     sm:grid-cols-2
//     lg:grid-cols-3
//     xl:grid-cols-4
//     2xl:grid-cols-5
//     gap-8
//     "
//   >
//     {products.slice(start,end).map((product) => (
//       <ProductCard
//         key={product._id}
//         product={product}
//         onSell={() => addProductToCart(product)}
//         onEdit={() => {
//           setEditProductData({
//             productName:product.name,
//             productCategory:product.category,
//             productImage:product.image,
//             productPrice:product.price,
//             productDescription:product.description,
//             productPriorityOrder:product.priorityOrder
//           })
//           setSelectedProduct(product)
//           setEditPopUp(true)
//         }}
//         onRestock={(product)=>console.log("restocking")}
//       />
//     ))}
//   </div>
// </div>
// <div className="flex justify-center items-center mt-5 gap-2 py-6 bg-[#041b35]">
//           {[...Array(total_pages).keys()].map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page+1)}
//               className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
//                 currentPage === page+1
//                   ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
//                   : "bg-[#0a2748] text-gray-300 hover:bg-[#123963] hover:text-white"
//               }`}
//             >
//               {page + 1}
//             </button>
//           ))}
//         </div>

//           {

// cartOpen && (

// <>

// <div
//     onClick={() => setCartOpen(false)}
//     className="
//       fixed
//       inset-0
//       bg-black/60
//       backdrop-blur-sm
//       z-40
//     "
//   />

//   {/* Cart Drawer */}

//   <div
//     className="
//       fixed
//       right-0
//       top-0
//       h-screen
//       w-[420px]
//       bg-[#091729]
//       border-l
//       border-[#203a5d]
//       z-50
//       flex
//       flex-col
//       shadow-2xl
//       animate-[slideIn_.35s_ease]
//     "
//   >

//     {/* Header */}

//     <div className="px-6 py-5 border-b border-[#203a5d] flex justify-between items-center">

//       <div>

//         <h2 className="text-2xl font-bold text-white">
//           Selling Cart
//         </h2>

//         <p className="text-sm text-gray-400 mt-1">
//           {cart.reduce((acc, item) => acc + item.quantity, 0)} Items Selected
//         </p>

//       </div>

//       <button
//         onClick={() => setCartOpen(false)}
//         className="
//           w-11
//           h-11
//           rounded-xl
//           bg-[#132842]
//           hover:bg-red-500
//           transition
//           flex
//           items-center
//           justify-center
//         "
//       >
//         <X size={20} />
//       </button>

//     </div>

//     {/* Cart Items */}

//     <div className="flex-1 overflow-y-auto px-5 py-4">

//       {cart.length === 0 ? (

//         <div className="h-full flex flex-col justify-center items-center">

//           <ShoppingCart
//             size={70}
//             className="text-gray-500"
//           />

//           <h3 className="text-white mt-6 text-xl font-semibold">
//             Cart is Empty
//           </h3>

//           <p className="text-gray-400 mt-2">
//             Add products to continue selling.
//           </p>

//         </div>

//       ) : (

//         cart.map((item) => (

//           <div
//             key={item._id}
//             className="
//               bg-[#10243d]
//               rounded-2xl
//               p-4
//               mb-4
//               border
//               border-[#1d3554]
//             "
//           >

//             <div className="flex gap-4">

//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="
//                   w-20
//                   h-20
//                   rounded-xl
//                   object-cover
//                   bg-white
//                 "
//               />

//               <div className="flex-1">

//                 <h3 className="text-white font-semibold">
//                   {item.name}
//                 </h3>

//                 <p className="text-violet-400 text-lg mt-1">
//                   ₹{item.price}
//                 </p>

//                 <p className="text-gray-400 text-sm">
//                   Stock : {item.availableStock}
//                 </p>

//               </div>

//             </div>

//             {/* Quantity */}

//             <div className="flex justify-between items-center mt-5">

//               <div className="flex items-center gap-2">

//                 <button
//                   className="
//                     w-9
//                     h-9
//                     rounded-lg
//                     bg-[#1a3557]
//                     hover:bg-red-500
//                     transition
//                     flex
//                     items-center
//                     justify-center
//                   "
//                 >
//                   <Minus size={16} />
//                 </button>

//                 <span className="w-10 text-center text-white font-semibold">
//                   {item.quantity}
//                 </span>

//                 <button
//                   className="
//                     w-9
//                     h-9
//                     rounded-lg
//                     bg-violet-600
//                     hover:bg-violet-500
//                     transition
//                     flex
//                     items-center
//                     justify-center
//                   "
//                 >
//                   <Plus size={16} />
//                 </button>

//               </div>

//               <button
//                 className="
//                   text-red-400
//                   hover:text-red-500
//                   transition
//                 "
//               >
//                 <Trash2 size={20} />
//               </button>

//             </div>

//             {/* Total */}

//             <div className="flex justify-between mt-5">

//               <span className="text-gray-400">
//                 Total
//               </span>

//               <span className="text-xl font-bold text-green-400">
//                 ₹{item.price * item.quantity}
//               </span>

//             </div>

//           </div>

//         ))

//       )}

//     </div>

//     {/* Footer */}

//     <div className="border-t border-[#203a5d] p-6">

//       <div className="flex justify-between text-gray-300">

//         <span>Total Items</span>

//         <span>

//           {
//             cart.reduce(
//               (acc, item) => acc + item.quantity,
//               0
//             )
//           }

//         </span>

//       </div>

//       <div className="flex justify-between mt-5">

//         <span className="text-2xl text-white font-bold">
//           Grand Total
//         </span>

//         <span className="text-3xl font-bold text-violet-400">

//           ₹
//           {
//             cart.reduce(
//               (acc, item) =>
//                 acc + item.price * item.quantity,
//               0
//             )
//           }

//         </span>

//       </div>

//       <button
//         className="
//           mt-7
//           w-full
//           py-4
//           rounded-2xl
//           bg-violet-600
//           hover:bg-violet-500
//           text-white
//           font-semibold
//           text-lg
//           transition
//         "
//       >
//         Generate Invoice
//       </button>

//     </div>

//   </div>

//   <style>{`
//     @keyframes slideIn{
//       from{
//         transform:translateX(100%);
//       }
//       to{
//         transform:translateX(0);
//       }
//     }
//   `}</style>


// </>

// )

// }

//       {/* edit popup section */}
//       {
// openEditPopUp && (

// <>
//     {/* Overlay */}

//     <div
//         onClick={() => setEditPopUp(false)}
//         className="
//         fixed
//         inset-0
//         bg-black/70
//         backdrop-blur-sm
//         z-[60]
//     "
//     />

//     {/* Popup */}

//     <div
//         className="
//         fixed
//         left-1/2
//         top-1/2
//         -translate-x-1/2
//         -translate-y-1/2
//         w-[900px]
//         bg-[#091729]
//         border
//         border-[#1f3554]
//         rounded-3xl
//         overflow-hidden
//         shadow-[0_25px_70px_rgba(0,0,0,.5)]
//         z-[70]
//         animate-[popup_.25s_ease]
//     "
//     >

//         {/* Header */}

//         <div className="px-8 py-6 border-b border-[#203a5d] flex justify-between items-center">

//             <div>

//                 <h2 className="text-2xl font-bold text-white">
//                     Edit Product
//                 </h2>

//                 <p className="text-gray-400 mt-1">
//                     Update the product information.
//                 </p>

//             </div>

//             <button
//                 onClick={() => setEditPopUp(false)}
//                 className="
//                 w-11
//                 h-11
//                 rounded-xl
//                 bg-[#132842]
//                 hover:bg-red-500
//                 transition
//                 flex
//                 items-center
//                 justify-center
//                 "
//             >
//                 <X size={20}/>
//             </button>

//         </div>

//         {/* Body */}

//         <div className="grid grid-cols-2 gap-8 p-8">

//             {/* Left */}

//             <div className="space-y-5">

//                 <div>

//                     <label className="text-gray-400 text-sm">
//                         Product Name
//                     </label>

//                     <input
//                         name="productName"
//                         value={editProductData.name}
//                         onChange={onEditChanegHandler}
//                         className="input mt-2"
//                         placeholder="Protein Powder"
//                     />

//                 </div>

//                 <div>

//                     <label className="text-gray-400 text-sm">
//                         Category
//                     </label>

//                     <input
//                         name="productCategory"
//                         value={editProductData.productCategory}
//                         onChange={onEditChanegHandler}
//                         className="input mt-2"
//                         placeholder="Supplements"
//                     />

//                 </div>

//                 <div>

//                     <label className="text-gray-400 text-sm">
//                         Description
//                     </label>

//                     <textarea
//                         name="productDescription"
//                         value={editProductData.productDescription}
//                         onChange={onEditChanegHandler}
//                         rows={5}
//                         className="input mt-2 resize-none"
//                         placeholder="Enter description..."
//                     />

//                 </div>

//                 <div>

//                     <label className="text-gray-400 text-sm">
//                         Image URL
//                     </label>

//                     <input
//                         name="productImage"
//                         value={editProductData.productImage}
//                         onChange={onEditChanegHandler}
//                         className="input mt-2"
//                         placeholder="https://..."
//                     />

//                 </div>

//             </div>

//             {/* Right */}

//             <div className="space-y-5">

//                 <div className="grid grid-cols-2 gap-4">

//                     <div>

//                         <label className="text-gray-400 text-sm">
//                             Quantity
//                         </label>

//                         <input
//                             type="number"
//                             className="input mt-2"
//                         />

//                     </div>

//                     <div>

//                         <label className="text-gray-400 text-sm">
//                             Status
//                         </label>

//                         <select className="input mt-2">

//                             <option>
//                                 Available
//                             </option>

//                             <option>
//                                 Coming Soon
//                             </option>

//                         </select>

//                     </div>

//                 </div>

//                 <div className="grid grid-cols-2 gap-4">

//                     <div>

//                         <label className="text-gray-400 text-sm">
//                             Selling Price
//                         </label>

//                         <input
//                             type="number"
//                             className="input mt-2"
//                         />

//                     </div>

//                     <div>

//                         <label className="text-gray-400 text-sm">
//                             Wholesale Price
//                         </label>

//                         <input
//                             type="number"
//                             className="input mt-2"
//                         />

//                     </div>

//                 </div>

//                 <div>

//                     <label className="text-gray-400 text-sm">
//                         Priority Order
//                     </label>

//                     <input
//                         type="number"
//                         className="input mt-2"
//                     />

//                 </div>

//                 {/* Preview */}

//                 <div className="mt-8 bg-[#10243d] rounded-2xl border border-[#294872] p-5">

//                     <div className="h-52 rounded-xl bg-[#132842] flex justify-center items-center">

//                         <span className="text-gray-500">
//                             Product Preview
//                         </span>

//                     </div>

//                     <h3 className="text-xl font-semibold mt-5 text-white">
//                         Product Name
//                     </h3>

//                     <p className="text-violet-400 text-3xl font-bold mt-3">
//                         ₹999
//                     </p>

//                 </div>

//             </div>

//         </div>

//         {/* Footer */}

//         <div className="border-t border-[#203a5d] px-8 py-6 flex justify-end gap-4">

//             <button
//                 onClick={() => setEditPopUp(false)}
//                 className="
//                 px-7
//                 py-3
//                 rounded-xl
//                 bg-[#132842]
//                 hover:bg-[#1d3557]
//                 transition
//                 "
//             >
//                 Cancel
//             </button>

//             <button
//                 className="
//                 px-8
//                 py-3
//                 rounded-xl
//                 bg-violet-600
//                 hover:bg-violet-500
//                 transition
//                 text-white
//                 font-semibold
//                 "
//             >
//                 Save Changes
//             </button>

//         </div>

//     </div>

//     <style>{`
//         .input{
//             width:100%;
//             background:#0d2036;
//             border:1px solid #294872;
//             border-radius:14px;
//             padding:14px 18px;
//             color:white;
//             outline:none;
//             transition:.25s;
//         }

//         .input:focus{
//             border-color:#8b5cf6;
//             box-shadow:0 0 0 3px rgba(139,92,246,.2);
//         }

//         @keyframes popup{
//             from{
//                 opacity:0;
//                 transform:translate(-50%,-45%) scale(.95);
//             }
//             to{
//                 opacity:1;
//                 transform:translate(-50%,-50%) scale(1);
//             }
//         }
//     `}</style>

// </>

// )
// }
//         </div>
//     )
// }

// export default Products


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
import axios from "axios";
import toast from "react-hot-toast";
const Products = () =>{
  const [products,setProducts] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [cart,setCart] = useState([])
  const [cartOpen,setCartOpen] = useState(false)
  const [openEditPopUp,setEditPopUp] = useState(false)
  const [search,setSearch] = useState("")
  const [totalPages,setTotalPages] = useState(1)
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

  const searchOnChangeHandler = (e) =>{
    setSearch(e.target.value)
    setCurrentPage(1)
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

  //-----------------------------------------------Handler to fetch original product dta from the backend------------------------------------------
  const fetchProducts = async () =>{
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/admin/products/fetch-products?page=${currentPage}&limit=8&search=${search}`,
            {
                withCredentials:true
            }
        )

        if(response.data.success){
            setProducts(response.data.searchResults)
            setTotalPages(response.data.pagination.totalPages)
        }
    } catch (error) {
        console.log(error);
    console.log(error.response);
        toast.error("Something went wrong!")
    }
  }
  
  //debouncing 
  useEffect(() => {
      const timer = setTimeout(() => {
        fetchProducts();
      }, 500);
  
      return () => {
        clearTimeout(timer);
      };
    }, [search,currentPage]);
    return(
        <div>
            {/* =======================================================
                    PAGE HEADER
======================================================= */}

<div className="w-[95%] mx-auto">

    {/* Heading */}

    <div className="flex justify-between items-center">

        <div>

            <p
                className="
                uppercase
                tracking-[4px]
                text-red-400
                text-xs
                font-bold
                "
            >
                Gym Inventory
            </p>

            <h1
                className="
                text-5xl
                font-black
                text-white
                mt-2
                "
            >
                Products
            </h1>

            <p
                className="
                text-gray-400
                mt-3
                text-lg
                "
            >
                Manage supplements, nutrition products & inventory.
            </p>

        </div>

        {/* Selling Cart */}

        <button

            onClick={() => setCartOpen(true)}

            className="
            relative

            flex
            items-center
            gap-4

            px-7
            py-5

            rounded-3xl

            border
            border-[#242424]

            bg-gradient-to-b
            from-[#181818]
            to-[#111111]

            hover:border-red-500/40
            hover:shadow-[0_15px_40px_rgba(255,0,0,.15)]

            transition-all
            duration-300
            "

        >

            <div
                className="
                w-14
                h-14

                rounded-2xl

                bg-red-500/10

                border
                border-red-500/20

                flex
                items-center
                justify-center
                "
            >

                <ShoppingCart
                    size={25}
                    className="text-red-400"
                />

            </div>

            <div className="text-left">

                <p className="text-gray-400 text-xs uppercase tracking-[3px]">
                    Current Cart
                </p>

                <h3 className="text-white font-bold text-lg">
                    Selling Cart
                </h3>

                <p className="text-red-400 font-semibold">

                    {
                        cart.reduce(
                            (acc,item)=>acc+item.quantity,
                            0
                        )
                    }

                    {" "}
                    Items

                </p>

            </div>

            {

                cart.length>0 &&

                <div
                    className="
                    absolute
                    -top-2
                    -right-2

                    w-8
                    h-8

                    rounded-full

                    bg-red-600

                    flex
                    items-center
                    justify-center

                    font-bold
                    text-white

                    shadow-lg
                    "
                >

                    {cart.length}

                </div>

            }

        </button>

    </div>


    {/* =======================================================
                    SEARCH BAR
    ======================================================= */}

    <div
        className="
        mt-10

        rounded-3xl

        border
        border-[#252525]

        bg-gradient-to-b
        from-[#171717]
        to-[#101010]

        p-5
        "
    >

        <div className="relative">

            <Search
                className="
                absolute
                left-6
                top-1/2
                -translate-y-1/2
                text-gray-500
                "
                size={20}
            />

            <input

                type="search"

                placeholder="Search products, supplements, nutrition..."

                value={search}

                onChange={searchOnChangeHandler}

                className="
                w-full

                h-16

                pl-16
                pr-5

                rounded-2xl

                bg-[#0d0d0d]

                border
                border-[#292929]

                text-white

                placeholder:text-gray-500

                outline-none

                transition-all

                focus:border-red-500
                focus:ring-4
                focus:ring-red-500/10
                "

            />

        </div>

    </div>

</div>

            {/* products section  */}
            {/* ======================================================
                    PRODUCTS GRID
====================================================== */}

<div className="w-[95%] mx-auto mt-10">

    {/* Section Heading */}

    <div className="flex justify-between items-center mb-8">

        <div>

            <h2
                className="
                text-2xl
                font-bold
                text-white
                "
            >
                Product Inventory
            </h2>

            <p className="text-gray-500 mt-2">
                Showing {start + 1} -
                {" "}
                {Math.min(end, products.length)}
                {" "}
                of
                {" "}
                {products.length}
                {" "}
                Products
            </p>

        </div>

        <div
            className="
            px-5
            py-3

            rounded-2xl

            bg-[#171717]

            border
            border-[#292929]
            "
        >

            <span className="text-gray-400">
                Total Pages :
            </span>

            <span className="ml-2 font-bold text-red-400">

                {total_pages}

            </span>

        </div>

    </div>

    {/* Product Grid */}

    <div

        className="
        grid

        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5

        gap-7
        "

    >

        {

            products
                // .slice(start,end)
                .map((product)=>(

                <ProductCard

                    key={product._id}

                    product={product}

                    onSell={()=>addProductToCart(product)}

                    onEdit={()=>{

                        setEditProductData({

                            productName:product.name,
                            productCategory:product.category,
                            productImage:product.image,
                            productPrice:product.price,
                            productDescription:product.description,
                            productPriorityOrder:product.priorityOrder,

                        })

                        setSelectedProduct(product)

                        setEditPopUp(true)

                    }}

                    onRestock={()=>console.log("restocking")}

                />

            ))

        }

    </div>

</div>

{/* ======================================================
                    PAGINATION
====================================================== */}

<div className="w-[95%] mx-auto mt-14 mb-10">

    <div

        className="
        flex
        justify-between
        items-center

        rounded-3xl

        border
        border-[#252525]

        bg-gradient-to-b
        from-[#171717]
        to-[#101010]

        px-8
        py-5
        "

    >

        <div>

            <h3 className="text-white font-semibold">

                Page

                {" "}

                {currentPage}

                {" "}

                of

                {" "}

                {total_pages}

            </h3>

            <p className="text-gray-500 text-sm mt-1">
                Browse inventory
            </p>

        </div>

        <div className="flex gap-3">

            {

                [...Array(total_pages).keys()].map((page)=>(

                    <button

                        key={page}

                        onClick={()=>setCurrentPage(page+1)}

                        className={`

                        w-12
                        h-12

                        rounded-2xl

                        font-bold

                        transition-all
                        duration-300

                        ${
                            currentPage===page+1

                            ?

                            `
                            bg-gradient-to-r
                            from-red-700
                            to-red-500

                            text-white

                            shadow-[0_10px_25px_rgba(255,0,0,.35)]
                            `

                            :

                            `
                            bg-[#1a1a1a]

                            border
                            border-[#2b2b2b]

                            text-gray-400

                            hover:border-red-500/40
                            hover:text-white
                            hover:bg-[#222]
                            `
                        }

                        `}

                    >

                        {page+1}

                    </button>

                ))

            }

        </div>

    </div>

</div>

          {
cartOpen && (

<>

{/* ================= BACKDROP ================= */}

<div
    onClick={() => setCartOpen(false)}
    className="
    fixed
    inset-0
    bg-black/70
    backdrop-blur-md
    z-40
    "
/>

{/* ================= DRAWER ================= */}

<div
    className="
    fixed
    right-0
    top-0

    h-screen
    w-[430px]

    bg-gradient-to-b
    from-[#171717]
    via-[#111111]
    to-[#0c0c0c]

    border-l
    border-[#292929]

    shadow-[0_0_80px_rgba(0,0,0,.55)]

    z-50

    flex
    flex-col

    animate-[slideIn_.35s_ease]
    "
>

{/* ================= HEADER ================= */}

<div
className="
relative

px-7
py-6

border-b
border-[#252525]

overflow-hidden
"
>

<div
className="
absolute

right-[-80px]
top-[-80px]

w-56
h-56

rounded-full

bg-red-600/10

blur-3xl
"
/>

<div className="relative z-10 flex justify-between items-start">

<div>

<p
className="
uppercase
tracking-[4px]
text-red-400
text-xs
font-bold
"
>

Selling Module

</p>

<h2
className="
mt-2

text-3xl

font-black

text-white
"
>

Selling Cart

</h2>

<p className="text-gray-500 mt-2">

{
cart.reduce((acc,item)=>acc+item.quantity,0)
}

{" "}

Items Selected

</p>

</div>

<button

onClick={()=>setCartOpen(false)}

className="
w-12
h-12

rounded-2xl

bg-[#1b1b1b]

border
border-[#303030]

hover:border-red-500/40

hover:bg-red-500

transition-all

flex
items-center
justify-center
"

>

<X size={18}/>

</button>

</div>

</div>

{/* ================= ITEMS ================= */}

<div
className="
flex-1

overflow-y-auto

px-6
py-5

space-y-5
"
>

{

cart.length===0 ?

(

<div
className="
h-full

flex
flex-col

justify-center
items-center

text-center
"
>

<div
className="
w-24
h-24

rounded-full

bg-[#1a1a1a]

flex
items-center
justify-center

border
border-[#2a2a2a]
"
>

<ShoppingCart
size={40}
className="text-red-400"
/>

</div>

<h3
className="
mt-6

text-2xl

font-bold

text-white
"
>

Your Cart is Empty

</h3>

<p
className="
mt-3

text-gray-500

leading-7
"
>

Select products to generate
a new invoice.

</p>

</div>

)

:

cart.map((item)=>(

<div

key={item._id}

className="
group

rounded-3xl

border
border-[#252525]

bg-gradient-to-b
from-[#181818]
to-[#111111]

overflow-hidden

transition-all

hover:border-red-500/30
"

>

<div className="p-5">

<div className="flex gap-4">

{/* IMAGE */}

<div
className="
w-24
h-24

rounded-2xl

bg-[#202020]

border
border-[#2c2c2c]

overflow-hidden

flex
items-center
justify-center
"
>

<img

src={item.image}

alt={item.name}

className="
w-full
h-full

object-contain

transition-all

group-hover:scale-105
"

/>

</div>

{/* DETAILS */}

<div className="flex-1">

<h3
className="
text-white

font-bold

text-lg

leading-tight
"
>

{item.name}

</h3>

<p
className="
mt-2

text-red-400

font-black

text-2xl
"
>

₹{item.price}

</p>

<div
className="
mt-3

inline-flex

items-center

px-3
py-1

rounded-full

bg-[#1f1f1f]

border
border-[#303030]

text-xs

text-gray-400
"
>

Stock :

<span className="ml-2 text-white">

{item.availableStock}

</span>

</div>

</div>

</div>

{/* ================= QUANTITY ================= */}

<div
className="
mt-5

flex
justify-between
items-center
"
>

<div
className="
flex
items-center
gap-3
"
>

<button

className="
w-10
h-10

rounded-xl

bg-[#1d1d1d]

border
border-[#303030]

hover:border-red-500/40

transition

flex
items-center
justify-center
"

>

<Minus size={16}/>

</button>

<div
className="
w-12

text-center

text-lg

font-bold

text-white
"
>

{item.quantity}

</div>

<button

className="
w-10
h-10

rounded-xl

bg-red-600

hover:bg-red-500

transition

flex
items-center
justify-center
"

>

<Plus size={16}/>

</button>

</div>

<button

className="
w-10
h-10

rounded-xl

bg-[#1d1d1d]

border
border-[#303030]

hover:border-red-500

hover:text-red-400

transition

flex
items-center
justify-center
"

>

<Trash2 size={18}/>

</button>

</div>

{/* ================= TOTAL ================= */}

<div
className="
mt-5

pt-5

border-t
border-[#252525]

flex
justify-between
items-center
"
>

<p className="text-gray-500">

Subtotal

</p>

<h3
className="
text-2xl

font-black

text-red-400
"
>

₹{item.price*item.quantity}

</h3>

</div>

</div>

</div>

))

}

</div>

    {/* Footer */}

    {/* ================= FOOTER ================= */}

<div
className="
border-t
border-[#252525]

bg-[#101010]

px-7
py-6
"
>

{/* Invoice Summary */}

<div
className="
rounded-3xl

border
border-[#272727]

bg-gradient-to-b
from-[#171717]
to-[#121212]

p-5
"
>

<div className="flex justify-between items-center">

<span className="text-gray-500">
Items
</span>

<span className="text-white font-bold">

{

cart.reduce(
(acc,item)=>acc+item.quantity,
0
)

}

</span>

</div>

<div className="flex justify-between items-center mt-4">

<span className="text-gray-500">

Products

</span>

<span className="text-white font-bold">

{cart.length}

</span>

</div>

<div className="my-5 border-t border-[#2a2a2a]" />

<div className="flex justify-between items-end">

<div>

<p
className="
uppercase
tracking-[3px]
text-gray-500
text-xs
"
>

Grand Total

</p>

<h2
className="
mt-2

text-4xl

font-black

text-red-500
"
>

₹{

cart.reduce(

(acc,item)=>

acc+(item.price*item.quantity),

0

)

}

</h2>

</div>

<div
className="
px-4
py-2

rounded-full

bg-red-500/10

border
border-red-500/30

text-red-400

text-xs

font-bold

tracking-[2px]

uppercase
"
>

Ready

</div>

</div>

</div>

{/* Buttons */}

<div className="grid grid-cols-2 gap-3 mt-5">

<button

onClick={()=>setCart([])}

className="
h-12

rounded-2xl

border
border-[#303030]

bg-[#181818]

hover:border-red-500/40

hover:bg-[#1d1d1d]

transition-all

text-white
font-semibold
"

>

Clear Cart

</button>

<button

onClick={()=>setCartOpen(false)}

className="
h-12

rounded-2xl

border
border-[#303030]

bg-[#181818]

hover:border-white/20

hover:bg-[#202020]

transition-all

text-white
font-semibold
"

>

Continue

</button>

</div>

{/* Generate Invoice */}

<button

className="
mt-5

w-full
h-14

rounded-2xl

bg-gradient-to-r

from-red-700
via-red-600
to-red-500

text-white

font-bold

tracking-[2px]

transition-all
duration-300

hover:scale-[1.02]

hover:shadow-[0_20px_35px_rgba(255,0,0,.35)]

disabled:opacity-50

disabled:cursor-not-allowed
"

disabled={cart.length===0}

>

Generate Invoice

</button>

</div>

</div>

<style>{`

@keyframes slideIn{

from{

transform:translateX(100%);
opacity:0;

}

to{

transform:translateX(0);
opacity:1;

}

}

/* Premium Scrollbar */

::-webkit-scrollbar{

width:8px;

}

::-webkit-scrollbar-track{

background:#101010;

}

::-webkit-scrollbar-thumb{

background:#353535;
border-radius:20px;

}

::-webkit-scrollbar-thumb:hover{

background:#555;

}

`}</style>

</>

)

}


      {
openEditPopUp && (

<>

{/* Overlay */}

<div
onClick={()=>setEditPopUp(false)}
className="
fixed
inset-0
bg-black/75
backdrop-blur-md
z-[60]
"
/>

{/* Modal */}

<div
className="
fixed

left-1/2
top-1/2

-translate-x-1/2
-translate-y-1/2

w-[1050px]
max-h-[92vh]

overflow-hidden

rounded-[32px]

border
border-[#2d2d2d]

bg-gradient-to-b
from-[#171717]
via-[#111111]
to-[#0b0b0b]

shadow-[0_40px_100px_rgba(0,0,0,.65)]

z-[70]

animate-[popup_.25s_ease]
"
>

{/* Header */}

<div
className="
relative

px-8
py-7

border-b
border-[#252525]

overflow-hidden
"
>

<div
className="
absolute

right-[-80px]
top-[-80px]

w-64
h-64

rounded-full

bg-red-600/10

blur-3xl
"
/>

<div className="relative z-10 flex justify-between items-start">

<div>

<p
className="
uppercase
tracking-[4px]
text-red-400
text-xs
font-bold
"
>

Inventory Module

</p>

<h2
className="
mt-2

text-3xl

font-black

text-white
"
>

Edit Product

</h2>

<p className="text-gray-500 mt-2">

Modify the information and save your changes.

</p>

</div>

<button

onClick={()=>setEditPopUp(false)}

className="
w-12
h-12

rounded-2xl

bg-[#1a1a1a]

border
border-[#303030]

hover:border-red-500/40

hover:bg-red-500

transition-all

flex
items-center
justify-center
"

>

<X size={20}/>

</button>

</div>

</div>

{/* BODY */}

<div
className="
grid
grid-cols-[1.2fr_.9fr]

gap-8

p-8

max-h-[70vh]

overflow-y-auto
"
>
  <div className="space-y-6">

<div>

<label className="text-gray-400 text-sm">

Product Name

</label>

<input
name="productName"
value={editProductData.productName}
onChange={onEditChanegHandler}
className="premiumInput mt-2"
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
className="premiumInput mt-2"
/>

</div>

<div>

<label className="text-gray-400 text-sm">

Description

</label>

<textarea
rows={5}
name="productDescription"
value={editProductData.productDescription}
onChange={onEditChanegHandler}
className="premiumInput mt-2 resize-none"
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
className="premiumInput mt-2"
/>

</div>

<div className="grid grid-cols-2 gap-5">

<div>

<label className="text-gray-400 text-sm">

Selling Price

</label>

<input
type="number"
className="premiumInput mt-2"
/>

</div>

<div>

<label className="text-gray-400 text-sm">

Wholesale Price

</label>

<input
type="number"
className="premiumInput mt-2"
/>

</div>

</div>

<div className="grid grid-cols-2 gap-5">

<div>

<label className="text-gray-400 text-sm">

Quantity

</label>

<input
type="number"
className="premiumInput mt-2"
/>

</div>

<div>

<label className="text-gray-400 text-sm">

Priority

</label>

<input
type="number"
className="premiumInput mt-2"
/>

</div>

</div>

</div>
</div>
<div>

<div
className="
rounded-[28px]

border
border-[#2a2a2a]

bg-gradient-to-b
from-[#181818]
to-[#101010]

overflow-hidden
"
>

<div
className="
h-[260px]

bg-gradient-to-br
from-[#202020]
to-[#161616]

flex
justify-center
items-center
"
>

{

editProductData.productImage ?

<img

src={editProductData.productImage}

className="
w-full
h-full

object-contain

p-8
"

/>

:

<span className="text-gray-500">

Product Preview

</span>

}

</div>

<div className="p-6">

<p
className="
uppercase
tracking-[3px]

text-red-400

text-xs
font-bold
"
>

{editProductData.productCategory || "CATEGORY"}

</p>

<h2
className="
mt-3

text-3xl

font-black

text-white

leading-tight
"
>

{editProductData.productName || "Product Name"}

</h2>

<p
className="
mt-5

text-5xl

font-black

text-red-500
"
>

₹{editProductData.productPrice || 0}

</p>

<div
className="
mt-6

rounded-2xl

border
border-[#292929]

bg-[#171717]

p-4
"
>

<p className="text-gray-500 text-sm">

Description

</p>

<p className="text-gray-300 mt-2 leading-7">

{

editProductData.productDescription ||

"No description."

}

</p>

</div>

</div>

</div>

</div>

</div>

{/* FOOTER */}

<div
className="
border-t
border-[#252525]

px-8
py-6

flex
justify-end
gap-4
"
>

<button

onClick={()=>setEditPopUp(false)}

className="
px-8
h-12

rounded-2xl

bg-[#181818]

border
border-[#303030]

hover:border-red-500/40

transition-all

text-white
"

>

Cancel

</button>

<button

className="
px-10
h-12

rounded-2xl

bg-gradient-to-r

from-red-700
via-red-600
to-red-500

font-bold

tracking-wide

hover:shadow-[0_15px_30px_rgba(255,0,0,.35)]

transition-all
"

>

Save Changes

</button>

</div>


<style>{`

.premiumInput{

width:100%;

background:#181818;

border:1px solid #2d2d2d;

border-radius:18px;

padding:15px 18px;

color:white;

outline:none;

transition:.3s;

}

.premiumInput:focus{

border-color:#ef4444;

box-shadow:0 0 0 3px rgba(239,68,68,.12);

}

@keyframes popup{

from{

opacity:0;
transform:translate(-50%,-46%) scale(.95);

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

