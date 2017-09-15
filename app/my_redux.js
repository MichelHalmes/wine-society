import { combineReducers } from 'redux'

import client from './client.js'


export const REQUEST_POST_LOGIN = 'REQUEST_POST_LOGIN'
export const RECEIVE_POST_LOGIN = 'RECEIVE_POST_LOGIN'

export function postLoginAC(username) {
  console.log('1 postLoginAc')
  return dispatch => {
    console.log('disp postLoginAc')
    dispatch({ type: REQUEST_POST_LOGIN, username })
    return client.postLogin(username)
      .then(json => dispatch({ type: REQUEST_POST_LOGIN, username }))
  }
}

function usernameReducer(state = null, action) {
  switch (action.type) {
    case REQUEST_POST_LOGIN:
      return action.username
    default:
      return state
  }
}



const rootReducer = combineReducers({
  usernameReducer
})

export default rootReducer
