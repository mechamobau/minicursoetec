import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Introduction from './pages/Introduction';
import Login from './pages/Login';
import List from './pages/List';
import Create from './pages/Create';
import Detail from './pages/Detail';
import Loading from './pages/Loading';
import Logout from './pages/Logout';
import ImageView from './pages/ImageView';

const IntroductionStack = createStackNavigator(
    {
        Introduction,
        Login,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#B12D30',
            },
            headerTintColor: '#FFF',
        },
    },
);

const AppStack = createStackNavigator(
    {
        List,
        Create,
        Detail,
        ImageView,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#B12D30',
            },
            headerTintColor: '#FFF',
        },
    },
);

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading,
            Logout,
            IntroductionStack,
            AppStack,
        },
        {
            initialRouteName: 'Loading',
        },
    ),
);
