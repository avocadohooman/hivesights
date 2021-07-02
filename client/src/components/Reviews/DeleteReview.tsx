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

// Assets

const DeleteReview = ({ 
        companyId,
        review,
    } : {  
        companyId: string,
        review: Review,
    }): JSX.Element => {

    const history = useHistory();

    const handleDelete = async () =>{
        try {
            await reviewApi.deleteReview(review.id);
            history.push(`/`);
        } catch (error: any) {
            console.log("Error", error.response.data.message);
        }
    };
    return (
            <div>
                <IconButton onClick={handleDelete} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
    );
};

export default DeleteReview;