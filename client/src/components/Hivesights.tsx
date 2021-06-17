import React, { useState, useEffect, Suspense } from 'react';

// Data models 
import { Company } from '../models/companyModel';
import { KPI, StateKpi } from '../models/kpiModel';
import { User } from '../models/userModel';

// API services
import kpiApi from '../services/kpiApi';
import companyApi from '../services/companyApi';

// Components
import KeyIndicatorsWrapper from './KeyIndicators/KeyIndicatorsWrapper';
import CompaniesWrapper from './Companies/CompaniesWrapper';
import CompanyFilterWrapper from './Filter/companyFilterWrapper';

const Hivesights = ({
        user
    }: {
        user: User
    }): JSX.Element=> {

    const [kpi, setKpi] = useState<StateKpi | undefined>(undefined);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setCompanyFilter] = useState<Company[]>([]);
    const currentUser: User = {
        id: user.id,
        userName: user.userName,
        imageUrl: user.imageUrl,
        intraUrl: user.intraUrl,
        internshipValidated: user.internshipValidated,
    }
    
    useEffect(() => {
        const getKpi = async() => {
            try {
                const res: KPI = await kpiApi.getKeyKpi();
                setKpi({averageDuration: res.averageDuration, averageSalary: res.averageSalary, averageScore: res.averageScore});
            } catch (error: any) {
                console.log(error);
            }
        }
        const getCompanies = async() => {
            try {
                const companies: Company[] = await companyApi.getAllCompanies();
                setCompanies(companies);
                setCompanyFilter(companies);
            } catch (error: any) {
                console.log(error);
            }
        }
        getKpi();
        getCompanies();
    }, []);

    const handleCompanySearch = (event: any) => {
        event.preventDefault();
        const value: string = event.target.value.toLowerCase();
        let result: Company[] = [];
        result = companies.filter((data) => {
            return data.companyName.toLowerCase().search(value) != -1;
        });
        setCompanyFilter(result);
    }

    const handleCompanySelection = (event: any, value: number) => {
        event.preventDefault();
        console.log("Value", event.target.value)
        // let value: number = event.target.value;
        if (isNaN(value)) {
            value = 0;
        }
        let result: Company[] = [];
        result = companies.filter((data) => {
            return data.averageSalaries >= value   
        });
        setCompanyFilter(result);
    }

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <KeyIndicatorsWrapper kpi={kpi}/>
                <CompanyFilterWrapper handleCompanySearch={handleCompanySearch} handleCompanySelection={handleCompanySelection}/>
                <CompaniesWrapper companies={filteredCompanies}/>
            </Suspense>
        </div>
    );
}

export default Hivesights;