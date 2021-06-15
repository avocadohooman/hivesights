import React, { useState, useEffect } from 'react';
import { KPI, StateKpi } from '../models/kpiModel';
import kpiApi from '../services/kpiApi';

const Hivesights = (props: any) => {

    const [kpi, setKpi] = useState<StateKpi | undefined>(undefined);

    useEffect(() => {
        const getKpi = async() => {
            try {
                const res: KPI = await kpiApi.getKeyKpi();
                console.log("KPI", res);
                setKpi({averageDuration: res.averageDuration, averageSalary: res.averageSalary, averageScore: res.averageScore});
            } catch (error) {
                console.log(error);
            }
        }

        getKpi();
    }, []);

    console.log("PROPS", props);
    return (
        <div>{props.user.userName} has validated an internship: {props.user.internshipValidated === true ? 'Yes' : 'No'}</div>
    );
}

export default Hivesights;