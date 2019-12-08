import * as React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Login from './pages/Login';
import Home from './pages/Home';
import Create from './pages/Create';
import Loading from './pages/Loading';

const LoginStack = createStackNavigator(
  {
    Login,
    Create
  },
  {
    defaultNavigationOptions: {
        headerStyle: {
        backgroundColor: '#B12D30'
      },
      headerTintColor: '#FFF'
    }
  }
);

const HomeStack = createStackNavigator(
  {
    Home
  }
);

const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Página Inicial',
        tabBarIcon: (
          <Icon name="home" size={22} color="#fff" />
        )
      }
    },
    Create: {
      screen: LoginStack,
      navigationOptions: {
        title: 'Menu',
        tabBarIcon: (
          <Icon name="bars" size={22} color="#fff" />
        )
      }
    }
  }, 
  {
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#00F',
        style: {
          backgroundColor: '#B12D30',
        },
      }
    }
  }
);

const AppSwitch = createSwitchNavigator(
  {
    Loading,
    LoginStack,
    MainTabs
  }
);

export default createAppContainer(AppSwitch);
