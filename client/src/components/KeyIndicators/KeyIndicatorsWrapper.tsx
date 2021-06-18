// React Libraris
import React from 'react';

// Components
import KeyIndicator from './KeyIndicator';

// Data models 
import { StateKpi } from '../../models/kpiModel';

// API services

// CSS styles

// UI Libraries

// Assets



const KeyIndicatorsWrapper = ({
        kpi
    }: {
        kpi: StateKpi | undefined
    }): JSX.Element => {

    const durationLabel = 'Duration';
    const salaryLabel = 'Salary';
    const ratingLabel = 'Total Score';

    return (
        <div className="keyIndicatorsWrapper ">
            <KeyIndicator keyIndicator={kpi?.averageSalary} label={salaryLabel}/>
            <KeyIndicator keyIndicator={kpi?.averageScore} label={ratingLabel}/>
            <KeyIndicator keyIndicator={kpi?.averageDuration} label={durationLabel}/>
        </div>
    )
}

export default KeyIndicatorsWrapper;