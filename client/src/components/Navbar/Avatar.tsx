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
        avatarImageUrl,
        size
    } : {
        avatarImageUrl: string | undefined,
        size: string
    }): JSX.Element => {

    const headerAvatarStyle = {
        backgroundImage: `url(${avatarImageUrl})`,
    };
    return (
        <div>
            {size === 's' && <div className="headerAvatarWrapperSmall" style={headerAvatarStyle}></div>}
            {size === 'm' && <div className="headerAvatarWrapperMedium" style={headerAvatarStyle}></div>}
        </div>
    );
};

export default Avatar;