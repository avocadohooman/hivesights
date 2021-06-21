// React Libraris
import React from 'react'

// Components

// Data models 

// API services

// CSS styles
import '../../styles/keyIndicators.css';

// UI Libraries
import CircularProgress from '@material-ui/core/CircularProgress';

// Assets


const KeyIndicator = ({keyIndicator, label, average}: {keyIndicator: number | undefined, label: string, average: boolean}): JSX.Element => {

    let keyIndicatorValue = '';
    let keyIndicatorLabel = `${label}`;
    if (average) {
        keyIndicatorLabel = `Avg. ${label}`;
    }
    if (keyIndicator) {
        if (label === 'Salary') {
            keyIndicatorValue = `${keyIndicator} €`;
        } else if (label === 'Total Score') {
            keyIndicatorValue = `${keyIndicator}`;
        } else {
            keyIndicatorValue = `${keyIndicator} Months`;
        }
    }

    return (
        
        <div className="keyIndicatorWrapper">
            {!keyIndicator && 
                <CircularProgress />
            }
            {label === 'Total Score' && keyIndicator && 
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