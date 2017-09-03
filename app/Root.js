import React from 'react';

import Login from './Login.js';
import Home from './Home.js';

export default class PlayerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: undefined, xx: 1};
  }

  handleLoginSubmit(name) {
    this.setState({name})
  }

  render() {
    return (this.state.name ?
      <Home name={this.state.name}/> :
      <Login onLoginSubmit={this.handleLoginSubmit.bind(this)}/>
    )
  }
}
