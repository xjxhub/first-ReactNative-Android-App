import {AppRegistry} from 'react-native';
// import App from './App';
import {createAppContainer} from 'react-navigation'
import {AppAllNavigator} from './navigators/AppNavigators'
import {name as appName} from './app.json';
const AppstackNavigatorContainer=createAppContainer(AppAllNavigator)
AppRegistry.registerComponent('ZBTT', () => AppstackNavigatorContainer);
