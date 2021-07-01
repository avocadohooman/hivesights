/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { HandleNewFields, OnChangeEvent } from '../../models/miscModels';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';
import AddReviewFormHeader from './AddReviewFormHeader';

// UI Libraries
import { TextField } from '@material-ui/core';

// Assets

const AddReaviewHeadline = ({
        error, 
        errorMessage,
        handleOverallHeadline
    } : {
        error : boolean, 
        errorMessage: string,
        handleOverallHeadline: HandleNewFields
    }) => {

    return (
        <div>
            <AddReviewFormHeader header='Review Headline' color='#343C44' size='14px'/>
            <TextField
                error={!!error}
                label={errorMessage}
                id="overallHeader"
                style={{ margin: 0 }}
                helperText="Max 120 characters"
                fullWidth
                variant="filled"
                onChange={(event: OnChangeEvent)=> handleOverallHeadline(event)}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};

export default AddReaviewHeadline;