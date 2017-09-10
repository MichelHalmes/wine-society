

const SERVER_HOST_PORT = 'http://10.0.0.4:3000'


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




export default {
  getWinesTags,
  postLogin,
  postGuess
}
