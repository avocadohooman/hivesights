/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 
import { HandleExpandFunction } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const ReadFullReview = ({
        handleExpand
    }:{
        handleExpand: HandleExpandFunction
    }): JSX.Element => {
    
    return (
        <div onClick={handleExpand} className="companyReviewHandleText">Read Full Review</div>
    );
}

export default ReadFullReview;