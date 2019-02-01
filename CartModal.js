/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {FlatList, Modal, Image, StyleSheet } from 'react-native';
import {Container, Content, Card, CardItem, Text, Header, Body, Left, Right, Button, Title, Icon} from 'native-base';

const IMG = {
    image1: require('./images/one.jpg'),
    image2: require('./images/two.jpg'),
    image3: require('./images/three.jpg'),
    image4: require('./images/four.jpg'),
    image5: require('./images/five.jpg'),
    image6: require('./images/six.jpg')
  }

export default class CartModal extends Component<Props> { 

    _keyExtractor = (item, index) => {
        console.log(index);
        console.log(item);
        return item.name;
    } 


    _renderItem = ({item}) => {
      return (
        <Card>
            <CardItem>
              <Left>
                <Image source={IMG[item.img]} style={styles.image}/>
              </Left>
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



    render(){
        console.log(this.props.cart);
        return(
            <Modal animationType="slide"  visible={this.props.modalVisible} >
            <Container>
                <Header>
                <Left>
                <Button transparent onPress={this.props.clearCart}>
                    <Icon name="trash"/>
                </Button>
                </Left>
                <Right>
                <Button transparent onPress={this.props.openCart}>
                    <Icon name="close"/>
                </Button>
                </Right>
                </Header>

                <Content padder>

                <FlatList 
                    data={this.props.cart}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                
                </Content>

            </Container>

            </Modal>
        )
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
      width:"30%", height: 50 
    }
  });