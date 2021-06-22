/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 
import { NewReview, Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';
import { HandleVotingFunction } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets
import { ReactComponent as ThumbsUp } from '../../assets/thumbsUp.svg';
import { ReactComponent as ThumbsDown } from '../../assets/thumbsDown.svg';


const ReviewVoting = ({ 
        review,
        currentUser,
        handleVoting
    } : { 
        review: Review,
        currentUser: User,
        handleVoting: HandleVotingFunction
    }) => {

    let votes = review.upVotes - review.downVotes;
    if (votes < 0) {
        votes = 0;
    }
    const totalVotesLabel = `${votes} students found this review helpful`;
    const hasUserUpVoted = review.upVoteUsers.find(user => user === currentUser.userName);
    const hasUserDownVoted = review.downVoteUsers.find(user => user === currentUser.userName);

    const handleUpVote = async () => {
        console.log('Handling Up Vote');
        const updatedReview: Review = {...review};
        updatedReview.upVoteUsers.push(currentUser.userName);
        updatedReview.upVotes += 1;
        if (updatedReview.downVoteUsers.find(user => user === currentUser.userName)) {
            updatedReview.downVoteUsers = updatedReview.downVoteUsers.filter(user => user !== currentUser.userName);
            updatedReview.downVotes -= 1;
        }
        console.log('Handling Up Vote - Updated Review', updatedReview);
        handleVoting(review.id, updatedReview);
    }

    const handleDownVote = async () => {
        const updatedReview: Review = {...review};
        updatedReview.downVoteUsers.push(currentUser.userName);
        updatedReview.downVotes += 1;
        if (updatedReview.upVoteUsers.find(user => user === currentUser.userName)) {
            updatedReview.upVoteUsers = updatedReview.upVoteUsers.filter(user => user !== currentUser.userName);
            updatedReview.upVotes -= 1;
        }
        handleVoting(review.id, updatedReview);
    }

    return (
        <div className="companyReviewVoting">
            <div className="companyReviewThumbsWrapper">
                {hasUserUpVoted && 
                    <div className="companyReviewThumbsUpVoted">
                        <ThumbsUp className="companyReviewThumbsUpVotedSvg" /> Yes
                    </div>
                }
                {!hasUserUpVoted && 
                    <div onClick={handleUpVote} className="companyReviewThumbs">
                        <ThumbsUp/> Yes
                    </div>
                }

                {hasUserDownVoted && 
                    <div className="companyReviewThumbsDownVoted">
                        <ThumbsDown className="companyReviewThumbsDownVotedSvg" /> No
                    </div>
                }
                {!hasUserDownVoted && 
                    <div onClick={handleDownVote} className="companyReviewThumbs">
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