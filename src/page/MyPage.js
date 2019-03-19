/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {TouchableOpacity, Platform, StyleSheet, Text, View} from 'react-native';
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
        this.onClose = () => {
            this.setState({
                visible: false,
            });
        };
        this.onClose1 = () => {
            this.setState({
                visible1: false,
            });
        };
        this.onClose2 = () => {
            this.setState({
                visible2: false,
            });
        };
        this.state = {
            visible: false,
            visible1: false,
            visible2: false,
            phone: '',
            password: '',
            phoneRegister: '',
            passwordRegister: '',
            nowState:'YZM',
            placeholderFont:'验证码',
            buttonFont:'发送验证码',
            methodName:'密码登录'
        };
    }

    changeLoginMethod = () =>{
        if(this.state.nowState === 'YZM'){
            this.setState({
                nowState: 'MM'
            }, this.updateData)
        } else if(this.state.nowState === 'MM') {
            this.setState({
                nowState: 'YZM'
            }, this.updateData)
        }


    }

    updateData = () => {
        if(this.state.nowState === 'YZM'){
            this.setState({
                placeholderFont:'验证码',
                buttonFont:'发送验证码',
                methodName:'密码登录'
            })
        } else {
            this.setState({
                placeholderFont:'密码',
                buttonFont:'找回密码',
                methodName:'免密码登录'
            })
        }
    }

        sendORfind = () => {
        if(this.state.nowState === 'YZM'){
            this.sendIdentifyingCode()
        } else {
            this.findPassWord()
        }
    }

    sendIdentifyingCode = () => {
        alert('发送验证码')
    }

    findPassWord = () => {
        alert('找回密码')
    }

        render() {
        const footerButtons = [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => console.log('ok') },
        ];
        return (
            <View style={styles.container}>
                <Provider>
                    <TouchableOpacity style={styles.header} onPress={() => this.setState({ visible: true })}>
                        <Ionicons name={'account-circle'} size={60} style={{color: '#ccc'}}/>
                        <View style={styles.login}>
                            <Text style={styles.loginFont}>登录</Text>
                            <Text style={styles.loginFont}>/</Text>
                            <Text style={styles.loginFont} onPress={() => this.setState({ visible1: true })}>注册</Text>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        title="登录体验完整功能"
                        transparent
                        onClose={this.onClose}
                        maskClosable
                        visible={this.state.visible}
                        closable
                        // footer={footerButtons}
                    >
                        <View style={{ paddingVertical: 20 }}>
                            <Button onPress={() => this.setState({ visible2: true })} type="primary" style={{marginBottom:15}}>
                                <Ionicons name={'cellphone-iphone'} size={20} style={{color: '#fff'}}/>
                                <Text>手机登录</Text>
                            </Button>
                            <Button type="primary">
                                <Ionicons name={'wechat'} size={20} style={{color: '#fff'}}/>
                                <Text>微信登录</Text>
                            </Button>
                        </View>
                        {/*<Button type="primary" onPress={this.onClose}>*/}
                            {/*close modal*/}
                        {/*</Button>*/}
                    </Modal>
                    <Modal
                        popup
                        visible={this.state.visible1}
                        animationType="slide-up"
                        onClose={this.onClose1}
                        maskClosable
                    >
                        <Ionicons onPress={this.onClose1} name={'close'} size={30} style={{width:'8%'}}/>
                        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
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
                            <WhiteSpace size="xl" />
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
                            <Button style={{width:'30%',marginLeft:'70%'}}>
                                <Text style={{fontSize:14}}>发送验证码</Text>
                            </Button>
                            <WhiteSpace size="xl" />
                            <Button type="primary">
                                <Text>确认</Text>
                            </Button>
                            <WhiteSpace size="xl" />
                        </View>
                    </Modal>
                    <Modal
                        popup
                        visible={this.state.visible2}
                        animationType="slide-up"
                        onClose={this.onClose2}
                        maskClosable
                    >
                        <Ionicons onPress={this.onClose2} name={'close'} size={30} style={{width:'8%'}}/>
                        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
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
                            <WhiteSpace size="xl" />
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
                                <Button onPress={this.sendORfind} style={{width:'30%',marginLeft:'70%'}}>
                                    <Text style={{fontSize:14}}>{this.state.buttonFont}</Text>
                                </Button>
                            <WhiteSpace size="xl" />
                            <Button type="primary">
                                <Text>确认</Text>
                            </Button>
                            <WhiteSpace size="xl" />
                            <Text onPress={this.changeLoginMethod} style={{ textAlign: 'center' }}>{this.state.methodName}</Text>
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
        display:'flex',
        flexDirection: 'row'
    },
    login:{
        flexDirection: 'row',
        marginTop:15,
        marginLeft:10
    },
    loginFont:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000',
        margin:2
    }
});
