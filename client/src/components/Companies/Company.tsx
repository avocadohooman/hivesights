// React Libraris
import React from 'react';
// Components

// Data models 
import { Company } from '../../models/companyModel';
import { User } from '../../models/userModel';

// API services
import companyApi from '../../services/companyApi';
// CSS styles
import '../../styles/company.css';
// UI Libraries
import StarIcon from '@material-ui/icons/Star';

// Assets

const OneCompany = ({
        company,
        user
    }:{
        company: Company,
        user: User
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
        <div>
            <div className="oneCompanyLogoWrapper">
                <img className="oneCompanyLogo" src={company.logoURL}></img>

                <div className="oneCompanyName">
                    {company.companyName}
                </div>
  
                <div className="oneCompanyScoreWrapper">
                    {company.averageTotalScore && 
                    <div className="oneCompanyScore">
                    <StarIcon className="star"/> 
                    {company.averageTotalScore}
                    
                    </div>}   
                    {company.averageTotalScore === null && <div className="oneCompanyScoreEmpty">n/A</div>}   
                </div>
            </div>
            
            <div className="oneCompanyKeyInfoWrapper">
                <div>{company.reviews} <div>Review(s)</div></div>
                <div>{company.averageSalaries} €<div>Avg. Salary</div></div>
                <div>{company.averageDuration} Months<div>Avg. Duration</div></div>
            </div>
        </div>
    )
}

export default OneCompany;