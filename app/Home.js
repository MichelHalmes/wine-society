import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { View, TouchableHighlight } from 'react-native'

import SortableListView from './SortableListView.js'

const tags = [2, 4, 6]

let data = {
  pinotage: { text: 'Pinotage', tag: 1 },
  shiraz: { text: 'Shiraz', tag: 2 },
  merlot: { text: 'Merlot', tag: 3 },

}

class RowComponent extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}  {this.props.data.tag}</Text>
      </TouchableHighlight>
    )
  }
}


export default class PlayerApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {order: Object.keys(data) }

  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Cheers {this.props.name}!</Title>
          </Body>
          <Right />
        </Header>
        <Content>

          <SortableListView
            style={{ flex: 1 }}
            data={data}
            order={this.state.order}
            onRowMoved={e => {
              console.log(e)
              let order_copy = this.state.order.slice()
              order_copy.splice(e.to, 0, order_copy.splice(e.from, 1)[0])
              console.log(order_copy)
              this.setState({order: order_copy})
              order_copy.forEach((key, i) => {
                data[key].tag = tags[i]
              })
              console.log(data)
              this.forceUpdate()
              // console.log(order)
            }}
            renderRow={(data, section, index, highlightfn, active) => <RowComponent data={data} section={section} index={index}/>}
          />

        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
