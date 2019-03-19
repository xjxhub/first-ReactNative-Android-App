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
                <Button
                    title="Go To Page1"
                    onPress={() => {
                        navigation.navigate('Page1', {name: '动态的'});
                    }}
                />
                <Button
                    title="Go To Page2"
                    onPress={() => {
                        navigation.navigate('Page2');
                    }}
                />
                <Button
                    title="Go To Page3"
                    onPress={() => {
                        navigation.navigate('Page3', {name: 'Devio'});
                    }}
                />
            </View>
        );
    }
}

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
});
