import React from 'react';

//Components
import CompanySearch from './companyCustomSearch';
import CompanySelect from './companyCustomSelect';

// CSS style
import '../../styles/companyFilter.css';

// Data model
import { HandleCompanySearchFunction, HandleCompanySelectFunction } from '../../models/miscModels';

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
            options: customSelectOption.score.map((score: any) => {
                return { title: (score.title), averageSalaries: score.averageSalaries };
            }),
            name: 'score',
        },
        {
            id: 'company-salary',
            label: 'Salary',
            options: customSelectOption.salary.map((salary) => {
            return { title: (salary.title), averageSalaries: salary.averageSalaries };
            }),
            name: 'salary',
        },
        {
            id: 'company-sort',
            label: 'Sort',
            options: customSelectOption.sorts.map((sort) => {
            return { title: (sort.title), sort: sort.sort };
            }),
            name: 'sort',
        },
    ];

    return (
        <div className="companyFilterWrapper">
            <CompanySearch handleCompanySearch={handleCompanySearch}/>
            
            {selectOptions.map((select) => (
                <CompanySelect
                    onChange={(event: any, value: number) => handleCompanySelection(event, value)}
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