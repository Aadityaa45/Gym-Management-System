
import React, { useEffect } from "react";
import { products as DummyProducts } from "../assets/hardcoded_content.js/dummyProductsData";
import ProductCard from "../components/AdminComponents/ProductCards"
import { useState } from "react";
import toast from "react-hot-toast";
import {
    Search,
    ShoppingCart,
    X,
    Minus,
    Plus,
    Trash2
} from "lucide-react";
import axios from "axios";

const Products = () =>{
  const [products,setProducts] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [cart,setCart] = useState([])
  const [cartOpen,setCartOpen] = useState(false)
  const [openEditPopUp,setEditPopUp] = useState(false)
  const [search,setSearch] = useState("")
  const [invoicePopupOpen,setInvoicePopupOpen] = useState(false)
  const [invoiceLoading,setInvoiceLoading] = useState(false)
  const [totalPages,setTotalPages] = useState(1)
  const [editProductData,setEditProductData] = useState({
    productName:"",
    productPrice:"",
    productCategory:"",
    productImage:"",
    productDescription:"",
    productPriorityOrder:"",
  })
const [memberSearch, setMemberSearch] = useState("");
const [memberResults, setMemberResults] = useState([]);
const [memberSearching, setMemberSearching] = useState(false);
const [selectedMember, setSelectedMember] = useState(null);
  const [invoiceData,setInvoiceData] = useState({
    memberId:"",
    invoiceTo:"",
    paymentMethod:"",
    paymentReceived:"",
    discountAmount:"",
    taxAmount:"",
    notes:"",
    dueDate:""
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

  //this is the function to handle the chnage of the invoice popup values 
  const invoiceInputChangeHandler = (e) =>{
    const {name,value}= e.target
    setInvoiceData((prev)=>({
        ...prev,
        [name]:value
    }))
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

  //------------------------------------------------THIS IS THE FUNCTION FOR INVOICE GENERATOR BACKEND CALL-----------------------------------------
  const generateInvoice = async () =>{
    try {
        if(cart.length===0){
            toast.error("Cart Is Empty!")
            return
        }
        if(invoiceData.paymentReceived==="" || Number(invoiceData.paymentReceived<0)){
            toast.error("Please Enter a valid payment recieved amount!!")
            return
        }

        setInvoiceLoading(true)

        //now we call the backend api
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(
            `${backendUrl}/api/admin/products/fetch-products?page=${currentPage}&limit=8&search=${search}`,
            {
                //here, we will send the payload to the backend
                products:
                    cart.map((item)=>({
                        _id:item._id,
                        quantity:item.quantity
                })),
                
                paymentMethod:invoiceData.paymentMethod,
                paymentReceived:Number(invoiceData.paymentReceived),
                discountAmount:Number(invoiceData.discountAmount ||0),
                notes:invoiceData.notes.trim() || null,
                dueDate:invoiceData.dueDate || null,
                taxAmount:Number(invoiceData.taxAmount || 0),
                purchaser: {
                    memberId: invoiceData.memberId.trim() || null,
                    invoiceTo: invoiceData.purchaserName.trim()
                },
            },
            {
                withCredentials:true
            }
        )  
        if(response.data.success){
            toast.success("Invoice Generated Successfullyy!!")
            setInvoiceLoading(false)
            setCartOpen(false)
            window.open(
                `${backendUrl}/api/admin/invoice/${response.data.invoiceId}`,
                "_blank"
            );
            setInvoiceData({
                memberId: "",
                purchaserName: "",
                paymentMethod: "cash",
                paymentReceived: "",
                discountAmount: "",
                taxAmount: "",
                notes: "",
                dueDate: "",
            });
        }else{
            toast.error(
                response.data.message || "Unable to generate invoice!"
            );
        } 
    } catch (error) {
        console.log("Generate Invoice Error:", error);
        console.log("Response:", error.response);

        toast.error(
            error.response?.data?.message ||
            "Something went wrong while generating invoice!"
        );
    }finally {

        setInvoiceLoading(false);

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

onClick={() => setInvoicePopupOpen(true)}

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

disabled={cart.length === 0}

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
invoicePopupOpen && (

<>

{/* ================= BACKDROP ================= */}

<div
    onClick={() => {
        if (!invoiceLoading) {
            setInvoicePopupOpen(false);
        }
    }}
    className="
    fixed
    inset-0

    bg-black/80
    backdrop-blur-md

    z-[80]
    "
/>


{/* ================= INVOICE MODAL ================= */}

<div
className="
fixed

left-1/2
top-1/2

-translate-x-1/2
-translate-y-1/2

w-[850px]
max-w-[95vw]

max-h-[90vh]

overflow-y-auto

rounded-[32px]

border
border-[#2d2d2d]

bg-gradient-to-b
from-[#181818]
via-[#111111]
to-[#0b0b0b]

shadow-[0_40px_120px_rgba(0,0,0,.7)]

z-[90]

"
>

{/* ================= HEADER ================= */}

<div
className="
px-8
py-7

border-b
border-[#252525]

flex
justify-between
items-start
"
>

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

Generate Invoice

</h2>

<p className="text-gray-500 mt-2">

Enter purchaser and payment details.

</p>

</div>


<button

onClick={() => setInvoicePopupOpen(false)}

disabled={invoiceLoading}

className="
w-12
h-12

rounded-2xl

bg-[#1a1a1a]

border
border-[#303030]

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


{/* ================= BODY ================= */}

<div className="p-8">

{/* Purchaser */}

<div>

<p
className="
text-white
font-bold
text-lg
"
>

Purchaser Information

</p>

<p className="text-gray-500 text-sm mt-1">

Member details are optional. Name is required for every sale.

</p>

</div>


<div className="grid grid-cols-2 gap-5 mt-6">

{/* Member ID */}

{/* <div>

<label className="text-gray-400 text-sm">

Member ID

<span className="text-gray-600 ml-2">
(Optional)
</span>

</label>

<input

type="text"

name="memberId"

value={invoiceData.memberId}

onChange={invoiceInputChangeHandler}

placeholder="Enter registered member ID"

className="premiumInput mt-2"

/>

</div> */}
<div className="relative">

    <label className="text-gray-400 text-sm">
        Member
        <span className="text-gray-600 ml-2">
            (Optional)
        </span>
    </label>

    <input
        type="text"
        value={memberSearch}
        onChange={(e) => setMemberSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="premiumInput mt-2"
    />

    {memberSearch.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 ...">

            {/* search results */}

        </div>
    )}

</div>


{/* Purchaser Name */}

<div>

<label className="text-gray-400 text-sm">

Purchaser Name

<span className="text-red-400 ml-1">
*
</span>

</label>

<input

type="text"

name="purchaserName"

value={invoiceData.purchaserName}

onChange={invoiceInputChangeHandler}

placeholder="Enter purchaser name"

className="premiumInput mt-2"

/>

</div>

</div>


{/* ================= PAYMENT ================= */}

<div className="mt-9">

<p
className="
text-white
font-bold
text-lg
"
>

Payment Information

</p>

</div>


<div className="grid grid-cols-2 gap-5 mt-6">

{/* Payment Method */}

<div>

<label className="text-gray-400 text-sm">

Payment Method

</label>

<select

name="paymentMethod"

value={invoiceData.paymentMethod}

onChange={invoiceInputChangeHandler}

className="premiumInput mt-2"

>

<option value="cash">
Cash
</option>

<option value="upi">
UPI
</option>

<option value="card">
Card
</option>

<option value="bank_transfer">
Bank Transfer
</option>

<option value="other">
Other
</option>

</select>

</div>


{/* Payment Received */}

<div>

<label className="text-gray-400 text-sm">

Payment Received

<span className="text-red-400 ml-1">
*
</span>

</label>

<input

type="number"

min="0"

name="paymentReceived"

value={invoiceData.paymentReceived}

onChange={invoiceInputChangeHandler}

placeholder="0"

className="premiumInput mt-2"

/>

</div>

</div>


{/* Discount + Tax */}

<div className="grid grid-cols-2 gap-5 mt-5">

<div>

<label className="text-gray-400 text-sm">

Discount Amount

</label>

<input

type="number"

min="0"

name="discountAmount"

value={invoiceData.discountAmount}

onChange={invoiceInputChangeHandler}

placeholder="0"

className="premiumInput mt-2"

/>

</div>


<div>

<label className="text-gray-400 text-sm">

Tax Amount

</label>

<input

type="number"

min="0"

name="taxAmount"

value={invoiceData.taxAmount}

onChange={invoiceInputChangeHandler}

placeholder="0"

className="premiumInput mt-2"

/>

</div>

</div>


{/* ================= NOTES ================= */}

<div className="mt-5">

<label className="text-gray-400 text-sm">

Notes

</label>

<textarea

name="notes"

value={invoiceData.notes}

onChange={invoiceInputChangeHandler}

rows={4}

placeholder="Optional notes for this invoice..."

className="
premiumInput
mt-2
resize-none
"

/>

</div>


{/* ================= DUE DATE ================= */}

<div className="mt-5">

<label className="text-gray-400 text-sm">

Due Date

<span className="text-gray-600 ml-2">
(Optional)
</span>

</label>

<input

type="date"

name="dueDate"

value={invoiceData.dueDate}

onChange={invoiceInputChangeHandler}

className="premiumInput mt-2"

/>

</div>


{/* ================= SUMMARY ================= */}

<div
className="
mt-8

rounded-3xl

border
border-[#292929]

bg-[#151515]

p-6
"
>

<div className="flex justify-between">

<span className="text-gray-500">
Products
</span>

<span className="text-white font-semibold">
{cart.length}
</span>

</div>


<div className="flex justify-between mt-4">

<span className="text-gray-500">
Total Items
</span>

<span className="text-white font-semibold">

{
cart.reduce(
(acc,item) => acc + item.quantity,
0
)
}

</span>

</div>


<div className="border-t border-[#292929] my-5"/>


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

Cart Total

</p>

<h2
className="
text-3xl
font-black

text-red-500

mt-2
"
>

₹{

cart.reduce(

(acc,item) =>
acc + item.price * item.quantity,

0

)

}

</h2>

</div>

</div>

</div>

</div>


{/* ================= FOOTER ================= */}

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

onClick={() => setInvoicePopupOpen(false)}

disabled={invoiceLoading}

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

onClick={generateInvoice}

disabled={
invoiceLoading ||
cart.length === 0 
// || !invoiceData.purchaserName.trim()
}

className="
px-10
h-12

rounded-2xl

bg-gradient-to-r

from-red-700
via-red-600
to-red-500

text-white

font-bold

hover:shadow-[0_15px_30px_rgba(255,0,0,.35)]

transition-all

disabled:opacity-50

disabled:cursor-not-allowed
"

>

{

invoiceLoading

?

"Generating..."

:

"Generate Invoice"

}

</button>

</div>

</div>

</>

)
}

      {
    invoicePopupOpen && (

        <>

            {/* ================= BACKDROP ================= */}

            <div
                onClick={() => {
                    if (!invoiceLoading) {
                        setInvoicePopupOpen(false);
                    }
                }}
                className="
                fixed
                inset-0

                bg-black/80
                backdrop-blur-lg

                z-[80]
                "
            />


            {/* ================= INVOICE MODAL ================= */}

            <div
                className="
                fixed

                left-1/2
                top-1/2

                -translate-x-1/2
                -translate-y-1/2

                w-[1000px]
                max-w-[95vw]

                max-h-[92vh]

                overflow-hidden

                rounded-[32px]

                border
                border-[#2b2b2b]

                bg-gradient-to-b
                from-[#181818]
                via-[#111111]
                to-[#0b0b0b]

                shadow-[0_40px_120px_rgba(0,0,0,.75)]

                z-[90]

                flex
                flex-col
                "
            >


                {/* =====================================================
                                HEADER
                ===================================================== */}

                <div
                    className="
                    relative

                    px-8
                    py-7

                    border-b
                    border-[#292929]

                    shrink-0

                    overflow-hidden
                    "
                >

                    {/* Background Glow */}

                    <div
                        className="
                        absolute

                        right-[-100px]
                        top-[-100px]

                        w-72
                        h-72

                        rounded-full

                        bg-red-600/10

                        blur-3xl
                        "
                    />

                    <div
                        className="
                        absolute

                        left-[-100px]
                        bottom-[-150px]

                        w-64
                        h-64

                        rounded-full

                        bg-red-600/5

                        blur-3xl
                        "
                    />


                    <div
                        className="
                        relative
                        z-10

                        flex
                        justify-between
                        items-start
                        "
                    >

                        <div>

                            <div
                                className="
                                flex
                                items-center
                                gap-3
                                "
                            >

                                <div
                                    className="
                                    w-10
                                    h-10

                                    rounded-xl

                                    bg-red-500/10

                                    border
                                    border-red-500/20

                                    flex
                                    items-center
                                    justify-center

                                    text-red-400
                                    "
                                >

                                    ₹

                                </div>

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

                            </div>


                            <h2
                                className="
                                mt-3

                                text-3xl
                                md:text-4xl

                                font-black

                                text-white
                                "
                            >

                                Generate Invoice

                            </h2>


                            <p
                                className="
                                text-gray-500

                                mt-2

                                text-sm
                                "
                            >

                                Complete the purchaser and payment details
                                to generate the invoice.

                            </p>

                        </div>


                        {/* CLOSE */}

                        <button

                            onClick={() => setInvoicePopupOpen(false)}

                            disabled={invoiceLoading}

                            className="
                            w-12
                            h-12

                            shrink-0

                            rounded-2xl

                            bg-[#191919]

                            border
                            border-[#303030]

                            text-gray-400

                            hover:text-white
                            hover:bg-red-500
                            hover:border-red-500

                            transition-all
                            duration-300

                            flex
                            items-center
                            justify-center

                            disabled:opacity-40
                            "

                        >

                            <X size={20}/>

                        </button>

                    </div>

                </div>



                {/* =====================================================
                                BODY
                ===================================================== */}

                <div
                    className="
                    flex-1

                    overflow-y-auto

                    px-8
                    py-7

                    "
                >

                    <div
                        className="
                        grid

                        grid-cols-1
                        lg:grid-cols-[1.25fr_.75fr]

                        gap-7
                        "
                    >


                        {/* =================================================
                                    LEFT SECTION
                        ================================================= */}

                        <div className="space-y-7">


                            {/* ================= PURCHASER ================= */}

                            <div
                                className="
                                rounded-3xl

                                border
                                border-[#292929]

                                bg-[#121212]

                                overflow-hidden
                                "
                            >

                                {/* Section Header */}

                                <div
                                    className="
                                    px-6
                                    py-5

                                    border-b
                                    border-[#252525]

                                    "
                                >

                                    <div className="flex items-center gap-3">

                                        <div
                                            className="
                                            w-9
                                            h-9

                                            rounded-xl

                                            bg-red-500/10

                                            border
                                            border-red-500/20

                                            flex
                                            items-center
                                            justify-center

                                            text-red-400

                                            font-bold
                                            "
                                        >

                                            01

                                        </div>


                                        <div>

                                            <h3
                                                className="
                                                text-white
                                                font-bold
                                                text-lg
                                                "
                                            >

                                                Purchaser Information

                                            </h3>

                                            <p
                                                className="
                                                text-gray-500
                                                text-xs
                                                mt-1
                                                "
                                            >

                                                Registered member or guest purchaser

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Fields */}

                                <div
                                    className="
                                    p-6

                                    grid
                                    grid-cols-1
                                    md:grid-cols-2

                                    gap-5
                                    "
                                >

                                    {/* MEMBER ID */}

                                    <div>

                                        <label
                                            className="
                                            block

                                            text-gray-400
                                            text-xs

                                            uppercase
                                            tracking-[1.5px]

                                            font-semibold
                                            "
                                        >

                                            Member ID

                                            <span
                                                className="
                                                text-gray-600
                                                normal-case
                                                tracking-normal
                                                ml-2
                                                "
                                            >

                                                Optional

                                            </span>

                                        </label>


                                        <input

                                            type="text"

                                            name="memberId"

                                            value={invoiceData.memberId}

                                            onChange={invoiceInputChangeHandler}

                                            placeholder="e.g. MEM-1024"

                                            className="
                                            w-full

                                            h-12

                                            mt-2

                                            px-4

                                            rounded-xl

                                            bg-[#0c0c0c]

                                            border
                                            border-[#2c2c2c]

                                            text-white

                                            placeholder:text-gray-600

                                            outline-none

                                            transition-all

                                            focus:border-red-500/60
                                            focus:ring-4
                                            focus:ring-red-500/10
                                            "
                                        />

                                    </div>


                                    {/* PURCHASER NAME */}

                                    <div>

                                        <label
                                            className="
                                            block

                                            text-gray-400
                                            text-xs

                                            uppercase
                                            tracking-[1.5px]

                                            font-semibold
                                            "
                                        >

                                            Purchaser Name

                                            <span className="text-red-400 ml-1">

                                                *

                                            </span>

                                        </label>


                                        <input

                                            type="text"

                                            name="purchaserName"

                                            value={invoiceData.purchaserName}

                                            onChange={invoiceInputChangeHandler}

                                            placeholder="Enter purchaser name"

                                            className="
                                            w-full

                                            h-12

                                            mt-2

                                            px-4

                                            rounded-xl

                                            bg-[#0c0c0c]

                                            border
                                            border-[#2c2c2c]

                                            text-white

                                            placeholder:text-gray-600

                                            outline-none

                                            transition-all

                                            focus:border-red-500/60
                                            focus:ring-4
                                            focus:ring-red-500/10
                                            "
                                        />

                                    </div>

                                </div>

                            </div>



                            {/* ================= PAYMENT ================= */}

                            <div
                                className="
                                rounded-3xl

                                border
                                border-[#292929]

                                bg-[#121212]

                                overflow-hidden
                                "
                            >

                                {/* Header */}

                                <div
                                    className="
                                    px-6
                                    py-5

                                    border-b
                                    border-[#252525]
                                    "
                                >

                                    <div className="flex items-center gap-3">

                                        <div
                                            className="
                                            w-9
                                            h-9

                                            rounded-xl

                                            bg-red-500/10

                                            border
                                            border-red-500/20

                                            flex
                                            items-center
                                            justify-center

                                            text-red-400

                                            font-bold
                                            "
                                        >

                                            02

                                        </div>


                                        <div>

                                            <h3
                                                className="
                                                text-white
                                                font-bold
                                                text-lg
                                                "
                                            >

                                                Payment Information

                                            </h3>

                                            <p
                                                className="
                                                text-gray-500
                                                text-xs
                                                mt-1
                                                "
                                            >

                                                Configure payment and invoice amounts

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Payment Fields */}

                                <div className="p-6 space-y-5">


                                    <div
                                        className="
                                        grid
                                        grid-cols-1
                                        md:grid-cols-2

                                        gap-5
                                        "
                                    >

                                        {/* PAYMENT METHOD */}

                                        <div>

                                            <label
                                                className="
                                                block

                                                text-gray-400
                                                text-xs

                                                uppercase
                                                tracking-[1.5px]

                                                font-semibold
                                                "
                                            >

                                                Payment Method

                                            </label>


                                            <select

                                                name="paymentMethod"

                                                value={invoiceData.paymentMethod}

                                                onChange={invoiceInputChangeHandler}

                                                className="
                                                w-full

                                                h-12

                                                mt-2

                                                px-4

                                                rounded-xl

                                                bg-[#0c0c0c]

                                                border
                                                border-[#2c2c2c]

                                                text-white

                                                outline-none

                                                cursor-pointer

                                                focus:border-red-500/60

                                                focus:ring-4
                                                focus:ring-red-500/10
                                                "
                                            >

                                                <option value="cash">
                                                    Cash
                                                </option>

                                                <option value="upi">
                                                    UPI
                                                </option>

                                                <option value="card">
                                                    Card
                                                </option>

                                                <option value="bank_transfer">
                                                    Bank Transfer
                                                </option>

                                                <option value="other">
                                                    Other
                                                </option>

                                            </select>

                                        </div>


                                        {/* PAYMENT RECEIVED */}

                                        <div>

                                            <label
                                                className="
                                                block

                                                text-gray-400
                                                text-xs

                                                uppercase
                                                tracking-[1.5px]

                                                font-semibold
                                                "
                                            >

                                                Payment Received

                                                <span className="text-red-400 ml-1">
                                                    *
                                                </span>

                                            </label>


                                            <div className="relative">

                                                <span
                                                    className="
                                                    absolute
                                                    left-4
                                                    top-1/2
                                                    -translate-y-1/2

                                                    text-gray-500
                                                    "
                                                >

                                                    ₹

                                                </span>


                                                <input

                                                    type="number"

                                                    min="0"

                                                    name="paymentReceived"

                                                    value={invoiceData.paymentReceived}

                                                    onChange={invoiceInputChangeHandler}

                                                    placeholder="0"

                                                    className="
                                                    w-full

                                                    h-12

                                                    mt-2

                                                    pl-9
                                                    pr-4

                                                    rounded-xl

                                                    bg-[#0c0c0c]

                                                    border
                                                    border-[#2c2c2c]

                                                    text-white

                                                    placeholder:text-gray-600

                                                    outline-none

                                                    focus:border-red-500/60

                                                    focus:ring-4
                                                    focus:ring-red-500/10
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>



                                    {/* DISCOUNT + TAX */}

                                    <div
                                        className="
                                        grid
                                        grid-cols-1
                                        md:grid-cols-2

                                        gap-5
                                        "
                                    >

                                        {/* DISCOUNT */}

                                        <div>

                                            <label
                                                className="
                                                block

                                                text-gray-400
                                                text-xs

                                                uppercase
                                                tracking-[1.5px]

                                                font-semibold
                                                "
                                            >

                                                Discount Amount

                                            </label>


                                            <div className="relative">

                                                <span
                                                    className="
                                                    absolute
                                                    left-4
                                                    top-1/2
                                                    -translate-y-1/2

                                                    text-gray-500
                                                    "
                                                >

                                                    ₹

                                                </span>


                                                <input

                                                    type="number"

                                                    min="0"

                                                    name="discountAmount"

                                                    value={invoiceData.discountAmount}

                                                    onChange={invoiceInputChangeHandler}

                                                    placeholder="0"

                                                    className="
                                                    w-full

                                                    h-12

                                                    mt-2

                                                    pl-9
                                                    pr-4

                                                    rounded-xl

                                                    bg-[#0c0c0c]

                                                    border
                                                    border-[#2c2c2c]

                                                    text-white

                                                    outline-none

                                                    focus:border-red-500/60
                                                    focus:ring-4
                                                    focus:ring-red-500/10
                                                    "
                                                />

                                            </div>

                                        </div>


                                        {/* TAX */}

                                        <div>

                                            <label
                                                className="
                                                block

                                                text-gray-400
                                                text-xs

                                                uppercase
                                                tracking-[1.5px]

                                                font-semibold
                                                "
                                            >

                                                Tax Amount

                                            </label>


                                            <div className="relative">

                                                <span
                                                    className="
                                                    absolute
                                                    left-4
                                                    top-1/2
                                                    -translate-y-1/2

                                                    text-gray-500
                                                    "
                                                >

                                                    ₹

                                                </span>


                                                <input

                                                    type="number"

                                                    min="0"

                                                    name="taxAmount"

                                                    value={invoiceData.taxAmount}

                                                    onChange={invoiceInputChangeHandler}

                                                    placeholder="0"

                                                    className="
                                                    w-full

                                                    h-12

                                                    mt-2

                                                    pl-9
                                                    pr-4

                                                    rounded-xl

                                                    bg-[#0c0c0c]

                                                    border
                                                    border-[#2c2c2c]

                                                    text-white

                                                    outline-none

                                                    focus:border-red-500/60
                                                    focus:ring-4
                                                    focus:ring-red-500/10
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>


                                    {/* NOTES */}

                                    <div>

                                        <label
                                            className="
                                            block

                                            text-gray-400
                                            text-xs

                                            uppercase
                                            tracking-[1.5px]

                                            font-semibold
                                            "
                                        >

                                            Notes

                                            <span
                                                className="
                                                text-gray-600
                                                normal-case
                                                tracking-normal
                                                ml-2
                                                "
                                            >

                                                Optional

                                            </span>

                                        </label>


                                        <textarea

                                            name="notes"

                                            value={invoiceData.notes}

                                            onChange={invoiceInputChangeHandler}

                                            rows={3}

                                            placeholder="Add any additional notes..."

                                            className="
                                            w-full

                                            mt-2

                                            px-4
                                            py-3

                                            rounded-xl

                                            bg-[#0c0c0c]

                                            border
                                            border-[#2c2c2c]

                                            text-white

                                            placeholder:text-gray-600

                                            outline-none

                                            resize-none

                                            focus:border-red-500/60

                                            focus:ring-4
                                            focus:ring-red-500/10
                                            "
                                        />

                                    </div>


                                    {/* DUE DATE */}

                                    <div>

                                        <label
                                            className="
                                            block

                                            text-gray-400
                                            text-xs

                                            uppercase
                                            tracking-[1.5px]

                                            font-semibold
                                            "
                                        >

                                            Due Date

                                            <span
                                                className="
                                                text-gray-600
                                                normal-case
                                                tracking-normal
                                                ml-2
                                                "
                                            >

                                                Optional

                                            </span>

                                        </label>


                                        <input

                                            type="date"

                                            name="dueDate"

                                            value={invoiceData.dueDate}

                                            onChange={invoiceInputChangeHandler}

                                            className="
                                            w-full

                                            h-12

                                            mt-2

                                            px-4

                                            rounded-xl

                                            bg-[#0c0c0c]

                                            border
                                            border-[#2c2c2c]

                                            text-white

                                            outline-none

                                            focus:border-red-500/60

                                            focus:ring-4
                                            focus:ring-red-500/10
                                            "
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>



                        {/* =================================================
                                    RIGHT SECTION
                        ================================================= */}

                        <div>

                            <div
                                className="
                                sticky
                                top-0

                                rounded-3xl

                                border
                                border-[#292929]

                                bg-gradient-to-b
                                from-[#171717]
                                to-[#101010]

                                overflow-hidden
                                "
                            >


                                {/* SUMMARY HEADER */}

                                <div
                                    className="
                                    px-6
                                    py-5

                                    border-b
                                    border-[#292929]
                                    "
                                >

                                    <p
                                        className="
                                        uppercase
                                        tracking-[3px]

                                        text-red-400

                                        text-[10px]

                                        font-bold
                                        "
                                    >

                                        Order Summary

                                    </p>


                                    <h3
                                        className="
                                        text-white

                                        text-xl

                                        font-black

                                        mt-2
                                        "
                                    >

                                        Invoice Details

                                    </h3>

                                </div>



                                {/* PRODUCT LIST */}

                                <div
                                    className="
                                    max-h-[300px]

                                    overflow-y-auto

                                    p-5

                                    space-y-3
                                    "
                                >

                                    {

                                        cart.map((item) => (

                                            <div
                                                key={item._id}

                                                className="
                                                flex
                                                gap-3

                                                p-3

                                                rounded-2xl

                                                bg-[#0d0d0d]

                                                border
                                                border-[#252525]
                                                "
                                            >

                                                <div
                                                    className="
                                                    w-12
                                                    h-12

                                                    rounded-xl

                                                    bg-[#181818]

                                                    border
                                                    border-[#292929]

                                                    overflow-hidden

                                                    shrink-0
                                                    "
                                                >

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}

                                                        className="
                                                        w-full
                                                        h-full

                                                        object-contain
                                                        p-1
                                                        "
                                                    />

                                                </div>


                                                <div className="flex-1 min-w-0">

                                                    <p
                                                        className="
                                                        text-white

                                                        text-sm

                                                        font-semibold

                                                        truncate
                                                        "
                                                    >

                                                        {item.name}

                                                    </p>


                                                    <p
                                                        className="
                                                        text-gray-500

                                                        text-xs

                                                        mt-1
                                                        "
                                                    >

                                                        {item.quantity}
                                                        {" × "}
                                                        ₹{item.price}

                                                    </p>

                                                </div>


                                                <p
                                                    className="
                                                    text-white

                                                    text-sm

                                                    font-bold

                                                    whitespace-nowrap
                                                    "
                                                >

                                                    ₹
                                                    {item.price * item.quantity}

                                                </p>

                                            </div>

                                        ))

                                    }

                                </div>



                                {/* SUMMARY */}

                                <div
                                    className="
                                    border-t
                                    border-[#292929]

                                    p-6
                                    "
                                >

                                    <div className="space-y-3">

                                        <div className="flex justify-between">

                                            <span className="text-gray-500 text-sm">
                                                Products
                                            </span>

                                            <span className="text-white font-semibold">
                                                {cart.length}
                                            </span>

                                        </div>


                                        <div className="flex justify-between">

                                            <span className="text-gray-500 text-sm">
                                                Total Items
                                            </span>

                                            <span className="text-white font-semibold">

                                                {
                                                    cart.reduce(
                                                        (acc, item) =>
                                                            acc + item.quantity,
                                                        0
                                                    )
                                                }

                                            </span>

                                        </div>


                                        <div className="border-t border-[#292929] my-4"/>


                                        <div className="flex justify-between">

                                            <span className="text-gray-500 text-sm">
                                                Subtotal
                                            </span>

                                            <span className="text-white font-semibold">

                                                ₹
                                                {
                                                    cart.reduce(
                                                        (acc, item) =>
                                                            acc +
                                                            item.price *
                                                            item.quantity,
                                                        0
                                                    )
                                                }

                                            </span>

                                        </div>


                                        <div className="flex justify-between">

                                            <span className="text-gray-500 text-sm">
                                                Discount
                                            </span>

                                            <span className="text-gray-300">

                                                - ₹
                                                {invoiceData.discountAmount || 0}

                                            </span>

                                        </div>


                                        <div className="flex justify-between">

                                            <span className="text-gray-500 text-sm">
                                                Tax
                                            </span>

                                            <span className="text-gray-300">

                                                + ₹
                                                {invoiceData.taxAmount || 0}

                                            </span>

                                        </div>

                                    </div>



                                    {/* GRAND TOTAL */}

                                    <div
                                        className="
                                        mt-5

                                        p-5

                                        rounded-2xl

                                        bg-red-500/5

                                        border
                                        border-red-500/20
                                        "
                                    >

                                        <p
                                            className="
                                            uppercase
                                            tracking-[2px]

                                            text-gray-500

                                            text-[10px]

                                            font-bold
                                            "
                                        >

                                            Grand Total

                                        </p>


                                        <div
                                            className="
                                            flex
                                            justify-between
                                            items-end

                                            mt-2
                                            "
                                        >

                                            <h2
                                                className="
                                                text-3xl

                                                font-black

                                                text-red-400
                                                "
                                            >

                                                ₹
                                                {
                                                    Math.max(
                                                        0,

                                                        cart.reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                item.price *
                                                                item.quantity,
                                                            0
                                                        ) +

                                                        Number(
                                                            invoiceData.taxAmount || 0
                                                        ) -

                                                        Number(
                                                            invoiceData.discountAmount || 0
                                                        )
                                                    )
                                                }

                                            </h2>


                                            <span
                                                className="
                                                px-3
                                                py-1

                                                rounded-full

                                                bg-red-500/10

                                                border
                                                border-red-500/20

                                                text-red-400

                                                text-[10px]

                                                font-bold

                                                uppercase
                                                "
                                            >

                                                Ready

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                {/* =====================================================
                                FOOTER
                ===================================================== */}

                <div
                    className="
                    shrink-0

                    border-t
                    border-[#292929]

                    bg-[#0d0d0d]

                    px-8
                    py-5

                    flex
                    flex-col
                    sm:flex-row

                    justify-between
                    items-center

                    gap-4
                    "
                >

                    <div>

                        <p className="text-gray-500 text-xs">

                            Invoice will be generated for

                        </p>

                        <p
                            className="
                            text-white

                            font-semibold

                            mt-1
                            "
                        >

                            {invoiceData.purchaserName || "Guest Purchaser"}

                        </p>

                    </div>


                    <div className="flex gap-3">

                        <button

                            onClick={() => setInvoicePopupOpen(false)}

                            disabled={invoiceLoading}

                            className="
                            px-7

                            h-12

                            rounded-xl

                            bg-[#181818]

                            border
                            border-[#303030]

                            text-gray-300

                            hover:text-white

                            hover:border-[#444]

                            transition-all
                            "
                        >

                            Cancel

                        </button>


                        <button

                            onClick={generateInvoice}

                            disabled={
                                invoiceLoading ||
                                cart.length === 0
                            }

                            className="
                            px-8

                            h-12

                            rounded-xl

                            bg-gradient-to-r
                            from-red-700
                            via-red-600
                            to-red-500

                            text-white

                            font-bold

                            shadow-[0_10px_30px_rgba(239,68,68,.15)]

                            hover:shadow-[0_15px_35px_rgba(239,68,68,.3)]

                            hover:scale-[1.01]

                            transition-all

                            disabled:opacity-50

                            disabled:cursor-not-allowed

                            disabled:hover:scale-100
                            "
                        >

                            {

                                invoiceLoading

                                ? "Generating..."

                                : "Generate Invoice"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </>

    )


}

        </div>
    )
}

export default Products

