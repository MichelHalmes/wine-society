import React from 'react';
import {
  Text,
  Spinner,
  H3
} from 'native-base';

import { View } from 'react-native'



export default class GuessTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {reveal: null}
  }


  render() {
    return(
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <Spinner />
        <H3 style={{textAlign: 'center'}}>
          Waiting for new round to start!
        </H3>
      </View>
    )
  }
}
