import React from "react";
import {useState} from "react";
import toast from "react-hot-toast"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import validatePlanFields from "../utils/validatePlanfields"
const AddNewPlan = () =>{
    const navigate = useNavigate()
    const [planData, setPlanData] = useState({
        name: "",
        price: "",
        durationInDays: "",
        features:"", //in backend we only allowing features to be array but in our textarea we will be taking input as string and then we will convert this feature into array 
        description: "",
    });
    const [errors, setErrors] = useState({
    name: "",
    price: "",
    durationInDays: "",
    description: "",
    features: ""
});

    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setPlanData((prev)=>({
            ...prev,
            [name]:value
        }))

        const error = validatePlanFields(name,value)
        setErrors((prev)=>({
            ...prev,
            [name]:error
        }))
    }

    const handleSubmit = async () =>{
        const newErrors = {
        name: validatePlanFields("name", planData.name),
        price: validatePlanFields("price", planData.price),
        durationInDays: validatePlanFields("durationInDays", planData.durationInDays),
        description: validatePlanFields("description", planData.description),
        features: validatePlanFields("features", planData.features),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== "")) {
        return toast.error("Please fix the validation errors.");
    }
        try{

        
            //here firt we will create the payload an in that we will convert feature string into array
            const payLoad = {
                ...planData,
                features:planData.features.split('\n')
                .map((features=>features.trim())) //this will remove the spaces from each entry
                .filter((feature)=>feature!=="")//this will remove the empty entries or blank lines from the array
            }

            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(
                `${backendUrl}/api/gym/new-plan`,
                payLoad,
                {
                    withCredentials:true
                }
            )

            if(response.data.success){
                toast.success("Plan added successfully")
                navigate("/admin/membership-plans")
            }

            

        }catch{
            toast.error("Something went wrong! Please Try Again")
        }
    }



    return(
        <div className="min-h-screen bg-[#07111f] text-white px-10 py-8">

    <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold">
            Add Membership Plan
        </h1>

        <p className="text-gray-400 mt-2 mb-10">
            Create a new membership plan for your gym.
        </p>

        <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8">

            {/* Row 1 */}

            <div className="grid grid-cols-2 gap-8">

                <div>

                    <label className="text-gray-300 block mb-2">
                        Plan Name
                    </label>

                    <input
                        name="name"
                        value={planData.name}
                        onChange={handleInputChange}
                        placeholder="Gold Membership"
                        className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
        ${errors.name ? "border border-red-500" : "border border-gray-700"}
    `}
                    />
                    {errors.name && (
    <p className="text-red-500 text-sm mt-1">
        {errors.name}
    </p>
)}

                </div>

                <div>

                    <label className="text-gray-300 block mb-2">
                        Price (₹)
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={planData.price}
                        onChange={handleInputChange}
                        placeholder="5000"
                        className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
        ${errors.price ? "border border-red-500" : "border border-gray-700"}
    `}
                    />
                    {errors.price && (
    <p className="text-red-500 text-sm mt-1">
        {errors.price}
    </p>
)}

                </div>

            </div>

            {/* Row 2 */}

            <div className="grid grid-cols-2 gap-8 mt-8">

                <div>

                    <label className="text-gray-300 block mb-2">
                        Duration (Days)
                    </label>

                    <input
                        type="number"
                        name="durationInDays"
                        value={planData.durationInDays}
                        onChange={handleInputChange}
                        placeholder="90"
                        className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
        ${errors.durationInDays ? "border border-red-500" : "border border-gray-700"}
    `}
                    />
                    {errors.durationInDays && (
    <p className="text-red-500 text-sm mt-1">
        {errors.durationInDays}
    </p>
)}

                </div>

                <div>

                    <label className="text-gray-300 block mb-2">
                        Description
                    </label>

                    <input
                        name="description"
                        value={planData.description}
                        onChange={handleInputChange}
                        placeholder="Premium Membership Plan"
                        className={`w-full h-14 rounded-xl bg-[#0B1320] px-4 outline-none
        ${errors.description ? "border border-red-500" : "border border-gray-700"}
    `}
                    />
                    {errors.description && (
    <p className="text-red-500 text-sm mt-1">
        {errors.description}
    </p>
)}

                </div>

            </div>

            {/* Features */}

            <div className="mt-8">

                <label className="text-gray-300 block mb-2">
                    Features
                </label>

                <textarea
                    rows={8}
                    name="features"
                    value={planData.features}
                    onChange={handleInputChange}
                    placeholder={`Unlimited Gym Access
Locker Facility
Steam Bath
Personal Trainer`}
                    className={`w-full rounded-xl bg-[#0B1320] border border-gray-700 p-4 outline-none resize-none focus:border-red-500
        ${errors.features ? "border border-red-500" : "border border-gray-700"}
    `}
                />
                {errors.features && (
    <p className="text-red-500 text-sm mt-1">
        {errors.features}
    </p>
)}

                <p className="text-gray-500 text-sm mt-2">
                    Enter one feature per line.
                </p>

            </div>

            {/* Buttons */}

            {/* <div>

                <button
                    onClick={() => navigate("/admin/membership-plans")}
                    className="px-8 h-12 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className="px-10 h-12 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold"
                >
                    Add Plan
                </button>

            </div> */}
            <div className="flex justify-end gap-4 mt-10">
    <button
        onClick={() => navigate("/admin/membership-plans")}
        className="px-8 h-12 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
    >
        Cancel
    </button>

    <button
        onClick={handleSubmit}
        className="px-10 h-12 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold"
    >
        Add Plan
    </button>
</div>

        </div>

    </div>
    

</div>
    )
}


export default AddNewPlan