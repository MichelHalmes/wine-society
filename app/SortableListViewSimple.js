import React from 'react'

import { View, StyleSheet } from 'react-native'

import {
  Badge,
  Text,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Button
} from 'native-base';

const styles = StyleSheet.create({
  'item.transit_1': {
    'transition-duration': '0s',
    'background-color': '#b1b1b1',
  },
  'item.transit_2': {
    'transition-duration': '0s',
    'opacity': 0.2,
  },
  'item': {
    'border-radius': '5px,'
    'transition': '.8s linear all',
  },
  'text.transit_up': {
    'transition-duration': '0s',
    transform: 'translateY(20px)',
  },
  'text.transit_down': {
    'transition-duration': '0s',
    'transform': 'translateY(-20px)',
  },
  'text': {
    'transition': '.1s linear all',
  },
})



export default class SortableListViewSimple extends React.Component {
  constructor() {
    super()
  }

  handleMove(idx, direction) {
    console.log(idx, direction)
    const event = {from: idx, to: idx-direction}
    if(event.to == -1) {
      return
    }
    this.props.onRowMoved(event)
  }

  render() {
    return (
      <List>
        {this.props.order.map((tag, i) => (
          <ListItem key={i} icon>
            <Left>
              <Badge style={{ margin: 8, backgroundColor: (tag=='X' ? 'grey' : 'maroon') }}>
                <Text>{tag}</Text>
              </Badge>
            </Left>
            <Body style={{ margin: 0}}>
              <Text>  {this.props.data[tag]}</Text>
            </Body>
            <Right>
              <Button transparent onPress={this.handleMove.bind(this, i, +1)} >
                <Icon name='md-arrow-round-up' style={{ margin: 8, color: (i==0 ? 'grey' : 'black') }}  />
              </Button>
              <Button transparent onPress={this.handleMove.bind(this, i, -1)} >
                <Icon name='md-arrow-round-down' style={{ margin: 8, color: (i==this.props.order.length-1 ? 'grey' : 'black') }}  />
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>
    )
  }
}
