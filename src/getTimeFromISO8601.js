function getTimeFromISO8601(dateString) {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime());
    const hours = padNumber(localDate.getHours());
    const minutes = padNumber(localDate.getMinutes());
    return hours + ":" + minutes;
}

function padNumber(num) {
    return num.toString().padStart(2, '0');
}

export default getTimeFromISO8601;
