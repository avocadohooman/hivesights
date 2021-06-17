import React from 'react';
import { Company } from '../../models/companyModel';
import OneCompany from './Company';
import '../../styles/company.css';
import { Tooltip } from '@material-ui/core';

const CompaniesWrapper = ({
        companies
    }: {
        companies: Company[]
    }): JSX.Element => {
    
    console.log("Companies received", companies);
    return ( 
        <div className="allCompanyWrapper">
            {companies.sort(function(a: Company, b: Company) {
                return b.averageTotalScore - a.averageTotalScore
            }).map(company =>
                <OneCompany key={company.id} company={company}/>
            )}
        </div>
    )
}

export default CompaniesWrapper;