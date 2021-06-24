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
            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.recruitment.reviewGuideline}>
                <Typography className="oneCompanySubRatingLabels"> 
                    Recruitment Process
                    <Rating name="recruitment" value={recruitment} precision={1}   
                        onChange={(event, newValue) => handleRecruitment(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.onboarding.reviewGuideline}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Onboarding 
                        <Rating name="onboarding" value={onboarding} precision={1}   
                        onChange={(event, newValue) => handleOnboarding(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.mentoring.reviewGuideline}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Mentoring 
                        <Rating name="mentoring" value={mentoring} precision={1}   
                        onChange={(event, newValue) => handleMentoring(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.learning.reviewGuideline}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Learning 
                        <Rating name="learning" value={learning} precision={1}   
                        onChange={(event, newValue) => handleLearning(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.perks.reviewGuideline}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Perks 
                        <Rating name="perks" value={perks} precision={1}   
                        onChange={(event, newValue) => handlePerks(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.culture.reviewGuideline}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Culture 
                        <Rating name="culture" value={culture} precision={1}   
                        onChange={(event, newValue) => handleCulture(event, newValue)}/>
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.codingPractices.reviewGuideline}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Coding Practices 
                        <Rating name="codingPractices" value={codingPractices} precision={1}   
                        onChange={(event, newValue) => handleCodingPractices(event, newValue)}/>
                </Typography>
            </HtmlTooltip>
        </div>
    )
}

export default AddReviewSubCategories;