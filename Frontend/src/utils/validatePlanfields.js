export const validatePlanFields = (name,value) =>{
    switch(name){
        case "name":
            if(value.trim() === ""){
                return "Plan name is required"
            }
            return ""
        
        case "price":
            if(value.trim()==="" || Number(value)<=0 || Number(value)>100000){
                return "Price should be a positive number not exceeding 100000"
            }
            return ""
        
        case "durationInDays":
            if(value.trim()==="" || Number(value)<=0 || Number(value)>365){
                return "Duration should be a positive number not exceeding 365 days"
            }
            return ""
        
        case "features":
            if(features.length === 0){
                return "At least one feature is required"
            }
            return ""
    }
}