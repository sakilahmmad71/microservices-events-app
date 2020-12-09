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

// Our Database
const posts = {}

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data

        posts[id] = { id, title, comments: [] }
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        post.comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id === id)
        comment.status = status
        comment.content = content
    }
}

// Application Routes
App.get('/posts', async (req, res) => {
    try {
        return res.status(200).json({ posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅Posts and Comments From Query Service Get Successfully!')
    }
})

App.post('/events', async (req, res) => {
    try {
        const { type, data } = req.body

        handleEvent(type, data)

        return res.status(201).json({ message: 'Data Saved Successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Query Service Received an Event and Took Necessary Actions Successfully.')
    }
})

// Running server
const PORT = process.env.PORT || 4002
App.listen(PORT, async () => {
    console.log(`Query Service Running on port ${PORT}`)

    const response = await axios.get('http://localhost:4009/events')

    for (let event of response.data) {
        console.log('Processing event : ', event.type)
        handleEvent(event.type, event.data)
    }
})