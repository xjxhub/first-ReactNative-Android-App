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

type Props = {};
export default class Page1 extends Component<Props> {
  render() {
    const {navigation}=this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page1</Text>
        <Button
            title={'go back'}
            onPress={()=>{
                navigation.goBack()
            }}
        />
        <Button
            title={'go Page4'}
            onPress={()=>{
                navigation.navigate('Page4')
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
