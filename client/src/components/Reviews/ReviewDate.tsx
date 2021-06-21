/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';

// UI Libraries
import moment from 'moment';

// Assets

const ReviewDate = ({ 
        date
    } : {  
        date: Date | undefined
    }): JSX.Element => {

    const reviewDate = moment(date).format('MMM Do YYYY');

    return (
        <div className="companyReviewDate" >
            {reviewDate}
        </div>
    )
}

export default ReviewDate;