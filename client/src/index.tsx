import React, { Suspense } from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

ReactDom.render(
    <Suspense fallback={<div>Loading</div>}>
        <Router>
            <App />
        </Router>
    </Suspense>
, document.getElementById("root"));
