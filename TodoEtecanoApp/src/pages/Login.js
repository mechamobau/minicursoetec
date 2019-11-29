import React, {Component} from 'react';

import {KeyboardAvoidingView, StyleSheet, TextInput, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        width: '100%',
        color: '#B12D30',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 8,
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#B12D30',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#B12D30',
    },
});

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor() {
        super();
        this.state = {
            username: '',
            loading: false,
        };
    }

    componentDidCatch = e => {
        alert(e);
    };

    handleLogin = async () => {
        this.setState({loading: true});
        const {
            navigation: {navigate},
        } = this.props;

        const {username} = this.state;

        if (username !== '') {
            await AsyncStorage.setItem('username', username);
            this.setState({loading: true});
            navigate('List');
        } else {
            alert('Preencha o campo de usuário');
            this.setState({loading: true});
        }
    };

    render = () => {
        const {username, loading} = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.label}>Usuário</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    underlineColorAndroid="#fff"
                    value={username}
                    placeholder="Digite aqui..."
                    onChangeText={username => this.setState({username})}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="username"
                />
                <Button onPress={this.handleLogin} loading={loading}>
                    Entrar
                </Button>
            </KeyboardAvoidingView>
        );
    };
}
