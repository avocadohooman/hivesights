import React, { useState, useEffect, Suspense } from 'react';
import { KPI, StateKpi } from '../models/kpiModel';
import { User } from '../models/userModel';
import kpiApi from '../services/kpiApi';
import KeyIndicatorsWrapper from './KeyIndicatorsWrapper';

const Hivesights = ({user}: {user: User}): JSX.Element=> {

    const [kpi, setKpi] = useState<StateKpi | undefined>(undefined);
    const currentUser: User = {
        id: user.id,
        userName: user.userName,
        imageUrl: user.imageUrl,
        intraUrl: user.intraUrl,
        internshipValidated: user.internshipValidated,
    }
    
    useEffect(() => {
        const getKpi = async() => {
            if (!kpi && !window.localStorage.getItem('KPI')) {
                try {
                    const res: KPI = await kpiApi.getKeyKpi();
                    setKpi({averageDuration: res.averageDuration, averageSalary: res.averageSalary, averageScore: res.averageScore});
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getKpi();
    }, []);

    console.log("Current User", currentUser);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <KeyIndicatorsWrapper kpi={kpi}/>
            </Suspense>
        </div>
    );
}

export default Hivesights;