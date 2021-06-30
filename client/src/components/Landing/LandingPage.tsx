// React Libraris
import React from 'react';

// Components

// Data models 

// API services
import * as authServices from '../../services/authApi';

// CSS styles
import '../../styles/landingPage.css';

// UI Libraries

// Assets


const LandingPage = () => {

	const login42 = async () => {
		try {
			const data = await authServices.fortyTwoUrl();
			window.location = data.url;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error.message);
		}
	}

	return (
		<div className="landingPageContainer">
			<div className="title">Hivesights</div>
			<button id="signIn" className="login" onClick={login42}>Sign In</button>
		</div>
	);
}

export default LandingPage;