export type Review = {
    id: string,
    companyId: string,
    userName: string,
    userPicture: string,
    pros?: string,
    cons?: string,
    overall: string,
    totalRating: number,
    ratingCriteriaInterview: number,
    ratingCriteriaOnboarding: number,
    ratingCriteriaSupervision: number,
    ratingCriteriaLearning: number,
    ratingCriteriaCodingPractices: number,
    ratingCriteriaPerks: number,
    ratingCriteriaCulture: number,
    salary: number,
    duration: number,
    coverLetter?: string,
    cv?: string,
    upVotes?: number,
    upVoteUsers?: string[],
    downVotes?: number,
    downVoteUsers?: string[],
    publishedDate: Date
};

export type NewReview = Omit<Review, 'id' | 'publishedDate'>;
export type CompanyTotalRating = Pick<Review, 'totalRating'>;
export type ReviewVoting = Pick<Review, 'upVotes' | 'downVotes' | 'upVoteUsers' | 'downVoteUsers'>;


export type ReviewDB = {
    id: string,
    companyid: string,
    username: string,
    userpictureurl: string,
    pros?: string,
    cons?: string,
    overall: string,
    totalrating: number,
    ratingcriteriainterview: number,
    ratingcriteriaonboarding: number,
    ratingcriteriasupervision: number,
    ratingcriterialearning: number,
    ratingcriteriacodingpractices: number,
    ratingcriteriaperks: number,
    ratingcriteriaculture: number,
    salary: number,
    duration: number,
    coverletter?: string,
    cv?: string,
    upvotes?: number,
    upvoteusers?: string[],
    downvotes?: number,
    downvoteusers?: string[],
    published_date: Date
};
