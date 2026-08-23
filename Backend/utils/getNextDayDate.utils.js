import {
    fromZonedTime,
    formatInTimeZone
} from "date-fns-tz";

const getNextDayInIndia = () => {

    const timezone = "Asia/Kolkata";

    const now = new Date();

    const todayIndia = formatInTimeZone(
        now,
        timezone,
        "yyyy-MM-dd"
    );

    const tomorrow = new Date(
        `${todayIndia}T00:00:00+05:30`
    );

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    return tomorrow;
};

export default getNextDayInIndia