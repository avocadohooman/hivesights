/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { useHistory } from 'react-router-dom';

// Components

// Data models 
import { User } from '../../models/userModel';

// API services

// CSS styles
import '../../styles/createReview.css';

// UI Libraries
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// Assets

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3, 0, 0),
      borderColor: '#B979A6',
      background: '#B979A6',
      marginTop: '100px',
      color: 'white',
      '&:hover': {
          color: '#343C44',
          borderColor: '#B979A6'
      }
    },
    buttonDisable: {
        margin: theme.spacing(3, 0, 0),
        borderColor: 'grey',
        background: 'grey',
        marginTop: '100px',
        color: 'white',
        '&:hover': {
            color: '#343C44',
            borderColor: 'grey'
        }
      },
  }));

const CreateReviewButton = ({ 
        companyId,
        currentUser
    } : { 
        companyId: string,
        currentUser: User
    }): JSX.Element => {

    const history = useHistory();

    const goToReviewCreation = () => {
        history.push(`/review/${companyId}`);
    };
    const classes = useStyles();

    return (
        <div>
        {currentUser.internshipValidated &&
            <Button
            variant="outlined"
            color="primary"
            className={classes.button} 
            onClick={goToReviewCreation}>
                Add A Review
            </Button>
        }

        {!currentUser.internshipValidated &&
            <div>
                <Button
                variant="outlined"
                color="primary"
                className={classes.buttonDisable} 
                >
                    Add A Review (disabled) 
                </Button>
            </div>
        }
        </div>

    );
};

export default CreateReviewButton;