import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../stor/actions/profileAction';
import HeaderFoto from '../header/HeaderFoto';
import { Grid } from '@mui/material';
import '../home/home.scss'
import chat from '../../assets/chat.svg'

function Home(props) {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.profile.myData);

    console.log('home', profileData)

    useEffect(() => {
        const checkAndAddUser = async () => {
            if (user) {
                const userQuery = query(collection(db, 'user'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(userQuery);
                if (querySnapshot.empty) {
                    const userData = {
                        userId: user.uid,
                        fullName: 'Name',
                        age: 'Age',
                        bio: 'Bio',
                        interests: 'interests',
                        goal: 'goal',
                        professional: 'professional'
                    };

                    try {
                        const docRef = await addDoc(collection(db, 'user'), userData);
                        console.log("Document written with ID: ", docRef.id);
                        dispatch(updateProfile(userData));
                    } catch (error) {
                        console.error("Error adding document: ", error);
                    }
                }
            }
        };

        checkAndAddUser();
    }, [user]);

    return (
        <div className='app'>
            <div className='login'>
                <HeaderFoto />
                <Grid className='btn-widjet'>
                    <Link to="/profileMy" className='link'>
                        <Grid className="filled-basic">
                            <button className='btn-home'  >Complete a profile</button>
                            <div className='diogram-home'>33%</div>
                        </Grid>
                    </Link>
                    <Grid className="filled-basic">
                        <button className='btn-home'  >Share report or invite friends</button>
                    </Grid>
                    <Grid className="filled-basic">
                        <button className='btn-home'  >Get insights via chat with Jackie</button>
                        <img className='chat-photo' src={chat} alt='dd' />
                    </Grid>
                </Grid>
            </div>
            <div className='add-people'>
                <p className='add-people-p'>add people</p>
                <div className='add-people-div'>
                    <button className='add-people-btn'>Analyze new person
                        <p>Add your friend/mom/partner’s photo and check your relationship quality</p>
                    </button>
                    <button className='add-people-btn'>Import your contact list
                        <p>Add your friend/mom/partner’s photo and check your relationship quality</p>
                    </button>
                </div>

            </div>
            <div className='login'>
            <Link to="/loader" className='link'>
                <Grid className="filled-basic">
                    <button className='btn'  >start analyzing psychotype</button>

                </Grid>
            </Link>
            </div>
        </div>
    );
}

export default Home;
