/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 
import { Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets
import { ReactComponent as ThumbsUp } from '../../assets/thumbsUp.svg';
import { ReactComponent as ThumbsDown } from '../../assets/thumbsDown.svg';


const ReviewVoting = ({ 
        review,
        currentUser
    } : { 
        review: Review,
        currentUser: User
    }) => {

    let votes = review.upVotes - review.downVotes;
    if (votes < 0) {
        votes = 0;
    }
    const totalVotesLabel = `${votes} students found this review helpful`;
    const hasUserUpVoted = review.upVoteUsers.find(user => user === currentUser.userName);
    const hasUserDownVoted = review.downVoteUsers.find(user => user === currentUser.userName);

    return (
        <div className="companyReviewVoting">
            <div className="companyReviewThumbsWrapper">
                {hasUserUpVoted && 
                    <div className="companyReviewThumbsUpVoted">
                        <ThumbsUp className="companyReviewThumbsUpVotedSvg" /> Yes
                    </div>
                }
                {!hasUserUpVoted && 
                    <div className="companyReviewThumbs">
                        <ThumbsUp/> Yes
                    </div>
                }

                {hasUserDownVoted && 
                    <div className="companyReviewThumbsDownVoted">
                        <ThumbsDown className="companyReviewThumbsDownVotedSvg" /> Yes
                    </div>
                }
                {!hasUserDownVoted && 
                    <div className="companyReviewThumbs">
                        <ThumbsDown/> No
                    </div>
                }
            </div>

            <div className="companyReviewsTotalVotes"> 
                {totalVotesLabel}
            </div>
        </div>
    )
}

export default ReviewVoting;