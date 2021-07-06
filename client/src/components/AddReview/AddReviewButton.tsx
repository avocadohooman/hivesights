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
import { CircularProgress } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';

// Assets

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3, 0, 0),
      borderColor: '#8FBC87',
      background: '#8FBC87',
      marginTop: '100px',
      color: '#343C44',
      '&:hover': {
          color: 'white',
          borderColor: '#8FBC87',
          background: '#8FBC87'
      },
      marginLeft: '30px',
    },
    buttonSuccess: {
        margin: theme.spacing(3, 0, 0),
        borderColor: green[500],
        background: 'white',
        marginTop: '100px',
        marginLeft: '20px',
    },
    buttonProgress: {
        color: '#343C44',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
  }));

const AddReviewButton = ({
        success,
        btnDisabled, 
        handleNewReview
    } : {
        success: boolean, 
        btnDisabled: boolean,
        handleNewReview: HandleAddReviewFunction
    }): JSX.Element => {

    const classes = useStyles();
    return (
        <div>    
            {!success && 
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={btnDisabled}
                    className={classes.button} 
                    onClick={handleNewReview}>
                        Add Review
                    {btnDisabled && <CircularProgress size={24} className={classes.buttonProgress}/>}
                </Button>
            }
            {success && 
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={true}
                    className={classes.buttonSuccess} 
                    onClick={handleNewReview}>
                        <CheckCircleOutlineIcon style={{ color: green[500]}}/>
                </Button>
            }
        </div>
    );
};

export default AddReviewButton;