/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { HandleNewFields } from '../../models/miscModels';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';
import AddReviewFormHeader from './AddReviewFormHeader';

// UI Libraries

// Assets

const AddReaviewHeadline = ({ 
        handleOverallHeadline
    } : { 
        handleOverallHeadline: HandleNewFields
    }) => {

    return (
        <div>
            <AddReviewFormHeader header='Review Headline' color='#343C44' size='14px'/>
        </div>
    )
}

export default AddReaviewHeadline;