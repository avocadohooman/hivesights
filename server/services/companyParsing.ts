import { NewCompany } from '../types/company';

export const parsingCompany = (object: any) : NewCompany => {

    const newCompany: NewCompany = {
        companyName: parseCompanyName(object.companyName),
        companyDescription: parseCompanyDescription(object.companyDescription),
        logoURL: parseCompanyLogo(object.logoURL),
        companyURL: parseCompanyURL(object.companyURL),
        companyLocation: parseCompanyLocation(object.companyLocation),
    };
    return newCompany;
}


const parseCompanyName = (name: unknown) : string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name' + name);
    }
    return name;
}

const parseCompanyDescription = (description: unknown) : string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description' + description);
    };
    return description;
}

const parseCompanyLogo = (logoURL: unknown) : string => {
    if (!logoURL || !isString(logoURL)) {
        throw new Error('Incorrect or missing logoURL' + logoURL);
    };
    return logoURL;
}

const parseCompanyURL = (companyURL: unknown) : string => {
    if (!companyURL || !isString(companyURL)) {
        throw new Error('Incorrect or missing companyURL' + companyURL);
    };
    return companyURL;
}

const parseCompanyLocation = (location: unknown) : string => {
    if (!location || !isString(location)) {
        throw new Error('Incorrect or missing location' + location);
    };
    return location;
}

const isString = (text: unknown) : text is string => {
    return typeof text === "string" || text instanceof String;
}

const isNumber = (value: unknown) : value is number => {
    return typeof value === "number" || value instanceof Number;
}

export default {
    parsingCompany
};