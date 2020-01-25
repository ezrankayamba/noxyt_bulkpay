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
