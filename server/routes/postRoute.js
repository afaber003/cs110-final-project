const express = require('express');
const router = express.Router();
const {dbPost} = require("../models/Post");
const {authenticateUser} = require("../services/authService");

// Gets all posts
router.get('/', async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }

        //
        // Maybe add filters here? not sure if we're going to bother adding them
        //

        res.status(200).json(await dbPost.find({}).sort({creationDate: -1}))
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

// Create a new post
router.post('/create', async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }

        const body = req.body
        if (!body.imageUrl) {
            res.status(400).json({message: 'No image URL'});
            return
        }

        const user = await getUserFromReq(req)
        if (!user) {
            res.status(404).json({message: 'No user found'})
            return
        }

        const newPost = new dbPost({
            owner: user._id,
            imageUrl: body.imageUrl,
            creationDate: Date.now(),
            description: body.description ? body.description : '',
        })
        await newPost.save()

        res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

module.exports = router;