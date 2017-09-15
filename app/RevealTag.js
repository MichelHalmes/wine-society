import React from 'react';
import {
  Text,
  Spinner,
  H3,
  Form,
  Picker,
  Radio,
  ListItem,
  Right,
  Button
} from 'native-base'

import { View } from 'react-native'

// import reactMixin from 'react-mixin'
// import TimerMixin from 'react-timer-mixin'

import client from './client.js'


export default class RevealTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {reveal_tag: null, wines: [], selected_wine: null}
  }

  componentDidMount() {
    console.log('guesswines componentDidMount')
    this.checkRevealTag()
  }

  checkRevealTag() {
    client.getRevealTag()
      .then(({phase, reveal_tag, wines}) => {
        console.log('checkRevealTag', phase, reveal_tag)
        if (phase != 'reveal') {
          this.props.nextPhase()
        } else if (!reveal_tag) {
          // this.setTimeout(this.checkRevealTag, 2000)
        } else {
          this.setState({reveal_tag, wines, selected_wine: undefined})
        }
      })
  }

  handleSelectWine(value: string) {
    this.setState({selected_wine: value });
  }

  handleRevealSubmit() {
    client.postRevealTag(this.state.reveal_tag, this.state.selected_wine)
      .then(res => {
        if (res.ok) {
          this.props.nextPhase()
        }
      })
  }

  render() {
    if (!this.state.reveal_tag) {
      return(
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Spinner />
          <H3 style={{textAlign: 'center'}}>
            Waiting for co-players to finish!
          </H3>
        </View>
      )
    }
    return(
      <View>
        <H3 style={{textAlign: 'center', marginTop: 5}}>
          Reveal tag: {this.state.reveal_tag}!
        </H3>
        <Form>
          <Picker
            placeholder="Click here!"
            iosHeader="Select a wine!"
            mode="dropdown"
            selectedValue={this.state.selected_wine}
            onValueChange={this.handleSelectWine.bind(this)}
          >
            {this.state.wines.map((wine, i) =>
              <Picker.Item label={wine} value={wine} key={i} />
            )}
          </Picker>
        </Form>
        <Button block success disabled={!this.state.selected_wine} onPress={this.handleRevealSubmit.bind(this)}>
          <Text>Submit</Text>
        </Button>
      </View>
    )
  }
}

// reactMixin(RevealTag.prototype, TimerMixin);
