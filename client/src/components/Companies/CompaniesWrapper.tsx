// React Libraris
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import OneCompany from './Company';

// Data models 
import { Company } from '../../models/companyModel';

// API services

// CSS styles
import '../../styles/company.css';

// UI Libraries

// Assets

const CompaniesWrapper = ({
        companies
    }: {
        companies: Company[]
    }): JSX.Element => {
    
    return (
        <div className="allCompanyWrapper">
            {companies.map(company =>
                <Link className="oneCompanyWrapper oneCompanyLink" key={company.id} to={`/company/${company.id}`}>
                    <OneCompany key={company.id} company={company}/>
                </Link>
            )}
        </div>
    )
}

export default CompaniesWrapper;