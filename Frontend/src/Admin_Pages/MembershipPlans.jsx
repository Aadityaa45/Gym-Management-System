import React, { useState } from "react";
import PlanCard from "../components/AdminComponents/PlanCards";
import { plans } from "../assets/hardcoded_content.js/dummyPlansData";

const MemberShipPlans = () =>{
    const [MembershipPlans, setPlans] = useState([])
    //here we will create a fetch plans functionality or we will get it from the app context and put it on our plans array
    return(
        <div className="flex flex-wrap gap-8 justify-center mt-20">
            {plans.map((plan)=>(
                <PlanCard key={plan.title} {...plan}/>
            ))}

        </div>
    )
}

export default MemberShipPlans