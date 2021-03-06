/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Image, Dimensions, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons'


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
            url:'http://114.55.0.239:8004',
            pptArray:[],
            swiperShow: false,
            currIndex:0
        };
    }

    // 请求PPT
    componentDidMount() {
        fetch(this.state.url + "/readResource/ppt", {
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
                    {
                        this.state.pptArray.map((item, index) => {
                            return <Image source={{uri: this.state.url + item.img}}
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
            <View style={{backgroundColor:'#000',width:width,height:height}}>
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
    pptContainer: {
        height:width * 40 / 35,
        marginTop:'50%',
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
        top: 10,
        left: 10
    },
    paginationText: {
        color: '#000',
        fontSize: 20
    },
    contract:{
        color:'#000',
        position: 'absolute',
        top: 10,
        right: 10
    }
});
