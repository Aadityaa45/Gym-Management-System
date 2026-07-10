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
    <div className="w-full min-h-screen bg-[#071321] text-white p-10">
      <Toaster />

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>

        <p className="text-gray-400 mt-2">
          Create products that can be sold directly from your gym.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}

        <div className="lg:col-span-2 space-y-7">
          {/* Product Details */}

          <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Package size={20} />
              Product Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                className="input"
              />

              <input
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
                className="input"
              />
            </div>

            <textarea
              rows={5}
              placeholder="Description..."
              name="description"
              value={product.description}
              onChange={handleChange}
              className="input mt-5 resize-none"
            />

            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className="input mt-5"
            >
              <option value="available">Available</option>
              <option value="coming soon">Coming Soon</option>
            </select>
          </div>

          {/* Pricing */}

          <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <IndianRupee size={20} />
              Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="number"
                placeholder="Selling Price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                placeholder="Wholesale Price"
                name="wholeSalePrice"
                value={product.wholeSalePrice}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Inventory */}

          <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <Boxes size={20} />
              Inventory
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                placeholder="Priority Order"
                name="priorityOrder"
                value={product.priorityOrder}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Image URL */}

          <div className="bg-[#091729] rounded-3xl border border-[#19314d] p-7">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <ImagePlus size={20} />
              Product Image
            </h2>

            <input
              type="text"
              name="image"
              placeholder="Paste Product Image URL"
              value={product.image}
              onChange={handleChange}
              className="input"
            />

            <p className="text-gray-500 text-sm mt-3">
              Example:
              https://images.unsplash.com/photo-1583454110551-21f2fa2afe61
            </p>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">
            <button
              className="
                px-8
                py-3
                rounded-xl
                border
                border-gray-600
                hover:bg-gray-700
                transition-all
              "
            >
              Cancel
            </button>

            <button
              onClick={AddProductHandler}
              className="
                px-8
                py-3
                rounded-xl
                bg-violet-600
                hover:bg-violet-500
                transition-all
              "
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Live Preview */}

        <div>
          <div className="sticky top-8">
            <div className="bg-[#091729] rounded-3xl border border-[#19314d] overflow-hidden">
              {/* Image */}

              <div className="h-64 bg-[#11243c] flex justify-center items-center overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <Package size={80} className="text-gray-500" />
                )}
              </div>

              {/* Preview Body */}

              <div className="p-6">
                <p className="text-gray-400 text-sm">
                  {product.category || "Category"}
                </p>

                <h2 className="text-xl font-semibold mt-2">
                  {product.name || "Product Name"}
                </h2>

                <p className="text-violet-400 text-3xl font-bold mt-5">
                  ₹ {product.price || 0}
                </p>

                <div className="mt-6 flex justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Stock</p>

                    <h3>{product.quantity || 0}</h3>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Status</p>

                    <h3 className="capitalize">
                      {product.status}
                    </h3>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 text-sm">
                    Wholesale Price
                  </p>

                  <h3 className="text-lg font-semibold text-emerald-400">
                    ₹ {product.wholeSalePrice || 0}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input{
          width:100%;
          background:#0d2036;
          border:1px solid #294872;
          padding:14px 18px;
          border-radius:14px;
          outline:none;
          color:white;
          transition:.25s;
        }

        .input:focus{
          border-color:#8b5cf6;
          box-shadow:0 0 0 3px rgba(139,92,246,.2);
        }
      `}</style>
    </div>
  );
};

export default AddNewProduct;