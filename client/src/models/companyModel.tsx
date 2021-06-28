export interface Company {
    id: string,
    companyName: string,
    companyDescription: string,
    logoURL: string,
    companyURL: string,
    companyLocation: string,
    averageTotalScore: number,
    averageInterviewScore: number,
    averageOnboardingScore: number,
    averageSupervisionScore: number,
    averageLearningScore: number,
    averageCodingPracticesScore: number,
    averagePerksScore: number,
    averageCultureScore: number,
    averageSalaries: number,
    averageDuration: number,
    interviews: number,
    reviews: number,
}

export type NewCompany = Pick<Company, 'companyName' | 'companyDescription' | 'logoURL' | 'companyURL' | 'companyLocation'>;
export type CompanyRating = Pick<Company, 'averageTotalScore'>;

export type SetCompany = React.Dispatch<React.SetStateAction<Company[] | undefined>>
