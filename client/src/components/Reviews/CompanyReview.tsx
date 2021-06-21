// React Libraris
import React, { useState } from 'react';

// Components
import KeyIndicator from '../KeyIndicators/KeyIndicator';
import Avatar from '../Navbar/Avatar';
import UserName from '../Navbar/UserName';
import ReviewOverall from './ReviewOverall';
import ReviewDate from './ReviewDate';
import ProsConsHeader from './ProsConsHeader';
import ProsConsText from './ProsConsText';
import ReadFullReview from './ReadFullReview';
import ReviewSubRating from './ReviewSubRatings';
import ReviewSubRatingHeader from './SubCategoryRaingsHeader';

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

    const [expand, setExpand] = useState(false);

    const durationLabel = 'Duration';
    const salaryLabel = 'Salary';
    const ratingLabel = 'Total Score';

    const handleExpand = () => {
        setExpand(prevCheck => !prevCheck);
    }

    return (
        <div className={expand === false ? 'companyReview' : 'companyReviewExpand'}>
            <div className="companyReviewOverallSection">
                <Avatar size='m' avatarImageUrl={review?.userPicture} />
                <UserName userName={review?.userName}/>
                <ReviewOverall overall={review?.overall} />
                <ReviewDate date={review?.publishedDate}/>
            </div>

            <div className="companyReviewKeyIndicators">
                <KeyIndicator average={false} keyIndicator={review?.salary} label={salaryLabel} />
                <KeyIndicator average={false} keyIndicator={review?.totalRating} label={ratingLabel} />
                <KeyIndicator average={false} keyIndicator={review?.duration} label={durationLabel} />
            </div>

            <div className="companyReviewProsCons">
                <ProsConsHeader label='pro' />
                <ProsConsText text={review?.pros} />
                <ProsConsHeader label='cons' />
                <ProsConsText text={review?.cons} />
            </div>

            <div className="companyReviewSubRatings">
                <ReviewSubRatingHeader label='Subcategory Ratings'/>
                <ReviewSubRating review={review} />
            </div>

            {!expand && <div className="companyReviewHandleExpand">
                <ReadFullReview  handleExpand={handleExpand}/>
            </div>}
        </div>
    )
}

export default CompanyReview;