/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/addReview.css';

// UI Libraries
import { Rating } from '@material-ui/lab';

// Assets

const AddReviewFormHeader = ({ 
        header,
        color,
        size
    } : {  
        header: string,
        color: string,
        size: string
    }): JSX.Element => {
    
    const headerColor = {
        color: `${color}`,
        fontSize: `${size}`
    };
    return (
        <div className="companyAddReviewFormHeader" style={headerColor}>{header}</div>
    )
}


export default AddReviewFormHeader;