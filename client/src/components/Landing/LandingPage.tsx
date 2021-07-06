// React Libraris
import React from 'react';
import { TopCompany } from '../../models/companyModel';

// Components
import TopCompanies from './TopCompaniesWrapper';
// Data models 

// API services
import * as authServices from '../../services/authApi';

// CSS styles
import '../../styles/landingPage.css';

// UI Libraries

// Assets


const LandingPage = ({topCompanies} : {topCompanies: TopCompany[]}): JSX.Element => {

	const login42 = async () => {
		try {
			const data = await authServices.fortyTwoUrl();
			window.location = data.url;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<div className="landingPageContainer">
			<div className="title">Hive
				<span style={{ color: '#DE7E2F' }}>s</span>
				<span style={{ color: '#B979A6' }}>i</span>
				<span style={{ color: '#ADD2DD' }}>g</span>
				<span style={{ color: '#CEAA7F' }}>h</span>
				<span style={{ color: '#F9DE4B' }}>t</span>
				<span style={{ color: '#D23E41' }}>s</span>
			</div>
			<button id="signIn" className="login" onClick={login42}>Sign In</button>
			{topCompanies.length > 0 && <TopCompanies topCompanies={topCompanies}/>}
		</div>
	);
};

export default LandingPage;