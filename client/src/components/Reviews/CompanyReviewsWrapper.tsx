// React Libraris
import React from 'react';

// Components
import CompanyReview from './CompanyReview';

// Data models 
import { Review } from '../../models/reviewModel';

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const CompanyReviewsWrapper = ({ 
        reviews
    } : { 
        reviews: Review[] | undefined
    }): JSX.Element => {

        console.log("Review?", reviews);
    return (
        <div className="companyReviewsWrapper"> 
            {reviews?.map(review => 
                <CompanyReview key={review.id} review = {review}/>
            )}
        </div>
    )
}


export default CompanyReviewsWrapper;
