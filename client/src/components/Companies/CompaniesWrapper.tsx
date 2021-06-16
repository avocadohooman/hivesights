import React from 'react';
import { Company } from '../../models/companyModel';
import OneCompany from './Company';
import '../../styles/company.css';

const CompaniesWrapper = ({
        companies
    }: {
        companies: Company[]
    }): JSX.Element => {

    return ( 
        <div className="allCompanyWrapper">
            {companies.map(company => 
                <OneCompany key={company.id} company={company}/>)}
        </div>
    )
}

export default CompaniesWrapper;