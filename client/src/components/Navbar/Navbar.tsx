// React Libraris
import React from 'react';
import { useHistory } from 'react-router';

// Components
import Avatar from './Avatar';
import UserName from './UserName';
import RouteAddCompanyButton from '../AddCompany/RouteAddCompanyButton';

// Data models 
import { User, SetUser } from '../../models/userModel';

// API services

// CSS styles
import '../../styles/navBar.css';

// UI Libraries
import Tooltip from '@material-ui/core/Tooltip';

// Assets
import { ReactComponent as SignOut } from '../../assets/signOut.svg';

// Navbar handles top navivation logic and layout, is visible one user exists
const Navbar = ({
        user, setUser
    }: {
        user: User, 
        setUser: SetUser
    }): JSX.Element => {

    const logoTitle = 'Hivesights';
    const avatarImageUrl = user?.imageUrl;
    const userName = user?.userName;
    const history = useHistory();
    
    // handleLogout clears the cache and sets user to undefined, which renders LandingPage component
    // and hides Hivesights component
    const handleLogout = () => {
        localStorage.clear();
        setUser(undefined);
    };   

    // handleGoHome handles navigation to main Hivesights page, and reloads page if allCompanies & KPIs cache is empty
    // to trigger pulling latest data from backend
    const handleGoHome = () => {
        history.push('/');
        if (!localStorage.getItem('allCompanies') && !localStorage.getItem('KPIs')) {
            window.location.reload();
        }
    };

    return (
        <div className="navbar">
            <button className="logoTitle" onClick={handleGoHome}>{logoTitle}</button>
            <div className="userSection">
                {/* add company button only visibl to user gmolin, will be moved later on to be visible for every user */}
                {user.userName === 'gmolin' && <RouteAddCompanyButton />}
                <Avatar size='s' avatarImageUrl={avatarImageUrl}/>
                <UserName userName={userName}/>
                <Tooltip title="Sign Out">
                    <SignOut onClick={handleLogout} className="signOutWrapper"/>
                </Tooltip>
            </div>
        </div>
    );
};

export default Navbar;