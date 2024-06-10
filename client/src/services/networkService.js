
export async function httpCall(endPoint, jsonBody, method = 'GET') {
    try {
        const res = await fetch('http://localhost:1234/' + endPoint, {
            method: method,
            credentials: 'include',
            body: method !== 'GET' ? JSON.stringify(jsonBody) : undefined,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            try {
                return  await res.json()
            } catch (e) {
                return true
            }
        } else if (res.status === 401 && window.location.href !== 'http://localhost:3000/login') {
            // on unauthorized force them back to login page
            window.location.assign('http://localhost:3000/login')
            return null
        } else {
            return null
        }
    } catch (e) {
        console.log(e)
        return null
    }
}

export async function logInUser(userName, password) {
    return (await httpCall('users/login', {userName: userName, password: password}, 'POST')) !== null
}

export async function getUserDetails() {
    return await httpCall('users/userDetails', {})
}

export async function logOutUser() {
    await httpCall('users/logout', {}, 'POST')
    window.location.assign('http://localhost:3000/login')
}

