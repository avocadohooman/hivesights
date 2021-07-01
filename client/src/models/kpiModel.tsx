export type KPI = {
    averageSalary: number,
    averageDuration: number,
    averageScore: number,
    reviews: number
};

export interface StateKpi {
    averageSalary: number,
    averageDuration: number,
    averageScore: number,
    reviews: number
}

export type SetKPI = React.Dispatch<React.SetStateAction<StateKpi | undefined>>;
