/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {TextInput,Platform,View, Dimensions, Image, Text, Slider, TouchableWithoutFeedback, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {Tabs} from '@ant-design/react-native';
import Swiper from 'react-native-swiper';
import WebView from 'react-native-android-fullscreen-webview-video';
// import { WebView } from "react-native-webview";

type
Props = {};

const screenWidth = Dimensions.get('window').width;
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class CourseDetail extends Component<Props> {
    // static navigationOptions = {
    //     headerTitle: '测试视频播放'
    // };

    constructor( props ) {
        super( props );
        const {navigation} = this.props
        this.index = navigation.getParam("index")
        this.courseItem = navigation.getParam("item")

        super(props);
        this.state = {
            currScreenState:'',
            currCourseItemPPT:this.courseItem.ppt,
            currpptIndex:0,
            allpptPage:0,
            pptArray:[],
            swiperShow: false,
            videoUrl: "http://192.168.0.250:8004/resource/"+ this.courseItem.title + '/' + this.courseItem.video,
            // videoUrl: "http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade3/b/1.mp4",
            videoCover: "http://192.168.0.250:8004/resource/"+ this.courseItem.title + '/' + this.courseItem.url,
            fetchDataGet:55,
            fetchDataPost:66,
            textConent:''
        };
    }

    // 轮播图
    renderBanner() {
        if (this.state.swiperShow) {
            console.log ('返回值' + this.state.swiperShow);
            return (
                <Swiper
                    onIndexChanged={this.changeIndex}
                    style={styles.wrapper}
                    height={width * 40 / 75}
                    showsButtons={true}
                    removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                    // autoplay={true}
                    horizontal ={true}
                    showsPagination={false}
                    paginationStyle={styles.paginationStyle}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                >
                    {
                        this.state.pptArray.map((item, index) => {
                            return <Image source={{uri: 'http://192.168.0.250:8004' + item.img}}
                                          key={index}
                                          style={styles.bannerImg} />
                        })
                    }
                </Swiper>

            );

        } else {
            return (
                <View style={styles.wrapper}>
                    <Image source={require('../img/error-icon.png')} style={styles.bannerImg} />
                </View>
            );
        }
    }

    // PPT页数
    changeIndex = (index) => {
        this.setState({
            currpptIndex:index
        });
    }

    // 长按PPT
    clickppt(){
        // alert(this.state.currScreenState)
    }

    componentWillMount(){

    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.webview.postMessage(this.state.videoUrl);
        }, 1000);
        
         fetch("http://192.168.0.250:8004/readResource/ppt", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pptParam: this.courseItem.title+ '/' + this.state.currCourseItemPPT,
            }),
        })
            .then((response) => response.json())
            .then((res) => {       // 获取到的数据处理
                this.setState({
                    pptArray: res.result,
                });
            })
        this.swiperFunction()
    }
    // PPT
    swiperFunction(){
        setTimeout(() => {
            this.setState({
                swiperShow: true,
            });
        }, 1)
    }

    // 切换tab的方法，但是很神奇index没有弹出却解决了关键问题往html传值，我也不知道为嘛虽然这不是我的本意
    tableChanged(index){
        alert(index)
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
                {/*<Text style={styles.title}>*/}
                    {/*title*/}
                {/*</Text>*/}
                <Tabs tabs={tabs} style={{color:"#000"}} onChange={(index) =>this.tableChanged}>
                    {/*简介*/}
                    <View style={styles.style}>
                        <Text>{this.courseItem.describe}</Text>
                    </View>

                    {/*微课*/}
                    <WebView ref="webview"
                             source={(Platform.OS == 'ios') ? require('../html/courseVideo.html') : { uri: 'file:///android_asset/page/courseVideo.html' }}>
                    </WebView>

                    {/*课件*/}
                    <TouchableOpacity style={styles.pptContainer} onLongPress={this.clickppt}>
                        {this.renderBanner()}
                        <View style={{color:'#000',marginLeft:5,marginTop:5}}>
                            <Text>当前第{this.state.currpptIndex + 1}/{this.state.pptArray.length}页</Text>
                        </View>
                    </TouchableOpacity>
                    {/*评论*/}
                    <View>
                        <Text style={styles.commentTip}>全部评价</Text>
                        <View style={styles.allComment}>

                        </View>
                        <Text style={styles.commentTip}>我要评价</Text>
                        <View style={styles.commentConent}>
                            <View>
                                <Text>综合评价</Text>
                            </View>
                            <TextInput
                                style={{height: 80, width:'100%', backgroundColor:'#ededed'}}
                                onChangeText={(textConent) => this.setState({textConent})}
                                value={this.state.textConent}
                            />
                            <View>
                                <Text>教学内容</Text>
                            </View>
                            <View>
                                <Text>任课老师</Text>
                            </View>
                        </View>

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
        paddingVertical: 120,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
    },
    pptContainer: {
        height:width * 40 / 75,
    },
    wrpaper: {
        width: width,
        height:width * 40 / 75,
    },
    bannerImg:{
        width:width,
        height:width * 40 / 75,
    },
    paginationStyle: {
        bottom: 6,
    },
    dotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 0,
    },
    activeDotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 0,
    },
    commentTip:{
        backgroundColor:'rgb(159, 83, 85)',
        marginTop:20,
        marginBottom:20,
        marginLeft:10,
        padding:4,
        color:'#fff',
        fontSize:16,
        width:75,
        borderRadius:20
    },
    allComment:{

    },
    commentConent:{
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:10,
        paddingRight:10

    }
});
