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
import { Theme, Tooltip, Typography, withStyles } from '@material-ui/core';

// Assets
import subCategoryToolTips from '../../utils/subCategoryToolTips.json';

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
  
const AddReviewSubCategories = ({ 
        recruitment,
        onboarding,
        mentoring,
        learning,
        perks,
        culture,
        codingPractices,
        handleRecruitment,
        handleOnboarding,
        handleMentoring,
        handleLearning,
        handlePerks,
        handleCulture,
        handleCodingPractices
    } : {
        recruitment: number | undefined,
        onboarding: number | undefined,
        mentoring: number | undefined,
        learning: number | undefined,
        perks: number | undefined,
        culture: number | undefined,
        codingPractices: number | undefined,
        handleRecruitment: HandleNewScores,
        handleOnboarding: HandleNewScores,
        handleMentoring: HandleNewScores,
        handleLearning: HandleNewScores,
        handlePerks: HandleNewScores,
        handleCulture: HandleNewScores,
        handleCodingPractices: HandleNewScores,

    }): JSX.Element => {
    
    return (
        <div>
            <AddReviewFormHeader header='Subcategories' color='#343C44' size='14px'/>
            <HtmlTooltip className="oneCompantSubRatingTooltop" title={subCategoryToolTips.recruitment.text}>
                <Typography className="oneCompanySubRatingLabels"> 
                    Recruitment Process
                    <Rating name="recruitment" defaultValue={recruitment} precision={0.5}   
                        onChange={(event, newValue) => handleRecruitment(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompantSubRatingTooltop" title={subCategoryToolTips.onboarding.text}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Onboarding 
                        <Rating name="onboarding" defaultValue={onboarding} precision={0.5}   
                        onChange={(event, newValue) => handleOnboarding(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompantSubRatingTooltop" title={subCategoryToolTips.mentoring.text}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Mentoring 
                        <Rating name="mentoring" defaultValue={mentoring} precision={0.5}   
                        onChange={(event, newValue) => handleMentoring(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompantSubRatingTooltop" title={subCategoryToolTips.learning.text}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Learning 
                        <Rating name="learning" defaultValue={learning} precision={0.5}   
                        onChange={(event, newValue) => handleLearning(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompantSubRatingTooltop" title={subCategoryToolTips.perks.text}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Perks 
                        <Rating name="perks" defaultValue={perks} precision={0.5}   
                        onChange={(event, newValue) => handlePerks(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompantSubRatingTooltop" title={subCategoryToolTips.culture.text}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Culture 
                        <Rating name="culture" defaultValue={culture} precision={0.5}   
                        onChange={(event, newValue) => handleCulture(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompantSubRatingTooltop" title={subCategoryToolTips.codingPractices.text}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Coding Practices 
                        <Rating name="codingPractices" defaultValue={codingPractices} precision={0.5}   
                        onChange={(event, newValue) => handleCodingPractices(event, newValue)}/>
                </Typography>
            </HtmlTooltip>
        </div>
    )
}

export default AddReviewSubCategories;