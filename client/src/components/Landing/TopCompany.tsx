// React Libraris
import React, { useState } from 'react';
import { useEffect } from 'react';
import { TopCompany } from '../../models/companyModel';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/landingPage.css';

// UI Libraries
import StarIcon from '@material-ui/icons/Star';

// Assets

const TopCompanyItem = ({topCompany, rank} : {topCompany: TopCompany, rank: number}): JSX.Element => {

    const url = topCompany.companyURL;
    console.log('URL', topCompany);
    return (
        <a className="topCompanyLink" href={`${topCompany.companyURL}`} target="_blank">
            <div className="topCompanyWrapper">
                <div className="topCompanyRank">
                    {rank}. {topCompany.companyName}
                </div>
                <div className="keyIndicatorScore">
                        <StarIcon className="star"/>
                        <div className="topCompanyKeyIndicator">
                            {topCompany.averageTotalScore}
                            <span className="labelSmall">/5</span>
                        </div>
                </div>
                <div className="topCompaniesKpisWrapper">
                    <div style={{marginRight: "15px"}}>{topCompany.reviews} Review(s)</div>
                    <div>{topCompany.averageSalaries}€ Avg. Salary</div>
                </div>
            </div>
        </a>
    )
}

export default TopCompanyItem;