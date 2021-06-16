import React, { useState, useEffect, Suspense } from 'react';
import { Company } from '../models/companyModel';
import { KPI, StateKpi } from '../models/kpiModel';
import { User } from '../models/userModel';
import kpiApi from '../services/kpiApi';
import companyApi from '../services/companyApi';
import KeyIndicatorsWrapper from './KeyIndicators/KeyIndicatorsWrapper';
import CompaniesWrapper from './Companies/CompaniesWrapper';

const Hivesights = ({
        user
    }: {
        user: User
    }): JSX.Element=> {

    const [kpi, setKpi] = useState<StateKpi | undefined>(undefined);
    const [companies, setCompanies] = useState<Company[]>([]);
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
            } catch (error) {
                console.log(error);
            }
        }
        const getCompanies = async() => {
            try {
                const companies: Company[] = await companyApi.getAllCompanies();
                console.log("Companies?", companies);
                setCompanies(companies);
            } catch (error) {
                console.log(error);
            }
        }
        getKpi();
        getCompanies();
    }, []);

    console.log("Current User", currentUser);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <KeyIndicatorsWrapper kpi={kpi}/>
                <CompaniesWrapper companies={companies}/>
            </Suspense>
        </div>
    );
}

export default Hivesights;