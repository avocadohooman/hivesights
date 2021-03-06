import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
  useLocation,
  useHistory,
  BrowserRouter as Router
} from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Hivesights from './components/Hivesights';
import Navbar from './components/Navbar/Navbar';
import authApi from './services/authApi';
import publicDataApi from './services/publicDataApi';
import jwt_decode from 'jwt-decode';
import { StateUser } from './models/userModel';
import { TopCompany } from './models/companyModel';

// creating an interface for incoming UserToken from backend
interface UserToken {
	id: string,
	userName: string,
	imageUrl: string,
	intraUrl: string,
	internshipValidated: boolean,
}

// App component where token is being requested and where token expiration 
// is being checked.
const App = () => {
	const [user, setUser] = useState<StateUser | undefined>(undefined);
	const [topCompanies, setTopCompanies] = useState<TopCompany[]>([]);

	const history = useHistory();
	const location = useLocation();

	//check token expiration, if expired, erase user and force log-out
	const checkTokenExpiration = () => {
		const token = localStorage.getItem('token');
		if (token) {
			const { exp }: any = jwt_decode(token);
			const expirationTime = (exp * 1000) - 60000;
			if (Date.now() >= expirationTime) {
				localStorage.clear();
				setUser(undefined);
			}
		}
	};

	//check if token exists, if not, get roken from backend, decode it and set user
	const checkToken = async () => {
		let token = localStorage.getItem('token');
		if (!token && location.search.startsWith('?auth=')) {
			const key = location.search.substr(6);
			try {
				token = await authApi.getToken(key);
			} catch (e) {
				console.log("ERROR", e);
			}
		}
		if (token) {
			try {
				const decoded = jwt_decode<UserToken>(token);
				authApi.setAuthToken(token);
				window.localStorage.setItem('token', token );
				setUser({id: decoded.id, userName: decoded.userName, imageUrl: decoded.imageUrl, intraUrl: decoded.intraUrl, internshipValidated: decoded.internshipValidated});
				if (location.search.startsWith('?auth=') || location.pathname === '/') {
					history.push('/');
				} else {
					console.log("ELSE", location.pathname);
					history.push(location.pathname);
				}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.log("ERROR", error);
			}
		}
	};

	//getPublicData gets sneak peek data for landing page: top rated companies by Hivers
	const getPublicData = async () => {
		try {
			const topCompanies = await publicDataApi.getTopCompanies();
			setTopCompanies(topCompanies);
		} catch (error) {
			console.log("ERROR", error);
		}
	}

	useEffect(() => {
		getPublicData();
		checkToken();
		const interval = setInterval(() => {
			checkTokenExpiration();
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	return (
		//if user doesn't exist, show landing page, otherwise show Hivesights component
		<Router>
			{user && <Navbar setUser={setUser} user={user}/>}
				<Container maxWidth="lg">
					{!user ? (<LandingPage topCompanies={topCompanies}/>) : (<Hivesights user={user}/>)}
				</Container>
		</Router>
		);
};

export default App;