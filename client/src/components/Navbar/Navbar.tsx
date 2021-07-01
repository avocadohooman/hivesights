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
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(undefined);
    };   

    const handleGoHome = () => {
        history.push('/');
        // Hotfix: when returning to main page, filtered selection is still rendered 
        // which requires to manually reload page in order to get all companies again
        window.location.reload();
    };

    return (
        <div className="navbar">
            <button className="logoTitle" onClick={handleGoHome}>{logoTitle}</button>
            <div className="userSection">
                {user.userName === 'ss' && <RouteAddCompanyButton />}
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