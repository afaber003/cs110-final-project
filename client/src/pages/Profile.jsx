import React, {useEffect, useState} from "react";
import {getUserDetails, httpCall} from "../services/networkService";
import {useNavigate, useNavigation} from "react-router-dom";


export default function Profile({setShow}) {
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserDetails().then(data => setUserData(data))
        setShow(false)
    }, []);

    async function handleEditUser() {
        const editBody = {
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            bio: userData.bio,
        }
        httpCall('users/edit', editBody, 'PATCH')
        alert('Profile Updated')
    }

    function adjustOtherProfileDetails(entry, value) {
        const details = {...userData}
        details[entry] = value
        setUserData(details)
    }

    return (
        <div style={{width: '100%', backgroundColor: '#d2e3ff',  minHeight: '100vh'}} className="container">
            <div className="adminPanel shadow">
                <h2>{userData.userName}'s Profile</h2>
                <div id={'newPostModal'} style={{
                    display: 'flex',
                    justifyContent: 'left',
                    flexDirection: 'column',
                    height: 'fit-content'
                }}>
                    <label>
                        Username
                        <input value={userData.userName}
                               onChange={event => adjustOtherProfileDetails('userName', event.target.value)}/>
                    </label>
                    <label>
                        First Name
                        <input value={userData.firstName}
                               onChange={event => adjustOtherProfileDetails('firstName', event.target.value)}/>
                    </label>
                    <label>
                        Last Name
                        <input value={userData.lastName ? userData.lastName : ''}
                               onChange={event => adjustOtherProfileDetails('lastName', event.target.value)}/>
                    </label>
                    <label>
                        Email
                        <input disabled={true}
                               value={userData.email}/>
                    </label>
                    <label>
                        Biography
                        <textarea value={userData.bio}
                                  onChange={event => adjustOtherProfileDetails('bio', event.target.value)}/>
                    </label>
                    <div style={{
                        display: "flex",
                        flexDirection: 'row',
                    }}>
                        <button style={{width: '100px', height: '50px', marginRight: '25px'}}
                                onClick={() => {window.history.back()}}>
                            Back
                        </button>
                        <button style={{width: '100px', height: '50px'}}
                                onClick={handleEditUser}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}