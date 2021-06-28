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

const AddCompanyField = ({
        handleCompanyfield
    } : {
        handleCompanyfield: HandleNewFields
    }) => {

    return (
        <div>
            <TextField
                id="overallHeader"
                style={{ margin: 0 }}
                helperText="Max 120 characters"
                fullWidth
                variant="filled"
                onChange={(event: OnChangeEvent)=> handleCompanyfield(event)}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    )
}

export default AddCompanyField;