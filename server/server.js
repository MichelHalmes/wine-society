const express = require('express')
const app = express()

let WINES = ['Merlot', 'Pinotage', 'Cabernet Sauvignon', 'Pinot Noir', 'Shiraz']
let TAGS = ['1', '2', '3', '4', 'X']
let players = []
let revelations = {}

app.get('/api/wines_tags', function (req, res) {
  res.json({
    wines: WINES,
    tags: TAGS
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
