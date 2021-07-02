import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Hivesights from './components/Hivesights';
import Navbar from './components/Navbar/Navbar';
import authApi from './services/authApi';
import jwt_decode from 'jwt-decode';
import { StateUser } from './models/userModel';
import CompanyDetailView from './components/Companies/CompanyDetailView';

interface UserToken {
	id: string,
	userName: string,
	imageUrl: string,
	intraUrl: string,
	internshipValidated: boolean,
}

const App = () => {
  const [user, setUser] = useState<StateUser | undefined>(undefined);
  const history = useHistory();

  useEffect(() => {
	const checkTokenExpiration = () => {
		const token = localStorage.getItem('token');
		if (token) {
			const { exp }: any = jwt_decode(token);
			const expirationTime = (exp * 1000) - 60000;
			if (Date.now() >= expirationTime) {
				localStorage.removeItem('token');
				localStorage.removeItem('company')
				setUser(undefined);
			}
		}
	};
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
				history.push('/');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.log("ERROR", error);
			}
		}
	};
	setInterval(() => {
		checkTokenExpiration();
	}, 10000);
	checkToken();
  }, []);



  return (
	<div>
		{user && <Navbar setUser={setUser} user={user}/>}
		<Container maxWidth="lg">
			{!user ? (<LandingPage/>) : (<Hivesights user={user}/>)}
		</Container>
	</div>
  );
};

export default App;