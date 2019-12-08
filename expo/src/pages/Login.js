import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput,AsyncStorage, KeyboardAvoidingView, ActivityIndicator } from 'react-native';

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

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor() {
    super();
    this.state = {
            username: '',
            loading: false,
        };

  }

  async handleLogin() {
    this.setState({loading: true});

        if (this.state.username !== '') {
            await AsyncStorage.setItem('username', this.state.username);
            this.setState({loading: false});
            this.props.navigation.navigate('Home');
        } else {
            alert('Preencha o campo de usuário');
            this.setState({loading: false});
        }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>Usuário</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    underlineColorAndroid="#fff"
                    value={this.state.username}
                    placeholder="Digite aqui..."
                    onChangeText={username => this.setState({username})}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="username"
                    returnKeyType="send"
                    onSubmitEditing={() => this.handleLogin()}
                />
                <TouchableOpacity onPress={() => this.handleLogin()}>
                {this.state.loading 
                  ? (
                    <ActivityIndicator color="#fff" />
                  )
                  : (
                    <Text>Entrar</Text>
                  )}
                </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default Login;