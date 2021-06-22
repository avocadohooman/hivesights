// React Libraris
import React from 'react';

// Components
import CompanyReview from './CompanyReview';

// Data models 
import { Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const CompanyReviewsWrapper = ({ 
        reviews,
        currentUser
    } : { 
        reviews: Review[] | undefined,
        currentUser: User
    }): JSX.Element => {

        console.log("Review?", reviews);
    return (
        <div className="companyReviewsWrapper"> 
            {reviews?.map(review => 
                <CompanyReview key={review.id} currentUser={currentUser} review={review}/>
            )}
        </div>
    )
}


export default CompanyReviewsWrapper;
