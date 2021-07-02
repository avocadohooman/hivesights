// React Libraris
import React from 'react';

// Components
import CompanyReview from './CompanyReview';

// Data models 
import { Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';
import { HandleReviewDeleteFunction, HandleVotingFunction } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const CompanyReviewsWrapper = ({ 
        reviews,
        currentUser,
        handleVoting,
        handleReviewDelete
    } : { 
        reviews: Review[],
        currentUser: User
        handleVoting: HandleVotingFunction,
        handleReviewDelete: HandleReviewDeleteFunction
    }): JSX.Element => {

    return (
        <div className="companyReviewsWrapper"> 
            {reviews.map(review => 
                <CompanyReview 
                key={review.id} 
                currentUser={currentUser} 
                handleVoting={handleVoting} 
                handleReviewDelete={handleReviewDelete}
                review={review}/>
            )}
        </div>
    );
};


export default CompanyReviewsWrapper;
