import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Button,
    Easing
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class AnimatedDeomo extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {}

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {}

    /**
     * @mark state
     */
    state = {
        fadeOutOpacity: new Animated.Value(0),
        trans: new Animated.ValueXY({
            x: 0,
            y: 0
        }),
        rotation: new Animated.Value(0),
        scale: new Animated.Value(1),
        left: new Animated.Value(0),
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {
        this.OpacityHandle()
        this.timer = setTimeout(() => {
            const {navigation} = this.props
            navigation.navigate("Bottom")
        }, 4000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

    /**
     * @mark 淡入淡出
     */
    OpacityHandle(){
        this.startOpacity();
    }
    startOpacity() {
        Animated.timing(this.state.fadeOutOpacity, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,// 线性的渐变函数
        }).start();
    }


    /**
     * @mark 位移
     */
    TransHandle(){
        this.startTrans();
    }
    startTrans() {
        Animated.timing(this.state.trans, {
            toValue: {
                x: 100,
                y: 100
            },
            duration: 2000,
        }).start();
    }
    /**
     * @mark 旋转并且持续进行动画
     */
    RotationHandle(){
        this.startRotation();
    }
    startRotation(){
        this.state.rotation.setValue(0);
        Animated.timing(this.state.rotation, {
            toValue: 1,        //属性目标值
            duration: 2000    //动画执行时间
        }).start(() => this.RotationHandle());   //执行动画
    }

    /**
     * @mark 缩放+spring摩擦力
     */
    ScaleHandle(){
        this.startScale();
    }
    startScale(){

        Animated.spring(this.state.scale, {
            toValue: 2,  //属性目标值
            duration: 500,
            friction: 5,        //摩擦力 （越小 振幅越大）
            tension: 1000,        //拉力
        }).start();            //执行动画
        /*Animated.timing(this.state.scale, {
            toValue: 2,
            duration: 500,
        }).start();*/
    }

    /**
     * @mark 滚动
     */
    LeftHandle(){
        this.startLeft();
    }
    startLeft(){
        Animated.timing(this.state.left, {
            toValue: 1,
            duration: 3000,
        }).start();
    }


    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.AnimatedDeomo}>
            <Animated.View // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
                style = {{alignItems: 'center',justifyContent: 'center',width:'100%',height:'100%',
                    opacity: this.state.fadeOutOpacity,

                    //可以修改成Left ，Right，top，进行位移转换
                    bottom:this.state.left.interpolate({
                        inputRange:[0,1],
                        outputRange:[0, 500]
                    }),
                    transform:[
                        {
                            rotateX: this.state.rotation.interpolate({
                                inputRange:[0,1],
                                outputRange:['0deg','360deg']
                            })
                        },

                        {scale: this.state.scale}
                    ]}}>
                <Image resizeMode="cover" style={{width:100,height:100,}} source = {require("../img/logo.png")}/>
                <Text style={styles.welcome}>欢迎进入中邦智慧教育</Text>
            </Animated.View >


        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    AnimatedDeomo: {
        flex:1,
        backgroundColor:'#7b2222'
    },
    welcome: {
        fontSize: 26,
        color: '#fff',
        textAlign: 'center',
        margin: 10,
    },
});