/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 
import { HandleAddReviewFunction } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/createReview.css';

// UI Libraries
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Assets

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3, 0, 0),
      borderColor: '#8FBC87',
      background: '#8FBC87',
      marginTop: '100px',
      color: 'black',
      '&:hover': {
          color: 'white',
          borderColor: '#8FBC87',
          background: '#8FBC87'
      },
      marginLeft: '30px',
    },
  }));

const AddReviewButton = ({ 
        handleNewReview
    } : { 
        handleNewReview: HandleAddReviewFunction
    }): JSX.Element => {


    const classes = useStyles();

    return (
        <Button
        variant="outlined"
        color="primary"
        className={classes.button} 
        onClick={handleNewReview}>
            Add Review
        </Button>
    )
}

export default AddReviewButton;