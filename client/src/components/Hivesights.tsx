// React Libraris
import React, { useState, useEffect, Suspense } from 'react';
// Components
import KeyIndicatorsWrapper from './KeyIndicators/KeyIndicatorsWrapper';
import CompaniesWrapper from './Companies/CompaniesWrapper';
import CompanyFilterWrapper from './Filter/companyFilterWrapper';

// Data models 
import { Company } from '../models/companyModel';
import { StateKpi } from '../models/kpiModel';
import { User } from '../models/userModel';
import { OnChangeEvent } from '../models/miscModels'
import { SelectionFilter } from '../models/filterModels';

// API services
import kpiApi from '../services/kpiApi';
import companyApi from '../services/companyApi';

// CSS styles

// UI Libraries

// Assets

const Hivesights = ({
        user
    }: {
        user: User
    }): JSX.Element=> {

    const [kpi, setKpi] = useState<StateKpi | undefined>(undefined);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setCompanyFilter] = useState<Company[]>(companies);
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
                const res: StateKpi = await kpiApi.getKeyKpi();
                setKpi(res);
            } catch (error: any) {
                console.log(error);
            }
        }
        const getCompanies = async() => {
            try {
                const companies: Company[] = await companyApi.getAllCompanies();
                companies.sort((function(a: Company, b: Company) {
                    return a.companyName > b.companyName ? 1 : -1; 
                }));
                setCompanies(companies);
                setCompanyFilter(companies);
            } catch (error: any) {
                console.log(error);
            }
        }
        getKpi();
        getCompanies();
    }, []);

    const handleCompanySearch = (event: OnChangeEvent) => {
        event.preventDefault();
        const value: string = event.target.value.toLowerCase();
        let result: Company[] = [];
        result = companies.filter((data) => {
            return data.companyName.toLowerCase().search(value) != -1;
        });
        setCompanyFilter(result);
    }

    const handleCompanySelection = (event: OnChangeEvent, value: SelectionFilter, label: string) => {
        event.preventDefault();
        console.log("Label", label, value)
        if (!value) {
            setCompanyFilter(companies);
            return ;
        }
        let result: Company[] = [];
        if (label === 'Scores') {
            result = companies.filter((data) => data.averageTotalScore >= value.value);
        } else if (label === 'Salary') {
            result = companies.filter((data) => data.averageSalaries >= value.value);
        } else if (label === 'Sort') {
            result = handleSorting(value);
        }        
        setCompanyFilter(result);
    }

    const handleSorting = (value: SelectionFilter):Company[] => {
        const result: Company[] = filteredCompanies;
        switch (value.value) {
            case 'name asc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.companyName > b.companyName ? 1 : -1;
                });
            case 'name desc': 
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.companyName < b.companyName ? 1 : -1;
                });
            case 'review asc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.reviews > b.reviews ? 1 : -1;
                });
            case 'review desc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.reviews < b.reviews ? 1 : -1;
                });
            case 'rating asc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.averageTotalScore > b.averageTotalScore ? 1 : -1;
                });
            case 'rating desc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.averageTotalScore < b.averageTotalScore ? 1 : -1;
                });
        }
        return result;
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