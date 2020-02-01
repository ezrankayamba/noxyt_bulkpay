let options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

let dateTime = (dateIn) => {
    if (!dateIn) {
        dateIn = new Date();
    }
    return dateIn.toLocaleTimeString("en-us", options)
}

export const dateAdd = (date, interval, units) => {
    if (!(date instanceof Date))
        return undefined;
    let ret = new Date(date); //don't change original date
    const checkRollover = function () {
        if (ret.getDate() != date.getDate()) ret.setDate(0);
    };
    switch (String(interval).toLowerCase()) {
        case 'year'   :
            ret.setFullYear(ret.getFullYear() + units);
            checkRollover();
            break;
        case 'quarter':
            ret.setMonth(ret.getMonth() + 3 * units);
            checkRollover();
            break;
        case 'month'  :
            ret.setMonth(ret.getMonth() + units);
            checkRollover();
            break;
        case 'week'   :
            ret.setDate(ret.getDate() + 7 * units);
            break;
        case 'day'    :
            ret.setDate(ret.getDate() + units);
            break;
        case 'hour'   :
            ret.setTime(ret.getTime() + units * 3600000);
            break;
        case 'minute' :
            ret.setTime(ret.getTime() + units * 60000);
            break;
        case 'second' :
            ret.setTime(ret.getTime() + units * 1000);
            break;
        default       :
            ret = undefined;
            break;
    }
    return ret;
}