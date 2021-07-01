/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';
import { useHistory } from 'react-router-dom';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/addCompany.css';

// UI Libraries
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// Assets

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3, 0, 0),
      borderColor: 'black',
      background: 'transparent',
      marginTop: '0px',
      marginRight: '20px',
      color: 'black',
      '&:hover': {
          color: 'white',
          borderColor: '#B979A6',
          background: '#B979A6'
      }    
    },
  }));

const RouteAddCompanyButton = () => {

    const history = useHistory();

    const goToAddCompanyRoute = () => {
        history.push('/newCompany/');
    };
    const classes = useStyles();

    return (
        <Button
        variant="outlined"
        color="primary"
        className={classes.button} 
        onClick={goToAddCompanyRoute}>
            <AddIcon/>
        </Button>
    );
};

export default RouteAddCompanyButton;