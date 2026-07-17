// import React, { useEffect,useState } from "react";
// import toast from "react-hot-toast";
// import { useContext } from "react";
// import { gymAppContext } from "../contexts/gymAuthContext";
// import validateRegistration from "../utils/validateRegistration";
// import axios from "axios";
// import { useRef } from "react";

// const Registration = () => {
//     const { membershipPlans, setMembershipPlans } = useContext(gymAppContext);
//     const [otpPopUp,setOTPPopUp] = useState(false)
//     console.log(membershipPlans)
//     const [registrationData,setRegistrationData] = useState({
//         firstName: "",
//         lastName: "",
//         address:"",
//         dateOfBirth:"",
//         email:"",
//         additionalDiscount:"",
//         paymentMode:"",
//         phoneNumber:"",
//         paymentLeft:"",
//         registrar:"",
//         selectedPlan:"",
//         termsAccepted:false,
//         fullPaymentRecieved:false,
//     })

//     const [error,setError] = useState({
//         firstName:"",
//         lastName:"",
//         address:"",
//         email:"",
//         additionalDiscount:"",
//         phoneNumber:"",
//         registrar:"",
//         paymentLeft:"",
//     })

//     //form data value change handler
//     const HandleChange = (e) =>{
//         const {name,value,type,checked} = e.target
//         setRegistrationData((prev)=>({
//             ...prev,
//             [name]:type==="checkbox"?checked:value
//         }))

//         const error = validateRegistration(name,value)
//             setError((prev)=>({
//                 ...prev,
//                 [name]:error
//             }))
//         }
    


//     useEffect(() => {
//         toast.success("Registration Page Opened");
//     }, []);


//     const generateOTPHanlder = async() =>{
//         try {
//             const selectedPlanData = membershipPlans.find(
//     plan => plan._id === registrationData.selectedPlan
// );

// if (!selectedPlanData) {
//     toast.error("Please select a plan");
//     return;
// }

// const total = selectedPlanData.price;

// const remaining = registrationData.fullPaymentRecieved
//     ? 0
//     : Number(registrationData.paymentLeft || 0);

// const paid = total - remaining;

// const planStartDate = new Date();

// const planEndDate = new Date(planStartDate);
// planEndDate.setDate(
//     planEndDate.getDate() + selectedPlanData.durationInDays
// );
// if (remaining > total) {
//     return toast.error("Remaining payment cannot exceed total amount");
// }
// const payload = {
//     fullname: `${registrationData.firstName} ${registrationData.lastName}`,
//     email: registrationData.email.trim(),
//     phone: registrationData.phoneNumber,
//     joiningdate: new Date(),
//     address: registrationData.address.trim(),
//     dob: registrationData.dateOfBirth,
//     registeredBy: registrationData.registrar,

//     fee: {
//         total,
//         paid,
//         remaining,
//         discount: Number(registrationData.additionalDiscount) || 0
//     },

//     membership: {
//         plan: registrationData.selectedPlan,
//         planStartDate,
//         planEndDate
//     }
// };

//             //----------------------------------------Now lets call backend-----------------------------------
//              const backendUrl = import.meta.env.VITE_BACKEND_URL;
//              const response = await axios.post(
//                 `${backendUrl}/api/admin/members/register-member`,
//                 payload,
//                 {
//                     withCredentials:true
//                 }
//              )

//              if(response.data.success){
//                 toast.success("Otp sent to Member Email!")
//                 setOTPPopUp(true)
//              }


//         } catch (error) {
//             console.log(error);

//     toast.error(
//         error.response?.data?.message || "Something went wrong"
//     );
//         }
//     }

//     //-------------------------------------------------------OTP INPUT SECTION STATS-----------------------------
//     const inputRef = useRef([])
//     const [inputArray,setInputArray] = useState(new Array(6).fill(""))


//     const handleOtpChange = (e, index) => {

//     const value = e.target.value;

//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...inputArray];

//     newOtp[index] = value.slice(-1);

//     setInputArray(newOtp);

//     //now using useRef we will shift focus to the next tab
//     if(value && index<inputArray.length-1){
//         inputRef.current[index+1].focus()
//     }
// };

//     const handleKeyDown = (e,index) =>{
//         if(e.key==="Backspace" && index>0 && inputArray[index]===""){
//             inputRef.current[index-1].focus()
//         }
//     }

//     //---------------------------------------OTP VALIDATION BACKEND CALL--------------------------
//     const OTPvalidationHandler = async(email)=>{
//         try {
//             const payload = {
//                 email,
//                 otp:inputArray.join("")
//             }
//             const backendUrl = import.meta.env.VITE_BACKEND_URL;
//             const response = await axios.post(
//                 `${backendUrl}/api/admin/members/verify-otp`,
//                 payload,
//                 {
//                     withCredentials:true
//                 }
//             )

//             if(response.data.success){
//                 toast.success("Member Registered Successfully!")
//                 setOTPPopUp(false)
//             }else{
//                 toast.error()
//             }
//         } catch (error) {
//             console.log(error);

//     toast.error(
//         error.response?.data?.message || "Something went wrong"
//     );
//         }
//     }

//     return (
//         <div className="min-h-screen  text-white p-8">

//             <h1 className="text-4xl font-bold text-center mb-16">
//                 Registration Form
//             </h1>

//             <form className="max-w-7xl mx-auto">

//                 {/* Row 1 */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
//                     <input
//                         name="firstName"
//                         type="text"
//                         onChange={HandleChange}
//                         value={registrationData.firstName}
//                         placeholder="First Name"
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     />

//                     <input
//                         name="lastName"
//                         type="text"
//                         onChange={HandleChange}
//                         value={registrationData.lastName}
//                         placeholder="Last Name"
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     />

//                     <input
//                         name="address"
//                         onChange={HandleChange}
//                         value={registrationData.address}
//                         type="text"
//                         placeholder="Address"
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     />
//                 </div>

//                 {/* Row 2 */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
//                     <input
//                         name="dateOfBirth"
//                         onChange={HandleChange}
//                         value={registrationData.dateOfBirth}
//                         type="date"
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     />

//                     <input
//                         name="email"
//                         onChange={HandleChange}
//                         value={registrationData.email}
//                         type="email"
//                         placeholder="Email"
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     />

//                     <select
//                         name="selectedPlan"
//                         onChange={HandleChange}
//                         value={registrationData.selectedPlan}
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     >
//                         <option>Select the Plan</option>
//                         {membershipPlans && membershipPlans.map((plans)=>(
//                             <option value={plans._id} key={plans._id}>{plans.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Row 3 */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
//                     <input
//                         name="additionalDiscount"
//                         onChange={HandleChange}
//                         value={registrationData.additionalDiscount}
//                         type="number"
//                         placeholder="Additional Discount %"
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     />

//                     <select
//                         name="paymentMode"
//                         onChange={HandleChange}
//                         value={registrationData.paymentMode}
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     >
//                         <option>Payment Mode</option>
//                         <option>Cash</option>
//                         <option>UPI</option>
//                         <option>Card</option>
//                     </select>

//                     <input
//                         name="phoneNumber"
//                         onChange={HandleChange}
//                         value={registrationData.phoneNumber}
//                         type="tel"
//                         placeholder="Phone Number"
//                         className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
//                     />
//                 </div>

//                 {/* Checkbox + Other Fields */}
//                 <div className="flex flex-col lg:flex-row justify-between gap-10 mb-20">

//                     <div className="flex flex-col gap-5">

//                         <label className="flex items-center gap-3">
//                             <input type="checkbox" name="termsAccepted" checked={registrationData.termsAccepted} onChange={HandleChange} />

//                             <span>Terms and Conditions Agreed</span>
//                         </label>

//                         <label className="flex items-center gap-3">
//                             <input name="fullPaymentRecieved" checked={registrationData.fullPaymentRecieved} onChange={HandleChange} type="checkbox" />
//                             <span>Full Payment Received</span>
//                         </label>

//                         {/* <label className="flex items-center gap-3">
//                             <input type="checkbox" name="DocumentsVerified" checked={registrationData.DocumentsVerified} onChange={HandleChange} />
//                             <span>Documents Verified</span>
//                         </label> */}

//                     </div>

//                     <div className="flex items-center gap-5">
//                         <label>Payment Left</label>

//                         <input
//                             name="paymentLeft"
//                             value={registrationData.paymentLeft}
//                             onChange={HandleChange}
//                             type="number"
//                             className="bg-[#0D1B2A] border border-green-700 rounded-md p-3 outline-none"
//                         />
//                     </div>

//                     <div className="flex items-center gap-5">
//                         <label>Registrar</label>

//                         <input
//                             name="registrar"
//                             value={registrationData.registrar}
//                             onChange={HandleChange}
//                             type="text"
//                             className="bg-[#0D1B2A] border border-green-700 rounded-md p-3 outline-none"
//                         />
//                     </div>

//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-center">
//                     <button onClick={generateOTPHanlder}
//                         type="button"
//                         className="
//                             bg-[#EF2424]
//                             hover:bg-red-700
//                             px-14
//                             py-3
//                             rounded-lg
//                             text-lg
//                             font-semibold
//                             transition
//                         "
//                     >
//                         Generate OTP
//                     </button>
//                 </div>

//             </form>
//             {otpPopUp && (
//   <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

//     <div className="bg-[#041b35] w-[420px] rounded-2xl border border-gray-700 p-8 shadow-2xl">

//       {/* Heading */}
//       <h2 className="text-3xl font-bold text-center text-white mb-2">
//         Enter OTP
//       </h2>

//       <p className="text-center text-gray-400 mb-8">
//         Please enter the 6 digit OTP sent to member's email.
//       </p>

//       {/* OTP Boxes */}
//       <div className="flex justify-center gap-3 mb-8">

    
//         {inputArray.map((input,index)=>(
//             <input
//                 className="
//               w-12
//               h-14
//               bg-[#08213d]
//               border
//               border-gray-600
//               rounded-lg
//               text-center
//               text-xl
//               text-white
//               outline-none
//               focus:border-red-500"
//              key={index} maxLength={1} onKeyDown={(e)=>handleKeyDown(e,index)} type="text" value={inputArray[index]} onChange={(e)=>handleOtpChange(e,index)} ref={(el)=>inputRef.current[index]=el} />
//         ))}

//       </div>

//       {/* Timer */}
//       <div className="text-center mb-8">

//         <p className="text-gray-400">
//           OTP expires in
//         </p>

//         <h3 className="text-red-500 text-2xl font-bold">
//           05 : 00
//         </h3>

//       </div>

//       {/* Button */}
//       <button
//         onClick={()=>OTPvalidationHandler(registrationData.email)}
//         className="
//           w-full
//           bg-red-500
//           hover:bg-red-600
//           transition-all
//           py-3
//           rounded-lg
//           text-white
//           font-semibold
//           text-lg
//         "
//       >
//         Validate OTP
//       </button>

//     </div>

//   </div>
// )}
//         </div>
//     );
// }

// export default Registration;

import React, { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { gymAppContext } from "../contexts/gymAuthContext";
import validateRegistration from "../utils/validateRegistration";
import axios from "axios";
import { useRef } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    CreditCard,
    BadgePercent,
    ClipboardList,
    ShieldCheck
} from "lucide-react";

const Registration = () => {
    const { membershipPlans, setMembershipPlans } = useContext(gymAppContext);
    const [otpPopUp,setOTPPopUp] = useState(false)
    console.log(membershipPlans)
    const [registrationData,setRegistrationData] = useState({
        firstName: "",
        lastName: "",
        address:"",
        dateOfBirth:"",
        email:"",
        additionalDiscount:"",
        paymentMode:"",
        phoneNumber:"",
        paymentLeft:"",
        registrar:"",
        selectedPlan:"",
        termsAccepted:false,
        fullPaymentRecieved:false,
    })

    const [error,setError] = useState({
        firstName:"",
        lastName:"",
        address:"",
        email:"",
        additionalDiscount:"",
        phoneNumber:"",
        registrar:"",
        paymentLeft:"",
    })

    //form data value change handler
    const HandleChange = (e) =>{
        const {name,value,type,checked} = e.target
        setRegistrationData((prev)=>({
            ...prev,
            [name]:type==="checkbox"?checked:value
        }))

        const error = validateRegistration(name,value)
            setError((prev)=>({
                ...prev,
                [name]:error
            }))
        }
    


    useEffect(() => {
        toast.success("Registration Page Opened");
    }, []);


    const generateOTPHanlder = async() =>{
        try {
            const newErrors = {
        firstName: validateRegistration("firstName", registrationData.firstName),
        lastName: validateRegistration("lastName", registrationData.lastName),
        address: validateRegistration("address", registrationData.address),
        email: validateRegistration("email", registrationData.email),
        additionalDiscount: validateRegistration(
            "additionalDiscount",
            registrationData.additionalDiscount
        ),
        phoneNumber: validateRegistration(
            "phoneNumber",
            registrationData.phoneNumber
        ),
        paymentLeft: validateRegistration(
            "paymentLeft",
            registrationData.paymentLeft
        ),
        registrar: validateRegistration(
            "registrar",
            registrationData.registrar
        ),
    };

    setError(newErrors);

    if (Object.values(newErrors).some(err => err !== "")) {
        toast.error("Please fix validation errors");
        return;
    }
            const selectedPlanData = membershipPlans?.find(
            plan => plan._id === registrationData.selectedPlan
            );

            if (!selectedPlanData) {
                toast.error("Please select a plan");
                return;
            }

            const total = selectedPlanData.price;

            const remaining = registrationData.fullPaymentRecieved ? 0 : Number(registrationData.paymentLeft || 0);

            const paid = total - remaining;

            const planStartDate = new Date();

            const planEndDate = new Date(planStartDate);
            planEndDate.setDate(planEndDate.getDate() + selectedPlanData.durationInDays);

            if (remaining > total) {
                return toast.error("Remaining payment cannot exceed total amount");
            }
            const payload = {
            fullname: `${registrationData.firstName} ${registrationData.lastName}`,
            email: registrationData.email.trim(),
            phone: registrationData.phoneNumber,
            joiningdate: new Date(),
            address: registrationData.address.trim(),
            dob: registrationData.dateOfBirth,
            registeredBy: registrationData.registrar,

            fee: {
                total,
                paid,
                remaining,
                discount: Number(registrationData.additionalDiscount) || 0
            },

            membership: {
                plan: registrationData.selectedPlan,
                planStartDate,
                planEndDate
            }
        };

            //----------------------------------------Now lets call backend-----------------------------------
             const backendUrl = import.meta.env.VITE_BACKEND_URL;
             const response = await axios.post(
                `${backendUrl}/api/admin/members/register-member`,
                payload,
                {
                    withCredentials:true
                }
             )

             if(response.data.success){
                toast.success("Otp sent to Member Email!")
                setOTPPopUp(true)
             }


        } catch (error) {
            console.log(error);

    toast.error(
        error.response?.data?.message || "Something went wrong"
    );
        }
    }

    //-------------------------------------------------------OTP INPUT SECTION STATS-----------------------------
    const inputRef = useRef([])
    const [inputArray,setInputArray] = useState(new Array(6).fill(""))


    const handleOtpChange = (e, index) => {

    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...inputArray];

    newOtp[index] = value.slice(-1);

    setInputArray(newOtp);

    //now using useRef we will shift focus to the next tab
    if(value && index<inputArray.length-1){
        inputRef.current[index+1].focus()
    }
};

    const handleKeyDown = (e,index) =>{
        if(e.key==="Backspace" && index>0 && inputArray[index]===""){
            inputRef.current[index-1].focus()
        }
    }

    //---------------------------------------OTP VALIDATION BACKEND CALL--------------------------
    const OTPvalidationHandler = async(email)=>{
        try {
            const payload = {
                email,
                otp:inputArray.join("")
            }
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(
                `${backendUrl}/api/admin/members/verify-otp`,
                payload,
                {
                    withCredentials:true
                }
            )

            if(response.data.success){
                toast.success("Member Registered Successfully!")
                setOTPPopUp(false)
            }else{
                toast.error()
            }
        } catch (error) {
            console.log(error);

    toast.error(
        error.response?.data?.message || "Something went wrong"
    );
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

            {/* Background */}

            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#070707]" />

            <div className="absolute -left-48 top-0 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-[180px]" />

            <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-[180px]" />

            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 px-8 py-10">

            {/* Page Header */}

            <div className="mb-10">

                <p className="text-sm uppercase tracking-[5px] text-red-500">

                    Fitness Beast

                </p>

                <h1 className="mt-2 text-5xl font-black tracking-wide">

                    Member Registration

                </h1>

                <p className="mt-3 max-w-3xl text-gray-400">

                Register new gym members, assign membership plans,
                manage payments and securely verify registrations
                using OTP authentication.

                </p>

            </div>

            {/* Main Card */}

            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,.55)]">

                <div className="grid gap-10 xl:grid-cols-[2fr_1fr]">

                    {/* LEFT SIDE */}

                    <div className="p-10">

                        <form>

                    {/* Row 1 */}
                    {/* ================= PERSONAL INFORMATION ================= */}

            <div className="mb-12">

    <div className="mb-8 flex items-center gap-3">

        <div className="rounded-2xl bg-red-600/20 p-3">

            <User className="text-red-500" size={22} />

        </div>

        <div>

            <h2 className="text-2xl font-bold">

                Personal Information

            </h2>

            <p className="text-gray-400">

                Basic member information

            </p>

        </div>

    </div>

    <div className="grid gap-8 md:grid-cols-2">

        {/* First Name */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                First Name

            </label>

            <input
                name="firstName"
                type="text"
                value={registrationData.firstName}
                onChange={HandleChange}
                placeholder="Enter first name"
                className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.firstName
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.firstName && (
        <p className="mt-2 text-sm text-red-400">
            {error.firstName}
        </p>
            )
    }

        </div>

        {/* Last Name */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                Last Name

            </label>

            <input
                name="lastName"
                type="text"
                value={registrationData.lastName}
                onChange={HandleChange}
                placeholder="Enter last name"
                className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.lastName
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.lastName && (
        <p className="mt-2 text-sm text-red-400">
            {error.lastName}
        </p>
            )
    }

        </div>

        {/* Email */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                Email Address

            </label>

            <input
                name="email"
                type="email"
                value={registrationData.email}
                onChange={HandleChange}
                placeholder="Enter email"
                className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.email
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.email && (
        <p className="mt-2 text-sm text-red-400">
            {error.email}
        </p>
            )
    }

        </div>

        {/* Phone */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                Phone Number

            </label>

            <input
                name="phoneNumber"
                type="tel"
                value={registrationData.phoneNumber}
                onChange={HandleChange}
                placeholder="Enter phone number"
                className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.phoneNumber
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.phoneNumber && (
        <p className="mt-2 text-sm text-red-400">
            {error.phoneNumber}
        </p>
            )
    }

        </div>

        {/* DOB */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                Date of Birth

            </label>

            <input
                name="dateOfBirth"
                type="date"
                value={registrationData.dateOfBirth}
                onChange={HandleChange}
                className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.dateOfBirth
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.dateOfBirth && (
        <p className="mt-2 text-sm text-red-400">
            {error.dateOfBirth}
        </p>
            )
    }

        </div>

        {/* Address */}

        <div className="md:col-span-2">

            <label className="mb-3 block text-sm text-gray-300">

                Address

            </label>

            <input
                name="address"
                type="text"
                value={registrationData.address}
                onChange={HandleChange}
                placeholder="Enter complete address"
                className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.address
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.address && (
        <p className="mt-2 text-sm text-red-400">
            {error.address}
        </p>
            )
    }

        </div>

    </div>

</div>

                {/* Row 3 */}
                {/* ================= MEMBERSHIP DETAILS ================= */}

<div className="mb-12">

    <div className="mb-8 flex items-center gap-3">

        <div className="rounded-2xl bg-red-600/20 p-3">

            <CreditCard
                className="text-red-500"
                size={22}
            />

        </div>

        <div>

            <h2 className="text-2xl font-bold">

                Membership Details

            </h2>

            <p className="text-gray-400">

                Select membership and payment information

            </p>

        </div>

    </div>

    <div className="grid gap-8 md:grid-cols-2">

        {/* Membership Plan */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                Membership Plan

            </label>

            <select
                name="selectedPlan"
                value={registrationData.selectedPlan}
                onChange={HandleChange}
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 outline-none backdrop-blur-xl focus:border-red-500"
            >

                <option value="">

                    Select Membership

                </option>

                {membershipPlans?.map((plan)=>(
                    <option
                        key={plan._id}
                        value={plan._id}
                    >
                        {plan.name}
                    </option>
                ))}

            </select>

        </div>

        {/* Payment Mode */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                Payment Mode

            </label>

            <select
                name="paymentMode"
                value={registrationData.paymentMode}
                onChange={HandleChange}
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 outline-none backdrop-blur-xl focus:border-red-500"
            >

                <option value="">

                    Select Payment Mode

                </option>

                <option>Cash</option>

                <option>UPI</option>

                <option>Card</option>

            </select>

        </div>

        {/* Discount */}

        <div>

            <label className="mb-3 block text-sm text-gray-300">

                Additional Discount

            </label>

            <input
                name="additionalDiscount"
                type="number"
                value={registrationData.additionalDiscount}
                onChange={HandleChange}
                placeholder="0%"
                className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.additionalDiscount
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.additionalDiscount && (
        <p className="mt-2 text-sm text-red-400">
            {error.additionalDiscount}
        </p>
            )
    }

        </div>

    </div>

</div>

                {/* ================= PAYMENT & VERIFICATION ================= */}

<div className="mb-12">

    <div className="mb-8 flex items-center gap-3">

        <div className="rounded-2xl bg-red-600/20 p-3">

            <ShieldCheck
                className="text-red-500"
                size={22}
            />

        </div>

        <div>

            <h2 className="text-2xl font-bold">

                Payment & Verification

            </h2>

            <p className="text-gray-400">

                Configure payment details and registration approval.

            </p>

        </div>

    </div>

    <div className="grid gap-8 lg:grid-cols-2">

        {/* LEFT */}

        <div className="space-y-6">

            {/* Payment Left */}

            <div>

                <label className="mb-3 block text-sm text-gray-300">

                    Remaining Payment

                </label>

                <input
                    type="number"
                    name="paymentLeft"
                    value={registrationData.paymentLeft}
                    onChange={HandleChange}
                    placeholder="Remaining amount"
                    className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.paymentLeft
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.paymentLeft && (
        <p className="mt-2 text-sm text-red-400">
            {error.paymentLeft}
        </p>
            )
    }

            </div>

            {/* Registrar */}

            <div>

                <label className="mb-3 block text-sm text-gray-300">

                    Registered By

                </label>

                <input
                    type="text"
                    name="registrar"
                    value={registrationData.registrar}
                    onChange={HandleChange}
                    placeholder="Registrar name"
                    className={`h-14 w-full rounded-2xl px-5 outline-none transition-all
                ${
                    error.registrar
                ? "border border-red-500"
                : "border border-white/10 focus:border-red-500"
                }
                bg-black/20`}
            />

        {
            error.registrar && (
        <p className="mt-2 text-sm text-red-400">
            {error.registrar}
        </p>
            )
    }

            </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-5">

            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-red-500/40">

                <div>

                    <h4 className="font-semibold">

                        Terms Accepted

                    </h4>

                    <p className="mt-1 text-sm text-gray-400">

                        Member agrees to all gym policies.

                    </p>

                </div>

                <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={registrationData.termsAccepted}
                    onChange={HandleChange}
                    className="h-5 w-5 accent-red-500"
                />

            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-red-500/40">

                <div>

                    <h4 className="font-semibold">

                        Full Payment Received

                    </h4>

                    <p className="mt-1 text-sm text-gray-400">

                        Mark if payment has been completed.

                    </p>

                </div>

                <input
                    type="checkbox"
                    name="fullPaymentRecieved"
                    checked={registrationData.fullPaymentRecieved}
                    onChange={HandleChange}
                    className="h-5 w-5 accent-red-500"
                />

            </label>

        </div>

    </div>

</div>

                {/* Submit Button */}
                <div className="mt-12 flex justify-center">
                    <button
    type="button"
    onClick={generateOTPHanlder}
    className="group flex h-16 items-center gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-12 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(239,68,68,.35)]"
>

    Generate OTP

    <span className="transition-transform duration-300 group-hover:translate-x-2">

        →

    </span>

</button>
                </div>

            </form>

</div>

{/* RIGHT PANEL */}

<div className="border-l border-white/10 bg-black/20 p-8">

    <div className="sticky top-10 space-y-6">

        <div>

            <p className="text-sm uppercase tracking-[4px] text-red-500">

                Live Summary

            </p>

            <h2 className="mt-2 text-3xl font-bold">

                Membership Details

            </h2>

        </div>

        {/* Selected Plan */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <p className="text-sm text-gray-400">

                Selected Plan

            </p>

            <h3 className="mt-2 text-2xl font-bold">

                {
                    membershipPlans?.find(
                        p=>p._id===registrationData.selectedPlan
                    )?.name || "No Plan Selected"
                }

            </h3>

        </div>

        {/* Price */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <p className="text-sm text-gray-400">

                Membership Fee

            </p>

            <h3 className="mt-2 text-4xl font-black text-red-500">

                ₹{
                    membershipPlans?.find(
                        p=>p._id===registrationData.selectedPlan
                    )?.price || 0
                }

            </h3>

        </div>

        {/* Duration */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <p className="text-sm text-gray-400">

                Duration

            </p>

            <h3 className="mt-2 text-2xl font-bold">

                {
                    membershipPlans?.find(
                        p=>p._id===registrationData.selectedPlan
                    )?.durationInDays || 0
                } Days

            </h3>

        </div>

        {/* Payment */}

        <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-600/20 to-transparent p-6">

            <p className="text-sm uppercase tracking-[3px] text-red-400">

                Payment Status

            </p>

            <div className="mt-5 space-y-3">

                <div className="flex justify-between">

                    <span className="text-gray-400">

                        Paid

                    </span>

                    <span>

                        ₹
                        {(membershipPlans.find(
                            p=>p._id===registrationData.selectedPlan
                        )?.price || 0)
                        -
                        Number(registrationData.paymentLeft || 0)}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-gray-400">

                        Remaining

                    </span>

                    <span>

                        ₹{registrationData.paymentLeft || 0}

                    </span>

                </div>

            </div>

        </div>

    </div>

</div>

</div>

</div>

</div>

{otpPopUp && (

<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">

    {/* Background Glow */}

    <div className="absolute h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[160px]" />

    <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,.65)]">

        {/* Header */}

        <div className="border-b border-white/10 px-8 py-7">

            <p className="text-sm uppercase tracking-[4px] text-red-500">

                OTP Verification

            </p>

            <h2 className="mt-2 text-3xl font-black">

                Verify Member

            </h2>

            <p className="mt-3 text-gray-400">

                Enter the 6-digit verification code sent to

            </p>

            <p className="mt-1 font-medium text-red-400 break-all">

                {registrationData.email}

            </p>

        </div>

        {/* Body */}

        <div className="p-8">

            {/* OTP Inputs */}

            <div className="mb-10 flex justify-center gap-3">

                {inputArray.map((input,index)=>(

                    <input
                        key={index}
                        ref={(el)=>inputRef.current[index]=el}
                        type="text"
                        maxLength={1}
                        value={inputArray[index]}
                        onChange={(e)=>handleOtpChange(e,index)}
                        onKeyDown={(e)=>handleKeyDown(e,index)}
                        className="
                            h-16
                            w-14
                            rounded-2xl
                            border
                            border-white/10
                            bg-black/20
                            text-center
                            text-2xl
                            font-bold
                            outline-none
                            transition-all
                            duration-300
                            backdrop-blur-xl
                            focus:border-red-500
                            focus:shadow-[0_0_20px_rgba(239,68,68,.35)]
                        "
                    />

                ))}

            </div>

            {/* Timer */}

            <div className="mb-10 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-600/10 to-transparent p-5 text-center">

                <p className="text-sm uppercase tracking-[3px] text-gray-400">

                    OTP expires in

                </p>

                <h3 className="mt-2 text-4xl font-black text-red-500">

                    05 : 00

                </h3>

            </div>

            {/* Buttons */}

            <div className="space-y-4">

                <button
                    onClick={() =>
                        OTPvalidationHandler(registrationData.email)
                    }
                    className="
                        group
                        flex
                        h-14
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-red-600
                        to-red-500
                        text-lg
                        font-semibold
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-[0_18px_40px_rgba(239,68,68,.35)]
                    "
                >

                    Verify OTP

                    <span className="transition-transform duration-300 group-hover:translate-x-2">

                        →

                    </span>

                </button>

                <button
                    onClick={()=>setOTPPopUp(false)}
                    className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        font-medium
                        transition-all
                        duration-300
                        hover:bg-white/10
                    "
                >

                    Cancel

                </button>

            </div>

        </div>

    </div>

</div>

)}
        </div>
    );
}

export default Registration;