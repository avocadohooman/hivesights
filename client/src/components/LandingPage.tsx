import React from 'react';
import * as authServices from '../services/authApi';
import '../styles/landingPage.css';

const LandingPage = () => {

	const login42 = async () => {
		try {
			const data = await authServices.fortyTwoUrl();
			console.log("DATA", data);
			window.location = data.url;
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div className="landingPageContainer">
			<div className="title">Hivesights</div>
			<button className="login" onClick={login42}>Sign In</button>
		</div>
	);
}

export default LandingPage;