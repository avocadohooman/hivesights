/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components


// Data models 

// API services

// CSS styles
import '../../styles/addReview.css';

// UI Libraries

// Assets
import infoText from './infoText.json';

const AddReviewInfoText = () => {

    return (
        <div>
            <div className="addReviewInfoTextHeader">
                {infoText.info.header}
            </div>

            <div className="addReviewInfoTextRegular">
                {infoText.info.intro}
            </div>

            <div className="addReviewInfoTextEmphasize">
                {infoText.info.callToHonesty}
            </div>

            <div className="addReviewInfoTextRegular">
                <li>{infoText.info.bulletOne}</li>
                <li>{infoText.info.bulletTwo}</li>
                <li>{infoText.info.bulletThree}</li>
            </div>

            <div className="addReviewInfoTextRegular">
                {infoText.info.outro}
            </div>
        </div>
    )
}

export default AddReviewInfoText;