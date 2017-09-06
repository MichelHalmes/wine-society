const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use( bodyParser.json() );

const WINES = ['Merlot', 'Pinotage', 'Cabernet Sauvignon', 'Pinot Noir', 'Shiraz']
const NB_ROUNDS = 4 // Number of actual bottles in the game

let TAGS = {'1': null, '2': null, '3': null, '4': null, 'X': null}
let PLAYERS = {
  'Mich': [],
  'Pete':[ { '1': 'Merlot',
       '3': 'Pinotage',
       '4': 'Cabernet Sauvignon',
       'X': 'Pinot Noir',
       '2': 'Shiraz' } ]
     }
let CURR_ROUND = 0


app.post('/api/login', function (req, res) {
  const username = req.body.username
  console.log('/api/login', username)
  let already_exists
  if (PLAYERS[username]) {
    already_exists = true
  } else {
    already_exists = false
    PLAYERS[username]= []
  }
  res.json({already_exists})
  console.log(PLAYERS)
})

app.get('/api/wines_tags', function (req, res) {
  console.log('/api/wines_tags')
  res.json({
    wines: WINES,
    tags: Object.keys(TAGS)
  })
})

app.post('/api/guess', function (req, res) {
  const username = req.body.username
  const guess = req.body.guess
  console.log('/api/guess', username, guess, PLAYERS[username])
  if (PLAYERS[username] === undefined) {
    return res.status(404).send('Unrecognized user!')
  }
  PLAYERS[username][CURR_ROUND] = guess
  if (Object.values(PLAYERS).some(rounds => rounds[CURR_ROUND]===undefined)) {
    console.log(`Waiting for guesses in round ${CURR_ROUND}`)
    return res.json({reveal: false})
  }
  console.log(`All players have guessed for round ${CURR_ROUND}`)

  const guesses_per_tag = Object.values(PLAYERS)
    .map(player_rounds  => player_rounds[CURR_ROUND])
    .reduce((acc_tag_guess, player_guess) => {
      Object.keys(player_guess)
        .filter(tag => TAGS[tag] === null) //Only existing tags that havent been guessed yet
        .forEach(tag => {
          acc_tag_guess[tag] ?
                acc_tag_guess[tag].push(player_guess[tag]):
                acc_tag_guess[tag] = [ player_guess[tag] ]
        })
      return acc_tag_guess
    }, {})

  const guess_counts_list = Object.keys(guesses_per_tag)
    .map(tag => {
      let guess_counts_list = guesses_per_tag[tag]
        .reduce((acc_counts, guess) => {
          acc_counts[guess] ? acc_counts[guess]++ : acc_counts[guess] = 1
          return acc_counts;
        }, {})
      return guess_counts_list
      console.log(guess_counts_list, tag)
    })
  console.log('guess_counts_list', guess_counts_list)

  const entropies = guess_counts_list
    .map(guess_counts => {
      // const guess_counts = guess_counts[idx]
      const total_counts = Object.values(guess_counts).reduce((a, b) => a + b, 0)
      const entropy = Object.values(guess_counts)
        .reduce((entropy_acc, count) => {
          const proba = count/total_counts
          return entropy_acc - proba*Math.log(proba)
        }, 0.0)
      return entropy
    })

  console.log('entropies',entropies)
  const lowest_entropy_idx = Object.keys(entropies)
    .reduce((a, b) => {
      return entropies[a] == entropies[b] ?
        (Math.random() < .5 ? a : b):
        (entropies[a] < entropies[b] ? a : b)
    })
  const tag_to_reveal = Object.keys(guesses_per_tag)[lowest_entropy_idx]
  console.log(tag_to_reveal)

  res.json({reveal: tag_to_reveal})
})


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
