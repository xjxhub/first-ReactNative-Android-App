/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {};
export default class Page1 extends Component<Props> {
  componentDidMount(){
      this.timer=setTimeout(()=>{
          const {navigation}=this.props
          navigation.navigate("Bottom")
      },2000)
  }
  componentWillUnmount(){
      this.timer && clearTimeout(this.timer)
  }
  render() {
    const {navigation}=this.props
    return (
      <LinearGradient
          colors={['rgb(149,82,84)', 'rgb(124,38,40)', 'rgb(122,18,19)']}
          style={styles.container}>
        <Text style={styles.welcome}>欢迎进入中邦APP</Text>
      </LinearGradient >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 26,
    color:'#fff',
    textAlign: 'center',
    margin: 10,
  },
});
