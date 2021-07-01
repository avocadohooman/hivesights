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

// API services

// CSS styles
import '../../styles/company.css';
import { Skeleton } from '@material-ui/lab';

// UI Libraries

// Assets

const CompaniesWrapper = ({
        companies,
        user
    }: {
        companies: Company[],
        user: User
    }): JSX.Element => {
    
    const loadingArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];
    const [noData, setNoData] = useState<boolean>(false);

    setTimeout(() => {
        if (!companies || companies.length === 0) {
            setNoData(true);
        }
    }, 5000);

    return (
        <div className="allCompanyWrapper">
            {!noData && companies.length === 0 && loadingArray.map(item =><div key={item.id} className="oneCompanyWrapperSkeleton"><Skeleton  variant="rect" width={370} height={170} /></div>)}
            {!noData && companies.map(company =>
                <Link className="oneCompanyWrapper oneCompanyLink" key={company.id} to={`/company/${company.id}`}>
                    <OneCompany user={user} key={company.id} company={company}/>
                </Link>
            )}
            {noData && <NoCompanies />}
        </div>
    );
};

export default CompaniesWrapper;