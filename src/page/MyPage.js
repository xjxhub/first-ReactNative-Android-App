/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Image, TouchableOpacity, Platform, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    Button,
    Modal,
    InputItem,
    WhiteSpace,
    WingBlank,
    Toast,
    Provider,
} from '@ant-design/react-native';
import {storage} from '../storage'


const forge = require('node-forge');
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type
Props = {};
export default class MyPage extends Component<Props> {
    constructor(props) {
        super(props);
        // 登录方式弹框
        this.onClose = () => {
            this.setState({
                visible: false,
            });
        };
        // 注册框
        this.onClose1 = () => {
            this.setState({
                visible1: false,
            });
        };
        // 登录框
        this.onClose2 = () => {
            this.setState({
                visible2: false,
            });
        };
        // 注销框
        this.onCloseCancel = () => {
            this.setState({
                visibleCancel: false,
            });
        };
        this.state = {
            url: 'http://114.55.0.239:8004',
            visible: false,
            visible1: false,
            visible2: false,
            visibleCancel: false,
            phone: '',
            password: '',
            phoneRegister: '',
            passwordRegister: '',
            nowState: 'YZM',
            placeholderFont: '验证码',
            buttonFont: '发送验证码',
            methodName: '密码登录',
            myPhoneNum: ''
        };
    }

    // 切换密码登录或验证码登录
    changeLoginMethod = () => {
        if (this.state.nowState === 'YZM') {
            this.setState({
                nowState: 'MM'
            }, this.updateData)
        } else if (this.state.nowState === 'MM') {
            this.setState({
                nowState: 'YZM'
            }, this.updateData)
        }


    }

    // 切换密码登录或验证码登录 ↑
    updateData = () => {
        if (this.state.nowState === 'YZM') {
            this.setState({
                placeholderFont: '验证码',
                buttonFont: '发送验证码',
                methodName: '密码登录'
            })
        } else {
            this.setState({
                placeholderFont: '密码',
                buttonFont: '找回密码',
                methodName: '免密码登录'
            })
        }
    }

    // 发送验证码或找回密码
    sendORfind = () => {
        if (this.state.nowState === 'YZM') {
            this.sendIdentifyingCode()
        } else {
            this.findPassWord()
        }
    }

    // 发送验证码
    sendIdentifyingCode = () => {
        alert('发送验证码')

    }

    // 找回密码
    findPassWord = () => {
        alert('找回密码')
    }

    // 登录
    loginRequest = () => {
        // alert('123')
        let md = forge.md.md5.create();
        let PW, IC
        if (this.state.nowState === 'YZM') {
            IC = this.state.password
            PW = ''
            md.update(IC);
            IC = md.digest().toHex()
        } else {
            IC = ''
            PW = this.state.password
            md.update(PW);
            PW = md.digest().toHex()
        }
        fetch(this.state.url + "/user/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: this.state.phone,
                passWord: PW,
                identifyingCode: IC,
            }),
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((res) => {
                // 获取到的数据处理
                //     alert(this.state.myPhoneNum)
                if (res.code === 0) {
                    // 登录成功
                    this.setState({
                        visible: false,
                        visible2: false,
                        // myPhoneNum:res.result.MoNo
                    });
                    storage.save('userInfo', res.result)
                    // alert(res.result.MoNo)
                    storage.load('userInfo', (data) => {
                        // alert(data.nickname)
                        this.setState({
                            myPhoneNum: data.MoNo
                        });
                    })
                } else {

                }
            })
    }

    // 注销
    logOut = () => {
        // alert('11')
        // fetch(this.state.url + "/user/logout", {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user:111
        //     }),
        //     credentials: 'include'
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if(res.code === 0){
        //             storage.remove('userInfo')
        //             this.setState({
        //                 visibleCancel: false,
        //                 myPhoneNum:''
        //             })
        //         }else {
        //
        //         }
        //     })
        storage.remove('userInfo')
        this.setState({
            visibleCancel: false,
            myPhoneNum: ''
        })
    }

    componentDidMount() {
        // 获取用户信息
        storage.load('userInfo', (data) => {
            // alert(data.name)
            this.setState({
                myPhoneNum: data.MoNo
            });
        })
    }

    render() {
        const footerButtons = [
            {text: 'Cancel', onPress: () => console.log('cancel')},
            {text: 'Ok', onPress: () => console.log('ok')},
        ];
        return (
            <View style={styles.container}>
                <Provider>
                    {this.state.myPhoneNum ?
                        <TouchableOpacity style={styles.header} onPress={() => this.setState({visibleCancel: true})}>
                            <Image style={{width: 60, height: 60, borderRadius: 60}}
                                   source={require('../img/user.png')}
                            />
                            <View style={styles.login}>
                                <Text style={styles.loginFont}>{this.state.myPhoneNum}</Text>
                            </View>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.header} onPress={() => this.setState({visible: true})}>
                            <Ionicons name={'account-circle'} size={60} style={{color: '#ccc'}}/>
                            <View style={styles.login}>
                                <Text style={styles.loginFont}>登录</Text>
                                <Text style={styles.loginFont}>/</Text>
                                <Text style={styles.loginFont} onPress={() => this.setState({visible1: true})}>注册</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {/*注销*/}
                    <Modal
                        // title="确定要退出吗？"
                        transparent
                        onClose={this.onCloseCancel}
                        maskClosable
                        visible={this.state.visibleCancel}
                        closable
                    >
                        <View style={{paddingVertical: 20, flexDirection: 'row'}}>
                            <Button onPress={() => this.logOut()}
                                    type="primary"
                                    style={{marginLeft: '35%'}}>
                                <Text>注销</Text>
                            </Button>
                        </View>
                    </Modal>
                    {/*询问登录方式*/}
                    <Modal
                        title="登录体验完整功能"
                        transparent
                        onClose={this.onClose}
                        maskClosable
                        visible={this.state.visible}
                        closable
                        // footer={footerButtons}
                    >
                        <View style={{paddingVertical: 20}}>
                            <Button onPress={() => this.setState({visible2: true})} type="primary"
                                    style={{marginBottom: 15}}>
                                <Ionicons name={'cellphone-iphone'} size={20} style={{color: '#fff'}}/>
                                <Text>手机登录</Text>
                            </Button>
                            <Button type="primary">
                                <Ionicons name={'wechat'} size={20} style={{color: '#fff'}}/>
                                <Text>微信登录</Text>
                            </Button>
                        </View>
                    </Modal>
                    {/*注册框*/}
                    <Modal
                        popup
                        visible={this.state.visible1}
                        animationType="slide-up"
                        onClose={this.onClose1}
                        maskClosable
                    >
                        <Ionicons onPress={this.onClose1} name={'close'} size={30} style={{width: '8%'}}/>
                        <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
                            <InputItem
                                clear
                                type="phone"
                                value={this.state.phoneRegister}
                                onChange={value => {
                                    this.setState({
                                        phone: value,
                                    });
                                }}
                                placeholder="手机号"
                            >
                                {/*手机号*/}
                            </InputItem>
                            <WhiteSpace size="xl"/>
                            <InputItem
                                clear
                                type="password"
                                value={this.state.passwordRegister}
                                onChange={value => {
                                    this.setState({
                                        password: value,
                                    });
                                }}
                                placeholder="验证码"
                            >
                                {/*密码*/}
                            </InputItem>
                            <Button style={{width: '35%', marginLeft: '70%'}}>
                                <Text style={{fontSize: 12}}>发送验证码</Text>
                            </Button>
                            <WhiteSpace size="xl"/>
                            <Button type="primary">
                                <Text>确认</Text>
                            </Button>
                            <WhiteSpace size="xl"/>
                        </View>
                    </Modal>
                    {/*登录框*/}
                    <Modal
                        popup
                        visible={this.state.visible2}
                        animationType="slide-up"
                        onClose={this.onClose2}
                        maskClosable
                    >
                        <Ionicons onPress={this.onClose2} name={'close'} size={30} style={{width: '8%'}}/>
                        <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
                            <InputItem
                                clear
                                type="phone"
                                value={this.state.phone}
                                onChange={value => {
                                    this.setState({
                                        phone: value,
                                    });
                                }}
                                placeholder="手机号"
                            >
                                {/*手机号*/}
                            </InputItem>
                            <WhiteSpace size="xl"/>
                            <InputItem
                                clear
                                type="password"
                                value={this.state.password}
                                onChange={value => {
                                    this.setState({
                                        password: value,
                                    });
                                }}
                                placeholder={this.state.placeholderFont}
                            >
                                {/*密码*/}
                            </InputItem>
                            <Button onPress={this.sendORfind} style={{width: '30%', marginLeft: '70%'}}>
                                <Text style={{fontSize: 14}}>{this.state.buttonFont}</Text>
                            </Button>
                            <WhiteSpace size="xl"/>
                            <Button type="primary" onPress={this.loginRequest}>
                                <Text>确认</Text>
                            </Button>
                            <WhiteSpace size="xl"/>
                            <Text onPress={this.changeLoginMethod}
                                  style={{textAlign: 'center'}}>{this.state.methodName}</Text>
                        </View>
                    </Modal>
                </Provider>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    login: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 10
    },
    loginFont: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        margin: 2
    }
});
