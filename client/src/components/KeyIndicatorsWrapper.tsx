import React from 'react';
import { StateKpi } from '../models/kpiModel';
import KeyIndicator from './KeyIndicator';

const KeyIndicatorsWrapper = ({kpi}: {kpi: StateKpi | undefined}): JSX.Element => {
    console.log("Key Indicator KPIs", kpi);

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