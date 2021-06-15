import React from 'react';
import '../styles/navBar.css';
import { ReactComponent as SignOut } from '../assets/signOut.svg';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router';

const Navbar = (props: any) => {

    const logoTitle = 'Hivesights';
    const avatarImageUrl = props.user.imageUrl;
    const userName = props.user.userName;
    const headerAvatarStyle = {
        backgroundImage: `url(${avatarImageUrl})`,
    }
    const history = useHistory();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setUser(undefined);
    }   

    const handleGoHome = () => {
        history.push('/');
    }

    return (
        <div className="navbar">
            <button className="logoTitle" onClick={handleGoHome}>{logoTitle}</button>
            <div className="userSection">
                <div className="headerAvatarWrapper" style={headerAvatarStyle}></div>
                <div className="headerUserName">{userName}</div>
                <Tooltip title="Sign Out">
                    <SignOut onClick={handleLogout} className="signOutWrapper"/>
                </Tooltip>
            </div>
        </div>
    )
}

export default Navbar;