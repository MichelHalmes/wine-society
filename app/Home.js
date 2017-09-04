import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { View, TouchableHighlight } from 'react-native'


import SortableListView from './SortableListView.js'
import client from './client.js'

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
        <Text>{this.props.index}  {this.props.data.tag}</Text>
      </TouchableHighlight>
    )
  }
}


export default class PlayerApp extends React.Component {
  constructor(props) {
    super(props)
    let __DATA = {
      pinotage: { tag: 1 },
      shiraz: { tag: 2 },
      merlot: { tag: 3 },
    }
    this.tags = []
    this.state = {order: [], data: {}}
  }

  componentDidMount() {
    client.getWinesTags()
      .then(({wines, tags}) => {
        console.log(wines, tags)
        let data = tags.reduce((acc, cur, i) => {
          acc[wines[i]] = {tag: cur}
          return acc;
        }, {})
        this.tags = tags
        this.setState({order: wines, data})

      })

  }

  handleRowMove(e) {
    let order_copy = this.state.order.slice()
    order_copy.splice(e.to, 0, order_copy.splice(e.from, 1)[0])
    let data_copy = {}
    order_copy.forEach((key, i) => {
      data_copy[key] = {tag: this.tags[i]}
    })
    this.setState({
      order: order_copy,
      data: data_copy
    })
    this.forceUpdate()
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
            data={this.state.data}
            order={this.state.order}
            onRowMoved={e => this.handleRowMove(e)}
            renderRow={(data, section, index) => <RowComponent data={data} index={index}/>}
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
