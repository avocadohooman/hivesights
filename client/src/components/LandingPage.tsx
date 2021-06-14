import React from 'react';
import * as authServices from '../services/authApi';

const LandingPage = () => {

	const landingPageStyle = {
		title: {
			font-family: 'test',
		},
	} as const

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
		<div>
			<div>Hivesights</div>
			<button onClick={login42}>Login</button>
		</div>
	)
}

export default LandingPage;