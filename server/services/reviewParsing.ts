import { NewReview } from '../types/review';
import parsingHelper from './parsingHelpers';

const parsingReview = (object: any, companyId: string) : NewReview => {
    const newReview: NewReview = {
        companyId: parseCompanyId(companyId),
        userName: parseUserName(object.userName),
        userPicture: parseUserPictureUrl(object.userPicture),
        pros: (object.pros) ? parseProsCons(object.pros) : undefined,
        cons: (object.cons) ? parseProsCons(object.cons) : undefined,
        overall: parseOverall(object.overall),
        totalRating: parseTotalRating(object.totalRating),
        ratingCriteriaInterview: parseCriteriaRating(object.ratingCriteriaInterview),
        ratingCriteriaOnboarding: parseCriteriaRating(object.ratingCriteriaOnboarding),
        ratingCriteriaSupervision: parseCriteriaRating(object.ratingCriteriaSupervision),
        ratingCriteriaLearning: parseCriteriaRating(object.ratingCriteriaLearning),
        ratingCriteriaCodingPractices: parseCriteriaRating(object.ratingCriteriaCodingPractices),
        ratingCriteriaPerks: parseCriteriaRating(object.ratingCriteriaPerks),
        ratingCriteriaCulture: parseCriteriaRating(object.ratingCriteriaCulture),
        salary: parseSalary(object.salary),
        duration: parseDuration(object.duration),
        coverLetter: (object.coverLetter) ? parseCoverLetter(object.coverLetter) : "",
        cv: (object.coverLetter) ? parseResume(object.coverLetter) : ""
    };
    return newReview;
}

const parseCompanyId = (companyId: unknown) : string => {
    if (!companyId || !parsingHelper.isString(companyId)) {
        throw new Error('Incorrect or missing companyId' + companyId);
    }
    return companyId;
}

const parseUserName= (userName: unknown) : string => {
    if (!userName || !parsingHelper.isString(userName)) {
        throw new Error('Incorrect or missing userName' + userName);
    }
    return userName;
}

const parseUserPictureUrl = (userPictureUrl: unknown) : string => {
    if (!userPictureUrl || !parsingHelper.isString(userPictureUrl)) {
        throw new Error('Incorrect or missing userPictureUrl' + userPictureUrl);
    }
    return userPictureUrl;
}

const parseProsCons = (pros: unknown[]) : string[] => {
    let _pros: string[] = [];
    _pros = pros.map(pro => {
        if (!parsingHelper.isString(pro)) {
            throw new Error('Incorrect data type for pro' + pro);
        }
        return pro;
    })
    return _pros;
}

const parseOverall = (overall: unknown) : string => {
    if (!overall || !parsingHelper.isString(overall)) {
        throw new Error('Incorrect or missing overall' + overall);
    }
    return overall;
}

const parseTotalRating = (totalRating: unknown) : number => {

    if (!totalRating || !parsingHelper.isNumber(totalRating)) {
        throw new Error('Incorrect or missing totalRating' + totalRating);
    }
    if (totalRating < 0 || totalRating > 5) {
        throw new Error('Score must be between 0 - 5: ' + totalRating);
    }
    return totalRating;
}

const parseCriteriaRating = (criteriaRating: unknown) : number => {
    if (!criteriaRating || !parsingHelper.isNumber(criteriaRating) || criteriaRating < 0 && criteriaRating > 5) {
        throw new Error('Incorrect or missing criteriaRating' + criteriaRating);
    }
    if (criteriaRating < 0 || criteriaRating > 5) {
        throw new Error('Score must be between 0 - 5: ' + criteriaRating);
    }
    return criteriaRating;
}

const parseSalary = (salary: unknown) : number => {
    if (!salary || !parsingHelper.isNumber(salary)) {
        throw new Error('Incorrect or missing salary' + salary);
    }
    return salary;
}

const parseDuration = (duration: unknown) : number => {
    if (!duration || !parsingHelper.isNumber(duration)) {
        throw new Error('Incorrect or missing duration' + duration);
    }
    return duration;
}

const parseCoverLetter = (coverLetter: unknown) : string => {
    if (!parsingHelper.isString(coverLetter)) {
         throw new Error('Incorrect or missing coverLetter' + coverLetter);
    }
    return coverLetter;
}

const parseResume = (resume: unknown) : string => {
    if (!parsingHelper.isString(resume)) {
         throw new Error('Incorrect or missing resume' + resume);
    }
    return resume;
}

export default {
    parsingReview,
}