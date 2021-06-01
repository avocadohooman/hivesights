export type Company = {
    id: string,
    companyName: string,
    companyDescription: string,
    logoURL: string,
    companyURL: string,
    companyLocation: string,
    averageReviews?: number,
    averageSalaries?: number,
    interviews?: number
};

export type NewCompany = Omit<Company, 'id'>;
export type CompanyRating = Pick<Company, 'averageReviews'>;