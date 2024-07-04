export const isDate = (value) => {
    const timestamp = Date.parse(value);
    return !isNaN(timestamp);
}

const dayArr = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
];


export const formatedDateDot = (dt) => {
    const initialDate = isDate(dt);
    let d = "";
    if (initialDate) {
        d = new Date(dt);
    } else {
        d = new Date("1970-01-01");
    }
    return dayArr[d.getDate()] + "." + dayArr[d.getMonth() + 1] + "." + d.getFullYear();
   
}