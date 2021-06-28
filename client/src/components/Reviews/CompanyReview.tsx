// React Libraris
import React, { useState } from 'react';

// Components
import KeyIndicator from '../KeyIndicators/KeyIndicator';
import Avatar from '../Navbar/Avatar';
import UserName from '../Navbar/UserName';
import ReviewOverall from './ReviewOverall';
import ReviewDate from './ReviewDate';
import ProsConsText from './ProsConsText';
import ReadFullReview from './ReadFullReview';
import ReviewSubRating from './ReviewSubRatings';
import ReviewVoting from './ReviewVoting';
import ReviewHeaders from './ReviewHeader';
import DeleteReview from './DeleteReview';

// Data models 
import { Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';
import { HandleVotingFunction } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/companyReview.css';


// UI Libraries

// Assets

const CompanyReview = ({ 
        review,
        currentUser,
        handleVoting
    } : { 
        review: Review,
        currentUser: User,
        handleVoting: HandleVotingFunction
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
                {currentUser.userName === review.userName && <DeleteReview review={review}/>}
            </div>

            <div className="companyReviewKeyIndicators">
                <KeyIndicator average={false} keyIndicator={review?.salary} label={salaryLabel} />
                <KeyIndicator average={false} keyIndicator={review?.totalRating} label={ratingLabel} />
                <KeyIndicator average={false} keyIndicator={review?.duration} label={durationLabel} />
            </div>

            <div className="companyReviewProsCons">
                <ReviewHeaders header='Pros' color='#8FBC87' size='24px'/>
                <ProsConsText text={review?.pros} />
                <ReviewHeaders header='Cons' color='#D23E41' size='24px' />
                <ProsConsText text={review?.cons} />
            </div>

            <div className="companyReviewSubRatings">
                <ReviewHeaders header='Subcategory Ratings' color='' size='24px'/>
                <ReviewSubRating review={review} />
            </div>

            <div className="companyReviewVotingWrapper">
                <ReviewHeaders header='Was this review helpful' color='' size='20px'/>
                <ReviewVoting handleVoting={handleVoting} currentUser={currentUser} review={review}/>
            </div>
            
            {!expand && <div className="companyReviewHandleExpand">
                <ReadFullReview  handleExpand={handleExpand}/>
            </div>}
        </div>
    )
}

export default CompanyReview;