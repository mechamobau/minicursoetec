import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Introduction from './pages/Introduction';
import Login from './pages/Login';
import List from './pages/List';
import Create from './pages/Create';
import Detail from './pages/Detail';

const AppStack = createStackNavigator({
    List,
    Create,
    Detail
});

export default createAppContainer(
    createSwitchNavigator({
        Introduction,
        Login,
        AppStack
    }, {
        initialRouteName: 'Introduction'
    })
);