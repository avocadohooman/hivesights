import React from 'react';
import { Company } from '../../models/companyModel';
import '../../styles/company.css';

const OneCompany = ({
        company
    }:{
        company: Company
    }):JSX.Element => {

    const scoreStyle = {
        fontSize: '18px',
    }

    if (!company.averageDuration) {
        company.averageDuration = 0;
    }
    return (
        <div className="oneCompanyWrapper">

            <div className="oneCompanyLogoWrapper">
                <img className="oneCompanyLogo" src={company.logoURL}></img>

                <div className="oneCompanyName">
                    {company.companyName}
                </div>
                <div className="oneCompanyScoreWrapper">
                    <div className="oneCompanyScore"> {company.averageTotalScore}<span style={scoreStyle}>/5</span></div>    
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