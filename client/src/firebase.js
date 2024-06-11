// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyB5Kyli8ulY7sktHXay6h4JaXgMen7tC28",

    authDomain: "cs110-final-project-479f6.firebaseapp.com",

    projectId: "cs110-final-project-479f6",

    storageBucket: "cs110-final-project-479f6.appspot.com",

    messagingSenderId: "1075498675817",

    appId: "1:1075498675817:web:4974cc033a7494cc3e7cf8",

    measurementId: "G-6HYDQ0FSZN"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);