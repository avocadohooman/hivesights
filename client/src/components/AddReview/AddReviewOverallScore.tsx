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
import { Theme, Tooltip, withStyles } from '@material-ui/core';

// Assets
import subCategoryToolTips from '../../utils/ratingToolTips.json';

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(15),
      border: '1px solid #dadde9',
      cursor: 'pointer',
    },
  }))(Tooltip);
  
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
            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.overall.reviewGuideline}>
            <Rating name="overallScore" value={value} precision={1} size="large"  
                        onChange={(event, newValue) => handleOverallScore(event, newValue)}/>
            </HtmlTooltip>
        </div>
    );
};


export default AddReviewOverallScore;