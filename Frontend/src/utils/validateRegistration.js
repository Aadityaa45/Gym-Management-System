const validateRegistration = (name, value) =>{
    switch(name){
        case "firstName":
            if(value.trim()==="" || value.trim().length<=2  || value.trim().length>15 || value.trim().match(/[^a-zA-Z]/)){
                return "First Name should be between 3 and 15 characters long and should not contain any special characters or numbers"
            }
            return ""
        
        case "lastName":
            if(value.trim()===""|| value.trim().length<=2  || value.trim().length>15 || value.trim().match(/[^a-zA-Z]/)){
                return "Last Name should be string of valid characters"
            }
            return ""
        
        case "address":
            if(value.trim()==="" || value.trim().length<=3 || value.trim().length>50){
                return "Address should be at least 4 characters long"
            }
            return ""
        
        case "email":
            if(value.trim()==="" ||
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim())){
            }
            return ""
        
        case "additionalDiscount":
            if(isNaN(Number(value))){
                return "Discount can only be number"
            }
            return ""
        
        case "phoneNumber":
            if(value.trim()===""||value.trim().length!=10|| (!/^[6-9]\d{9}$/.test(value))){
                return "please enter a valid phone number"
            }
            return ""
        
        case "paymentLeft":
            if(isNaN(Number(value))){
                return "Payment Left Can only be valid number"
            }
            return ""
        
        case "registrar":
            if(value.trim()==="" || !/^[A-Za-z ]+$/.test(value.trim())){
                return "Registrar Name is Required"
            }
            return ""
        
        
        default:
            return "";
    }
}


export default validateRegistration