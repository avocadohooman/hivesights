// React Libraris
import React from 'react';

// Components
import CompanyReview from './CompanyReview';

// Data models 
import { Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';
import { HandleVotingFunction } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const CompanyReviewsWrapper = ({ 
        companyId,
        reviews,
        currentUser,
        handleVoting
    } : { 
        companyId: string,
        reviews: Review[],
        currentUser: User
        handleVoting: HandleVotingFunction
    }): JSX.Element => {

    return (
        <div className="companyReviewsWrapper"> 
            {reviews.map(review => 
                <CompanyReview key={review.id} companyId={companyId} currentUser={currentUser} handleVoting={handleVoting} review={review}/>
            )}
        </div>
    );
};


export default CompanyReviewsWrapper;
