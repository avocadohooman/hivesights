// React Libraris
import React from 'react';
// Components

// Data models 
import { Company } from '../../models/companyModel';
// API services

// CSS styles
import '../../styles/company.css';
// UI Libraries
import { Tooltip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

// Assets

const OneCompany = ({
        company
    }:{
        company: Company
    }):JSX.Element => {

    const scoreStyle = {
        fontSize: '14px',
    }
    if (!company.averageDuration) {
        company.averageDuration = 0;
    }
    if (!company.averageSalaries) {
        company.averageSalaries = 0;
    }
    if (!company.reviews) {
        company.reviews = 0;
    }
    return (
        <Tooltip title="Click to read more or submit a review"> 
            <div>
                <div className="oneCompanyLogoWrapper">
                    <img className="oneCompanyLogo" src={company.logoURL}></img>

                    <div className="oneCompanyName">
                        {company.companyName}
                    </div>
                    <div className="oneCompanyScoreWrapper">
                        {company.averageTotalScore && 
                        <div className="oneCompanyScore"> {company.averageTotalScore}<span style={scoreStyle}>/5</span>
                        </div>}   
                        {company.averageTotalScore === null && <div className="oneCompanyScore">n/A</div>}   
                    </div>
                </div>
                
                <div className="oneCompanyKeyInfoWrapper">
                    <div>{company.reviews} <div>Review(s)</div></div>
                    <div>{company.averageSalaries} €<div>Avg. Salary</div></div>
                    <div>{company.averageDuration} Months<div>Avg. Duration</div></div>
                </div>
            </div>
        </Tooltip>
    )
}

export default OneCompany;