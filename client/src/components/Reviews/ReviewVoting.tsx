/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React, { useState } from 'react';

// Components

// Data models 
import { Review } from '../../models/reviewModel';
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

    
    const [hasUserUpVoted, setUserUpVote] = useState(review.upVoteUsers.find(user => user === currentUser.userName));
    const [hasUserDownVoted, setUserDownVote] = useState(review.downVoteUsers.find(user => user === currentUser.userName));
    
    const getVotes = (totalVotes: number) : number => {
        if (totalVotes >= 0) {
            return totalVotes;
        }
        return 0;
    }
    const [votes, setVotes] = useState<number>(getVotes(review.upVotes - review.downVotes));

    const handleUpVote = () => {
        const updatedReview: Review = {...review};
        updatedReview.upVoteUsers.push(currentUser.userName);
        updatedReview.upVotes += 1;
        if (updatedReview.downVoteUsers.find(user => user === currentUser.userName)) {
            updatedReview.downVoteUsers = updatedReview.downVoteUsers.filter(user => user !== currentUser.userName);
            if (updatedReview.downVotes > 0) {
                updatedReview.downVotes -= 1;
            }
        }
        setUserDownVote(updatedReview.downVoteUsers.find(user => user === currentUser.userName));
        setUserUpVote(updatedReview.upVoteUsers.find(user => user === currentUser.userName));
        setVotes(getVotes(updatedReview.upVotes - updatedReview.downVotes));
        handleVoting(review.id, updatedReview);
    }

    const handleDownVote = () => {
        const updatedReview: Review = {...review};
        updatedReview.downVoteUsers.push(currentUser.userName);
        updatedReview.downVotes += 1;
        if (updatedReview.upVoteUsers.find(user => user === currentUser.userName)) {
            updatedReview.upVoteUsers = updatedReview.upVoteUsers.filter(user => user !== currentUser.userName);
            if (updatedReview.upVotes > 0) {
                updatedReview.upVotes -= 1;
            }
        }
        setUserUpVote(updatedReview.upVoteUsers.find(user => user === currentUser.userName));
        setUserDownVote(updatedReview.downVoteUsers.find(user => user === currentUser.userName));
        setVotes(getVotes(updatedReview.upVotes - updatedReview.downVotes));
        handleVoting(review.id, updatedReview);
    }

    const totalVotesLabel = `${votes} student(s) found this review helpful`;

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