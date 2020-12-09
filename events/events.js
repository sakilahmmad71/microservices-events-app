const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')

// Initializing app
const App = express()

// Middlewares
App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())
App.use(cors())

const events = []

App.post('/events', async (req, res) => {
    const event = req.body

    events.push(event)

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4003/events', event)

    console.log('Event :: ' + event.type)

    return res.status(200).json({ message: "OK" })
})

App.get('/events', (req, res) => {
    return res.status(200).send(events)
})

// Running server
const PORT = process.env.PORT || 4009
App.listen(PORT, () => console.log(`Event Bus Service Running on port ${PORT}`))