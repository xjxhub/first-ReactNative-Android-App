/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform,View, Dimensions, Image, Text, Slider, TouchableWithoutFeedback, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Video from 'react-native-video';
// import Orientation from 'react-native-orientation';
import {Tabs} from '@ant-design/react-native';
import Swiper from 'react-native-swiper';
// import WebView from 'react-native-android-fullscreen-webview-video';
// import { WebView } from "react-native-webview";

type
Props = {};

const screenWidth = Dimensions.get('window').width;
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
}

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
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
            showVideoCover: true,    // 是否显示视频封面
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
            fetchDataGet:55,
            fetchDataPost:66
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

                    {/*<Image source={require('../img/01.png')} style={styles.bannerImg} />*/}
                    {/*<Image source={require('../img/02.png')} style={styles.bannerImg} />*/}
                    {/*<Image source={require('../img/03.png')} style={styles.bannerImg} />*/}
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

    changeIndex = (index) => {
        this.setState({
            currpptIndex:index
        });
    }

    clickppt(){
        // alert(this.state.currScreenState)
    }

    // componentWillMount(){
    //     let initial = Orientation.getInitialOrientation();
    //     if (initial === 'PORTRAIT') {
    //         //do stuff
    //         // alert("aaa")
    //         this.setState({
    //             currScreenState:11
    //         })
    //     } else {
    //         //do other stuff
    //         // alert("222")
    //         this.setState({
    //             currScreenState:22
    //         })
    //     }
    // }

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

    swiperFunction(){
        setTimeout(() => {
            this.setState({
                swiperShow: true,
            });
        }, 1)
    }

    /// -------Video组件回调事件-------

    _onLoadStart = () => {
        console.log('视频开始加载');
    };

    _onBuffering = () => {
        console.log('视频缓冲中...')
    };

    _onLoaded = (data) => {
        console.log('视频加载完成');
        this.setState({
            duration: data.duration,
        });
    };

    _onProgressChanged = (data) => {
        console.log('视频进度更新');
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };

    _onPlayEnd = () => {
        console.log('视频播放结束');
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true
        });
    };

    _onPlayError = () => {
        console.log('视频播放失败');
    };

    ///-------控件点击事件-------

    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
        if (this.state.showVideoControl) {
            this.setState({
                showVideoControl: false,
            })
        } else {
            this.setState(
                {
                    showVideoControl: true,
                },
                // 5秒后自动隐藏工具栏
                () => {
                    setTimeout(
                        () => {
                            this.setState({
                                showVideoControl: false
                            })
                        }, 5000
                    )
                }
            )
        }
    }

    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
        let isPlay = !this.state.isPlaying;
        this.setState({
            isPlaying: isPlay,
            showVideoCover: false
        });
        if (this.state.playFromBeginning) {
            this.videoPlayer.seek(0);
            this.setState({
                playFromBeginning: false,
            })
        }
    }

    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
        this.onPressPlayButton();
    }

    /// 点击了工具栏上的全屏按钮
    // onControlShrinkPress() {
    //     if (this.state.isFullScreen) {
    //         Orientation.lockToPortrait();
    //     } else {
    //         Orientation.lockToLandscape();
    //     }
    // }

    /// 进度条值改变
    onSliderValueChanged(currentTime) {
        this.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({
                currentTime: currentTime
            })
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true,
                showVideoCover: false
            })
        }
    }

    /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout;
        console.log('通过onLayout得到的宽度：' + width);
        console.log('通过onLayout得到的高度：' + height);

        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape){
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 9/16,
                isFullScreen: false,
            })
        }
        // Orientation.unlockAllOrientations();
    };

    /// -------外部调用事件方法-------

    ///播放视频，提供给外部调用
    playVideo() {
        this.setState({
            isPlaying: true,
            showVideoCover: false
        })
    }

    /// 暂停播放，提供给外部调用
    pauseVideo() {
        this.setState({
            isPlaying: false,
        })
    }

    // 切换tab的方法，但是很神奇index没有弹出却解决了关键问题往html传值，我也不知道为嘛虽然这不是我的本意
    tableChanged(index){
        alert(index)
    }

    /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
    // switchVideo(videoURL, seekTime) {
    //     this.setState({
    //         videoUrl: videoURL,
    //         currentTime: seekTime,
    //         isPlaying: true,
    //         showVideoCover: false
    //     });
    //     this.videoPlayer.seek(seekTime);
    // }

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
                    {/*<View style={styles.style}>*/}
                    {/*微课*/}

                    <WebView ref="webview"
                             source={(Platform.OS == 'ios') ? require('../html/courseVideo.html') : { uri: 'file:///android_asset/page/courseVideo.html' }}>
                    </WebView>

                    {/*<View style={styles.container} onLayout={this._onLayout}>*/}
                    {/*<View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor:'#000000' }}>*/}
                    {/*<Video*/}
                    {/*ref={(ref) => this.videoPlayer = ref}*/}
                    {/*source={{uri: this.state.videoUrl}}*/}
                    {/*rate={1.0}*/}
                    {/*volume={1.0}*/}
                    {/*muted={false}*/}
                    {/*paused={!this.state.isPlaying}*/}
                    {/*resizeMode={'contain'}*/}
                    {/*playWhenInactive={false}*/}
                    {/*playInBackground={false}*/}
                    {/*ignoreSilentSwitch={'ignore'}*/}
                    {/*progressUpdateInterval={250.0}*/}
                    {/*onLoadStart={this._onLoadStart}*/}
                    {/*onLoad={this._onLoaded}*/}
                    {/*onProgress={this._onProgressChanged}*/}
                    {/*onEnd={this._onPlayEnd}*/}
                    {/*onError={this._onPlayError}*/}
                    {/*onBuffer={this._onBuffering}*/}
                    {/*style={{width: this.state.videoWidth, height: this.state.videoHeight}}*/}
                    {/*/>*/}
                    {/*{*/}
                    {/*this.state.showVideoCover ?*/}
                    {/*<Image*/}
                    {/*style={{*/}
                    {/*position:'absolute',*/}
                    {/*top: 0,*/}
                    {/*left: 0,*/}
                    {/*width: this.state.videoWidth,*/}
                    {/*height: this.state.videoHeight*/}
                    {/*}}*/}
                    {/*resizeMode={'cover'}*/}
                    {/*source={{uri: this.state.videoCover}}*/}
                    {/*/> : null*/}
                    {/*}*/}
                    {/*<TouchableWithoutFeedback onPress={() => { this.hideControl() }}>*/}
                    {/*<View*/}
                    {/*style={{*/}
                    {/*position: 'absolute',*/}
                    {/*top: 0,*/}
                    {/*left: 0,*/}
                    {/*width: this.state.videoWidth,*/}
                    {/*height: this.state.videoHeight,*/}
                    {/*backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',*/}
                    {/*alignItems:'center',*/}
                    {/*justifyContent:'center'*/}
                    {/*}}>*/}
                    {/*{*/}
                    {/*this.state.isPlaying ? null :*/}
                    {/*<TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>*/}
                    {/*<Image*/}
                    {/*style={styles.playButton}*/}
                    {/*source={require('../img/play.png')}*/}
                    {/*/>*/}
                    {/*</TouchableWithoutFeedback>*/}
                    {/*}*/}
                    {/*</View>*/}
                    {/*</TouchableWithoutFeedback>*/}
                    {/*{*/}
                    {/*this.state.showVideoControl ?*/}
                    {/*<View style={[styles.control, {width: this.state.videoWidth}]}>*/}
                    {/*<TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>*/}
                    {/*<Image*/}
                    {/*style={styles.playControl}*/}
                    {/*source={this.state.isPlaying ? require('../img/pause.png') : require('../img/play.png')}*/}
                    {/*/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>*/}
                    {/*<Slider*/}
                    {/*style={{flex: 1}}*/}
                    {/*maximumTrackTintColor={'#999999'}*/}
                    {/*thumbTintColor={'#fff'}*/}
                    {/*minimumTrackTintColor={'#f00'}*/}
                    {/*// thumbImage={require('../img/play.png')}*/}
                    {/*value={this.state.currentTime}*/}
                    {/*minimumValue={0}*/}
                    {/*maximumValue={this.state.duration}*/}
                    {/*onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}*/}
                    {/*/>*/}
                    {/*<Text style={styles.time}>{formatTime(this.state.duration)}</Text>*/}
                    {/*<TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>*/}
                    {/*<Image*/}
                    {/*style={styles.shrinkControl}*/}
                    {/*source={this.state.isFullScreen ? require('../img/expand.png') : require('../img/expand.png')}*/}
                    {/*/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View> : null*/}
                    {/*}*/}
                    {/*/!*<Text>{this.state.videoUrl}</Text>*!/*/}

                    {/*</View>*/}
                    {/*</View>*/}

                    {/*</View>*/}
                    {/*课件*/}
                    <TouchableOpacity style={styles.pptContainer} onLongPress={this.clickppt}>
                        {this.renderBanner()}
                        <View style={{color:'#000',marginLeft:5,marginTop:5}}>
                            <Text>当前第{this.state.currpptIndex + 1}/{this.state.pptArray.length}页</Text>
                        </View>

                    </TouchableOpacity>
                    {/*评论*/}
                    <View>

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
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    playButton: {
        width: 50,
        height: 50,
    },
    playControl: {
        width: 24,
        height: 24,
        marginLeft: 15,
    },
    shrinkControl: {
        width: 15,
        height: 15,
        marginRight: 15,
    },
    time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    control: {
        flexDirection: 'row',
        height: 44,
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        bottom: 0,
        left: 0
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
});
