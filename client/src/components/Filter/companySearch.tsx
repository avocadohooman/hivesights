import React from 'react';

// Data model
import { HandleCompanySearchFunction } from '../../models/miscModels';

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
        <FormControl size="small" fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
            <OutlinedInput 
                type="search"
                style={{ 
                    borderRadius: '50px',
                    borderColor: '#ADD2DD',
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
    )
}

export default CompanySearch;