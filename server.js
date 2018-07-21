require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const deals = require('./deals')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  res.send()
})

// Checking for Authorization in headers middleware
app.use((req, res, next) => {
  const token = req.get('Authorization')
  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

// GET deals
app.get('/deals', (req, res) => {
  deals.getDeals()
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

// POST signup
app.post('/signup', bodyParser.json(), (req, res) => {
  deals.signup(req.token, req.body)
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

// GET user authentication status
app.get('/auth/check', (req, res) => {
  deals.checkAuthUser(req.token)
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

// POST login
app.post('/login', bodyParser.json(), (req, res) => {
  deals.login(req.token, req.body)
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

// GET logout
app.get('/logout', (req, res) => {
  deals.logout(req.token)
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

// POST new deal
app.post('/create-new-deal', bodyParser.json(), (req, res) => {
  deals.createNewDeal(req.token, req.body)
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

// PUT edited deal
app.put('/deal/:id', bodyParser.json(), (req, res) => {
  deals.editDeal(req.token, req.params.id, req.body)
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

// DELETE deal
app.delete('/deal/:id', (req, res) => {
  deals.deleteDeal(req.token, req.params.id)
  .then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error.'
      })
    }
  )
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
