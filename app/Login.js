import React from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import { postLoginAC } from './my_redux.js'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: undefined, error: false};
  }

  // static navigationOptions = {
  //   title: 'Login',
  // };

  handleChangeText(text) {
    this.setState({text, error: false})
  }

  handleLoginSubmit() {
    console.log('login submit')
    if (this.state.text && this.state.text.length > 2){
      this.props.dispatch(postLoginAC(this.state.text))
    } else {
      this.setState({error: true})
    }

  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel error={this.state.error}>
              <Label>Username</Label>
              <Input onChangeText={this.handleChangeText.bind(this)} value={this.state.text}/>
            </Item>
          </Form>
          <Button
            title="Submit"
            onPress={this.handleLoginSubmit.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}


export default connect()(Login)
