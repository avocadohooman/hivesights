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
      borderColor: '#D23E41',
      background: 'white',
      marginTop: '100px',
      color: 'black',
      '&:hover': {
          color: 'white',
          borderColor: '#D23E41',
          background: '#D23E41'
      }
    },
  }));

const CancelReview = ({ 
        companyId
    } : { 
        companyId: string
    }): JSX.Element => {

    const history = useHistory();

    const cancelReviewCreation = () => {
        history.push(`/company/${companyId}`);
    }

    const classes = useStyles();

    return (
        <Button
        variant="outlined"
        color="primary"
        className={classes.button} 
        onClick={cancelReviewCreation}>
            Cancel
        </Button>
    )
}

export default CancelReview;