/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const ProsConsHeader = ({ 
        label
    } : {  
        label: string
    }): JSX.Element => {

    let proConsLabel = '';
    let proConsStyle = {};
    if (label === 'pro') {
        proConsLabel = 'Pros';
        proConsStyle = {
            color: '#8FBC87',
        }
    } else {
        proConsLabel = 'Cons';
        proConsStyle = {
            color: '#D23E41',
        }
    }

    return (
        <div className="companyReviewProsConsHeader" style={proConsStyle}>{proConsLabel}</div>
    )
}

export default ProsConsHeader;