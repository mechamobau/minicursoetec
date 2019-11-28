import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Introduction from './pages/Introduction';
import Login from './pages/Login';
import List from './pages/List';
import Create from './pages/Create';
import Detail from './pages/Detail';

const IntroductionStack = createStackNavigator({
    Introduction,
    Login
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#B12D30',
        },
        headerTintColor: '#FFF'
    }
});

const AppStack = createStackNavigator({
    List,
    Create,
    Detail
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#B12D30',
        },
        headerTintColor: '#FFF'
    }
});

export default createAppContainer(
    createSwitchNavigator({
        IntroductionStack,
        AppStack
    }, {
        initialRouteName: 'IntroductionStack'
    })
);