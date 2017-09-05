import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';



import SortableListView from './SortableListView.js'
import WineTag from './WineTag.js'
import client from './client.js'


export default class PlayerApp extends React.Component {
  constructor(props) {
    super(props)
    this.tags = []
    this.state = {order: [], data: {}}
  }

  componentDidMount() {
    console.log('home componentDidMount')
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
            <Title>Cheers {this.props.username}!</Title>
          </Body>
          <Right />
        </Header>
        <Content>

          <SortableListView
            style={{ flex: 1 }}
            data={this.state.data}
            order={this.state.order}
            onRowMoved={e => this.handleRowMove(e)}
            renderRow={(data, section, index) => <WineTag data={data} index={index}/>}
          />
        <Button block success><Text>Submit</Text></Button>


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
