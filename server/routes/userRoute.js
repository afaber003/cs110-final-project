const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const {dbUser} = require("../models/User");
const {dbSession} = require("../models/Session");
const {createUser, createAndAttachSessionCookie, authenticateUser, getUserFromReq} = require("../services/authService");
const {PermissionLevel} = require("../models/Classes");


// Gets user information based on current logged-in user
router.get('/userDetails', async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }

        const user = await getUserFromReq(req)
        if (!user) {
            res.status(404).json({message: 'user not found'});
        }

        delete user.password
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

// Logs in user and adds session cookie
router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        if (!body.userName || !body.password) {
            res.status(400).json({message: 'missing username or password'})
            return
        }

        const users = await dbUser.find({userName: body.userName})
        for (let user of users) {
            if (bcrypt.compareSync(body.password, user.password)) {
                await dbSession.deleteMany({userId: user.id}) // make sure to delete any existing sessions (this logs out any other instances)
                await createAndAttachSessionCookie(res, user.id)
                delete user.password // remove password to avoid sending the hash to the client side lol
                res.status(200).json(user)
                return
            }
        }

        res.status(401).json({message: 'invalid password or username'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

// logs out user and invalidates cookie
router.post('/logout', async (req, res) => {
    try {
        const sessionId = req.cookies['sessionId'];
        if (!sessionId) {
            res.status(404).json({message: 'no user logged in'})
            return
        }

        const {deletedCount} = await dbSession.deleteOne({_id: sessionId})
        if (deletedCount > 0) {
            res.clearCookie('sessionId');
            res.status(200).json({message: 'session removed'})
        } else {
            res.status(404).json({message: 'no user logged in'})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

// Creates a new user
router.post('/create', async (req, res) => {
    try {
        const body = req.body;
        if (!body.userName || !body.password) {
            res.status(400).json({message: 'missing username or password'})
            return
        }
        if (!body.firstName || !body.email) {
            res.status(400).json({message: 'missing firstName or email'})
            return
        }

        const newUser = await createUser(body)
        if (!newUser) {
            res.status(500).json({message: 'there was an issue creating your account'})
            return
        }

        delete newUser.password
        res.status(200).json(newUser)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

// Edit user
const editableFields = ['lastName', 'firstName', 'userName', 'bio']
router.patch('/edit', async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }

        const user = await getUserFromReq(req)
        for (let aspect of Object.entries(req.body)) {
            if (editableFields.includes(aspect[0])) {
                user[aspect[0]] = aspect[1]
            }
        }

        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password)
        }
        await user.save()
        delete user.password
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

router.get('/cookieLogin', async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

router.post('/userNameFromId', async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }

        const body = req.body
        if (!body.userId) {
            res.status(400).json({message: 'missing userId'})
        }
        const userToFind = await dbUser.findOne({_id: body.userId})
        if (!userToFind) {
            res.status(404).json({message: 'user not found'})
            return
        }
        res.status(200).json({userName: userToFind.userName})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

module.exports = router;