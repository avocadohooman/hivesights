// React Libraris
import React from 'react';

// Components

// Data model
import { HandleCompanySearchFunction, OnChangeEvent } from '../../models/miscModels';

// API services


// CSS style
import '../../styles/companyFilter.css';

// UI libraries
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormControl, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// Assets


const CompanySearch = ({
        handleCompanySearch
    } : {
        handleCompanySearch: HandleCompanySearchFunction
    }): JSX.Element => {

    return (
        <div>
            <FormControl size="small" fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                <OutlinedInput 
                    className="companySearch"
                    type="search"
                    style={{ 
                        borderRadius: '50px',
                        width: '224px'
                    }}
                    id="outlined-adornment-amount"
                    onChange={(event: OnChangeEvent) => handleCompanySearch(event)}
                    labelWidth={140}
                    endAdornment={
                        <SearchIcon />
                    }
                />
            </FormControl>
        </div>
    );
};

export default CompanySearch;