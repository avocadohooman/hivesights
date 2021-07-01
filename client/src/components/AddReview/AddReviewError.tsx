/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-unescaped-entities */
// React Libraris
import { Alert, AlertTitle, Color } from '@material-ui/lab';
import React, { useState } from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/createReview.css';

// UI Libraries


// Assets


const AddReviewAlert = ({ 
        type,
        message,
        title,
        postError,
        setPostError
    } : { 
        type: string,
        message: string,
        title: string,
        postError: boolean,
        setPostError: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {

    const [close, setClose] = useState<boolean>(false);
    
    return (
        <div>
            {type === "error" && postError && <Alert severity="error" onClose={() => {
                setPostError(false);
            }}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>}
            {type === "success" && !close && <Alert severity="success">
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>}
        </div>
    );
};

export default AddReviewAlert;