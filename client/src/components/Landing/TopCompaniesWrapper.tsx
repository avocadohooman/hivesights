// React Libraris
import React from 'react';
import { TopCompany } from '../../models/companyModel';

// Components
import TopCompanyItem from './TopCompany';
import AddReviewFormHeader from '../AddCompany/AddCompanyFormHeader';

// Data models 

// API services

// CSS styles
import '../../styles/topCompanies.css';

// UI Libraries

// Assets

const TopCompanies = ({topCompanies} : {topCompanies: TopCompany[]}): JSX.Element => {
    let rank = 1;
    const topCompaniesHeader = 'Hiver\'s Top Rated Internship Companies';
    return (
        <div className="topCompaniesWrapper">
            <div className="topCompaniesHeader">
                    {topCompaniesHeader}
            </div>
            {topCompanies.map(company =>
                <TopCompanyItem key={company.companyName} topCompany={company} rank={rank++}/>
            )}
        </div>
    )
}

export default TopCompanies;