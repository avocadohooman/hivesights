// React Libraris
import React from 'react';

// Components

// Data models 


// API services


// CSS styles
import '../../styles/company.css';

// UI Libraries

// Assets


const NoCompanies = (): JSX.Element => {

    return (
        <div className="noCompanies">
            <div>No companies available :(  </div>
            <div>The bees are working hard to resolve this issue.</div>
            <div>If this state remains, please contact <a href="mailto: gmolin@student.hive.fi">gmolin@student.hive.fi</a> </div>
        </div>
    )
}

export default NoCompanies;