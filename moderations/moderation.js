const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

// Initializing app
const App = express()

// Middlewares
App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())

App.post('/events', async (req, res) => {
    try {
        console.log('Receved Event : ', req.body.type)

        const { type, data } = req.body

        if (type === 'CommentCreated') {
            const status = data.content.includes('orange') ? 'rejected' : 'approved'

            await axios.post('http://localhost:4009/events', { type: 'CommentModerated', data: { id: data.id, postId: data.postId, content: data.content, status } })
        }

        return res.json({ message: 'Comment Moderated Successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Comment Successfully Moderated')
    }
})

// Running server
const PORT = process.env.PORT || 4003
App.listen(PORT, () => console.log(`Moderation Service Running on port ${PORT}`))