export type Company = {
    id: number,
    companyName: string,
    companyDescription: string,
    logoURL: string,
    companyURL: string,
    companyLocation: string,
    totalReviews?: number,
    averageSalaries?: number,
    interviews?: number
}

export type NewCompany = Omit<Company, 'id'>;
