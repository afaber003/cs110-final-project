import {useEffect, useState} from "react";
import {httpCall, logInUser} from "../services/networkService";
import {useNavigate} from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn";


export default function Login({setShow}) {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false)
    const [signUpDetails, setSignUpDetails] = useState({
        userName: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        setShow(false)
         httpCall('users/cookieLogin', {}).then(res => {
             if (res) {
                 navigate('/home')
             }
         })
    }, []);

    async function handleSubmit() {
        if (!userName || !password) {
            alert('Please enter a username / password')
            return
        }
        const loginAttempt = await logInUser(userName, password)
        if (loginAttempt) {
            navigate('/home')
        } else {
            alert("Invalid username or password")
            setPassword('')
        }
    }

    async function handleCreateAccount() {
        for (let entry of Object.entries(signUpDetails)) {
            if (entry[1] === '') {
                alert(entry[0] + ' cannot be blank')
                return
            }
        }
        const response = await httpCall('users/create', signUpDetails, 'POST')
        if (response) {
            navigate('/home')
        } else {
            alert('Error Creating User')
        }
    }

    function adjustSignUpDetails(entry, value) {
        const details = {...signUpDetails}
        details[entry] = value
        setSignUpDetails(details)
    }

    return (
        <div style={{width: '100%'}} className="container">
            <div id={'loginBackground'}>
                <div id={'loginBox'}>
                    { !isSignUp &&
                        <>
                            <h1 style={{marginBottom: '30px'}}>Welcome to NormGram</h1>
                            <label className={'mainLogin'}>
                                Username:
                                <input value={userName} onChange={event => setUserName(event.target.value)}/>
                            </label>
                            <label className={'mainLogin'}>
                                Password:
                                <input type={'password'} value={password}
                                       onChange={event => setPassword(event.target.value)}/>
                            </label>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '50%'}}>
                                <button className={'loginButton'} onClick={() => setIsSignUp(true)}>
                                    Sign Up
                                </button>
                                <button className={'loginButton'} onClick={handleSubmit}>
                                    Login
                                </button>
                                <GoogleSignIn/>
                            </div>
                        </>
                    }
                    {
                        isSignUp &&
                        <>
                            <h1 style={{marginBottom: '30px'}}>Sign Up</h1>
                            <label className={'mainLogin'}>
                                Username:
                                <input value={signUpDetails.userName} onChange={event => adjustSignUpDetails('userName', event.target.value)}/>
                            </label>
                            <label className={'mainLogin'}>
                                First Name:
                                <input value={signUpDetails.firstName} onChange={event => adjustSignUpDetails('firstName', event.target.value)}/>
                            </label>
                            <label className={'mainLogin'}>
                                Last Name:
                                <input value={signUpDetails.lastName} onChange={event => adjustSignUpDetails('lastName', event.target.value)}/>
                            </label>
                            <label className={'mainLogin'}>
                                Email:
                                <input value={signUpDetails.email} onChange={event => adjustSignUpDetails('email', event.target.value)}/>
                            </label>
                            <label className={'mainLogin'}>
                                Password:
                                <input type={'password'} value={signUpDetails.password}
                                       onChange={event => adjustSignUpDetails('password', event.target.value)}/>
                            </label>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '60%'}}>
                                <button className={'loginButton'} onClick={() => setIsSignUp(false)}>
                                    Go Back
                                </button>
                                <button className={'loginButton'} onClick={handleCreateAccount}>
                                    Create
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}