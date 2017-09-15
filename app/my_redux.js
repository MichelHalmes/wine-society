import { combineReducers } from 'redux'
import client from './client.js'


const REQUEST_POST_LOGIN = 'REQUEST_POST_LOGIN'
const RECEIVE_POST_LOGIN = 'RECEIVE_POST_LOGIN'

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


const NEXT_PHASE = 'NEXT_PHASE'
export const PHASES = {
  GUESS: 'guess',
  REVEAL: 'reveal'
}

export function nextPhaseAC() {
  return { type: NEXT_PHASE }
}

function phaseReducer(state = PHASES.GUESS, action) {
  switch (action.type) {
    case NEXT_PHASE:
      switch(state) {
        case PHASES.GUESS:
          return PHASES.REVEAL
        case PHASES.REVEAL:
          return PHASES.GUESS
      }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  usernameReducer,
  phaseReducer
})

export default rootReducer