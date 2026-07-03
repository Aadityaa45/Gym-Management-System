import React, { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { gymAppContext } from "../contexts/gymAuthContext";
import validateRegistration from "../utils/validateRegistration";
import axios from "axios";
import { useRef } from "react";

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
    }


    useEffect(() => {
        toast.success("Registration Page Opened");
    }, []);


    const generateOTPHanlder = async() =>{
        try {
            const selectedPlanData = membershipPlans.find(
    plan => plan._id === registrationData.selectedPlan
);

if (!selectedPlanData) {
    toast.error("Please select a plan");
    return;
}

const total = selectedPlanData.price;

const remaining = registrationData.fullPaymentRecieved
    ? 0
    : Number(registrationData.paymentLeft || 0);

const paid = total - remaining;

const planStartDate = new Date();

const planEndDate = new Date(planStartDate);
planEndDate.setDate(
    planEndDate.getDate() + selectedPlanData.durationInDays
);
if (remaining > total) {
    return toast.error("Remaining payment cannot exceed total amount");
}
const payload = {
    fullName: `${registrationData.firstName} ${registrationData.lastName}`,
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
                `${backendUrl}/api/admin/members//register-member`,
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

    return (
        <div className="min-h-screen  text-white p-8">

            <h1 className="text-4xl font-bold text-center mb-16">
                Registration Form
            </h1>

            <form className="max-w-7xl mx-auto">

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
                    <input
                        name="firstName"
                        type="text"
                        onChange={HandleChange}
                        value={registrationData.firstName}
                        placeholder="First Name"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <input
                        name="lastName"
                        type="text"
                        onChange={HandleChange}
                        value={registrationData.lastName}
                        placeholder="Last Name"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <input
                        name="address"
                        onChange={HandleChange}
                        value={registrationData.address}
                        type="text"
                        placeholder="Address"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
                    <input
                        name="dateOfBirth"
                        onChange={HandleChange}
                        value={registrationData.dateOfBirth}
                        type="date"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <input
                        name="email"
                        onChange={HandleChange}
                        value={registrationData.email}
                        type="email"
                        placeholder="Email"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <select
                        name="selectedPlan"
                        onChange={HandleChange}
                        value={registrationData.selectedPlan}
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    >
                        <option>Select the Plan</option>
                        {membershipPlans && membershipPlans.map((plans)=>(
                            <option value={plans._id} key={plans._id}>{plans.name}</option>
                        ))}
                    </select>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <input
                        name="additionalDiscount"
                        onChange={HandleChange}
                        value={registrationData.additionalDiscount}
                        type="number"
                        placeholder="Additional Discount %"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <select
                        name="paymentMode"
                        onChange={HandleChange}
                        value={registrationData.paymentMode}
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    >
                        <option>Payment Mode</option>
                        <option>Cash</option>
                        <option>UPI</option>
                        <option>Card</option>
                    </select>

                    <input
                        name="phoneNumber"
                        onChange={HandleChange}
                        value={registrationData.phoneNumber}
                        type="tel"
                        placeholder="Phone Number"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />
                </div>

                {/* Checkbox + Other Fields */}
                <div className="flex flex-col lg:flex-row justify-between gap-10 mb-20">

                    <div className="flex flex-col gap-5">

                        <label className="flex items-center gap-3">
                            <input type="checkbox" name="termsAccepted" checked={registrationData.termsAccepted} onChange={HandleChange} />

                            <span>Terms and Conditions Agreed</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input name="fullPaymentRecieved" checked={registrationData.fullPaymentRecieved} onChange={HandleChange} type="checkbox" />
                            <span>Full Payment Received</span>
                        </label>

                        {/* <label className="flex items-center gap-3">
                            <input type="checkbox" name="DocumentsVerified" checked={registrationData.DocumentsVerified} onChange={HandleChange} />
                            <span>Documents Verified</span>
                        </label> */}

                    </div>

                    <div className="flex items-center gap-5">
                        <label>Payment Left</label>

                        <input
                            name="paymentLeft"
                            value={registrationData.paymentLeft}
                            onChange={HandleChange}
                            type="number"
                            className="bg-[#0D1B2A] border border-green-700 rounded-md p-3 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-5">
                        <label>Registrar</label>

                        <input
                            name="registrar"
                            value={registrationData.registrar}
                            onChange={HandleChange}
                            type="text"
                            className="bg-[#0D1B2A] border border-green-700 rounded-md p-3 outline-none"
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button onClick={generateOTPHanlder}
                        type="submit"
                        className="
                            bg-[#EF2424]
                            hover:bg-red-700
                            px-14
                            py-3
                            rounded-lg
                            text-lg
                            font-semibold
                            transition
                        "
                    >
                        Generate OTP
                    </button>
                </div>

            </form>
            {otpPopUp && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

    <div className="bg-[#041b35] w-[420px] rounded-2xl border border-gray-700 p-8 shadow-2xl">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-white mb-2">
        Enter OTP
      </h2>

      <p className="text-center text-gray-400 mb-8">
        Please enter the 6 digit OTP sent to member's email.
      </p>

      {/* OTP Boxes */}
      <div className="flex justify-center gap-3 mb-8">

    
        {inputArray.map((input,index)=>(
            <input
                className="
              w-12
              h-14
              bg-[#08213d]
              border
              border-gray-600
              rounded-lg
              text-center
              text-xl
              text-white
              outline-none
              focus:border-red-500"
             key={index} name="index" onKeyDown={(e)=>handleKeyDown(e,index)} type="text" value={digit} onChange={(e)=>handleOtpChange(e,index)} />
        ))}

      </div>

      {/* Timer */}
      <div className="text-center mb-8">

        <p className="text-gray-400">
          OTP expires in
        </p>

        <h3 className="text-red-500 text-2xl font-bold">
          05 : 00
        </h3>

      </div>

      {/* Button */}
      <button
        className="
          w-full
          bg-red-500
          hover:bg-red-600
          transition-all
          py-3
          rounded-lg
          text-white
          font-semibold
          text-lg
        "
      >
        Validate OTP
      </button>

    </div>

  </div>
)}
        </div>
    );
;

export default Registration;