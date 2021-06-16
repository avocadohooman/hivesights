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
    interviews?: number,
    reviews?: number,
};

export type NewCompany = Omit<Company, 'id' | 'averageSalaries' | 'interviews'>;
export type CompanyRating = Pick<Company, 'averageTotalScore'>;

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
    interviews?: number,
    reviews?: number,
};
