const validatePlanFields = (name, value) => {

    switch (name) {

        case "name":
            if (value.trim() === "") {
                return "Plan name is required";
            }
            return "";

        case "price":
            if (
                value.trim() === "" ||
                Number(value) <= 0 ||
                Number(value) > 100000
            ) {
                return "Price should be a positive number not exceeding ₹100000";
            }
            return "";

        case "durationInDays":
            if (
                value.trim() === "" ||
                Number(value) <= 0 ||
                Number(value) > 365
            ) {
                return "Duration should be between 1 and 365 days";
            }
            return "";

        case "description":
            if (value.trim() === "") {
                return "Description is required";
            }
            return "";

        case "features":

            const featureArray = value
                .split("\n")
                .map(feature => feature.trim())
                .filter(feature => feature !== "");

            if (featureArray.length === 0) {
                return "At least one feature is required";
            }

            return "";

        default:
            return "";
    }
}

export default validatePlanFields;