import {useEffect, useState} from "react";
import {httpCall, logInUser} from "../services/networkService";
import {useNavigate} from "react-router-dom";


export default function Login({setShow}) {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div style={{width: '100%'}} className="container">
            <div id={'loginBackground'}>
                <div id={'loginBox'}>
                    <h1 style={{marginBottom: '30px'}}>Welcome to NormGram</h1>
                    <label className={'mainLogin'}>
                        Username:
                        <input value={userName} onChange={event => setUserName(event.target.value)}/>
                    </label>
                    <label className={'mainLogin'}>
                        Password:
                        <input type={'password'} value={password} onChange={event => setPassword(event.target.value)}/>
                    </label>
                    <button className={'loginButton'} onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}