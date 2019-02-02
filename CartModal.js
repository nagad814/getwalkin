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
import {Container, Content, Card, CardItem, Text, Header, Body, Left, Right, Button, Title, Icon, Footer} from 'native-base';
import IMG from './IMG'


export default class CartModal extends Component<Props> { 

    _keyExtractor = (item, index) => {
        return item.name;
    } 


    _renderItem = ({item}) => {
      return (
        <Card>
            <CardItem>
              <Left>
                <Image source={IMG[item.img]} style={styles.image}/>
              </Left>
              <Body style={{justifyContent:"center"}}>
                <Text> {item.name} </Text>
              </Body>
              <Right>
                <Text> Rs:{item.price} </Text>
              </Right>
            </CardItem>
        </Card>
      )
    };



    render(){
        let arr  = [...this.props.cart]
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
                    data={arr}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />

                <Footer>
                    <Left>
                        <Title>  Total</Title>
                    </Left>
                    <Right>
                    <Title>Rs:{this.props.total} </Title>
                    </Right>
                </Footer>                
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
      width:"80%", height: 100 
    }
  });