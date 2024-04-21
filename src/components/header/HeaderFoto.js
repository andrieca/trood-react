import React from 'react';
import { useSelector } from 'react-redux';
import '../header/header.scss'

function HeaderFoto(props) {
    const profileData = useSelector(state => state.profile.myData);
    return (
        <div>
            <div><img className='header-avatar' src={profileData.avatar} alt='kk'/></div>
            <div className='header-div'>{profileData.fullName}</div>
        </div>
    );
}

export default HeaderFoto;
