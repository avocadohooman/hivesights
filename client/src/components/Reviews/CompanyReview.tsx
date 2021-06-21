// React Libraris
import React from 'react';

// Components

// Data models 
import { Review } from '../../models/reviewModel';
// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const CompanyReview = ({ 
        review
    } : { 
        review: Review
    }): JSX.Element => {

    return (
        <div>Review</div>
    )
}

export default CompanyReview;
