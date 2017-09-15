import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  Spinner,
  H3,
  Form,
  Picker,
  List,
  ListItem,
  Right,
  Button,
  Card,
  CardItem,
  Body,
  Icon,
  Badge
} from 'native-base'

import { View } from 'react-native'
import _ from 'lodash'

import client from './client.js'

class Points extends React.Component {
  constructor(props) {
    super(props)
    this.state = {points: null, summary: null, }
  }

  static navigationOptions = {
    title: 'Points',
  }

  componentDidMount() {
    console.log('Points componentDidMount')
    client.getPoints(this.props.username)
      .then(res => {
        this.setState({points: res.points, summary: res.summary})
      })
  }

  getIcon(points) {
    if (points===null || points===undefined){
      return <Icon name='md-help-circle' style={{fontSize: 28, color: 'grey'}} />
    } else if (points===0) {
      return <Icon name='md-close-circle' style={{fontSize: 28, color: 'red'}} />
    } else if (points>=0) {
      return <Icon name='md-checkmark-circle' style={{fontSize: 28, color: 'green'}} />
    }

  }

  render() {
    if (!this.state.summary) {
      return(
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Spinner />
          <H3 style={{textAlign: 'center'}}>
            Waiting for results!
          </H3>
        </View>
      )
    }

    return(
      <View>
        <CardItem>
          <H3 style={{textAlign: 'center', marginTop: 5}}>
            You have {this.state.points} points!
          </H3>
        </CardItem>


        <List>
          {this.state.summary
            .filter(round => !!round)
            .map((round, i) =>
              <View key={i}>
                <ListItem itemDivider>
                  <Text>Round {i+1} ({_.sum(Object.values(round).map(round => round.points))} Points)</Text>
                </ListItem>
                {Object.keys(round).map((tag, i) =>
                  <ListItem key={i}>
                    <Badge style={{ backgroundColor: 'maroon' }}>
                      <Text>{tag}</Text>
                    </Badge>
                    <Text>  {round[tag].wine}  </Text>
                    {this.getIcon(round[tag].points)}
                  </ListItem>
                )}
              </View>
            )
          }
        </List>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {username: state.usernameReducer}
}

export default connect(mapStateToProps)(Points)
