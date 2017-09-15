

const SERVER_HOST_PORT = 'http://192.168.0.102:3000'


function checkStatus(response) {
  console.log('checkStatus')
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(response);
    throw error;
  }
}

function postLogin(username) {
  console.log('Login')
  return fetch(`${SERVER_HOST_PORT}/api/login`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function getWinesTags() {
  console.log('getWinesTags')
  return fetch(`${SERVER_HOST_PORT}/api/wines_tags`, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function postGuess(username, guess) {
  console.log('Guess')
  return fetch(`${SERVER_HOST_PORT}/api/guess`, {
      method: 'POST',
      body: JSON.stringify({ username, guess }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function getRevealTag() {
  console.log('getRevealTag')
  return fetch(`${SERVER_HOST_PORT}/api/reveal_tag`, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function postRevealTag(tag, wine) {
  console.log('Guess')
  return fetch(`${SERVER_HOST_PORT}/api/reveal_tag`, {
      method: 'POST',
      body: JSON.stringify({ tag, wine }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function getPoints(username) {
  console.log('Guess')
  return fetch(`${SERVER_HOST_PORT}/api/points/${username}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}




export default {
  postLogin,
  getWinesTags,
  postGuess,
  getRevealTag,
  postRevealTag,
  getPoints
}
