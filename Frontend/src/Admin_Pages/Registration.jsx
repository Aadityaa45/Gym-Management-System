import React, { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { gymAppContext } from "../contexts/gymAuthContext";

const Registration = () => {
    const { membershipPlans, setMembershipPlans } = useContext(gymAppContext);
    console.log(membershipPlans)
    const [registrationData,setRegistrationData] = useState({
        FirstName: "",
        LastName: "",
        Address:"",
        DateOfBirth:"",
        email:"",
        SelectedPlan:"",
        AdditionalDiscount:"",
        PaymentMode:"",
        PhoneNumber:"",
        PaymentLeft:"",
        Registrar:"",
        SelectedPlan:"",
        TermsAccepted:false,
        FullPaymentRecieved:false,
        DocumentsVerified:false

    })

    //form data value change handler
    const HandleChange = (e) =>{
        const {name,value,type,checked} = e.target
        setRegistrationData((prev)=>({
            ...prev,
            [name]:type==="checkbox"?checked:value
        }))
    }
    useEffect(() => {
        toast.success("Registration Page Opened");
    }, []);

    const SubmitButtonHandler = () =>{
        toast.error("Functionality is not implemented")
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
                        name="FirstName"
                        type="text"
                        onChange={HandleChange}
                        value={registrationData.FirstName}
                        placeholder="First Name"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <input
                        name="LastName"
                        type="text"
                        onChange={HandleChange}
                        value={registrationData.LastName}
                        placeholder="Last Name"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <input
                        name="Address"
                        onChange={HandleChange}
                        value={registrationData.Address}
                        type="text"
                        placeholder="Address"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
                    <input
                        name="DateOfBirth"
                        onChange={HandleChange}
                        value={registrationData.DateOfBirth}
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
                        name="SelectedPlan"
                        onChange={HandleChange}
                        value={registrationData.SelectedPlan}
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    >
                        <option>Select the Plan</option>
                        {membershipPlans && membershipPlans.map((plans)=>(
                            <option key={plans._id}>{plans.name}</option>
                        ))}
                    </select>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <input
                        name="AdditionalDiscount"
                        onChange={HandleChange}
                        value={registrationData.AdditionalDiscount}
                        type="number"
                        placeholder="Additional Discount"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />

                    <select
                        name="PaymentMode"
                        onChange={HandleChange}
                        value={registrationData.PaymentMode}
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    >
                        <option>Payment Mode</option>
                        <option>Cash</option>
                        <option>UPI</option>
                        <option>Card</option>
                    </select>

                    <input
                        name="PhoneNumber"
                        onChange={HandleChange}
                        value={registrationData.PhoneNumber}
                        type="tel"
                        placeholder="Phone Number"
                        className="bg-[#0D1B2A] border border-green-700 rounded-md p-4 outline-none"
                    />
                </div>

                {/* Checkbox + Other Fields */}
                <div className="flex flex-col lg:flex-row justify-between gap-10 mb-20">

                    <div className="flex flex-col gap-5">

                        <label className="flex items-center gap-3">
                            <input type="checkbox" name="TermsAccepted" checked={registrationData.TermsAccepted} onChange={HandleChange} />

                            <span>Terms and Conditions Agreed</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input name="FullPaymentReceived" checked={registrationData.FullPaymentRecieved} onChange={HandleChange} type="checkbox" />
                            <span>Full Payment Received</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input type="checkbox" name="DocumentsVerified" checked={registrationData.DocumentsVerified} onChange={HandleChange} />
                            <span>Documents Verified</span>
                        </label>

                    </div>

                    <div className="flex items-center gap-5">
                        <label>Payment Left</label>

                        <input
                            name="PaymentLeft"
                            value={registrationData.PaymentLeft}
                            onChange={HandleChange}
                            type="number"
                            className="bg-[#0D1B2A] border border-green-700 rounded-md p-3 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-5">
                        <label>Registrar</label>

                        <input
                            name="Registrar"
                            value={registrationData.Registrar}
                            onChange={HandleChange}
                            type="text"
                            className="bg-[#0D1B2A] border border-green-700 rounded-md p-3 outline-none"
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button onSubmit={SubmitButtonHandler}
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
                        Register
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Registration;