const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use( bodyParser.json() );

let WINES = ['Merlot', 'Pinotage', 'Cabernet Sauvignon', 'Pinot Noir', 'Shiraz']
let TAGS = {'1': undefined, '2': undefined, '3': undefined, '4': undefined, 'X': undefined}
let players = {}
let revelations = {}

app.post('/api/login', function (req, res) {
  console.log('/api/login')
  const username = req.body.username
  let already_exists
  if (players[username]) {
    already_exists = true
  } else {
    already_exists = false
    players[username]= []
  }
  res.json({already_exists})
  console.log(players)
})

app.get('/api/wines_tags', function (req, res) {
  console.log('/api/wines_tags')
  res.json({
    wines: WINES,
    tags: Object.keys(TAGS)
  })
})


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
