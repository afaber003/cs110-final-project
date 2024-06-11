/**
 * PLEASE READ BEFORE USING:
 * This function is an async call so you must use await or .then() to get a real response from it
 * If the call was successful, it will return a "truthy" value. If it failed, it will return "falsy".
 * For info on js-style "truthy": https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 * If you are expecting a json-style object response, you can treat the response of this function as that object
 *
 * @param endPoint {string} should be of the form "{route}/{endpoint}". ex: "users/login" or "posts/create"
 * @param jsonBody {Object} object that forms the content of any post/patch call. Needs to be in object form
 * @param method {string} optional method type; defaults to "GET" if left blank
 * @returns {Promise<any|null>}
 */
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
                return await res.json()
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

export async function convertUserIdToUserName(userId) {
    const response = await httpCall(`users/userNameFromId`, {userId: userId}, 'POST')
    if (response) {
        return response.userName
    } else {
        return userId
    }
}

