/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { HandleNewFields, OnChangeEvent } from '../../models/miscModels';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries
import { TextField } from '@material-ui/core';

// Assets

const AddReviewProsCons = ({
    error, 
    errorMessage,
    handleOverallProsCons
} : {
    error : boolean, 
    errorMessage: string,
    handleOverallProsCons: HandleNewFields
}) => {

return (
    <div>
        <TextField
            error={!!error}
            label={errorMessage}
            id="prosCons"
            style={{ margin: 0 }}
            helperText="Min 5 words"
            multiline
            rows={10}
            fullWidth
            variant="filled"
            onChange={(event: OnChangeEvent)=> handleOverallProsCons(event)}
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
        />
    </div>
);
};

export default AddReviewProsCons;