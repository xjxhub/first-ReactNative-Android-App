/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Image, TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import Orientation from 'react-native-orientation-locker';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type
Props = {};
export default class Page2 extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://192.168.0.251:8004',
            fetchDataPost: '',
            bestCourseData: [],
            bestCourseBottomData: [],
            suggestCourseData: [],
            suggestCourseBottomData: []
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        // return fetch('http://192.168.0.251:8003/readResource/bar')
        //    .then((response) => response.json())
        //    .then((res) => {
        //        this.setState({
        //            fetchDataGet:res
        //        })
        //    })
        //    .catch((error) => {
        //
        //    });

        return fetch(this.state.url + '/readResource', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: '111',
                secondParam: '222',
            }),
        })
            .then((response) => response.json())
            .then((res) => {       // 获取到的数据处理
                // alert(res)
                this.setState({
                    fetchDataPost: res.result
                })
            })
            .then(() => {       // 获取到的数据处理
                // alert(res)
                let currArrT = []
                let currArrB = []
                let i = 0;
                for (let item of this.state.fetchDataPost[0].bestCourseData) {

                    if (i < 2) {
                        currArrT.push(item)
                        this.setState({
                            bestCourseData: currArrT
                        })
                    } else {
                        currArrB.push(item)
                        this.setState({
                            bestCourseBottomData: currArrB
                        })
                    }
                    i = i + 1
                }

            })
            .then(() => {       // 获取到的数据处理
                // alert(res)
                let currArrT = []
                let currArrB = []
                let i = 0;
                for (let item of this.state.fetchDataPost[0].suggestCourseData) {

                    if (i < 2) {
                        currArrT.push(item)
                        this.setState({
                            suggestCourseData: currArrT
                        })
                    } else {
                        currArrB.push(item)
                        this.setState({
                            suggestCourseBottomData: currArrB
                        })
                    }
                    i = i + 1
                }

            })
            .catch((error) => { // 错误处理

            })
    }

    jumpToCourseDetail = (item, index) => {
        const {navigation} = this.props
        navigation.navigate("CourseDetail", {
            index: index,
            item: item,
            name: item.title
        })
        console.log('11')
    }

    render() {
        const {navigation} = this.props
        return (
            <View className={Page2} style={styles.container}>
                <ScrollView>
                    <View className="bestCourse" style={styles.bestCourse}>
                        <Text style={styles.bestTest}>
                            <Ionicons style={styles.bestTestIcon} name={'tag-text-outline'} size={16}/>
                            精品课程
                        </Text>
                        <View className="bestCourseTop"
                              style={{flex: 1, flexDirection: 'row', marginBottom: 30, paddingBottom: 10}}>
                            {/*<View style={styles.bestCourseTopItem}>*/}
                            {/*<Text>111</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.bestCourseTopItem}>*/}

                            {/*</View>*/}
                            {
                                this.state.bestCourseData.map((item, index) => {
                                    return <TouchableOpacity key={index}
                                                             style={styles.bestCourseTopItem} onPress={() => {
                                        this.jumpToCourseDetail(item, index)
                                    }}>
                                        {index === 0 ?
                                            <Image style={{width: '100%', height: 100}}
                                                   source={require('../img/index1.png')}
                                            /> : index === 1 ?
                                                <Image style={{width: '100%', height: 100}}
                                                       source={require('../img/index2.png')}
                                                /> : <Image style={{width: '100%', height: 100}}
                                                            source={require('../img/index1.png')}
                                                />
                                        }

                                        {/*<Image*/}
                                        {/*style={{width: '100%', height: 100}}*/}
                                        {/*source={{uri: this.state.url + '/resource/'+ item.title + '/' + item.url}}*/}
                                        {/*/>*/}
                                        <Text style={styles.bestCourseTopItemTitle}>{item.title}</Text>
                                    </TouchableOpacity>

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
                                this.state.bestCourseBottomData.map((item, index) => {
                                    return <TouchableOpacity key={index} style={styles.bestCourseBottomItem}
                                                             onPress={() => {
                                                                 this.jumpToCourseDetail(item, index)
                                                             }}>
                                        <View style={styles.bestCourseBottomItemImg}>
                                            {index === 0 ?
                                                <Image style={{width: 150, height: 80}}
                                                       source={require('../img/index3.png')}
                                                /> : index === 1 ?
                                                    <Image style={{width: 150, height: 80}}
                                                           source={require('../img/index4.png')}
                                                    /> : index === 2 ?
                                                        <Image style={{width: 150, height: 80}}
                                                               source={require('../img/index5.png')}
                                                        /> : index === 3 ?
                                                            <Image style={{width: 150, height: 80}}
                                                                   source={require('../img/index1.png')}
                                                            /> : index === 4 ?
                                                                <Image style={{width: 150, height: 80}}
                                                                       source={require('../img/index2.png')}
                                                                /> : <Image style={{width: 150, height: 80}}
                                                                            source={require('../img/index1.png')}
                                                                />
                                            }
                                            {/*<Image*/}
                                            {/*style={{width: 150, height: 80}}*/}
                                            {/*source={{uri: this.state.url + '/resource/'+ item.title + '/' + item.url}}*/}
                                            {/*/>*/}
                                        </View>
                                        <View style={styles.bestCourseBottomItemFont}>
                                            <Text style={styles.bestCourseBottomItemFontTit}>{item.title}</Text>
                                            <Text style={styles.bestCourseBottomItemFontDes}>{item.describe}</Text>
                                        </View>
                                    </TouchableOpacity>

                                })
                            }
                        </View>
                    </View>
                    <View className="suggestCourse" style={styles.suggestCourse}>
                        <Text style={styles.bestTest}>
                            <Ionicons style={styles.bestTestIcon} name={'sword-cross'} size={16}/>
                            实战推荐
                        </Text>
                        <View className="suggestCourseData"
                              style={{flex: 1, flexDirection: 'row', marginBottom: 30, paddingBottom: 10}}>
                            {
                                this.state.suggestCourseData.map((item, index) => {
                                    return <TouchableOpacity key={index}
                                                             style={styles.bestCourseTopItem} onPress={() => {
                                        this.jumpToCourseDetail(item, index)
                                    }}>
                                        {index === 0 ?
                                            <Image style={{width: '100%', height: 100}}
                                                   source={require('../img/index3.png')}
                                            /> : index === 1 ?
                                                <Image style={{width: '100%', height: 100}}
                                                       source={require('../img/index5.png')}
                                                /> : <Image style={{width: '100%', height: 100}}
                                                            source={require('../img/index1.png')}
                                                />
                                        }
                                        {/*<Image*/}
                                        {/*style={{width: '100%', height: 100}}*/}
                                        {/*source={{uri: this.state.url+'/resource/'+ item.title + '/' + item.url}}*/}
                                        {/*/>*/}
                                        <Text style={styles.bestCourseTopItemTitle}>{item.title}</Text>
                                    </TouchableOpacity>

                                })
                            }
                        </View>
                        <View className="bestCourseBottom">
                            {
                                this.state.suggestCourseBottomData.map((item, index) => {
                                    return <TouchableOpacity key={index} style={styles.bestCourseBottomItem}
                                                             onPress={() => {
                                                                 this.jumpToCourseDetail(item, index)
                                                             }}>
                                        <View style={styles.bestCourseBottomItemImg}>
                                            {index === 0 ?
                                                <Image style={{width: 150, height: 80}}
                                                       source={require('../img/index3.png')}
                                                /> : index === 1 ?
                                                    <Image style={{width: 150, height: 80}}
                                                           source={require('../img/index4.png')}
                                                    /> : index === 2 ?
                                                        <Image style={{width: 150, height: 80}}
                                                               source={require('../img/index5.png')}
                                                        /> : index === 3 ?
                                                            <Image style={{width: 150, height: 80}}
                                                                   source={require('../img/index2.png')}
                                                            /> : index === 4 ?
                                                                <Image style={{width: 150, height: 80}}
                                                                       source={require('../img/index1.png')}
                                                                /> : <Image style={{width: 150, height: 80}}
                                                                            source={require('../img/index1.png')}
                                                                />
                                            }
                                            {/*<Image*/}
                                            {/*style={{width: 150, height: 80}}*/}
                                            {/*source={{uri: this.state.url+'/resource/'+ item.title + '/' + item.url}}*/}
                                            {/*/>*/}
                                        </View>
                                        <View style={styles.bestCourseBottomItemFont}>
                                            <Text style={styles.bestCourseBottomItemFontTit}>{item.title}</Text>
                                            <Text style={styles.bestCourseBottomItemFontDes}>{item.describe}</Text>
                                        </View>
                                    </TouchableOpacity>
                                })
                            }
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
        width: '44%',
        height: 100,
        // borderWidth: 1,
        // borderColor: '#000',
        // borderStyle: 'solid',
        marginLeft: 17,
        marginTop: 20,
    },
    bestCourseTopItemTitle: {
        marginTop: 15,
        fontSize: 16,
        color: '#000',
    },
    bestCourseBottomItem: {
        width: '98%',
        height: 100,
        backgroundColor: '#fff',
        // borderWidth: 1,
        // borderColor: '#000',
        // borderStyle: 'dotted',
        marginTop: 20,
        // marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    bestCourseBottomItemImg: {
        width: '44%',
        height: 80,
        // borderWidth: 1,
        // borderColor: '#000',
        // borderStyle: 'solid',
        marginLeft: 20,
        marginTop: 8
    },
    bestCourseBottomItemFont: {
        width: '50%',
        // borderWidth: 1,
        // borderColor: '#000',
        // borderStyle: 'solid',
        // marginLeft: '4%',
        marginTop: 7
    },
    bestCourseBottomItemFontTit: {
        color: '#000',
        fontSize: 16
    },
    bestCourseBottomItemFontDes: {
        width: '100%',
        overflow: 'hidden'
    },
    suggestCourse: {
        backgroundColor: 'rgb(244,244,244)',
        marginTop: 10,

    }
});
