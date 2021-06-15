import React from 'react'
import '../../styles/keyIndicators.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const KeyIndicator = ({keyIndicator, label}: {keyIndicator: number | undefined, label: string}): JSX.Element => {

    let keyIndicatorValue = '';
    let keyIndicatorLabel = `Avg. ${label}`;
    if (keyIndicator) {
        if (label === 'Salary') {
            keyIndicatorValue = `${keyIndicator} €`;
        } else if (label === 'Total Score') {
            keyIndicatorValue = `${keyIndicator}`;
            keyIndicatorLabel = `${label}`;
        } else {
            keyIndicatorValue = `${keyIndicator} Months`;
        }
    }

    return (
        
        <div className="keyIndicatorWrapper">
            {!keyIndicator && 
                <CircularProgress />
            }
            {label === 'Total Score' && 
                <div className="keyIndicator">{keyIndicatorValue}<span className="labelSmall">/5</span></div>
            }
            {label !== 'Total Score' && 
                <div className="keyIndicator">{keyIndicatorValue} </div>
            }
            <div className="label">{keyIndicatorLabel}</div>
        </div>
    )
}

export default KeyIndicator;