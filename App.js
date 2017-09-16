import Expo from "expo";
import React from "react";

import Root  from './app/Root.js';

export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })
    .then(res => {
      this.setState({ isReady: true });
    })
    .catch(err => {
      console.error('Error when mounting app component', err)
      throw err
    })
  }


  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <Root />;
  }
}


// https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c
// https://github.com/saberking/react-native-draggable-list

// http://ionicons.com/
