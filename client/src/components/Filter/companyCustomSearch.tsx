import React from 'react';

// Data model
import { HandleCompanySearchFunction } from '../../models/miscModels';

// CSS style
import '../../styles/companyFilter.css';

// UI libraries
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormControl, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const CompanySearch = ({
        handleCompanySearch
    } : {
        handleCompanySearch: HandleCompanySearchFunction
    }): JSX.Element => {

    return (
        <div className="companySearch">
            <FormControl size="small" fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                <OutlinedInput 
                    type="search"
                    style={{ 
                        borderRadius: '50px',
                        width: '224px'
                    }}
                    id="outlined-adornment-amount"
                    onChange={(event) => handleCompanySearch(event)}
                    labelWidth={140}
                    endAdornment={
                        <SearchIcon />
                    }
                />
            </FormControl>
        </div>
    )
}

export default CompanySearch;