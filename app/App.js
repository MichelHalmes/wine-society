
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'


import Home from './Home.js'
import Login from './Login.js'
import Points from './Points.js'

const AppNav = StackNavigator({
  Home: { screen: Home },
  Points: { screen: Points },
})

class App extends React.Component {
  render() {
    console.log('render App', this.props)
    return  this.props.username ? <Home /> : <Login />
  }
}

function mapStateToProps(state) {
  return {username: state.usernameReducer}
}

export default connect(mapStateToProps)(App)
