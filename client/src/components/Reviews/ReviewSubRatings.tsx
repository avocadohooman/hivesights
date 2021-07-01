/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components
import { Review } from '../../models/reviewModel';

// Data models 

// API services

// CSS styles
import '../../styles/companyReview.css';
import '../../styles/company.css';
import '../../styles/companyDetailView.css';

// UI Libraries
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
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

const ReviewSubRating = ({ 
        review
    } : { 
        review: Review
    }) => {
    return (
        <div>
            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.recruitment.info}>
                <Typography className="oneCompanySubRatingLabels"> 
                    Recruitment Process
                        <Rating name="read-only" value={review.ratingCriteriaInterview} precision={0.5} readOnly />
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.onboarding.info}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Onboarding 
                        <Rating name="read-only" value={review.ratingCriteriaOnboarding} precision={0.5} readOnly />
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.mentoring.info}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Mentoring 
                        <Rating name="read-only" value={review.ratingCriteriaSupervision} precision={0.5} readOnly />
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.learning.info}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Learning 
                        <Rating name="read-only" value={review.ratingCriteriaLearning} precision={0.5} readOnly />
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.perks.info}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Perks 
                        <Rating name="read-only" value={review.ratingCriteriaPerks} precision={0.5} readOnly />
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.culture.info}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Culture 
                        <Rating name="read-only" value={review.ratingCriteriaCulture} precision={0.5} readOnly />
                </Typography>
            </HtmlTooltip> 

            <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.codingPractices.info}>
                <Typography className="oneCompanySubRatingLabels"> 
                        Coding Practices 
                        <Rating name="read-only" value={review.ratingCriteriaCodingPractices} precision={0.5} readOnly />
                </Typography>
            </HtmlTooltip>
        </div>
    );
};

export default ReviewSubRating;