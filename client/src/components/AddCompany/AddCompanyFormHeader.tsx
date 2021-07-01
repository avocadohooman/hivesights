/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/addCompany.css';

// UI Libraries

// Assets

const AddCompanyFormHeader = ({ 
        header,
        color,
        size
    } : {  
        header: string,
        color: string,
        size: string
    }): JSX.Element => {
    
    const headerColor = {
        color: `${color}`,
        fontSize: `${size}`
    };
    return (
        <div className="companyAddCompanyFormHeader" style={headerColor}>{header}</div>
    );
};


export default AddCompanyFormHeader;