import {createStackNavigator,createSwitchNavigator,createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation'
import React from 'react'
import {Button,Platform} from 'react-native'
import WelcomePage from '../src/page/WelcomePage'
import HomePage from '../src/page/HomePage'
import Reppt1 from '../src/page/Reppt1'
import IndexPage2 from '../src/page/IndexPage2'
import Reppt from '../src/page/Reppt'
import CompanyIntroduce from '../src/page/CompanyIntroduce'
import ProductIntroduce from '../src/page/ProductIntroduce'
import CourseDetail from '../src/page/CourseDetail'
import Index from '../src/page/Index'
import ToComWeb from '../src/page/ToComWeb'
import ToALi from '../src/page/ToALi'
import MyPage from '../src/page/MyPage'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'


const Welcome=createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null
        }
    },
})

const TopTabNavigator=createMaterialTopTabNavigator({
    CompanyIntroduce:{
        screen:CompanyIntroduce,
        navigationOptions:{
            tabBarLabel:'公司介绍'
        }
    },
    ProductIntroduce:{
        screen:ProductIntroduce,
        navigationOptions:{
            title:'产品介绍'
        }
    },
    IndexPage2:{
        screen:IndexPage2,
        navigationOptions:{
            title:'教学课程'
        }
    },
},{
    tabBarOptions:{
        tabStyle:{
            mindWidth:50,
            backgroundColor:'#7a1213'
        },
        upperCaseLabel:false,
        // scrollEnabled:true,
        indicatorStyle:{
            height:2,
            backgroundColor:'#000'
        },
        labelStyle:{
            fontSize:14,
            marginTop:6,
            marginBottom:6
        },
        activeTintColor:Platform.OS==='ios'?'#fff':'#fff'
    }
})

const BottomTabNavigator=createBottomTabNavigator({
    Top:{
        screen:TopTabNavigator,
        navigationOptions:{
            tabBarLabel:'首页',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons name={'home'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    // Index: {
    //     screen: Index,
    //     navigationOptions:{
    //         tabBarLabel:'首页',
    //         tabBarIcon:({tintColor,focused})=>(
    //             <Ionicons name={'home'} size={26} style={{color:tintColor}}/>
    //         )
    //     }
    // },
    ToComWeb: {
        screen: ToComWeb,
        navigationOptions:{
            tabBarLabel:'公司网站链接',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons name={'web'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    ToALi: {
        screen: ToALi,
        navigationOptions:{
            tabBarLabel:'阿里云试用版',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons name={'access-point'} size={26} style={{color:tintColor}}/>
            )
        }
    },
    // MyPage: {
    //     screen: MyPage,
    //     navigationOptions:{
    //         tabBarLabel:'我的',
    //         tabBarIcon:({tintColor,focused})=>(
    //             <Ionicons name={'account'} size={26} style={{color:tintColor}}/>
    //         )
    //     }
    // }
},{
    tabBarOptions:{
        activeTintColor:Platform.OS==='ios'?'#e91e63':'#7a1213'
    }
})

const stackNavigator=createStackNavigator({
    // HomePage:{
    //     screen:HomePage,
    //     navigationOptions:{
    //         header:null
    //     }
    // },

    Bottom:{
        screen:BottomTabNavigator,
        navigationOptions:{
            title:'中邦智慧教育',
            // headerTitleStyle:{
            //     height:10,
            //     padding:0
            // }
        }
    },

    Reppt1:{
        screen:Reppt1,
        // navigationOptions:({navigation})=>({
        //     title:`${navigation.state.params.name}页面名`
        // })
        navigationOptions:{
            header:null
        }
    },
    CourseDetail:{
        screen:CourseDetail,
        navigationOptions:({navigation})=>({
            title:`${navigation.state.params.name}`,
            headerTitleStyle:{
                fontSize:16
            }
        })
    },
    Reppt:{
        screen:Reppt,
        navigationOptions:{
            header:null
        }
    },


})

export const AppAllNavigator=createSwitchNavigator({
    AppWelcome:Welcome,
    AppstackNavigator:stackNavigator,
})