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

// Application Routes
App.get('/posts', async (req, res) => {
    try {
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Get Posts Successfully!')
    }
})

App.post('/posts', async (req, res) => {
    try {
        const id = randomBytes(4).toString('hex')
        const { title } = req.body

        // Saving Data into Store
        posts[id] = { id, title }

        // Send Event as a post has been created with type and data.
        const eventData = { type: 'PostCreated', data: { id, title } }
        await axios.post('http://localhost:4009/events', eventData)

        return res.status(201).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Make Posts Successfully!')
    }
})

App.post('/events', async (req, res) => {
    try {
        console.log('Receved Event : ', req.body.type)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } finally {
        console.log('✅ Posts Service Received an Event Successfully!')
    }
})


// Running server
const PORT = process.env.PORT || 4000
App.listen(PORT, () => console.log(`Posts Service Running on port ${PORT}`))