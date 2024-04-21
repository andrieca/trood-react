
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Context } from '../../index';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../stor/actions/profileAction';
import './login.scss';


const Login = () => {
    const { auth } = useContext(Context);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const { user } = await signInWithPopup(auth, provider); 
            console.log("user", user);
            setUser(user);
            window.location.href = "/home";
        } catch (error) {
            console.error(error);
            window.location.href = "/login";
        }
    }

    useEffect(() => {
        const addUserToDatabase = async () => {
            try {
                if (user) {
                    const userData = {
                        userId: user.uid,
                        fullName: 'Name',
                        age: 'Age',
                        bio: 'Bio',
                        interests: 'interests',
                        goal: 'goal',
                        professional: 'professional'
                    };
                    const docRef = await addDoc(collection(db, 'user'), userData);
                    console.log("Document written with ID: ", docRef.id);
                    dispatch(updateProfile(userData));
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        };

        addUserToDatabase();
    }, [user, dispatch]);

    return (
        <Container>
            <Grid className='login'
            >
                <Grid className='logo'>Logo</Grid>
                <Grid className='login-form'>
                    <Grid className='hello'>Hello, friend</Grid>
                    <Grid className='login-imput'
                        container
                        direction={"column"}>
                        <label>Login</label>
                        <input className='filled-basic' />
                        <label>Password</label>
                        <input className="filled-basic" variant="filled" />
                    </Grid>
                    <Grid className='forget'>Forget password?</Grid>
                </Grid>
                <Grid className='btn-widjet'>
                    <Grid className="filled-basic">
                        <button className='btn' onClick={login} >Login mit  Facebook</button>
                    </Grid>
                    <Grid className="filled-basic">
                        <Button className='btn' onClick={login} >Login mit Google</Button>
                    </Grid>
                </Grid>
                <Grid className='circs'>
                    Регистрируясь, вы соглашаетесь с нашими Условиями обслуживания. Узнайте о том, как мы обрабатываем и используем ваши данные, в нашей Политике конфиденциальности.
                </Grid>

            </Grid>
        </Container>
    );
}

export default Login;