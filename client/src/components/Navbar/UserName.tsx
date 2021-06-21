// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/navBar.css';

// UI Libraries

// Assets


const UserName = ({ 
        userName
    } : { 
        userName: string | undefined
    }): JSX.Element => {
    
    return (
        <div className="headerUserName">{userName}</div>
    )
}

export default UserName;