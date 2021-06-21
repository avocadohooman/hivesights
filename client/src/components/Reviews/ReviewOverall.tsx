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

const ReviewOverall = ({ 
        overall
    } : { 
        overall: string | undefined
    }): JSX.Element => {
    
    return (
        <div className="companyReviewOverallQuote">"{overall}"</div>
    )
}

export default ReviewOverall;