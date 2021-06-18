// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles

// UI Libraries
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// Assets

const CompanySelect = ({
        options,
        label,
        id,
        onChange
    } : {
        options: any[],
        label: string,
        id: any,
        onChange: any
    }): JSX.Element => {
    return (
        <Autocomplete
            className="companySearch"
            id={id}
            size="small"
            options={options}
            onChange={onChange}
            getOptionLabel={(option: any) => option.title}
            getOptionSelected={(option: any) => option.title}
            style={{ 
                width: 300,
                borderColor: 'transparent' 
            }}
            renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        />
    );
}

export default CompanySelect;