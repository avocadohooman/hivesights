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

const ReviewHeaders = ({ 
        header,
        color,
        size
    } : {  
        header: string,
        color: string,
        size: string
    }): JSX.Element => {
    
    const headerColor = {
        color: `${color}`,
        fontSize: `${size}`
    };
    return (
        <div className="companyReviewHeader" style={headerColor}>{header}</div>
    )
}


export default ReviewHeaders;