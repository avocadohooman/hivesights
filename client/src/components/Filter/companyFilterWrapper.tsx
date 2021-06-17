import React from 'react';

//Components
import CompanySearch from './companySearch';

// CSS style
import '../../styles/companyFilter.css';

// Data model
import { HandleCompanySearchFunction } from '../../models/miscModels';


const CompanyFilterWrapper = ({
        handleCompanySearch
    }: {
        handleCompanySearch: HandleCompanySearchFunction
    }): JSX.Element => {

    return (
        <div className="compnayFilterWrapper">
            <CompanySearch handleCompanySearch={handleCompanySearch}/>
        </div>
    );
}

export default CompanyFilterWrapper;