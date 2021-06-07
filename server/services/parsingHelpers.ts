const isString = (text: unknown) : text is string => {
    return typeof text === "string" || text instanceof String;
};

const isNumber = (value: unknown) : value is number => {
    return typeof value === "number" || value instanceof Number;
};

export default {
    isString,
    isNumber
};