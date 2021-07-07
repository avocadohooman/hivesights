// React Libraris
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Components
import OneCompany from './Company';
import NoCompanies from './NoCompanies';

// Data models 
import { Company, SetCompany } from '../../models/companyModel';
import { User } from '../../models/userModel';
import { HandleFilterReset } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/company.css';
import { Skeleton } from '@material-ui/lab';

// UI Libraries

// Assets

// CompaniesWrapper is the parent component for listening all companies 
const CompaniesWrapper = ({
        resetFilter,
        noData,
        companies,
        user
    }: {
        resetFilter: HandleFilterReset,
        noData: boolean,
        companies: Company[],
        user: User
    }): JSX.Element => {
    
    // loadingArray is a mock-up for the Sekelton loading screens
    const loadingArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];

    return (
        <div className="allCompanyWrapper">
            {!noData && companies.length === 0 && loadingArray.map(item =>
                <div key={item.id} className="oneCompanyWrapperSkeleton">
                    <Skeleton  variant="rect" width={370} height={170} />
                </div>
            )}
            {companies.map(company =>
                // creating a Link for each company to the route company/:id
                <Link onClick={resetFilter} className="oneCompanyWrapper oneCompanyLink" key={company.id} to={`/company/${company.id}`}>
                    <OneCompany user={user} key={company.id} company={company}/>
                </Link>
            )}
            {noData && companies.length === 0 && <NoCompanies />}
        </div>
    );
};

export default CompaniesWrapper;