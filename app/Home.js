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


const PHASES = {
  GUESS: 'guess',
  REVEAL: 'reveal'
}

export default class PlayerApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {phase: PHASES.GUESS }
  }

  nextPhase() {
    switch(this.state.phase) {
      case PHASE.GUESS:
        this.setState({phase: PHASES.REVEAL })
        break;
      case PHASE.REVEAL:
        this.setState({phase: PHASES.GUESS })
        break;
      default:
        throw new Error(`Unrecognised state ${this.state.phase}`)
    }
  }

  getContentComponent(){
    switch(this.state.phase) {
      case PHASES.GUESS:
        return <GuessWines username={this.props.username} nextPhase={this.nextPhase}/>
      case PHASES.REVEAL:
        return <RevealTag nextPhase={this.nextPhase}/>
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
