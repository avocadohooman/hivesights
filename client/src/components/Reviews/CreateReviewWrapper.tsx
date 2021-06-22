/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { useHistory } from 'react-router-dom';

// Components

// Data models 

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
      borderColor: '#B979A6',
      background: '#B979A6',
      marginTop: '100px',
      color: 'white',
      '&:hover': {
          color: 'black',
          borderColor: '#B979A6'
      }
    },
  }));

const CreateReviewButton = ({ 
        companyId
    } : { 
        companyId: string
    }): JSX.Element => {

    const history = useHistory();

    const goToReviewCreation = () => {
        history.push(`/review/${companyId}`);
    }
    const classes = useStyles();

    return (
        <Button
        variant="outlined"
        color="primary"
        className={classes.button} 
        onClick={goToReviewCreation}>
            Add A Review
        </Button>
    )
}

export default CreateReviewButton;