import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

import PushNotification from 'react-native-push-notification';
import NotifService from './services/notification';

export default class App extends Component {

    componentDidMount = () => {
        this.notif = new NotifService(this.onRegister, this.onNotif);
        this.notif.scheduleNotif();
    }

    onRegister = token => {
        Alert.alert("Registered !", JSON.stringify(token));
        console.log(token);
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif = notif => {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }


    render = () => {
        return (
            <>
                <StatusBar animated barStyle="light-content" />
                <Routes />
            </>
        );
    }
}
