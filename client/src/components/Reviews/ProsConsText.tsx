/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries

// Assets

const ProConstText = ({ 
        text
    } : {  
        text: string | undefined
    }): JSX.Element => {



    return (
        <div className="companyReviewProConstText" >
            {text}
        </div>
    );
};

export default ProConstText;