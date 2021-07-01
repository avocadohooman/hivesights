/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { HandleNewDuration, HandleNewScores, OnChangeEvent, OnChangeEventSelect } from '../../models/miscModels';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';
import AddReviewFormHeader from './AddReviewFormHeader';

// UI Libraries
import { createStyles, FormControl, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const AddReviewDuration = ({ 
        duration,
        handleDuration
    } : {  
        duration: number,
        handleDuration: HandleNewDuration
    }) => {
    const classes = useStyles();
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <Select
            labelId="duration"
            id="duration"
            value={duration}
              onChange={(event:OnChangeEventSelect, value) => handleDuration(value)}
            >
                <MenuItem value={1}>1 Month</MenuItem>
                <MenuItem value={2}>2 Months</MenuItem>
                <MenuItem value={3}>3 Months</MenuItem>
                <MenuItem value={4}>4 Months</MenuItem>
                <MenuItem value={5}>5 Months</MenuItem>
                <MenuItem value={6}>6 Months</MenuItem>
                <MenuItem value={7}>7 Months</MenuItem>
                <MenuItem value={8}>8 Months</MenuItem>
                <MenuItem value={9}>9 Months</MenuItem>
                <MenuItem value={10}>10 Months</MenuItem>
                <MenuItem value={11}>11 Months</MenuItem>
                <MenuItem value={12}>12 Months</MenuItem>
            </Select>
      </FormControl>
    );
};

export default AddReviewDuration;