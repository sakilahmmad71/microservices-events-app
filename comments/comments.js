const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

// Initializing app
const App = express()

// Middlewares
App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())
App.use(cors())

// Application Database
const commentsByPostId = {}

App.get('/posts/:id/comments', async (req, res) => {
    try {
        return res.status(200).json(commentsByPostId[req.params.id] || [])
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Get Comments Successfully!')
    }
})

App.post('/posts/:id/comments', async (req, res) => {
    try {
        const id = randomBytes(4).toString('hex')
        const { content } = req.body

        // Saving data into store
        const comments = commentsByPostId[req.params.id] || []
        comments.push({ id, content, status: 'pending' })
        commentsByPostId[req.params.id] = comments

        // Send event as a comment has been created with type and data
        const eventData = { type: 'CommentCreated', data: { id, content, postId: req.params.id, status: 'pending' } }
        await axios.post('http://localhost:4009/events', eventData)

        return res.status(201).json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Make Comments Successfully!')
    }
})

App.post('/events', async (req, res) => {
    try {
        console.log('Receved Event : ', req.body.type)
        const { type, data } = req.body

        if (type === 'CommentModerated') {
            const { id, content, postId, status } = data
            const comments = commentsByPostId[postId]
            const comment = comments.find(comment => comment.id === id)
            comment.status = status

            await axios.post('http://localhost:4009/events', { type: 'CommentUpdated', data: { id, content, postId, status } })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Comments Service Received an Event Successfully!')
    }
})

// Running server
const PORT = process.env.PORT || 4001
App.listen(PORT, () => console.log(`Comments Service Running on port ${PORT}`))