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
import {Tabs} from '@ant-design/react-native';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type
Props = {};
export default class CourseDetail extends Component<Props> {
    constructor(props) {
        super(props)
        const {navigation} = this.props
        this.index = navigation.getParam("index")
    }

    render() {
        const tabs = [
            {title: '简介'},
            {title: '微课'},
            {title: '课件'},
            {title: '评论'}
        ];
        return (
                <View style={{flex: 1}}>
                    <Text style={styles.title}>
                        title
                    </Text>
                    <Tabs tabs={tabs} style={{color:"#000"}}>
                        <View style={styles.style}>
                            <Text>{this.index}</Text>
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
    title:{
        fontSize:20,
        margin:20,
        textAlign: 'center',
        color:'#000'
    },
    style: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
    }
});
