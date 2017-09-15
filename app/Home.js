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
} from 'native-base';


import GuessWines from './GuessWines.js'
import RevealTag from './RevealTag.js'
import Points from './Points.js'


const PHASES = {
  GUESS: 'guess',
  REVEAL: 'reveal',
  POINTS: 'points'
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {phase: PHASES.POINTS }
  }

  nextPhase() {
    switch(this.state.phase) {
      case PHASES.GUESS:
        this.setState({phase: PHASES.REVEAL })
        break;
      case PHASES.REVEAL:
        this.setState({phase: PHASES.POINTS })
        break;
      case PHASES.POINTS:
        this.setState({phase: PHASES.GUESS })
        break;
      default:
        throw new Error(`Unrecognised state ${this.state.phase}`)
    }
  }

  getContentComponent(){
    console.log('home componentDidMount', this.state)
    switch(this.state.phase) {
      case PHASES.GUESS:
        return <GuessWines username={this.props.username} nextPhase={this.nextPhase.bind(this)}/>
      case PHASES.REVEAL:
        return <RevealTag nextPhase={this.nextPhase.bind(this)}/>
      case PHASES.POINTS:
        return <Points username={this.props.username} nextPhase={this.nextPhase.bind(this)}/>
      default:
        throw new Error(`Unrecognised state ${this.state.phase}`)
    }
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
          <Right></Right>
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
