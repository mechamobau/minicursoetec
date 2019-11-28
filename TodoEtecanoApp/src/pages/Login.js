import React, { Component } from 'react';

import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 8,
        fontSize: 25,
        padding: 10,
        color: '#000',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'
    }
});

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    render = () => {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#ccc"
                />
                <Button>
                    Entrar
                </Button>
            </KeyboardAvoidingView>
        );
    }
}
