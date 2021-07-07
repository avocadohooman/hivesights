import { NewReview } from '../types/review';
import parsingHelper from './parsingHelpers';

// parsing incoming reviews through PUT/POST requests
const parsingReview = (object: any, companyId: string) : NewReview => {
    const newReview: NewReview = {
        companyId: parseCompanyId(companyId),
        userName: parseUserName(object.userName),
        userPicture: parseUserPictureUrl(object.userPicture),
        pros: (object.pros || object.downVoteUsers === false) ? parseProsCons(object.pros) : undefined,
        cons: (object.cons || object.downVoteUsers === false) ? parseProsCons(object.cons) : undefined,
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
        coverLetter: (object.coverLetter || object.downVoteUsers === false) ? parseCoverLetter(object.coverLetter) : "",
        cv: (object.cv || object.downVoteUsers === false) ? parseResume(object.coverLetter) : "",
        upVotes: (object.upVotes || object.downVoteUsers === false) ? parseVoting(object.upVotes) : undefined,
        upVoteUsers: (object.upVoteUsers || object.downVoteUsers === false) ? parseVotingUsers(object.upVoteUsers) : undefined,
        downVotes: (object.downVotes || object.downVoteUsers === false) ? parseVoting(object.downVotes) : undefined,
        downVoteUsers: (object.downVoteUsers || object.downVoteUsers === false) ? parseVotingUsers(object.downVoteUsers) : undefined,
    };
    return newReview;
};

// checking if company ID exists and is of type string
const parseCompanyId = (companyId: unknown) : string => {
    if (!companyId || !parsingHelper.isString(companyId)) {
        throw new Error('Incorrect or missing companyId ' + companyId);
    }
    return companyId;
};

// checking if userNAme exists and is of type string
const parseUserName = (userName: unknown) : string => {
    if (!userName || !parsingHelper.isString(userName)) {
        throw new Error('Incorrect or missing userName ' + userName);
    }
    return userName;
};

// checking if userPicture URL exists and is of type string
const parseUserPictureUrl = (userPictureUrl: unknown) : string => {
    if (!userPictureUrl || !parsingHelper.isString(userPictureUrl)) {
        throw new Error('Incorrect or missing userPictureUrl ' + userPictureUrl);
    }
    return userPictureUrl;
};

// checking if Pros/CONS exist, are of type string and have a minimumum
// length of 5
const parseProsCons = (prosCons: unknown) : string => {
    if (!prosCons || !parsingHelper.isString(prosCons)) {
        throw new Error('Incorrect or missing Pros/Cons ' + prosCons);
    }
    const amountOfWords = prosCons.split(" ");
    if (amountOfWords.length < 5) {
        throw new Error('Pros/Const must constain at least 5 words. Current amount of words: ' + amountOfWords.length);
    }
    return prosCons;
};

// checking if overall headline exist, are of type string and has a 
// maximum length of 120 characters
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

// checking if totalRating exists, is of type number and that 
// value is between 0 - 5
const parseTotalRating = (totalRating: unknown) : number => {
    if (totalRating === undefined || !parsingHelper.isNumber(totalRating)) {
        throw new Error('Incorrect or missing totalRating ' + totalRating);
    }
    if (totalRating < 0 || totalRating > 5) {
        throw new Error('Score must be between 0 - 5:  ' + totalRating);
    }
    return totalRating;
};

// checking if subcategory rating exists, is of type number and that 
// value is between 0 - 5
const parseCriteriaRating = (criteriaRating: unknown) : number => {
    if (criteriaRating === undefined || !parsingHelper.isNumber(criteriaRating)) {
        throw new Error('Incorrect or missing criteriaRating ' + criteriaRating);
    }
    if (criteriaRating < 0 || criteriaRating > 5) {
        throw new Error('Score must be between 0 - 5:  ' + criteriaRating);
    }
    return criteriaRating;
};

// checking if salary exists, is of type number and that 
// value is not below 0
const parseSalary = (salary: unknown) : number => {
    if (salary === undefined || !parsingHelper.isNumber(salary)) {
        throw new Error('Incorrect or missing salary ' + salary);
    }
    if (salary < 0) {
        throw new Error('Salary cannot be below 0 ' + salary);
    }
    return salary;
};

// checking if duration exists, is of type number and that 
// value is not below 0
const parseDuration = (duration: unknown) : number => {
    if (duration === undefined || !parsingHelper.isNumber(duration)) {
        throw new Error('Incorrect or missing duration ' + duration);
    }
    if (duration < 0) {
        throw new Error('duration cannot be below 0 ' + duration);
    }
    return duration;
};

// checking if cover letter exists, is of type string
const parseCoverLetter = (coverLetter: unknown) : string => {
    if (!parsingHelper.isString(coverLetter)) {
         throw new Error('Incorrect or missing coverLetter ' + coverLetter);
    }
    return coverLetter;
};

// checking if resume exists, is of type string
const parseResume = (resume: unknown) : string => {
    if (!parsingHelper.isString(resume)) {
         throw new Error('Incorrect or missing resume ' + resume);
    }
    return resume;
};

// checking if vote exists, is of type number and value is not below 0
const parseVoting = (vote: unknown) : number => {
    if (vote === undefined || !parsingHelper.isNumber(vote)) {
        throw new Error('Incorrect or missing vote ' + vote);
    }
    if (vote < 0) {
        throw new Error('Vote cannot be lower than 0:  ' + vote);
    }
    return vote;
};

// checking if user exists and is of type string
const parseVotingUsers = (users: unknown[]) : string[] => {
    let _users: string[] = [];
    _users = users.map(user => {
        if (!parsingHelper.isString(user)) {
            throw new Error('Incorrect data type for user ' + user);
        }
        return user;
    });
    return _users;
};

export default {
    parsingReview,
};