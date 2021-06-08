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
        cv: (object.cv) ? parseResume(object.coverLetter) : "",
        helpful: (object.helpful) ? parseVoting(object.helpful) : undefined,
        notHelpful: (object.helpful) ? parseVoting(object.notHelpful) : undefined,
    };
    return newReview;
};

const parseCompanyId = (companyId: unknown) : string => {
    if (!companyId || !parsingHelper.isString(companyId)) {
        throw new Error('Incorrect or missing companyId ' + companyId);
    }
    return companyId;
};

const parseUserName = (userName: unknown) : string => {
    if (!userName || !parsingHelper.isString(userName)) {
        throw new Error('Incorrect or missing userName ' + userName);
    }
    return userName;
};

const parseUserPictureUrl = (userPictureUrl: unknown) : string => {
    if (!userPictureUrl || !parsingHelper.isString(userPictureUrl)) {
        throw new Error('Incorrect or missing userPictureUrl ' + userPictureUrl);
    }
    return userPictureUrl;
};

const parseProsCons = (prosCons: unknown) : string => {
    if (!prosCons || !parsingHelper.isString(prosCons)) {
        throw new Error('Incorrect or missing Pros/Cons ' + prosCons);
    }
    const amountOfWords = prosCons.split(" ");
    console.log("Amount of words", amountOfWords);
    if (amountOfWords.length < 5) {
        throw new Error('Pros/Const must constain at least 5 words. Current amount of words: ' + amountOfWords.length);
    }
    return prosCons;
};

const parseOverall = (overall: unknown) : string => {
    if (!overall || !parsingHelper.isString(overall)) {
        throw new Error('Incorrect or missing overall ' + overall);
    }
    console.log("Length:", overall.length);
    if (overall.length > 120) {
        throw new Error('Overall message is too long: ' + overall.length + '. Max length is 120 characters');
    }
    return overall;
};

const parseTotalRating = (totalRating: unknown) : number => {
    if (totalRating === undefined || !parsingHelper.isNumber(totalRating)) {
        throw new Error('Incorrect or missing totalRating ' + totalRating);
    }
    if (totalRating < 0 || totalRating > 5) {
        throw new Error('Score must be between 0 - 5:  ' + totalRating);
    }
    return totalRating;
};

const parseCriteriaRating = (criteriaRating: unknown) : number => {
    if (criteriaRating === undefined || !parsingHelper.isNumber(criteriaRating)) {
        throw new Error('Incorrect or missing criteriaRating ' + criteriaRating);
    }
    if (criteriaRating < 0 || criteriaRating > 5) {
        throw new Error('Score must be between 0 - 5:  ' + criteriaRating);
    }
    return criteriaRating;
};

const parseSalary = (salary: unknown) : number => {
    if (salary === undefined || !parsingHelper.isNumber(salary)) {
        throw new Error('Incorrect or missing salary ' + salary);
    }
    if (salary < 0) {
        throw new Error('Salary cannot be below 0 ' + salary);
    }
    return salary;
};

const parseDuration = (duration: unknown) : number => {
    if (duration === undefined || !parsingHelper.isNumber(duration)) {
        throw new Error('Incorrect or missing duration ' + duration);
    }
    if (duration < 0) {
        throw new Error('duration cannot be below 0 ' + duration);
    }
    return duration;
};

const parseCoverLetter = (coverLetter: unknown) : string => {
    if (!parsingHelper.isString(coverLetter)) {
         throw new Error('Incorrect or missing coverLetter ' + coverLetter);
    }
    return coverLetter;
};

const parseResume = (resume: unknown) : string => {
    if (!parsingHelper.isString(resume)) {
         throw new Error('Incorrect or missing resume ' + resume);
    }
    return resume;
};

const parseVoting = (vote: unknown) : number => {
    if (vote === undefined || !parsingHelper.isNumber(vote)) {
        throw new Error('Incorrect or missing vote ' + vote);
    }
    if (vote < 0) {
        throw new Error('Score cannot be lower than 0:  ' + vote);
    }
    return vote;
}

export default {
    parsingReview,
};