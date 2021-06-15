import React from 'react';
import '../styles/navBar.css';

const Navbar = (props: any) => {

    const logoTitle = 'Hivesights';
    const avatarImageUrl = props.user.imageUrl;
    const userName = props.user.userName;
    console.log("AVATAR URL", avatarImageUrl);
    const divStyle = {
        backgroundImage: `url(${avatarImageUrl})`,
    }

    return (
        <div className="navbar">
            <button className="logoTitle">{logoTitle}</button>
            <div className="userSection">
                <div className="headerAvatarWrapper" style={divStyle}></div>
                <div className="headerUserName">{userName}</div>
            </div>
        </div>
    )
}

export default Navbar;