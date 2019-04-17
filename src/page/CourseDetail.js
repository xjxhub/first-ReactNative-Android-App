/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    ScrollView,
    TextInput,
    Platform,
    View,
    Dimensions,
    Image,
    Text,
    Slider,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Video from 'react-native-video';
// import Orientation from 'react-native-orientation';
import {Button, Tabs} from '@ant-design/react-native';
import Swiper from 'react-native-swiper';
import WebView from 'react-native-android-fullscreen-webview-video';
import StarRating from 'react-native-star-rating';
// import { WebView } from "react-native-webview";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Orientation from 'react-native-orientation-locker';
import {storage} from '../storage'

type
Props = {};

const screenWidth = Dimensions.get('window').width;
// 取得屏幕的宽高Dimensions
const {width, height} = Dimensions.get('window');

export default class CourseDetail extends Component<Props> {
    // static navigationOptions = {
    //     headerTitle: '测试视频播放'
    // };

    constructor(props) {
        super(props);
        const {navigation} = this.props
        // 从indexPage2传来的值
        this.index = navigation.getParam("index")
        this.courseItem = navigation.getParam("item")
        // 从reppt传来的值失败
        this.currPPTIndex = navigation.getParam("currIndex")
        // 单独提出的URL
        this.url = 'http://114.55.0.239:8004'

        super(props);
        this.state = {
            user: '',
            time: '',
            currScreenState: '',
            currCourseItemPPT: this.courseItem.ppt,
            currpptIndex: 0,
            allpptPage: 0,
            pptArray: [],
            swiperShow: false,
            videoUrl: "http://114.55.0.239:8004/resource/" + this.courseItem.title + '/' + this.courseItem.video,
            // videoUrl: "http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade3/b/1.mp4",
            videoCover: this.url + "/resource/" + this.courseItem.title + '/' + this.courseItem.url,
            fetchDataGet: 55,
            fetchDataPost: 66,
            text: '',
            starCount: 0,
            starCourse: 0,
            starTeacher: 0,
            title: [this.courseItem.title],
            appraiseMsg: '',
            // allCommentData: [{
            //     name: 'xjx',
            //     starLevel: 4,
            //     time: '123',
            //     content: 'aaa'
            // }, {
            //     name: 'www',
            //     starLevel: 3,
            //     time: '546',
            //     content: 'ff'
            // }],
            allCommentData: [],
            showReply: false,
            replyText: '',
            clickReplyIndex: ''

        };
    }

    // 轮播图
    renderBanner = () => {
        if (this.state.swiperShow) {
            console.log('返回值' + this.state.swiperShow);
            return (
                <Swiper
                    onIndexChanged={this.changeIndex}
                    style={styles.wrapper}
                    index={this.currPPTIndex}
                    // height={width * 40 / 70}
                    showsButtons={true}
                    removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                    // autoplay={true}
                    horizontal={true}
                    showsPagination={false}
                    paginationStyle={styles.paginationStyle}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                >
                    {
                        this.state.pptArray.map((item, index) => {
                            return <Image source={{uri: this.url + item.img}}
                                          key={index}
                                          style={styles.bannerImg}/>
                        })
                    }
                </Swiper>

            );

        } else {
            return (
                <View style={styles.wrapper}>
                    <Image source={require('../img/error-icon.png')} style={styles.bannerImg}/>
                </View>
            );
        }
    }

    // PPT页数
    changeIndex = (index) => {
        this.setState({
            currpptIndex: index
        });
    }

    // 横屏放大
    clickppt = () => {
        const {navigation} = this.props
        navigation.navigate("Reppt", {
            index: this.state.currpptIndex,
            reqPath: this.courseItem.title + '/' + this.state.currCourseItemPPT
        })
    }

    // 竖屏放大
    clickppt1 = () => {
        const {navigation} = this.props
        navigation.navigate("Reppt1", {
            index: this.state.currpptIndex,
            reqPath: this.courseItem.title + '/' + this.state.currCourseItemPPT
        })
    }

    componentWillMount() {

    }

    componentDidMount() {

        // 向html传视频链接
        setTimeout(() => {
            this.refs.webview.postMessage(this.state.videoUrl);
        }, 1000);

        // 获取当前用户
        storage.load('userInfo', (data) => {
            // alert(data.name)
            this.setState({
                user: data.MoNo
            });
        })

        // 获取当前时间
        this.getCurrTime()

        // 进入页面获取评论数据
        this.getCommentData()

        // 获取ppt请求
        fetch(this.url + "/readResource/ppt", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pptParam: this.courseItem.title + '/' + this.state.currCourseItemPPT,
            }),
        })
            .then((response) => response.json())
            .then((res) => {       // 获取到的数据处理
                this.setState({
                    pptArray: res.result,
                });
            })

        // PPT
        this.swiperFunction()
        // clearTimeout(Timer)
    }

    // 获取当前时间
    getCurrTime = () => {
        let currTime = ''
        let myDate = new Date();
        // let month = myDate.getMonth()+1
        // currTime = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        // currTime = currTime+'/'+ month;       //获取当前月份(0-11,0代表1月)
        // currTime = currTime+'/'+myDate.getDate();        //获取当前日(1-31)
        currTime = currTime + myDate.toLocaleDateString() + '  ' + myDate.toLocaleTimeString()
        // alert(currTime)
        this.setState({
            time: currTime,
        });
    }

    // 进入页面获取评论数据&&提交成功后重新请求&&回复成功后重新请求
    getCommentData = () => {
        fetch(this.url + "/users/getComment", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
            }),
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((res) => {
                res.result.appraiseMsg.map((item, index) => {
                    let myName = ''
                    let str = item.name
                    myName = str.slice(0, 3) + '****' + str.slice(6, 10)
                    // alert(myName)
                    item.name = myName
                })

                this.setState({
                    allCommentData: res.result.appraiseMsg
                });
            })
    }

    // PPT
    swiperFunction = () => {
        setTimeout(() => {
            this.setState({
                swiperShow: true,
            });
        }, 1)
    }

    // 切换tab的方法
    tableChanged = (index) => {
        // let test = index
        // for(i in test){
        //     alert(test[i])
        // }
    }

    // 综合评价
    onStarRatingPress = (rating) => {
        this.setState({
            starCount: rating
        });
    }

    // 教学内容评价
    onStarRatingPressCourse = (rating) => {
        this.setState({
            starCourse: rating
        });
    }

    // 任课老师评价
    onStarRatingPressTeacher = (rating) => {
        this.setState({
            starTeacher: rating
        });
    }

    // 点击提交存数据
    submitComment = () => {
        this.setState({
            appraiseMsg: {
                name: this.state.user,
                time: this.state.time,
                content: this.state.text,
                starLevel: this.state.starCount,
                starCourse: this.state.starCourse,
                starTeacher: this.state.starTeacher
            }
        }, this.updateData);
    }

    // 存评论数据
    updateData = () => {
        fetch(this.url + "/users/updateComment", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                appraiseMsg: this.state.appraiseMsg,
            }),
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((res) => {
                // alert( res.code )
                if (res.code === 0) {
                    alert('update Comment success')
                    this.setState({
                        appraiseMsg: {
                            content: '',
                            starLevel: 0,
                            starCourse: 0,
                            starTeacher: 0
                        }
                    }, this.getCommentData())
                } else {
                    alert('update Comment failed')
                }
            })
    }

    // 点击回复
    replySubmitComment = (index) => {
        // alert(index)
        this.setState({
            clickReplyIndex: index
        });
        if (!this.state.showReply) {
            this.setState({
                showReply: true
            });
        } else {
            this.setState({
                showReply: false
            });
        }

    }

    // 点击回复中的确认
    replySure = () => {

    }

    // 点击回复中的取消
    replyCencel = (index) => {
        // alert(index)
        if (!this.state.showReply) {
            this.setState({
                showReply: true
            });
        } else {
            this.setState({
                showReply: false
            });
        }
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
                <Tabs tabs={tabs}
                      renderUnderline={() => null}
                      tabBarActiveTextColor={'#7a1213'}
                      style={{topTabBarSplitLine: {borderBottomWidth: 0}, color: "#000"}}
                      onChange={(index) => this.tableChanged(index)}>
                    {/*简介*/}
                    <View style={styles.style}>
                        <Text>{this.courseItem.describe}</Text>
                    </View>

                    {/*微课*/}
                    <WebView ref="webview"
                             source={(Platform.OS === 'ios') ? require('../html/courseVideo.html') : {uri: 'file:///android_asset/page/courseVideo.html'}}>
                    </WebView>
                    {/*<WebView ref="webview"*/}
                    {/*source={(Platform.OS == 'ios') ? require('../html/courseVideo.html') : { uri: 'https://www.baidu.com/' }}>*/}
                    {/*</WebView>*/}

                    {/*课件*/}
                    <View style={styles.pptContainer}>
                        {this.renderBanner()}
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            color: '#000',
                            marginLeft: 5,
                            marginTop: 5
                        }}>
                            <Text>当前第{this.state.currpptIndex + 1}/{this.state.pptArray.length}页</Text>
                            <View style={{marginLeft: "62%"}}>
                                <Ionicons onPress={this.clickppt1}
                                          name={'ios-expand'}
                                          size={26}/>
                            </View>
                            <View style={{marginLeft: "2%"}}>
                                <Ionicons onPress={this.clickppt}
                                          name={'md-expand'}
                                          size={26}/>
                            </View>

                            {/*<Text onPress={this.clickppt1}>全屏</Text>*/}
                        </View>
                    </View>
                    {/*评论*/}
                    <ScrollView>
                        <Text style={styles.commentTip}>全部评价</Text>
                        <View style={styles.allComment}>
                            {this.state.allCommentData ?
                                <View style={{marginLeft: 15}}>
                                    {
                                        this.state.allCommentData.map((item, index) => {
                                            return <View key={index}>
                                                <View style={styles.commentItem}>
                                                    <Text style={{
                                                        marginRight: 5,
                                                        fontSize: 16,
                                                        fontWeight: 'bold'
                                                    }}>{item.name}</Text>
                                                    <StarRating
                                                        fullStarColor={'#fabd3b'}
                                                        starSize={16}
                                                        disabled={true}
                                                        maxStars={5}
                                                        rating={item.starLevel}
                                                    />
                                                </View>
                                                <Text style={styles.commentItemContent}>{item.content}</Text>
                                                <View style={styles.commentItemTime}>
                                                    <Text>{item.time}</Text>
                                                </View>
                                                {/*回复功能*/}
                                                {/*<Button onPress={() => this.replySubmitComment(index)}*/}
                                                        {/*style={{width: 50, marginBottom: 5}} type="warning"*/}
                                                        {/*size="middle">回复</Button>*/}
                                                {/*{this.state.showReply && this.state.clickReplyIndex === index ?*/}
                                                    {/*<View>*/}
                                                        {/*<TextInput*/}
                                                            {/*style={{*/}
                                                                {/*height: 80,*/}
                                                                {/*width: '96%',*/}
                                                                {/*marginBottom: 10,*/}
                                                                {/*backgroundColor: '#ededed'*/}
                                                            {/*}}*/}
                                                            {/*onChangeText={(text) => this.setState({text})}*/}
                                                            {/*value={this.state.replyText}*/}
                                                        {/*/>*/}
                                                        {/*<View style={{flexDirection: 'row'}}>*/}
                                                            {/*<Button onPress={this.replySure} style={{*/}
                                                                {/*width: 50,*/}
                                                                {/*marginTop: 5,*/}
                                                                {/*marginRight: 10,*/}
                                                                {/*marginBottom: 10*/}
                                                            {/*}} type="primary" size="middle">确定</Button>*/}
                                                            {/*<Button onPress={() => this.replyCencel(index)}*/}
                                                                    {/*style={{width: 50, marginTop: 5, marginBottom: 10}}*/}
                                                                    {/*size="middle">取消</Button>*/}
                                                        {/*</View>*/}
                                                    {/*</View> : <Text> </Text>*/}
                                                {/*}*/}
                                            </View>

                                        })
                                    }
                                </View> :
                                <View style={{alignItems: 'center'}}><Text>暂无评论</Text></View>
                            }
                        </View>
                        <Text style={styles.commentTip}>我要评价</Text>
                        <View style={styles.commentConent}>
                            <View style={styles.fontAndStar}>
                                <Text>综合评价</Text>
                                <StarRating
                                    fullStarColor={'#fabd3b'}
                                    starSize={14}
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </View>
                            <TextInput
                                style={{height: 80, width: '100%', marginBottom: 10, backgroundColor: '#ededed'}}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                            />
                            <View style={styles.fontAndStar}>
                                <Text>教学内容</Text>
                                <StarRating
                                    fullStarColor={'#fabd3b'}
                                    starSize={14}
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starCourse}
                                    selectedStar={(rating) => this.onStarRatingPressCourse(rating)}
                                />
                            </View>
                            <View style={styles.fontAndStar}>
                                <Text>任课老师</Text>
                                <StarRating
                                    fullStarColor={'#fabd3b'}
                                    starSize={14}
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starTeacher}
                                    selectedStar={(rating) => this.onStarRatingPressTeacher(rating)}
                                />
                            </View>
                        </View>
                        <Button onPress={this.submitComment}
                                style={{width: 70, marginTop: 15, marginLeft: 10, marginBottom: 10}} type="primary"
                                size="middle">提交评论</Button>
                    </ScrollView>
                </Tabs>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        color: '#000'
    },
    style: {
        paddingVertical: 120,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
    },
    pptContainer: {
        height: width * 40 / 55,
    },
    wrpaper: {
        width: width,
        height: width * 40 / 65,
    },
    bannerImg: {
        width: width,
        height: width * 40 / 65,
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
    commentTip: {
        backgroundColor: 'rgb(159, 83, 85)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        padding: 4,
        color: '#fff',
        fontSize: 14,
        width: 70,
        borderRadius: 20
    },
    allComment: {},
    commentConent: {
        width: '98%',
        marginRight: '1%',
        marginLeft: '1%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    fontAndStar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    commentItem: {
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        // borderBottomStyle: 'solid',
    },
    commentItemContent: {
        marginLeft: '6%',
        fontSize: 17
    },
    commentItemTime: {
        alignItems: 'flex-end',
        marginRight: '2%'
    }
});
