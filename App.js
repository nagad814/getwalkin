/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, FlatList, Image} from 'react-native';
import {Container, Content, Card, CardItem, Text, Header, Body, Left, Right, Button, Title, Icon} from 'native-base';
import CartModal from './CartModal'

const data = require("./coffee.json")

const IMG = {
  image1: require('./images/one.jpg'),
  image2: require('./images/two.jpg'),
  image3: require('./images/three.jpg'),
  image4: require('./images/four.jpg'),
  image5: require('./images/five.jpg'),
  image6: require('./images/six.jpg')
}



type Props = {};
export default class App extends Component<Props> {

  state = {cart:[], modalVisible: false};

  addToCart = (order) =>  this.setState({cart: [...this.state.cart, order]}, ()=>{console.log(this.state.cart)});

  openCart = ()=> this.setState(previousState => ({modalVisible:!previousState.modalVisible}));

  clearCart = ()=> this.setState({cart:[], modalVisible:false})

  _keyExtractor = (item, index) => item.name;


_renderItem = ({item}) => {
  return (
    <Card>
        <CardItem>
          <Body>
            <Image source={IMG[item.img]} style={styles.image}/>
          </Body>
        </CardItem>

        <CardItem>
            <Left>
              <Text>{item.name}</Text>
            </Left>
            <Right>
              <Button onPress={()=>this.addToCart(item)}>
                <Text>+ Cart</Text>
              </Button>
            </Right>
        </CardItem>
    </Card>
  )
};

  render() {
    return (
    <Container>
      <Header>
        <Right>
          <Button transparent onPress={this.openCart}>
            <Icon name="cart"/>
            <Text>{this.state.cart.length}</Text>
          </Button>
        </Right>
      </Header>

    <Content padder>
    <FlatList
        data={data.coffees}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    </Content>
    <CartModal modalVisible={this.state.modalVisible} 
        openCart={this.openCart} 
        clearCart={this.clearCart}
        cart={this.state.cart}/>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffafa',
  },
  image: {
    width:"100%", height: 200 
  }
});
