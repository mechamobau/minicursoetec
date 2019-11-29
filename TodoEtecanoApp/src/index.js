import React, {Component} from 'react';
import {StatusBar} from 'react-native';

import Routes from './routes';
export default class App extends Component {
    render = () => {
        return (
            <>
                <StatusBar
                    backgroundColor="#B12D30"
                    animated
                    barStyle="light-content"
                />
                <Routes />
            </>
        );
    };
}
