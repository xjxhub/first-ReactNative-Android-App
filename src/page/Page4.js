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
import {Tabs} from '@ant-design/react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type
Props = {};
export default class Page4 extends Component<Props> {
    render() {
        const navigation = this.props
        const tabs = [
            {title: 'First Tab'},
            {title: 'Second Tab'},
            {title: 'Third Tab'},
        ];
        return (
            <View style={{flex: 1}}>
                <Tabs tabs={tabs}>
                    <View style={styles.style}>
                        <Text>Content of First Tab</Text>
                    </View>
                    <View style={styles.style}>
                        <Text>Content of Second Tab</Text>
                    </View>
                    <View style={styles.style}>
                        <Text>Content of Third Tab</Text>
                    </View>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    style: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
    }
});
