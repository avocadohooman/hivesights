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
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import { Tooltip } from '@material-ui/core';

// Assets


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
                    <Typography className="oneCompanySubRatingHeader">{company[0].companyName} Sub-Ratings</Typography>
                </AccordionSummary>
                <AccordionDetails className="oneCompanySubRatingWrapper">
                    
                    <Typography className="oneCompanySubRatingLabels"> 
                            Recruitment Process 
                            <Tooltip className="oneCompantSubRatingTooltop" title={company[0].averageInterviewScore} placement="top">
                                <div>
                                    <Rating name="read-only" value={company[0].averageInterviewScore} readOnly />
                                </div>
                            </Tooltip>
                    </Typography>

                    <Typography className="oneCompanySubRatingLabels"> 
                            Onboarding 
                            <Tooltip className="oneCompantSubRatingTooltop" title={company[0].averageOnboardingScore} placement="top">
                                <div>
                                    <Rating name="read-only" value={company[0].averageInterviewScore} readOnly />
                                </div>
                            </Tooltip>
                    </Typography>

                    <Typography className="oneCompanySubRatingLabels"> 
                            Mentoring 
                            <Tooltip className="oneCompantSubRatingTooltop" title={company[0].averageSupervisionScore} placement="top">
                                <div>
                                    <Rating name="read-only" value={company[0].averageSupervisionScore} readOnly />
                                </div>
                            </Tooltip>
                    </Typography>

                    <Typography className="oneCompanySubRatingLabels"> 
                            Learning 
                            <Tooltip className="oneCompantSubRatingTooltop" title={company[0].averageLearningScore} placement="top">
                                <div>
                                    <Rating name="read-only" value={company[0].averageLearningScore} readOnly />
                                </div>
                            </Tooltip>
                    </Typography>

                    <Typography className="oneCompanySubRatingLabels"> 
                            Perks 
                            <Tooltip className="oneCompantSubRatingTooltop" title={company[0].averagePerksScore} placement="top">
                                <div>
                                    <Rating name="read-only" value={company[0].averagePerksScore} readOnly />
                                </div>
                            </Tooltip>
                    </Typography>

                    <Typography className="oneCompanySubRatingLabels"> 
                            Culture 
                            <Tooltip className="oneCompantSubRatingTooltop" title={company[0].averageCultureScore} placement="top">
                                <div>
                                    <Rating name="read-only" value={company[0].averageCultureScore} readOnly />
                                </div>
                            </Tooltip>
                    </Typography>

                    <Typography className="oneCompanySubRatingLabels"> 
                            Coding Practices 
                            <Tooltip className="oneCompantSubRatingTooltop" title={company[0].averageCodingPracticesScore} placement="top">
                                <div>
                                    <Rating name="read-only" value={company[0].averageCodingPracticesScore} readOnly />
                                </div>
                            </Tooltip>
                    </Typography>


                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default CompanySubRatings;