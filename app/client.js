

const SERVER_HOST_PORT = 'http://10.0.0.4:3000'

function handleError(error) {
  console.error(error);
}

function checkStatus(response) {
  console.log('checkStatus')
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function getWinesTags() {
  console.log('getWinesTags')
  return fetch(`${SERVER_HOST_PORT}/api/wines_tags`)
    .then(checkStatus)
    .then((response) => response.json())
    .catch(handleError);
}


// fetch('https://mywebsite.com/endpoint/', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue',
//   })
// })


export default {
  getWinesTags,
}
