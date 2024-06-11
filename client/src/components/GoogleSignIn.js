import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase';
import {httpCall} from "../services/networkService";


export default function GoogleSignIn() {

    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: "select_account"});
        try {
            const result = await signInWithPopup(auth, provider);

            const bodyToAttempLogin = {
                email: result.user.email,
                password: makeDummyPassword(), // if they sign in with google that is always how they will sign in
                firstName: result.user.displayName.split(' ')[0],
                lastName: result.user.displayName.split(' ').length > 1 ? result.user.displayName.split(' ')[1] : undefined,
                userName: result.user.email.split('@')[0]
            }

            const response = await httpCall('users/googleAccess', bodyToAttempLogin, 'POST')
            if (response) {
                window.location.href = 'http://localhost:3000/home'
            } else {
                throw Error('Something went wrong')
            }
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    return (
        <button className={'loginButton'} onClick={handleGoogleClick}>Sign in with Google</button>
    )
}

function makeDummyPassword() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 7) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}