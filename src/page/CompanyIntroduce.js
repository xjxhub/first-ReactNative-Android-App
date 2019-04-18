/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {ScrollView, Image, ImageBackground, Dimensions, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type
Props = {};
const screenWidth = Dimensions.get('window').width;
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
export default class Page1 extends Component<Props> {

    componentDidMount() {
    }

    render() {
        return (
            <ScrollView>
                <ImageBackground
                    style={{width: '100%',height:'100%'}}
                    source={require('../img/company.png')}
                >
                    <View  style={styles.container}>
                        <Text style={styles.title}>公司简介</Text>
                        <View style={{flexDirection:'row'}}>
                            {/*<Image style={{width: 100,height:100}}*/}
                                   {/*source={require('../img/company2.jpg')}/>*/}
                            <Text style={styles.content}>
                                <Text style={{fontSize:21}}>南京</Text>
                                中邦智慧教育科技有限公司隶属于南京中邦集团，于2015年12月成立于南京，
                                办公地点位于江苏省南京市南京南站喜马拉雅中心J栋19楼，集团下辖一家生产教学设备制造中心，
                                专业研发，生产，制造各类教学设备及仪器。公司以汽车应用技术为核心，专注做好三大核心业务：
                            </Text>
                        </View>
                        <Text style={styles.littleTitle}>
                            一. 教学课程和教学内容。
                        </Text>
                        <Text style={styles.content}>
                            主要在汽车应用技术职业教育、航空应用技术职业教育、船舶应用技术职业教育、轨道交通应用技术职业教育等领域研发制作各种教学课程和教学内容。特别是在研发各类汽车动力系统为主的系列教学课程方面，开发制作教学系列课程。在汽车自然吸气动力系统、涡轮增压动力系统、新能源动力系统、油电混合动力系统的教学课程设计、教学内容开发和制作方面日臻完善。
                        </Text>
                        <Text style={styles.littleTitle}>
                            二. 充分运用互联网+的现代移动互联技术应用到职业教育中。
                        </Text>
                        <Text style={styles.content}>
                            公司致力于打造核心APP平台教学的形式，使学生、老师、教室、课外、教学课程、教学设备、教学手段以及整个校园形成一个智慧校园。公司坚持科技兴企，注重技术领先，针对各类职业院校进行一对一的课程开发，通过PC端向移动端，再到智慧互联，进行在线教学、互动、考核。
                        </Text>
                        <Text style={styles.littleTitle}>
                            三. 致力于应用技术教学智能教室建设方案的研究和应用。
                        </Text>
                        <Text style={styles.content}>
                            为职业教育类院校提供应用技术教学智能教室建设和服务。应用技术教学智能教室以智能实训设备及仪器为中心，以互联网为纽带，以提高学生的动手能力为最终目的，多方融为一体，为学生打造一个通过移动智能终端的应用程序进行课前预习，课中学习，课后复习，考核评价以及学生老师之间交流互动智能生动的教学环境
                        </Text>
                    </View>
                </ImageBackground>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container:{
      padding:10
    },
    title:{
        color:'#000',
        fontSize:26,
        marginBottom:10
    },
    littleTitle:{
        color:'#000',
        fontSize:18,
        marginBottom:10,
    },
    content:{
        color:'#000',
        fontSize:16,
        marginBottom:10
    }
});
