// React Libraris
import React from 'react';

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
    
    console.log("Companies received", companies);
    return ( 
        <div className="allCompanyWrapper">
            {companies.map(company =>
                <OneCompany key={company.id} company={company}/>
            )}
        </div>
    )
}

export default CompaniesWrapper;