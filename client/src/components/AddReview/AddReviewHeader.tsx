/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/addReview.css';

// UI Libraries

// Assets

const AddReviewHeader = ({ 
        companyName
    } : {  
        companyName: string
    }) => {

    const header = `Write a Review for ${companyName}`;
    return (
        <div className="addReviewHeader">{header}</div>
    );
};

export default AddReviewHeader;