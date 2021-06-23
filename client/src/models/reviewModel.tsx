export type Review = {
    id: string,
    companyId: string,
    userName: string,
    userPicture: string,
    pros: string,
    cons: string,
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
    upVotes: number,
    upVoteUsers: string[],
    downVotes: number,
    downVoteUsers: string[],
    publishedDate: Date
};

export type NewReview = Omit<Review, 'id' | 'publishedDate' | 'companyId' | 'coverLetter' | 'cv' | 'upVotes' | 'upVoteUsers' | 'downVotes' | 'downVoteUsers'>;
export type UpdatedReview = Omit<Review, 'id' | 'publishedDate'>;

export type CompanyTotalRating = Pick<Review, 'totalRating'>;
export type ReviewVoting = Pick<Review, 'upVotes' | 'downVotes' | 'upVoteUsers' | 'downVoteUsers'>;

export type SetReview = React.Dispatch<React.SetStateAction<Review | undefined>>;
