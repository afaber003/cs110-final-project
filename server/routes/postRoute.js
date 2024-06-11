const express = require('express');
const router = express.Router();
const {dbPost} = require("../models/Post");
const {authenticateUser, getUserFromReq} = require("../services/authService");
const {PermissionLevel} = require("../models/Classes");

// Gets all posts
router.post('/', async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }

        let posts = await dbPost.find({}).sort({creationDate: -1})
        if (req.body.searchTerm && req.body.searchTerm !== '') {
            posts = posts.filter(post => (
                post.description.toLowerCase().includes(req.body.searchTerm.toLowerCase())
                || post.userName.toLowerCase().includes(req.body.searchTerm.toLowerCase())
            ))
        }

        res.status(200).json(posts)
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
            userName: user.userName,
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

// Create a comment on a post
router.post("/comment", async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }
        const body = req.body
        const user = await getUserFromReq(req)

        if (!body.text) {
            res.status(400).json({message: "missing text"})
        }
        if (!body.postId) {
            res.status(400).json({message: "missing postId"})
        }

        const post = await dbPost.findOne({_id: body.postId})
        if (!post) {
            res.status(404).json({message: 'post not found'})
        }

        post.comments.push({
            userName: user.userName,
            userId: user.id,
            text: body.text
        })

        await post.save()
        res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

// toggles the given user's "like" on the post
router.post("/like", async (req, res) => {
    try {
        if (!(await authenticateUser(req, PermissionLevel.User))) {
            res.status(401).json({message: 'Not authorized'});
            return
        }
        const user = await getUserFromReq(req)
        const body = req.body
        if (!body.postId) {
            res.status(400).json({message: "missing postId"})
        }

        const post = await dbPost.findOne({_id: body.postId})
        if (!post) {
            res.status(404).json({message: "post not found"})
        }

        const likeIndex = post.likes.indexOf(user.id)
        if (likeIndex >= 0) {
            post.likes.splice(likeIndex, 1)
        } else {
            post.likes.push(user.id)
        }

        await post.save()
        res.status(200).json(post)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
})

module.exports = router;