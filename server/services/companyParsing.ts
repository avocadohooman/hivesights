import { NewCompany } from '../types/company';
import parsingHelper from './parsingHelpers';

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
    if (!name || !parsingHelper.isString(name)) {
        throw new Error('Incorrect or missing name' + name);
    }
    return name;
}

const parseCompanyDescription = (description: unknown) : string => {
    if (!description || !parsingHelper.isString(description)) {
        throw new Error('Incorrect or missing description' + description);
    };
    return description;
}

const parseCompanyLogo = (logoURL: unknown) : string => {
    if (!logoURL || !parsingHelper.isString(logoURL)) {
        throw new Error('Incorrect or missing logoURL' + logoURL);
    };
    return logoURL;
}

const parseCompanyURL = (companyURL: unknown) : string => {
    if (!companyURL || !parsingHelper.isString(companyURL)) {
        throw new Error('Incorrect or missing companyURL' + companyURL);
    };
    return companyURL;
}

const parseCompanyLocation = (location: unknown) : string => {
    if (!location || !parsingHelper.isString(location)) {
        throw new Error('Incorrect or missing location' + location);
    };
    return location;
}

export default {
    parsingCompany
};
