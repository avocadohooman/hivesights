export type Company = {
    id: string,
    companyName: string,
    companyDescription: string,
    logoURL: string,
    companyURL: string,
    companyLocation: string,
    averageTotalScore?: number,
    averageInterviewScore?: number,
    averageOnboardingScore?: number,
    averageSupervisionScore?: number,
    averageLearningScore?: number,
    averageCodingPracticesScore?: number,
    averagePerksScore?: number,
    averageCultureScore?: number,
    averageSalaries?: number,
    averageDuration?: number,
    interviews?: number,
    reviews?: number,
};

export type NewCompany = Omit<Company, 'id' | 'averageSalaries' | 'averageduration' | 'interviews'>;
export type CompanyRating = Pick<Company, 'averageTotalScore'>;
export type TopCompany = Pick<Company, 'averageTotalScore' | 'reviews' | 'companyName' | 'companyURL' | 'averageSalaries'>;

export type CompanyDB = {
    id: string,
    companyname: string,
    companydescription: string,
    logourl: string,
    companyurl: string,
    companylocation: string,
    averagetotalscore?: number,
    averageinterviewscore?: number,
    averageonboardingscore?: number,
    averagesupervisionscore?: number,
    averagelearningscore?: number,
    averagecodingpracticesscore?: number,
    averageperksscore?: number,
    averageculturescore?: number,
    averagesalaries?: number,
    averageduration?: number,
    interviews?: number,
    reviews?: number,
};

export type TopCompanyDB = Pick<CompanyDB, 'averagetotalscore' | 'reviews' | 'companyname' | 'averagesalaries' | 'companyurl'>;

