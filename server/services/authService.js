const {dbUser} = require("../models/User");
const {dbSession} = require("../models/Session");
const bcrypt = require('bcryptjs');
const {PermissionLevel} = require("../models/Classes");


/**
 * Checks if user exists and if they meet the supplied permissionLevel
 * Handles its own errors
 * @param req {Request}
 * @param permissionLevel {PermissionLevel}
 * @returns {Promise<boolean>}
 */
async function authenticateUser(req, permissionLevel) {
    try {
        if (!req.cookies['sessionId']) {
            return false
        }
        const session = await dbSession.findOne({_id: req.cookies['sessionId']})
        if (!session) {
            return false
        }
        const user = await dbUser.findOne({_id: session.userId})
        if (!user) {
            return false
        }
        return user.permissionLevel === 'admin' || user.permissionLevel === permissionLevel
    } catch (e) {
        console.log(e)
        return false
    }
}

/**
 * Creates a new user
 * @param userDetails {{email: String, firstName: string, lastName: any, password: string, userName: string}}
 * @returns {Promise<dbUser | null>}
 */
async function createUser(userDetails) {
    const newPass = bcrypt.hashSync(userDetails.password)
    try {
        const user = new dbUser({
            email: userDetails.email,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName ? userDetails.lastName : '',
            creationDate: Date.now(),
            permissionLevel: PermissionLevel.User,
            userName: userDetails.userName,
            password: newPass
        })

        await user.save()
        return user
    } catch (e) {
        console.log(e)
        return null
    }
}

/**
 * handles the creation and attaching of a new session cookie
 * @param res
 * @param userId
 * @returns {Promise<void>}
 */
async function createAndAttachSessionCookie(res, userId) {
    // Generate new session for use with cookie
    const newSession = new dbSession({
        userId: userId
    })
    await newSession.save()

    // add session cookie to browser session
    res.cookie('sessionId', newSession.id, {expires: new Date(253402300000000), httpOnly: false})
    return newSession.id
}

// Attempts to return user object from db based on req
async function getUserFromReq(req) {
    try {
        return await dbUser.findOne(
            {
                _id: (await dbSession.findOne({_id: req.cookies['sessionId']})).userId
            }
        )
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = {
    getUserFromReq,
    createUser,
    createAndAttachSessionCookie,
    authenticateUser
}