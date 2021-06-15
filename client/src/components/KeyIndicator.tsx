import React from 'react'
import '../styles/keyIndicators.css';

const KeyIndicator = ({keyIndicator, label}: {keyIndicator: number | undefined, label: string}): JSX.Element => {

    let keyIndicatorLabel = '';
    if (keyIndicator) {
        if (label === 'Salary') {
            keyIndicatorLabel = `${keyIndicator} €`;
        } else if (label === 'Rating') {
            keyIndicatorLabel = `${keyIndicator}`;
        } else {
            keyIndicatorLabel = `${keyIndicator} Months`;
        }
    } else {
        keyIndicatorLabel = 'Loading...';
    }
    
    return (
        <div className="keyIndicatorWrapper">
            <div className="keyIndicator">{keyIndicatorLabel} </div>
            <div className="label">Avg. {label}</div>
        </div>
    )
}

export default KeyIndicator;