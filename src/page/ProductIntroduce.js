/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {ScrollView, Image, StyleSheet, Text, View} from 'react-native';
type
Props = {};
export default class HomePage extends Component<Props> {
    // static navigationOptions={
    //     title:'Home',
    //     headerBackTitle:'返回111'
    // }
    constructor(props) {
        super(props)
        this.state = {
            msg:[
                {
                    imageUrl:require('../img/product11.jpg'),
                    title:'实训室设备研发',
                    name:'Automotive teaching equipment',
                    content:'基础经典，提升经典，智慧整车教学实训配置'
                },
                {
                    imageUrl:require('../img/product12.png'),
                    title:'基础教学设备系列',
                    name:'Automotive teaching equipment',
                    content:'配置：永磁电机解剖展示台，电机控制器解剖展示台，DC-DC解剖展示台，动力电池解剖展示台，高压控制线展示台，车载充电器解剖展示台，教学充电桩/北汽专用解码器 ，诊断仪器/维修工具'
                },
                {
                    imageUrl:require('../img/product13.png'),
                    title:'核心设备系列',
                    name:'Automotive teaching equipment',
                    content:'配置：驱动系统检测平台,控制系统检测平台,动力系统检测平台,空调系统检测平台,底盘与整车电器检测教学车'
                },
                {
                    imageUrl:require('../img/product14.png'),
                    title:'智能整车教学设备',
                    name:'Automotive teaching equipment',
                    content:'包括整车技术处理，配套终端教学设备，无损检测技术'
                },
                {
                    imageUrl:require('../img/product2.png'),
                    title:'课程体系开发',
                    name:'Teaching Course Syllabus Design',
                    content:'以北京新能源汽车和北京新能源汽车维修手册为依据编写制作教材，工作页等八大教学任务'
                },
                {
                    imageUrl:require('../img/product3.png'),
                    title:'教学系统及资源开发',
                    name:'Automotive course development',
                    content:'集教，学，训，考，评，管为一体，运用互联网及物联网技术，使学生和教师随时随地在校园内、实训场地进行学习互动，与未来智能化教学设备进行互联'
                },
                {
                    imageUrl:require('../img/product31.png'),
                    title:'智能交互式一体教学系统',
                    name:'Automotive course development',
                    content:'“这不是台一体机，而是一套装载教学资源、故障诊断终端的大屏互联网智慧教学系统。”'
                },
                {
                    imageUrl:require('../img/product4.png'),
                    title:'智慧实验室建设',
                    name:'Teaching mi-in course&Animation',
                    content:'北汽新能源汽车校企合作教学培训基地，示范基地既是形象工程建设，又能提升学校影响力'
                },
                {
                    imageUrl:require('../img/product6.png'),
                    title:'师资培训',
                    name:'Smart classroom construction',
                    content:'严谨的培训方式以及充实的培训内容'
                },
                {
                    imageUrl:require('../img/product5.png'),
                    title:'考核性就业',
                    name:'Teaching Assessment',
                    content:'按企业招聘岗位考核录用'
                }
            ]
        }
    }
    render() {
        const {navigation}=this.props
        return (<ScrollView>
                {
                    this.state.msg.map((item, index) => {
                        return <View key={index}>
                                    <View style={{alignItems:'center'}}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        {/*<Text style={styles.name}>{item.name}</Text>*/}
                                        <Text style={styles.name}>{item.content}</Text>
                                        <Image style={{width: '80%',height:200}}
                                               source={item.imageUrl}/>
                                        {/*{*/}
                                            {/*index===0 ?*/}
                                                {/*<View style={{flexDirection:'row',marginTop:20}}>*/}
                                                    {/*<Image style={{width: '40%',height:100,marginRight:20}}*/}
                                                           {/*source={require('../img/product11.jpg')}/>*/}
                                                    {/*<Image style={{width: '40%',height:100}}*/}
                                                           {/*source={require('../img/product12.jpg')}/>*/}
                                                {/*</View> : <Text> </Text>*/}
                                        {/*}*/}
                                    </View>
                                </View>
                    })
                }
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color:'#000',
        fontSize:20,
        marginTop:30,
        marginBottom:10
    },
    name: {
        width:'80%',
        marginBottom:10
    },
});
