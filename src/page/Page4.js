/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {BackHandler, Image, Dimensions, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker';

type Props = {};
const screenWidth = Dimensions.get('window').width;
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
export default class Page1 extends Component<Props> {

    constructor( props ) {
        super( props );
        const {navigation} = this.props
        this.index = navigation.getParam("index")
        this.reqPath = navigation.getParam("reqPath")

        super(props);
        this.state = {
            pptArray:[],
            swiperShow: false,
            currIndex:0
        };
    }


    // 请求PPT
    componentDidMount() {

        fetch("http://192.168.0.250:8004/readResource/ppt", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pptParam: this.reqPath,
            }),
        })
            .then((response) => response.json())
            .then((res) => {       // 获取到的数据处理
                this.setState({
                    pptArray: res.result,
                });
            })
        this.swiperFunction()
        // clearTimeout(Timer)
    }

    // PPT
    swiperFunction(){
        setTimeout(() => {
            this.setState({
                swiperShow: true,
            });
        }, 1)
    }

    // 显示页码
    renderPagination = (index, total, context) => {
        this.state.currIndex=index
        return (
            <View style={styles.paginationStyle}>
                <Text style={{ color: '#000' }}>
                    <Text style={styles.paginationText}>{index + 1}</Text>/{total}
                </Text>
            </View>
        )
    }

    // 轮播
    renderBanner = () => {
        if (this.state.swiperShow) {
            console.log ('返回值' + this.state.swiperShow);

            return (
                <Swiper
                    onIndexChanged={this.changeIndex}
                    style={styles.wrapper}
                    // height={width * 40 / 70}
                    renderPagination={this.renderPagination}
                    // showsButtons={true}
                    removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                    // autoplay={true}
                    index={this.index}
                    horizontal={false}
                    // showsPagination={false}
                    paginationStyle={styles.paginationStyle}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                >
                    <Image style={styles.bannerImg}
                           source={require('../img/index1.png')}
                    />
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

    // 长按PPT
    clickSmall = () => {
        const {navigation} = this.props
        navigation.navigate("CourseDetail", {
            currIndex: this.state.currIndex
        })
    }

    render() {
        const {navigation}=this.props
        return (
            <View style={styles.coat}>
                <View style={styles.pptContainer}>
                    {this.renderBanner()}
                    {/*<Text style={{color:'#fff'}} onPress={this.clickSmall}>缩小</Text>*/}
                    <Ionicons onPress={this.clickSmall}
                              style={styles.contract}
                              name={'md-contract'} size={26}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    coat:{
        width:width,
        height:height,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        position:'relative',
        // zIndex:2

    },
    pptContainer: {
        // width:height-10,
        height:width * 40 / 65,
        transform:[{translateX:100},{rotateZ:'-270deg'}],
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        // position: 'absolute',
        // top: 0,
        // right: 50
        // marginTop:'50%',
    },
    wrpaper: {
        width: width,
        height:width * 40 / 65,

    },
    bannerImg:{
        width:width,
        height:width * 40 / 65,
    },
    paginationStyle: {
        position: 'absolute',
        top: 220,
        left: 10
    },
    paginationText: {
        color: '#000',
        fontSize: 20
    },
    contract:{
        color:'#000',
        position: 'absolute',
        top: 220,
        right: 10
    }
});
