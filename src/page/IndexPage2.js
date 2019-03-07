/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type
Props = {};
export default class Page2 extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            bestCourseData:[
                {title:1,describe:'aaaa'},
                {title:2,describe:'bbb'},
            ],
            bestCourseBottomData:[
                {title:121,describe:'121212'},
                {title:221,describe:'222221'},
                {title:331,describe:'333331'}
            ]
        }
    }

    jumpToCourseDetail = (index) =>{
        const {navigation} = this.props
        navigation.navigate("CourseDetail",{
            index:index,
        })
        console.log('11')
    }

    render() {
        const {navigation}=this.props
        return (
            <View className={Page2} style={styles.container}>
                <ScrollView>
                    <View className="bestCourse" style={styles.bestCourse}>
                        <Text style={styles.bestTest}>
                            <Ionicons style={styles.bestTestIcon} name={'tag-text-outline'} size={16}/>
                            精品课程
                        </Text>
                        <View className="bestCourseTop" style={{flex: 1, flexDirection: 'row', marginBottom: 30}}>
                            {/*<View style={styles.bestCourseTopItem}>*/}
                                {/*<Text>111</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.bestCourseTopItem}>*/}

                            {/*</View>*/}
                            {
                                this.state.bestCourseData.map((item,index) =>{
                                    return  <TouchableOpacity  key={index}
                                                style={styles.bestCourseTopItem} onPress={()=>{this.jumpToCourseDetail(index)}}>
                                                <Text>{item.title}</Text>
                                            </TouchableOpacity >

                                })
                            }
                        </View>
                        <View className="bestCourseBottom">
                            {/*<View style={styles.bestCourseBottomItem}>*/}
                                {/*<View style={styles.bestCourseBottomItemImg}>*/}

                                {/*</View>*/}
                                {/*<View style={styles.bestCourseBottomItemFont}>*/}
                                    {/*<Text style={styles.bestCourseBottomItemFontTit}>1212</Text>*/}
                                    {/*<Text style={styles.bestCourseBottomItemFontDes}>12121212121</Text>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            {/*<View style={styles.bestCourseBottomItem}>*/}
                                {/*<Text>222</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.bestCourseBottomItem}>*/}
                                {/*<Text>33</Text>*/}
                            {/*</View>*/}
                            {
                                this.state.bestCourseBottomData.map((item,index) =>{
                                    return  <View key={index} style={styles.bestCourseBottomItem}>
                                                <View style={styles.bestCourseBottomItemImg}>

                                                </View>
                                                <View style={styles.bestCourseBottomItemFont}>
                                                    <Text style={styles.bestCourseBottomItemFontTit}>{item.title}</Text>
                                                    <Text style={styles.bestCourseBottomItemFontDes}>{item.describe}</Text>
                                                </View>
                                            </View>

                                })
                            }
                        </View>
                    </View>
                    <View className="suggestCourse" style={styles.suggestCourse}>
                        <Text style={styles.bestTest}>
                            <Ionicons style={styles.bestTestIcon} name={'sword-cross'} size={16}/>
                            实战推荐
                        </Text>
                        <View className="bestCourseTop" style={{flex: 1, flexDirection: 'row', marginBottom: 30}}>
                            <View style={styles.bestCourseTopItem}>
                                <Text>111</Text>
                            </View>
                            <View style={styles.bestCourseTopItem}>

                            </View>
                        </View>
                        <View className="bestCourseBottom">
                            <View style={styles.bestCourseBottomItem}>
                                <View style={styles.bestCourseBottomItemImg}>

                                </View>
                                <View style={styles.bestCourseBottomItemFont}>
                                    <Text style={styles.bestCourseBottomItemFontTit}>1212</Text>
                                    <Text style={styles.bestCourseBottomItemFontDes}>12121212121</Text>
                                </View>
                            </View>
                            <View style={styles.bestCourseBottomItem}>
                                <Text>222</Text>
                            </View>
                            <View style={styles.bestCourseBottomItem}>
                                <Text>33</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    bestTest: {
        color: '#000',
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10
    },
    bestCourse: {
        backgroundColor: 'rgb(244,244,244)'
    },
    bestTestIcon: {
        color: '#f00'
    },
    bestCourseTopItem: {
        width: 180,
        height: 100,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        marginLeft: 17,
        marginTop: 20
    },
    bestCourseBottomItem: {
        height: 100,
        backgroundColor: '#fff',
        // borderWidth: 1,
        // borderColor: '#000',
        // borderStyle: 'dotted',
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
    },
    bestCourseBottomItemImg: {
        width: 150,
        height: 80,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        marginLeft: 20,
        marginTop: 8
    },
    bestCourseBottomItemFont: {
        marginLeft: 20,
        marginTop: 7
    },
    bestCourseBottomItemFontTit: {
        color: '#000',
        fontSize: 18
    },
    bestCourseBottomItemFontDes: {},
    suggestCourse: {
        backgroundColor: 'rgb(244,244,244)',
        marginTop: 10
    }
});
