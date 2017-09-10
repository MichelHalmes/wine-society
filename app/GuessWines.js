import React from 'react';
import {
  Button,
  Text,
  Spinner,
  H3
} from 'native-base';

import { View } from 'react-native'

import SortableListView from './SortableListView.js'
import WineTag from './WineTag.js'
import client from './client.js'


export default class GuessWines extends React.Component {
  constructor(props) {
    super(props)
    this.tags = []
    this.wines_ordered = []
    this.state = {data: {}}
  }

  refreshState() {
    console.log('refreshState')
    let data = this.tags.reduce((acc, cur, i) => {
      acc[cur] = this.wines_ordered[i]
      return acc
    }, {})
    this.setState({data})
  }

  componentDidMount() {
    console.log('home componentDidMount')
    client.getWinesTags()
      .then(({wines, tags}) => {
        console.log(wines, tags)
        this.tags = tags
        this.wines_ordered = wines
        this.refreshState()
      })
  }

  handleRowMove(e) {
    this.wines_ordered.splice(e.to, 0, this.wines_ordered.splice(e.from, 1)[0])
    this.refreshState()
  }

  handleGuessSubmit() {
    console.log(this.state.data)
    client.postGuess(this.props.username, this.state.data)
      .then(res => {
        console.log('Submitted guess', res.ok)
      })
    this.tags = []
    this.wines_ordered = []
    this.setState({data: {}})
    this.props.nextPhase()
  }

  render() {
    if (this.tags.length == 0) {
      return(
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Spinner />
          <H3 style={{textAlign: 'center'}}>
            Waiting for new round to start!
          </H3>
        </View>
      )
    } else {
      return (
        <View>
          <SortableListView
            style={{ flex: 1 }}
            data={this.state.data}
            order={this.tags}
            onRowMoved={e => this.handleRowMove(e)}
            renderRow={(data, section, index) => <WineTag wine={data} tag={index}/>}
          />
          <Button block success onPress={this.handleGuessSubmit.bind(this)}>
            <Text>Submit</Text>
          </Button>
        </View>
      )
    }
  }
}