import React from 'react';

// import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Badge, Card, CardItem } from 'native-base';
import { View, TouchableHighlight, Text } from 'react-native'

export default class WineTag extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 5,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', justifyContent: "center", alignItems: "center"}} >
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: "center"}}>
              {this.props.tag}
            </Text>
          </View>
          <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
            <Text style={{textAlignVertical: "center",textAlign: "center",}}>
              {this.props.wine}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
