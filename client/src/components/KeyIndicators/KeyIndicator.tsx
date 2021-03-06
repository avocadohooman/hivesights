// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/keyIndicators.css';

// UI Libraries
import StarIcon from '@material-ui/icons/Star';

// Assets


const KeyIndicator = ({keyIndicator, label, average}: {keyIndicator: number, label: string, average: boolean}): JSX.Element => {

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
        } else if (label === 'Duration'){
            keyIndicatorValue = `${keyIndicator} Months`;
        } else {
            keyIndicatorValue = `${keyIndicator}`;
        }
    }

    return (
        
        <div className="keyIndicatorWrapper">
            {(keyIndicator === -1 || !keyIndicator) && <div className="oneCompanyScore">n/A</div>
            }
            {label === 'Total Score' && keyIndicator && keyIndicator !== -1 &&
                <div className="keyIndicatorScore">
                    <StarIcon className="star"/>
                    <div className="keyIndicator">{keyIndicatorValue}<span className="labelSmall">/5</span></div>
                </div>
            }
            {label !== 'Total Score' && keyIndicator !== -1 &&
                <div className="keyIndicator">{keyIndicatorValue} </div>
            }
            <div className="label">{keyIndicatorLabel}</div>
        </div>
    );
};

export default KeyIndicator;