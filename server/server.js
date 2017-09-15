const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use( bodyParser.json() );

// ===== STATE =====

const PHASES = {
  GUESS: 'guess',
  REVEAL: 'reveal'
}

const WINES = ['Merlot', 'Pinotage', 'Cabernet Sauvignon', 'Pinot Noir', 'Shiraz']
const NB_ROUNDS = 4 // Number of actual bottles in the game

// ===== STATE =====

let TAGS = {'1': null, '2': null, '3': null, '4': null, 'X': null}
let PLAYERS = {
  // 'Mich':{
  //   points: 4,
  //   'guesses': [,{
  //     "1": "Merlot",
  //     "2": "Shiraz",
  //     "3": "Pinotage",
  //     "4": "Cabernet Sauvignon"
  //   }]},
  // 'Pete':{
  //   points: 0,
  //   'guesses': [,{
  //     '1': 'Merlot',
  //     '3': 'Shiraz',
  //     '2': 'Pinotage',
  //     'X': 'Cabernet Sauvignon'
  //   }]}
}
let CURR_ROUND = 1
let CURR_PHASE = PHASES.GUESS
let CURR_REVEAL_TAG = null

// ===== ENDPOINTS =====


app.post('/api/login', function (req, res) {
  const username = req.body.username
  console.log('/api/login', username)
  let already_exists
  if (PLAYERS[username]) {
    already_exists = true
  } else {
    already_exists = false
    PLAYERS[username] = {points: 0, guesses: []}
  }
  res.json({already_exists})
  console.log(PLAYERS)
})

app.get('/api/wines_tags', function (req, res) {
  console.log('/api/wines_tags')
  const wines_to_guess = WINES
    .filter(wine => Object.values(TAGS).indexOf(wine) < 0 )
  const tags_to_guess = Object.keys(TAGS)
    .filter(tag => TAGS[tag] === null )
  res.json({
    wines: wines_to_guess,
    tags: tags_to_guess
  })
})

app.post('/api/guess', function (req, res, next) {
  const username = req.body.username
  let guess = req.body.guess
  console.log('/api/guess', username, guess, PLAYERS[username])
  if (PLAYERS[username] === undefined) {
    console.error('Unrecognized user!', username)
    return res.status(404).send(`Unrecognized user: ${username}`);
  }

  guess = Object.keys(guess).reduce((acc, tag) => {
    if (tag!='X' && Object.keys(TAGS).indexOf(tag)>=0){
      acc[tag] = guess[tag]
    }
    return acc
  }, {})
  PLAYERS[username].guesses[CURR_ROUND] = guess
  CURR_PHASE = PHASES.REVEAL
  if (Object.values(PLAYERS).some(player => player.guesses[CURR_ROUND]===undefined)) {
    console.log(`Waiting for guesses in round ${CURR_ROUND}`)
    return res.json({ok: true})
  }
  console.log(`All players have guessed for round ${CURR_ROUND}`)
  if (CURR_REVEAL_TAG) {
    console.log(`Reusing exiting RevealTag`)
    return res.json({ok: true})
  }

  const guesses_per_tag = Object.values(PLAYERS)
    .map(player  => player.guesses[CURR_ROUND])
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

  CURR_REVEAL_TAG = tag_to_reveal

  res.json({ok: true})
})

app.get('/api/reveal_tag', function (req, res) {
  console.log('/api/reveal_tag')
  res.json({
    phase: CURR_PHASE,
    reveal_tag: CURR_REVEAL_TAG,
    wines: WINES.filter(wine => Object.values(TAGS).indexOf(wine) < 0)
  })
})

app.post('/api/reveal_tag', function (req, res, next) {
  const tag = req.body.tag
  const wine = req.body.wine
  console.log('/api/reveal_tag -- post', tag, wine)
  if (CURR_REVEAL_TAG != tag) {
    console.error(`Revealed wrong tag: ${tag} vs ${CURR_REVEAL_TAG}`)
    return res.status(404).send(`Revealed wrong tag: ${tag} vs ${CURR_REVEAL_TAG}`);
  }
  if (CURR_PHASE != PHASES.REVEAL) {
    console.error(`Nothing to reveal`)
    return res.status(404).send(`Nothing to reveal`);
  }
  if (WINES.indexOf(wine) < 0) {
    console.error(`Wine does not exist: ${wine}`)
    return res.status(404).send(`Wine does not exist: ${wine}`);
  }

  CURR_REVEAL_TAG =  null
  CURR_PHASE = PHASES.GUESS
  TAGS[tag] = wine

  Object.values(PLAYERS).forEach(player => {
    const total_points = player.guesses
      .map(guess =>
        Object.keys(guess)
          .reduce((points_acc, tag) => points_acc += guess[tag]==TAGS[tag]? NB_ROUNDS-CURR_ROUND+1 : 0, 0))
      .reduce((points_acc, round_points) => points_acc += round_points, 0)
    player.points = total_points
  })
  console.log(PLAYERS)

  CURR_ROUND += 1

  res.json({ ok: true })
})

app.get('/api/points/:username', function (req, res) {
  const username = req.params.username
  console.log('/api/points', username)
  const player = PLAYERS[username]
  if (player === undefined) {
    console.error(`Username ${username} not found`)
    return res.status(404).send(`Username '${username}' not found`);
  }
  let summary = player.guesses
    .map((guess, round) =>
      Object.keys(guess)
        .reduce((summary_acc, tag) => {
          const points = TAGS[tag] && (guess[tag]==TAGS[tag]? NB_ROUNDS-round+1 : 0)
          summary_acc[tag] = {points, wine: guess[tag]}
          return summary_acc
        }
        , {}))

    console.log(summary)


  res.json({ points: player.points, summary })
})


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
