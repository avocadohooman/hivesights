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

const ReviewSubRatingHeader = ({ 
        label
    } : {  
        label: string
    }): JSX.Element => {

    return (
        <div className="companyReviewSubRatingsHeader">{label}</div>
    )
}

export default ReviewSubRatingHeader;