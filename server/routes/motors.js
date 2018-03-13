const express = require('express')

const router = express.Router()

const db = require('../db')

router.post('/motors', (req, res) => {
  db.getMongoBikes(req.body)
    .then(bikes => {
      res.json({bikes})
    }
    )
    .catch(err => {
      res.status(500).send('DATABASE ERROR:' + err.message)
    })
})

module.exports = router
