import React, { useContext, useState, useEffect } from 'react';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../stor/actions/profileAction';
import '../profile/profile.scss'
import HeaderBack from '../header/HeaderBack';


function Profile(props) {
    const [btnFollow, setBtnFollow] = useState(false);
    const profileData = useSelector(state => state.profile.myData);
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();

    console.log("prof", profileData)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (user) {
                    const userDoc = query(collection(db, 'user'), where('userId', '==', user.uid));
                    const querySnapshot = await getDocs(userDoc);
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        dispatch(updateProfile(userData));
                    } else {
                        console.log('No such document!');
                    }
                }
            } catch (error) {
                console.log("Error getting document:", error);
            }
        };

        fetchUserProfile();
    }, [user, dispatch]);

    useEffect(() => {
        console.log("ProfileData", profileData);
    }, [profileData]);

    const clickFollow = () => {
        setBtnFollow(!btnFollow);
    };

    return (
        <div className='app'>
            <HeaderBack />
            <div className='login-box'>
                <div className='profile-avatar row'>
                    <img className='profile-photo col-5' src={profileData.avatar} alt='hh' />
                    <div className='col profile-d'>
                        <div className='profile-out'> complete profile</div>
                        <div className='diogram'></div>
                        <p className='profile-p'>33%</p>
                    </div>
                </div>
                <div className='profile-data'>
                    <div className='data'>{profileData.fullName}</div>
                    <div>{profileData.age}</div>
                    <div>gender</div>
                </div>
                <div className='row profile-info'>
                    <div className='col '>
                        <div className='div-info'>{profileData.bio}</div>
                        <div className='div-info'>{profileData.interests}</div>
                        <div className='div-info'>{profileData.goal}</div>
                        <div className='div-info'>{profileData.professional}</div>
                        <div className='div-info'>status</div>
                    </div>
                    <Link className='col-4 ' to="/modal-profile" onClick={clickFollow}><button className='profile-modify'>modify</button></Link>
                    {btnFollow && <ProfileModal />}
                </div>
                <div className='profile-out'>
                    <div>payment</div>
                    <div>login out</div>
                </div>
                <div className='profile-credit'>   my credit</div>
                <div className='profile-invite'>invite friends</div>
                <div className='pr'>
                    <div>Your personality characteristics</div>
                    <div className='row profile-diogram'>
                        <div className='col p-0 blue'><p className='prozent'>22%</p> <p className='p'>Steadiness</p></div>
                        <div className='col p-0 red'><p className='prozent'>33%</p><p className='p'>Dominance</p></div>
                        <div className='col p-0 yellow'><p className='prozent'>44%</p><p className='p'>Influence</p></div>
                        <div className='col p-0 grune'><p className='prozent'>55%</p><p className='p'>Conscientiousnes</p></div>
                    </div>
                    <div className='go'>GO to full report</div>
                </div>
            </div>
            <footer><Footer /></footer>
        </div>
    );
}

export default Profile;
