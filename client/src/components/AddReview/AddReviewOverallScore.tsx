/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components
import AddReviewFormHeader from './AddReviewFormHeader';

// Data models 

// API services

// CSS styles
import '../../styles/addReview.css';

// UI Libraries
import { Rating } from '@material-ui/lab';
import { HandleNewScores } from '../../models/miscModels';

// Assets

const AddReviewOverallScore = ({
        value, 
        handleOverallScore
    } : {
        value: number | undefined,
        handleOverallScore: HandleNewScores
    }): JSX.Element => {


    return (
        <div className="companyAddReviewOverallScore">
            <AddReviewFormHeader header='Overall Rating' color='#343C44' size='14px'/>
            <Rating name="overallScore" value={value} precision={0.5} size="large"  
                        onChange={(event, newValue) => handleOverallScore(event, newValue)}/>
        </div>
    )
}


export default AddReviewOverallScore;