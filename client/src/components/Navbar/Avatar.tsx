// React Libraris
import React from 'react';

// Components

// Data models 

// API services

// CSS styles
import '../../styles/navBar.css';

// UI Libraries

// Assets


const Avatar = ({
        avatarImageUrl
    } : {
        avatarImageUrl: string | undefined
    }): JSX.Element => {

    const headerAvatarStyle = {
        backgroundImage: `url(${avatarImageUrl})`,
    }
    return (
        <div className="headerAvatarWrapper" style={headerAvatarStyle}></div>
    )
}

export default Avatar;