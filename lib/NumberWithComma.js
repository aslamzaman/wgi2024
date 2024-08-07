export const numberWithComma = (num) => {
    const [integerPart, decimalPart] = num.toFixed(2).split('.');
    const formattedInteger = parseInt(integerPart).toLocaleString('en-IN');
    return `${formattedInteger}`;
};


export const numberWithCommaWithTwoDigit = (num) => {
    const [integerPart, decimalPart] = parseFloat(num).toFixed(2).split('.');
    const formattedInteger = parseInt(integerPart).toLocaleString('en-IN');
    return `${formattedInteger}.${decimalPart}`;
};