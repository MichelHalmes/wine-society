import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: undefined};
  }

  render() {
    console.log(this.state)
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(text) => this.setState({text})} value={this.state.text}/>
            </Item>
          </Form>
          <Button
            title="Submit"
            onPress={() =>  this.props.onLoginSubmit(this.state.text)}
          />
        </Content>
      </Container>

    );
  }
}
