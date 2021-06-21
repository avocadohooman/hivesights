// React Libraris
import React from 'react';

// Components
import KeyIndicator from '../KeyIndicators/KeyIndicator';

// Data models 
import { Review } from '../../models/reviewModel';

// API services

// CSS styles
import '../../styles/companyReview.css';
import Avatar from '../Navbar/Avatar';
import UserName from '../Navbar/UserName';
import ReviewOverall from './ReviewOverall';

// UI Libraries

// Assets

const CompanyReview = ({ 
        review
    } : { 
        review: Review | undefined
    }): JSX.Element => {

    const durationLabel = 'Duration';
    const salaryLabel = 'Salary';
    const ratingLabel = 'Total Score';

    return (
        <div className="companyReview">
            <div className="companyReviewOverallSection">
                <Avatar size='m' avatarImageUrl={review?.userPicture} />
                <UserName userName={review?.userName}/>
                <ReviewOverall overall={review?.overall} />
            </div>

            <div className="companyReviewKeyIndicators">
                <KeyIndicator average={false} keyIndicator={review?.salary} label={salaryLabel} />
                <KeyIndicator average={false} keyIndicator={review?.totalRating} label={ratingLabel} />
                <KeyIndicator average={false} keyIndicator={review?.duration} label={durationLabel} />
            </div>
        
        </div>
    )
}

export default CompanyReview;