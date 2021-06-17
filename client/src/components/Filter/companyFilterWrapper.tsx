import React from 'react';

//Components
import CompanySearch from './companyCustomSearch';
import CompanySelect from './companyCustomSelect';

// CSS style
import '../../styles/companyFilter.css';

// Data model
import { HandleCompanySearchFunction, HandleCompanySelectFunction, OnChangeEvent } from '../../models/miscModels';
import { SelectionFilter } from '../../models/filterModels';

// JSON for selectOptions
import customSelectOption from './customSelectOptions.json';

const CompanyFilterWrapper = ({
        handleCompanySearch,
        handleCompanySelection
    }: {
        handleCompanySearch: HandleCompanySearchFunction,
        handleCompanySelection: HandleCompanySelectFunction
    }): JSX.Element => {

    const selectOptions = [
        {
            id: 'company-score',
            label: 'Scores',
            options: customSelectOption.score,
            name: 'score',
        },
        {
            id: 'company-salary',
            label: 'Salary',
            options: customSelectOption.salary,
            name: 'salary',
        },
        {
            id: 'company-sort',
            label: 'Sort',
            options: customSelectOption.sorts,
            name: 'sort',
        },
    ];

    return (
        <div className="companyFilterWrapper">
            <CompanySearch handleCompanySearch={handleCompanySearch}/>
            
            {selectOptions.map((select) => (
                <CompanySelect
                    onChange={(event: OnChangeEvent, value: SelectionFilter) => handleCompanySelection(event, value, select.label)}
                    id={select.id} 
                    key={select.id}
                    label={select.label}
                    options={select.options}
                />
            ))}

        </div>
    );
}

export default CompanyFilterWrapper;