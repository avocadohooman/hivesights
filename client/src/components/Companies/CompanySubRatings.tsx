// React Libraris
import React from 'react';

// Components

// Data models 
import { Company } from '../../models/companyModel';

// API services

// CSS styles
import '../../styles/company.css';
import '../../styles/companyDetailView.css'

// UI Libraries
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

const CompanySubRatings = ({
        company
    } : {
        company: Company[]
    }): JSX.Element => {

    
    return (
        <div>
            <Accordion className="oneCompanySubRating">
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className="oneCompanySubRatingHeader">{company[0].companyName} - Average Subcategory Ratings</Typography>
                </AccordionSummary>
                <AccordionDetails className="oneCompanySubRatingWrapper">
                    
                    <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.recruitment.info}>
                        <Typography className="oneCompanySubRatingLabels"> 
                            Recruitment Process
                                <Rating name="read-only" value={company[0].averageInterviewScore} precision={0.5} readOnly />
                        </Typography>
                    </HtmlTooltip> 

                    <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.onboarding.info}>
                        <Typography className="oneCompanySubRatingLabels"> 
                                Onboarding 
                                <Rating name="read-only" value={company[0].averageOnboardingScore} precision={0.5} readOnly />
                        </Typography>
                    </HtmlTooltip> 

                    <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.mentoring.info}>
                        <Typography className="oneCompanySubRatingLabels"> 
                                Mentoring 
                                <Rating name="read-only" value={company[0].averageSupervisionScore} precision={0.5} readOnly />
                        </Typography>
                    </HtmlTooltip> 

                    <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.learning.info}>
                        <Typography className="oneCompanySubRatingLabels"> 
                                Learning 
                                <Rating name="read-only" value={company[0].averageLearningScore} precision={0.5} readOnly />
                        </Typography>
                    </HtmlTooltip> 

                    <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.perks.info}>
                        <Typography className="oneCompanySubRatingLabels"> 
                                Perks 
                                <Rating name="read-only" value={company[0].averagePerksScore} precision={0.5} readOnly />
                        </Typography>
                    </HtmlTooltip> 

                    <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.culture.info}>
                        <Typography className="oneCompanySubRatingLabels"> 
                                Culture 
                                <Rating name="read-only" value={company[0].averageCultureScore} precision={0.5} readOnly />
                        </Typography>
                    </HtmlTooltip> 

                    <HtmlTooltip className="oneCompanySubRatingTooltip" title={subCategoryToolTips.codingPractices.info}>
                        <Typography className="oneCompanySubRatingLabels"> 
                                Coding Practices 
                                <Rating name="read-only" value={company[0].averageCodingPracticesScore} precision={0.5} readOnly />
                        </Typography>
                    </HtmlTooltip> 


                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default CompanySubRatings;