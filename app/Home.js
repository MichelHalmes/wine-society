import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import GuessWines from './GuessWines.js'
import RevealTag from './RevealTag.js'
import Points from './Points.js'


import {PHASES} from './my_redux.js'

class Main extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'App',
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('Points')}>
        <Icon name='menu' />
      </Button>
    )
  });


  getContentComponent(){
    switch(this.props.phase) {
      case PHASES.GUESS:
        return <GuessWines />
      case PHASES.REVEAL:
        return <RevealTag navigation={this.props.navigation}/>
      default:
        throw new Error(`Unrecognised state ${this.props.phase}`)
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.phase==PHASES.GUESS && prevProps.phase==PHASES.REVEAL) {
  //     const { navigate } = this.props.navigation;
  //     navigate('Points')
  //   }
  // }

  showPoints() {
    const { navigate } = this.props.navigation;
    navigate('Points')
  }

  render() {

    return (
      <Container>
        <Header>
          <Body>
            <Title>Cheers {this.props.username}!</Title>
          </Body>
        </Header>
        <Content>
          {this.getContentComponent()}
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

function mapStateToProps(state) {
  return {
    username: state.usernameReducer,
    phase: state.phaseReducer
  }
}

export default StackNavigator({
  Main: { screen: connect(mapStateToProps)(Main) },
  Points: { screen: Points },
})
