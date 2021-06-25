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
        kpi: StateKpi
    }): JSX.Element => {

    const durationLabel = 'Duration';
    const salaryLabel = 'Salary';
    const ratingLabel = 'Total Score';
    const reviewLabels = 'Review(s) written'
    console.log("KPIs", kpi);

    return (
        <div className="keyIndicatorsWrapper ">
            <KeyIndicator average={false} keyIndicator={kpi.reviews} label={reviewLabels}/>
            <KeyIndicator average={true}  keyIndicator={kpi.averageScore} label={ratingLabel}/>
            <KeyIndicator average={true}  keyIndicator={kpi.averageSalary} label={salaryLabel}/>
            <KeyIndicator average={true}  keyIndicator={kpi.averageDuration} label={durationLabel}/>
        </div>
    )
}

export default KeyIndicatorsWrapper;