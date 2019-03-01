/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation'
type Props = {};
export default class HomePage extends Component<Props> {
  static navigationOptions={
      title:'Home',
      headerBackTitle:'返回111'
  }
  render() {
    const {navigation}=this.props
    return (
      <View style={styles.container}>
        <View style={{height:45,backgroundColor:'#24a3ff'}}>
          <Image style={styles.navImg} source={require('../img/zbtLogo.png')} />
        </View>
        <Text style={styles.welcome}>Welcome to HomePage</Text>
        <Button
            title={'go to page1'}
            onPress={()=>{
                navigation.navigate('Page1',{name:'dongtaide'})
            }}
        />
        <Button
            title={'go to page2'}
            onPress={()=>{
                navigation.navigate('Page2')
            }}
        />
        <Button
            title={'go to page3'}
            onPress={()=>{
                navigation.navigate('Page3',{name:'devio'})
            }}
        />
      </View>
    );
  }
}
const Dimensions = require('Dimensions');
const { width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  navImg:{
    width:width/2.1,
    height:35,
    marginTop:5,
    marginLeft:5
  }
});
