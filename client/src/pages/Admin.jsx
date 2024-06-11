import {useEffect, useState} from "react";
import {getUserDetails, httpCall} from "../services/networkService";


export default function Admin({setShow}) {

    const [userData, setUserData] = useState({})
    const [allUserData, setAllUserData] = useState([])

    useEffect(() => {
        setShow(true)
        getUserDetails().then(newData => {
            if (newData) {
                setUserData(newData)
            }
        })
    }, []);

    useEffect(() => {
        if (userData.permissionLevel === 'admin') {
            httpCall('users/allUserInfo', {}).then(userInfo => {
                setAllUserData(userInfo ? userInfo : [])
            })
        }
    }, [userData])

    async function toggleUserPermission(userId) {
        const users = [...allUserData]
        const user = users.find(aUser => aUser._id === userId)
        user.permissionLevel = user.permissionLevel === 'admin' ? 'user' : 'admin'
        setAllUserData(users)
        await httpCall('users/edit', {userId: userId, permissionLevel: user.permissionLevel}, 'PATCH')
    }

    function generateUsersList() {
        const list = []
        for (const user of allUserData) {
            list.push(
                <tr className={'adminUserListRow'}>
                    <td>{user.userName}</td>
                    <td>{user.firstName + ' ' + user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{(new Date(user.creationDate)).toLocaleString()}</td>
                    <td>{user.bio.slice(0, 25) + (user.bio.length > 25 ? '...' : '')}</td>
                    <td>
                        <input
                            type={'checkbox'}
                            checked={user.permissionLevel === 'admin'}
                            onChange={() => toggleUserPermission(user._id)}
                        />
                    </td>
                </tr>
            )
        }
        return list
    }

    return (
        <div style={{width: '100%', backgroundColor: '#d2e3ff', minHeight: '100vh'}} className="container">
            {
                userData.permissionLevel === 'admin' && (
                    <>
                        <div className={'adminPanel shadow'}>
                            <h2 style={{marginBottom: '20px'}}>List of Users</h2>
                            <hr/>
                            <table style={{marginTop: '20px', width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Creation Date</th>
                                        <th>Biography</th>
                                        <th>Admin Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generateUsersList()}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }
            {
                userData.permissionLevel === 'user' && (
                    <>
                        <h1 style={{marginTop: '75px'}}>
                            You do not have permission to be here
                        </h1>
                    </>
                )
            }
        </div>
    )
}