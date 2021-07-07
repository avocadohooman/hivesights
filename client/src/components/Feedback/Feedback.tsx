// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/feedback.css';

// UI Libraries

// Assets


// Feedback component is a button that links directly to a Typeform feedback form
const Feedback = (): JSX.Element => {
  
    return (
      <a className="feedbackWrapper" href="https://minimumbadass.typeform.com/to/fXG74Qyf" target="_blank">
            <button className="feedbackButton" type="button">
                Send Feedback
            </button>
      </a>
    );
}

export default Feedback