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
export default class Index extends Component<Props> {

    render() {
        const {navigation}=this.props
        return (
            <View style={styles.container}>
              {/*<View style={{height:45,backgroundColor:'#24a3ff'}}>*/}
                {/*<Image style={styles.navImg} source={require('../img/zbtLogo.png')} />*/}
              {/*</View>*/}

                <Button
                    title={'go to Page2'}
                    onPress={()=>{
                        navigation.navigate('Page2')
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
    navImg:{
        width:width/2.1,
        height:35,
        marginTop:5,
        marginLeft:5
    },
    tabs:{
        backgroundColor: '#7a1213'
    },
    tabsText:{
        color:'#fff'
    }
});
