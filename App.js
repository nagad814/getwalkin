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
import IMG from './IMG'

const data = require("./coffee.json")


type Props = {};
export default class App extends Component<Props> {

  state = {cart:[], modalVisible: false, total:0};

  addToCart = (order) =>  {

    var a = [...this.state.cart, order];
    var lastId;
    var b = [];

    a.sort(function (x, y) {
          if (x['name'] < y['name']) {
              return -1;
          }
          if (x['name'] > y['name']) {
            return 1;
          }
          return 0;
      });


    for (var i = 0; i < a.length; i++) {
        if (lastId == a[i]['name']) {
            b[b.length-1]['price'] += a[i]['price'];
        } else {
            b[b.length] = (a[i]);
            lastId = a[i]['name'];
        }
    }

    c = [...b]

    let result = c.map(x => x.price);
    var total = result.reduce((x,y) => x+y, 0);
    this.setState({cart:[...b], total})
  }



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
              <Text>{item.name}  Rs:{item.price}</Text>
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
        cart={this.state.cart}
        total={this.state.total}/>
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
