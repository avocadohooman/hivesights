// React Libraris
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import OneCompany from './Company';

// Data models 
import { Company } from '../../models/companyModel';
import { User } from '../../models/userModel';

// API services

// CSS styles
import '../../styles/company.css';

// UI Libraries

// Assets

const CompaniesWrapper = ({
        companies,
        user
    }: {
        companies: Company[],
        user: User
    }): JSX.Element => {
    
    return (
        <div className="allCompanyWrapper">
            {companies.map(company =>
                <Link className="oneCompanyWrapper oneCompanyLink" key={company.id} to={`/company/${company.id}`}>
                    <OneCompany user={user} key={company.id} company={company}/>
                </Link>
            )}
        </div>
    )
}

export default CompaniesWrapper;