
export const monthArray = [
    { nm: 'January, 2024', opt: 202401 },
    { nm: 'February, 2024', opt: 202402 },
    { nm: 'March, 2024', opt: 202403 },
    { nm: 'April, 2024', opt: 202404 },
    { nm: 'May, 2024', opt: 202405 },
    { nm: 'June, 2024', opt: 202406 },
    { nm: 'July, 2024', opt: 202407 },
    { nm: 'August, 2024', opt: 202408 },
    { nm: 'September, 2024', opt: 202409 },
    { nm: 'October, 2024', opt: 202410 },
    { nm: 'November, 2024', opt: 202411 },
    { nm: 'December, 2024', opt: 202412 },
    { nm: 'January, 2025', opt: 202501 },
    { nm: 'February, 2025', opt: 202502 },
    { nm: 'March, 2025', opt: 202503 },
    { nm: 'April, 2025', opt: 202504 },
    { nm: 'May, 2025', opt: 202505 },
    { nm: 'June, 2025', opt: 202506 },
    { nm: 'July, 2025', opt: 202507 },
    { nm: 'August, 2025', opt: 202508 },
    { nm: 'September, 2025', opt: 202509 },
    { nm: 'October, 2025', opt: 202510 },
    { nm: 'November, 2025', opt: 202511 },
    { nm: 'December, 2025', opt: 202512 },
    { nm: 'January, 2026', opt: 202601 },
    { nm: 'February, 2026', opt: 202602 },
    { nm: 'March, 2026', opt: 202603 },
    { nm: 'April, 2026', opt: 202604 },
    { nm: 'May, 2026', opt: 202605 },
    { nm: 'June, 2026', opt: 202606 },
    { nm: 'July, 2026', opt: 202607 },
    { nm: 'August, 2026', opt: 202608 },
    { nm: 'September, 2026', opt: 202609 },
    { nm: 'October, 2026', opt: 202610 },
    { nm: 'November, 2026', opt: 202611 },
    { nm: 'December, 2026', opt: 202612 },
    { nm: 'January, 2027', opt: 202701 },
    { nm: 'February, 2027', opt: 202702 },
    { nm: 'March, 2027', opt: 202703 },
    { nm: 'April, 2027', opt: 202704 },
    { nm: 'May, 2027', opt: 202705 },
    { nm: 'June, 2027', opt: 202706 },
    { nm: 'July, 2027', opt: 202707 },
    { nm: 'August, 2027', opt: 202708 },
    { nm: 'September, 2027', opt: 202709 },
    { nm: 'October, 2027', opt: 202710 },
    { nm: 'November, 2027', opt: 202711 },
    { nm: 'December, 2027', opt: 202712 },
]

const month = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const monthConvert = (num) => {
    const n1 = num.toString().substr(0, 4);
    const n2 = num.toString().substr(4, 2);
    const fullMonth = month[parseInt(n2)];
    return fullMonth + "-" + n1;
}