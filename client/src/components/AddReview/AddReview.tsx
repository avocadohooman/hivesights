/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React, { useState } from 'react';

// Components
import AddReviewHeader from './AddReviewHeader';

// Data models 
import { Review } from '../../models/reviewModel';
import { Company } from '../../models/companyModel';

// API services

// CSS styles
import '../../styles/addReview.css';

// UI Libraries

// Assets


const AddReview = ({
        companies,
        id
    } : {
        companies: Company[],
        id: string
    }): JSX.Element => {

    const company = companies.find(company => company.id === id);
    return (
        <div className="addReviewWrapper">
            {company && 
                <div className="addReviewFormWrapper">
                    <AddReviewHeader companyName={company.companyName} />
                </div>
            }
            <div className="addReviewInfoTextWrapper"> 

            </div>
        </div>
    )
}

export default AddReview;