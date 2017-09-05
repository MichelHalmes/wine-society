import React from 'react';

import Login from './Login.js'
import Home from './Home.js'
import client from './client.js'

export default class PlayerApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: 'Mich'}
  }

  handleLoginSubmit(username) {
    console.log('root handleLoginSubmit', username)

    client.postLogin(username)
      .then(res => {
        console.log('login OK', res)
        this.setState({username})
      })
  }

  render() {
    return (this.state.username ?
      <Home username={this.state.username}/> :
      <Login onLoginSubmit={this.handleLoginSubmit.bind(this)}/>
    )
  }
}
