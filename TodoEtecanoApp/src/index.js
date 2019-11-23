import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

export default class App extends Component {
    render() {
        return (
            <>
                <StatusBar animated barStyle="light-content"/>
                <Routes />
            </>
        );
    }
}
