// import React, { useState } from "react";
// import { Toaster } from "react-hot-toast";
// import {
//   Package,
//   Upload,
//   IndianRupee,
//   Boxes,
//   ImagePlus,
// } from "lucide-react";

// const AddNewProduct = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     description: "",
//     quantity: "",
//     price: "",
//     wholeSalePrice: "",
//     priorityOrder: "",
//     status: "available",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setProduct({
//       ...product,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const AddProductHandler = async () =>{
//     try {
//         const backendUrl = import.meta.env.VITE_BACKEND_URL;
//         const payload = {
//             name,
//             category,
//             description,
//             quantity,
//             price,
//             wholeSalePrice,
//             priorityOrder,
//             status,
//             image
//         }
//     } catch (error) {
        
//     }
//   }

//   return (
//     <div className="w-full min-h-screen bg-[#071321] text-white p-10">

//       {/* Heading */}

//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">
//           Add New Product
//         </h1>

//         <p className="text-gray-400 mt-2">
//           Create products that can be sold directly from your gym.
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">

//         {/* Left Form */}

//         <div className="lg:col-span-2 space-y-7">

//           {/* Product Details */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">

//             <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
//               <Package size={20}/>
//               Product Details
//             </h2>

//             <div className="grid md:grid-cols-2 gap-5">

//               <input
//                 name="name"
//                 placeholder="Product Name"
//                 value={product.name}
//                 onChange={handleChange}
//                 className="input"
//               />

//               <input
//                 name="category"
//                 placeholder="Category"
//                 value={product.category}
//                 onChange={handleChange}
//                 className="input"
//               />

//             </div>

//             <textarea
//               rows={5}
//               placeholder="Description..."
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               className="input mt-5 resize-none"
//             />

//             <select
//               name="status"
//               value={product.status}
//               onChange={handleChange}
//               className="input mt-5"
//             >
//               <option value="available">
//                 Available
//               </option>

//               <option value="coming soon">
//                 Coming Soon
//               </option>

//             </select>

//           </div>

//           {/* Pricing */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">

//             <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
//               <IndianRupee size={20}/>
//               Pricing
//             </h2>

//             <div className="grid md:grid-cols-2 gap-5">

//               <input
//                 type="number"
//                 placeholder="Selling Price"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 className="input"
//               />

//               <input
//                 type="number"
//                 placeholder="Wholesale Price"
//                 name="wholesalePrice"
//                 value={product.wholesalePrice}
//                 onChange={handleChange}
//                 className="input"
//               />

//             </div>

//           </div>

//           {/* Inventory */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">

//             <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
//               <Boxes size={20}/>
//               Inventory
//             </h2>

//             <div className="grid md:grid-cols-2 gap-5">

//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 name="quantity"
//                 value={product.quantity}
//                 onChange={handleChange}
//                 className="input"
//               />

//               <input
//                 type="number"
//                 placeholder="Priority Order"
//                 name="priorityOrder"
//                 value={product.priorityOrder}
//                 onChange={handleChange}
//                 className="input"
//               />

//             </div>

//           </div>

//           {/* Image Upload */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">

//             <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
//               <ImagePlus size={20}/>
//               Product Image
//             </h2>

//             <label
//               className="
//               border-2
//               border-dashed
//               border-[#28496b]
//               rounded-2xl
//               h-56
//               flex
//               flex-col
//               items-center
//               justify-center
//               cursor-pointer
//               hover:border-violet-500
//               transition-all
//             "
//             >

//               <Upload size={42} className="text-violet-400"/>

//               <p className="mt-3 text-lg">
//                 Click to Upload
//               </p>

//               <span className="text-gray-500 text-sm">
//                 JPG, PNG up to 5MB
//               </span>

//               <input
//                 hidden
//                 type="file"
//               />

//             </label>

//           </div>

//           {/* Buttons */}

//           <div className="flex justify-end gap-4">

//             <button
//               className="
//               px-8
//               py-3
//               rounded-xl
//               border
//               border-gray-600
//               hover:bg-gray-700
//             "
//             >
//               Cancel
//             </button>

//             <button
//               className="
//               px-8
//               py-3
//               rounded-xl
//               bg-violet-600
//               hover:bg-violet-500
//             "
//             >
//               Add Product
//             </button>

//           </div>

//         </div>

//         {/* Live Preview */}

//         <div>

//           <div className="sticky top-8">

//             <div className="bg-[#091729] rounded-3xl border border-[#19314d] overflow-hidden">

//               <div className="h-64 bg-[#11243c] flex justify-center items-center">

//                 <Package size={80} className="text-gray-500"/>

//               </div>

//               <div className="p-6">

//                 <p className="text-gray-400 text-sm">
//                   {product.category || "Category"}
//                 </p>

//                 <h2 className="text-xl font-semibold mt-2">
//                   {product.name || "Product Name"}
//                 </h2>

//                 <p className="text-violet-400 text-3xl font-bold mt-5">
//                   ₹ {product.price || 0}
//                 </p>

//                 <div className="mt-6 flex justify-between">

//                   <div>

//                     <p className="text-gray-400 text-sm">
//                       Stock
//                     </p>

//                     <h3>{product.quantity || 0}</h3>

//                   </div>

//                   <div>

//                     <p className="text-gray-400 text-sm">
//                       Status
//                     </p>

//                     <h3 className="capitalize">
//                       {product.status}
//                     </h3>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       <style>{`
//         .input{
//           width:100%;
//           background:#0d2036;
//           border:1px solid #294872;
//           padding:14px 18px;
//           border-radius:14px;
//           outline:none;
//           color:white;
//           transition:.25s;
//         }

//         .input:focus{
//           border-color:#8b5cf6;
//           box-shadow:0 0 0 3px rgba(139,92,246,.2);
//         }
//       `}</style>

//     </div>
//   );
// };

// export default AddNewProduct;

// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Package,
//   IndianRupee,
//   Boxes,
//   ImagePlus,
// } from "lucide-react";

// const AddNewProduct = () => {
//     const navigate = useNavigate()
//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     description: "",
//     quantity: "",
//     price: "",
//     wholeSalePrice: "",
//     priorityOrder: "",
//     status: "available",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setProduct({
//       ...product,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const AddProductHandler = async () => {
//     try {
//       const backendUrl = import.meta.env.VITE_BACKEND_URL;

//       const payload = {
//         name: product.name,
//         category: product.category,
//         description: product.description,
//         quantity: product.quantity,
//         price: product.price,
//         wholeSalePrice: product.wholeSalePrice,
//         priorityOrder: product.priorityOrder,
//         status: product.status,
//         image: product.image,
//       };

//       const response = await axios.post(
//         `${backendUrl}/api/admin/products/add-product`,
//         payload,
//         {
//             withCredentials:true
//         }
//       )

//       if(response.data.success){
//         toast.success("New Product Added Successfully")
//         navigate('/admin/products')
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong!")
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#071321] text-white p-10">
//       <Toaster />

//       {/* Heading */}

//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Add New Product</h1>

//         <p className="text-gray-400 mt-2">
//           Create products that can be sold directly from your gym.
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Left */}

//         <div className="lg:col-span-2 space-y-7">
//           {/* Product Details */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
//             <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
//               <Package size={20} />
//               Product Details
//             </h2>

//             <div className="grid md:grid-cols-2 gap-5">
//               <input
//                 name="name"
//                 placeholder="Product Name"
//                 value={product.name}
//                 onChange={handleChange}
//                 className="input"
//               />

//               <input
//                 name="category"
//                 placeholder="Category"
//                 value={product.category}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <textarea
//               rows={5}
//               placeholder="Description..."
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               className="input mt-5 resize-none"
//             />

//             <select
//               name="status"
//               value={product.status}
//               onChange={handleChange}
//               className="input mt-5"
//             >
//               <option value="available">Available</option>
//               <option value="coming soon">Coming Soon</option>
//             </select>
//           </div>

//           {/* Pricing */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
//             <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
//               <IndianRupee size={20} />
//               Pricing
//             </h2>

//             <div className="grid md:grid-cols-2 gap-5">
//               <input
//                 type="number"
//                 placeholder="Selling Price"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 className="input"
//               />

//               <input
//                 type="number"
//                 placeholder="Wholesale Price"
//                 name="wholeSalePrice"
//                 value={product.wholeSalePrice}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* Inventory */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
//             <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
//               <Boxes size={20} />
//               Inventory
//             </h2>

//             <div className="grid md:grid-cols-2 gap-5">
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 name="quantity"
//                 value={product.quantity}
//                 onChange={handleChange}
//                 className="input"
//               />

//               <input
//                 type="number"
//                 placeholder="Priority Order"
//                 name="priorityOrder"
//                 value={product.priorityOrder}
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* Image URL */}

//           <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
//             <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
//               <ImagePlus size={20} />
//               Product Image
//             </h2>

//             <input
//               type="text"
//               name="image"
//               placeholder="Paste Product Image URL"
//               value={product.image}
//               onChange={handleChange}
//               className="input"
//             />

//             <p className="text-gray-500 text-sm mt-3">
//               Example:
//               https://images.unsplash.com/photo-1583454110551-21f2fa2afe61
//             </p>
//           </div>

//           {/* Buttons */}

//           <div className="flex justify-end gap-4">
//             <button
//               className="
//                 px-8
//                 py-3
//                 rounded-xl
//                 border
//                 border-gray-600
//                 hover:bg-gray-700
//                 transition-all
//               "
//             >
//               Cancel
//             </button>

//             <button
//               onClick={AddProductHandler}
//               className="
//                 px-8
//                 py-3
//                 rounded-xl
//                 bg-violet-600
//                 hover:bg-violet-500
//                 transition-all
//               "
//             >
//               Add Product
//             </button>
//           </div>
//         </div>

//         {/* Live Preview */}

//         <div>
//           <div className="sticky top-8">
//             <div className="bg-[#091729] rounded-3xl border border-[#19314d] overflow-hidden">
//               {/* Image */}

//               <div className="h-64 bg-[#11243c] flex justify-center items-center overflow-hidden">
//                 {product.image ? (
//                   <img
//                     src={product.image}
//                     alt="Preview"
//                     className="w-full h-full object-contain"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                     }}
//                   />
//                 ) : (
//                   <Package size={80} className="text-gray-500" />
//                 )}
//               </div>

//               {/* Preview Body */}

//               <div className="p-6">
//                 <p className="text-gray-400 text-sm">
//                   {product.category || "Category"}
//                 </p>

//                 <h2 className="text-xl font-semibold mt-2">
//                   {product.name || "Product Name"}
//                 </h2>

//                 <p className="text-violet-400 text-3xl font-bold mt-5">
//                   ₹ {product.price || 0}
//                 </p>

//                 <div className="mt-6 flex justify-between">
//                   <div>
//                     <p className="text-gray-400 text-sm">Stock</p>

//                     <h3>{product.quantity || 0}</h3>
//                   </div>

//                   <div>
//                     <p className="text-gray-400 text-sm">Status</p>

//                     <h3 className="capitalize">
//                       {product.status}
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <p className="text-gray-400 text-sm">
//                     Wholesale Price
//                   </p>

//                   <h3 className="text-lg font-semibold text-emerald-400">
//                     ₹ {product.wholeSalePrice || 0}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .input{
//           width:100%;
//           background:#0d2036;
//           border:1px solid #294872;
//           padding:14px 18px;
//           border-radius:14px;
//           outline:none;
//           color:white;
//           transition:.25s;
//         }

//         .input:focus{
//           border-color:#8b5cf6;
//           box-shadow:0 0 0 3px rgba(139,92,246,.2);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AddNewProduct;

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Package,
  IndianRupee,
  Boxes,
  ImagePlus,
} from "lucide-react";

const AddNewProduct = () => {
    const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    price: "",
    wholeSalePrice: "",
    priorityOrder: "",
    status: "available",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const AddProductHandler = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const payload = {
        name: product.name,
        category: product.category,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        wholeSalePrice: product.wholeSalePrice,
        priorityOrder: product.priorityOrder,
        status: product.status,
        image: product.image,
      };

      const response = await axios.post(
        `${backendUrl}/api/admin/products/add-product`,
        payload,
        {
            withCredentials:true
        }
      )

      if(response.data.success){
        toast.success("New Product Added Successfully")
        navigate('/admin/products')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  };

  return (
  <div className="min-h-screen bg-[#050505] text-white">

    <Toaster />

    {/* Page */}

    <div className="max-w-[1700px] mx-auto px-8 py-10">

      {/* Header */}

      <div className="mb-12">

        <p className="text-red-500 uppercase tracking-[7px] text-sm font-semibold">
          PRODUCT MANAGEMENT
        </p>

        <h1 className="mt-3 text-6xl font-black leading-none">
          Add New Product
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-gray-400 leading-8">
          Create premium gym products that can be sold directly from your
          inventory. Configure pricing, stock availability and product
          information before publishing.
        </p>

      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-12 gap-8">

        {/* LEFT */}

        <div className="col-span-8 space-y-8">

          {/* =========================
              PRODUCT DETAILS
          ========================== */}

          <div
            className="
            rounded-[30px]
            border
            border-[#252525]
            bg-gradient-to-b
            from-[#171717]
            to-[#101010]
            overflow-hidden
          "
          >

            {/* Header */}

            <div
              className="
              px-8
              py-7

              border-b
              border-[#242424]

              flex
              items-center
              gap-5
            "
            >

              <div
                className="
                h-14
                w-14

                rounded-2xl

                bg-red-500/10

                flex
                items-center
                justify-center
              "
              >
                <Package
                  className="text-red-500"
                  size={24}
                />
              </div>

              <div>

                <p className="uppercase tracking-[5px] text-red-500 text-xs font-semibold">
                  PRODUCT INFORMATION
                </p>

                <h2 className="text-4xl font-black mt-2">
                  Product Details
                </h2>

                <p className="text-gray-400 mt-2">
                  Basic information about the product.
                </p>

              </div>

            </div>

            {/* Body */}

            <div className="p-8 space-y-8">

              {/* Row */}

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm mb-3 text-gray-300 font-medium">
                    Product Name
                  </label>

                  <input
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="themeInput"
                  />

                </div>

                <div>

                  <label className="block text-sm mb-3 text-gray-300 font-medium">
                    Category
                  </label>

                  <input
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Protein / Accessories / Drinks"
                    className="themeInput"
                  />

                </div>

              </div>

              {/* Description */}

              <div>

                <label className="block text-sm mb-3 text-gray-300 font-medium">
                  Product Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  className="themeInput resize-none"
                />

              </div>

              {/* Status */}

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm mb-3 text-gray-300 font-medium">
                    Product Status
                  </label>

                  <select
                    name="status"
                    value={product.status}
                    onChange={handleChange}
                    className="themeInput"
                  >
                    <option value="available">
                      Available
                    </option>

                    <option value="coming soon">
                      Coming Soon
                    </option>
                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
             Pricing Card Starts Here
             (Continue in Part 2)
          ========================= */}

                    {/* =========================
                  PRICING
          ========================= */}

          <div
            className="
            rounded-[30px]
            border
            border-[#252525]
            bg-gradient-to-b
            from-[#171717]
            to-[#101010]
            overflow-hidden
          "
          >

            <div
              className="
              px-8
              py-7

              border-b
              border-[#242424]

              flex
              items-center
              gap-5
            "
            >

              <div
                className="
                h-14
                w-14

                rounded-2xl

                bg-red-500/10

                flex
                items-center
                justify-center
              "
              >

                <IndianRupee
                  size={24}
                  className="text-red-500"
                />

              </div>

              <div>

                <p className="uppercase tracking-[5px] text-red-500 text-xs font-semibold">
                  PRODUCT PRICING
                </p>

                <h2 className="text-4xl font-black mt-2">
                  Pricing Details
                </h2>

                <p className="text-gray-400 mt-2">
                  Configure selling and wholesale pricing.
                </p>

              </div>

            </div>

            <div className="p-8">

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm mb-3 text-gray-300 font-medium">
                    Selling Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="₹ 0"
                    className="themeInput"
                  />

                </div>

                <div>

                  <label className="block text-sm mb-3 text-gray-300 font-medium">
                    Wholesale Price
                  </label>

                  <input
                    type="number"
                    name="wholeSalePrice"
                    value={product.wholeSalePrice}
                    onChange={handleChange}
                    placeholder="₹ 0"
                    className="themeInput"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =========================
                 INVENTORY
          ========================= */}

          <div
            className="
            rounded-[30px]
            border
            border-[#252525]
            bg-gradient-to-b
            from-[#171717]
            to-[#101010]
            overflow-hidden
          "
          >

            <div
              className="
              px-8
              py-7

              border-b
              border-[#242424]

              flex
              items-center
              gap-5
            "
            >

              <div
                className="
                h-14
                w-14

                rounded-2xl

                bg-red-500/10

                flex
                items-center
                justify-center
              "
              >

                <Boxes
                  size={24}
                  className="text-red-500"
                />

              </div>

              <div>

                <p className="uppercase tracking-[5px] text-red-500 text-xs font-semibold">
                  INVENTORY
                </p>

                <h2 className="text-4xl font-black mt-2">
                  Stock Management
                </h2>

                <p className="text-gray-400 mt-2">
                  Manage inventory quantity and stock priority.
                </p>

              </div>

            </div>

            <div className="p-8">

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm mb-3 text-gray-300 font-medium">
                    Available Quantity
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    placeholder="Available Stock"
                    className="themeInput"
                  />

                </div>

                <div>

                  <label className="block text-sm mb-3 text-gray-300 font-medium">
                    Priority Order
                  </label>

                  <input
                    type="number"
                    name="priorityOrder"
                    value={product.priorityOrder}
                    onChange={handleChange}
                    placeholder="Priority"
                    className="themeInput"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =========================
                  PRODUCT IMAGE
          ========================= */}

          <div
            className="
            rounded-[30px]
            border
            border-[#252525]
            bg-gradient-to-b
            from-[#171717]
            to-[#101010]
            overflow-hidden
          "
          >

            <div
              className="
              px-8
              py-7

              border-b
              border-[#242424]

              flex
              items-center
              gap-5
            "
            >

              <div
                className="
                h-14
                w-14

                rounded-2xl

                bg-red-500/10

                flex
                items-center
                justify-center
              "
              >

                <ImagePlus
                  size={24}
                  className="text-red-500"
                />

              </div>

              <div>

                <p className="uppercase tracking-[5px] text-red-500 text-xs font-semibold">
                  PRODUCT MEDIA
                </p>

                <h2 className="text-4xl font-black mt-2">
                  Product Image
                </h2>

                <p className="text-gray-400 mt-2">
                  Paste an image URL for product preview.
                </p>

              </div>

            </div>

            <div className="p-8">

              <label className="block text-sm mb-3 text-gray-300 font-medium">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://example.com/image.png"
                className="themeInput"
              />

              <p className="mt-4 text-sm text-gray-500">
                Supported formats: JPG, PNG, WEBP
              </p>

            </div>

          </div>

          {/* Continue with Live Preview & Buttons in Part 3 */}
          ```jsx
        </div>

        {/* ============================
                LIVE PRODUCT PREVIEW
        ============================ */}

        <div className="col-span-4">

          <div className="sticky top-8">

            <div
              className="
              rounded-[30px]
              overflow-hidden

              border
              border-[#252525]

              bg-gradient-to-b
              from-[#171717]
              via-[#111111]
              to-[#0b0b0b]
            "
            >

              {/* Header */}

              <div
                className="
                px-7
                py-6

                border-b
                border-[#252525]
              "
              >

                <p
                  className="
                  text-red-500
                  uppercase
                  tracking-[5px]
                  text-xs
                  font-semibold
                "
                >
                  LIVE PREVIEW
                </p>

                <h2 className="text-4xl font-black mt-2">
                  Product Card
                </h2>

              </div>

              {/* Image */}

              <div
                className="
                relative

                h-[280px]

                flex
                items-center
                justify-center

                bg-gradient-to-br
                from-[#181818]
                to-[#111111]

                border-b
                border-[#252525]
              "
              >

                <div
                  className="
                  absolute

                  w-48
                  h-48

                  rounded-full

                  bg-red-500/10

                  blur-3xl
                "
                />

                {
                  product.image ?

                  <img
                    src={product.image}
                    alt="preview"
                    className="
                    relative
                    z-10

                    h-[210px]
                    object-contain
                  "
                    onError={(e)=>{
                      e.target.style.display="none"
                    }}
                  />

                  :

                  <Package
                    size={80}
                    className="relative z-10 text-gray-600"
                  />

                }

              </div>

              {/* Details */}

              <div className="p-7">

                <p
                  className="
                  uppercase
                  tracking-[4px]
                  text-red-500
                  text-xs
                  font-semibold
                "
                >
                  {product.category || "CATEGORY"}
                </p>

                <h2
                  className="
                  text-4xl
                  font-black

                  mt-3

                  leading-tight
                "
                >
                  {product.name || "Product Name"}
                </h2>

                <p
                  className="
                  mt-4
                  text-gray-400
                  leading-7
                "
                >
                  {
                    product.description ||
                    "Product description preview will appear here."
                  }
                </p>

                <div
                  className="
                  my-7

                  border-t
                  border-[#252525]
                "
                />

                {/* Price */}

                <div className="flex justify-between">

                  <div>

                    <p className="text-gray-500 text-xs uppercase tracking-[3px]">
                      Selling Price
                    </p>

                    <h1 className="text-5xl font-black text-red-500 mt-2">
                      ₹ {product.price || 0}
                    </h1>

                  </div>

                  <div className="text-right">

                    <p className="text-gray-500 text-xs uppercase tracking-[3px]">
                      Stock
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                      {product.quantity || 0}
                    </h2>

                  </div>

                </div>

                <div
                  className="
                  mt-8

                  rounded-2xl

                  border
                  border-[#252525]

                  bg-[#141414]

                  p-5
                "
                >

                  <div className="flex justify-between">

                    <span className="text-gray-400">
                      Wholesale Price
                    </span>

                    <span className="font-bold text-emerald-400">
                      ₹ {product.wholeSalePrice || 0}
                    </span>

                  </div>

                  <div className="flex justify-between mt-4">

                    <span className="text-gray-400">
                      Status
                    </span>

                    <span className="capitalize text-white font-semibold">
                      {product.status}
                    </span>

                  </div>

                </div>

                {/* Buttons */}

                <div className="grid grid-cols-2 gap-4 mt-8">

                  <button
                    onClick={()=>navigate("/admin/products")}
                    className="
                    h-14

                    rounded-2xl

                    border
                    border-[#2a2a2a]

                    bg-[#171717]

                    hover:border-red-500/40

                    transition-all
                  "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={AddProductHandler}
                    className="
                    h-14

                    rounded-2xl

                    bg-gradient-to-r
                    from-red-700
                    via-red-600
                    to-red-500

                    font-bold
                    tracking-wide

                    hover:scale-[1.02]

                    transition-all

                    hover:shadow-[0_20px_40px_rgba(255,0,0,.25)]
                  "
                  >
                    Add Product
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <style>{`

      .themeInput{

        width:100%;

        background:#131313;

        border:1px solid #2a2a2a;

        border-radius:18px;

        padding:18px 22px;

        color:white;

        font-size:15px;

        outline:none;

        transition:.3s;

      }

      .themeInput:focus{

        border-color:#dc2626;

        box-shadow:
        0 0 0 4px rgba(220,38,38,.12);

      }

      .themeInput::placeholder{

        color:#6b7280;

      }

    `}</style>

  </div>
);
};

export default AddNewProduct;