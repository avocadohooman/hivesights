export type Review = {
    id: string,
    companyId: string,
    userName: string,
    userPicture: string,
    pros?: string[],
    cons?: string[],
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
    published_date: Date
}

export type NewReview = Omit<Review, 'id' | 'published_date'>;
export type CompanyTotalRating = Pick<Review, 'totalRating'>;