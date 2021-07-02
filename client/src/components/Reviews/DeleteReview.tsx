/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { useHistory } from 'react-router';
// Components

// Data models 
import { Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';

// API services
import reviewApi from '../../services/reviewApi';

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { HandleReviewDeleteFunction } from '../../models/miscModels';

// Assets

const DeleteReview = ({ 
        review,
        handleReviewDelete
    } : {  
        review: Review,
        handleReviewDelete: HandleReviewDeleteFunction
    }): JSX.Element => {

    return (
            <div>
                <IconButton onClick={(event) => handleReviewDelete(review.id)} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
    );
};

export default DeleteReview;