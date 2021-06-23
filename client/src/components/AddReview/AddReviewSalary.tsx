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
import Input from '@material-ui/core/Input';

// Assets

const AddReviewSalary = ({
        error, 
        errorMessage,
        handleSalary,
        salary
    } : {
        error : boolean, 
        errorMessage: string,
        handleSalary: HandleNewFields,
        salary: number
    }) => {

    return (
        <div>
            <TextField
                label={errorMessage}
                type="number" inputProps={{ min: "0", step: "1" }} 
                id="overallHeader"
                style={{ margin: 0, width: 150}}
                error = {salary < 1 || !!error}
                helperText={ salary < 1 ? 'Min. 1' : 'Salary in €' }
                fullWidth
                variant="filled"
                onChange={(event: OnChangeEvent)=> handleSalary(event)}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    )
}

export default AddReviewSalary;