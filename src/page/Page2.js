/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Page2 extends Component<Props> {
  render() {
    return (
      <View className={Page2} style={styles.container}>
        <Text style={styles.bestTest}>
          <Ionicons style={styles.bestTestIcon} name={'tag-text-outline'} size={16}/>
          精品课程
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bestTest:{
        color:'#000',
        fontSize:16,
        marginTop:20,
        marginLeft:10
    },
    bestTestIcon:{
      color:'#f00'
    }
});
