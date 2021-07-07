// React Libraris
import React from 'react';

// Components
import KeyIndicator from './KeyIndicator';

// Data models 
import { SetKPI, StateKpi } from '../../models/kpiModel';
import { Skeleton } from '@material-ui/lab';

// API services

// CSS styles

// UI Libraries

// Assets


// KeyIndicatorsWrapper is the parent component for the KPIs
const KeyIndicatorsWrapper = ({
        kpi,
        setKpi
    }: {
        kpi: StateKpi | undefined,
        setKpi: SetKPI
    }): JSX.Element => {

    const durationLabel = 'Duration';
    const salaryLabel = 'Salary';
    const ratingLabel = 'Total Score';
    const reviewLabels = 'Review(s) written';

    // check if after 5 seconds KPIs are still null (meaning there is no data), if yes, set to -1 which will trigger 
    // n/A state in the front-end and stop 'loading' state
    setTimeout(() => {
        if (kpi?.reviews === null && kpi?.averageDuration === null  && kpi?.averageSalary === null  && kpi?.averageScore === null) {
            setKpi({reviews: -1, averageScore: -1, averageDuration: -1, averageSalary: -1});
        }
    }, 5000);
    
    return (
        <div className="keyIndicatorsWrapper ">
            {kpi?.reviews 
                ? 
                <KeyIndicator average={false} keyIndicator={kpi.reviews} label={reviewLabels}/> 
                : 
                <div>
                    <Skeleton variant="circle" width={100} height={100} /> 
                    <Skeleton variant="text" />
                </div>
            }
            {kpi?.averageScore 
                ? 
                <KeyIndicator average={true} keyIndicator={kpi.averageScore} label={ratingLabel}/> 
                : 
                <div>
                    <Skeleton variant="circle" width={100} height={100} /> 
                    <Skeleton variant="text" />
                </div>
            }
            {kpi?.averageSalary 
                ? 
                <KeyIndicator average={true} keyIndicator={kpi.averageSalary} label={salaryLabel}/> 
                : 
                <div>
                    <Skeleton variant="circle" width={100} height={100} /> 
                    <Skeleton variant="text" />
                </div>
            }
            {kpi?.averageDuration 
                ? 
                <KeyIndicator average={true} keyIndicator={kpi.averageDuration} label={durationLabel}/> 
                : 
                <div>
                    <Skeleton variant="circle" width={100} height={100} /> 
                    <Skeleton variant="text" />
                </div>
            }
        </div>
    );
};

export default KeyIndicatorsWrapper;