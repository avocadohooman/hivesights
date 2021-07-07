import { CompanyRating, NewCompany } from '../types/company';
import parsingHelper from './parsingHelpers';

// parasing company for POST/PUT requests
export const parsingCompany = (object: any) : NewCompany => {

    const newCompany: NewCompany = {
        companyName: parseCompanyName(object.companyName),
        companyDescription: parseCompanyDescription(object.companyDescription),
        logoURL: parseCompanyLogo(object.logoURL),
        companyURL: parseCompanyURL(object.companyURL),
        companyLocation: parseCompanyLocation(object.companyLocation),
    };
    return newCompany;
};

// checking if company rating is a valid number and of type number
export const parsingCompanyRating = (object: any) : CompanyRating => {

    const companyRating: CompanyRating = {
        averageTotalScore: parseCompanyRating(parseInt(object.averageTotalScore))
    };
    return companyRating;
};

// checking if company name is of type string and not missing
const parseCompanyName = (name: unknown) : string => {
    if (!name || !parsingHelper.isString(name)) {
        throw new Error('Incorrect or missing name' + name);
    }
    return name;
};

// checking if company description is of type string and not missing
const parseCompanyDescription = (description: unknown) : string => {
    if (!description || !parsingHelper.isString(description)) {
        throw new Error('Incorrect or missing description' + description);
    }
    return description;
};

// checking if company logo is of type string and not missing
const parseCompanyLogo = (logoURL: unknown) : string => {
    if (!logoURL || !parsingHelper.isString(logoURL)) {
        throw new Error('Incorrect or missing logoURL' + logoURL);
    }
    return logoURL;
};

// checking if company URL is of type string and not missing
const parseCompanyURL = (companyURL: unknown) : string => {
    if (!companyURL || !parsingHelper.isString(companyURL)) {
        throw new Error('Incorrect or missing companyURL' + companyURL);
    }
    return companyURL;
};

// checking if company location is of type string and not missing
const parseCompanyLocation = (location: unknown) : string => {
    if (!location || !parsingHelper.isString(location)) {
        throw new Error('Incorrect or missing location' + location);
    }
    return location;
};

// checking if company rating is of type number and not missing
const parseCompanyRating = (rating: unknown) : number => {
    if (!rating || !parsingHelper.isNumber(rating)) {
        throw new Error('Incorrect or missing rating' + rating);
    }
    return rating;
};

export default {
    parsingCompany,
    parsingCompanyRating
};
