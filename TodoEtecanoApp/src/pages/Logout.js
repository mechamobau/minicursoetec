import React, {Component} from 'react';

import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
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

class Logout extends Component {
    componentDidMount = async () => {
        const {
            navigation: {navigate},
        } = this.props;
        await AsyncStorage.removeItem('username');
        navigate('Introduction');
    };

    render = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FFF" />
                <Text style={styles.loadingText}>Saindo...</Text>
            </View>
        );
    };
}

export default Logout;
