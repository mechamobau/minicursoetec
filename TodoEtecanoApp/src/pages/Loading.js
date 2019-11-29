import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B12D30',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 15,
    },
});

class Loading extends Component {
    componentDidMount = async () => {
        const {
            navigation: {navigate},
        } = this.props;
        const username = await AsyncStorage.getItem('username');

        if (username) navigate('List');
        else navigate('Introduction');
    };

    render = () => {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#B12D30"
                    animated
                    barStyle="light-content"
                />
                <ActivityIndicator size="large" color="#FFF" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    };
}

export default Loading;
