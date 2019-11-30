import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Title from './components/Title';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#00F',
    fontSize: 50,
  },
  bold: {
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 3,
    borderColor: '#00f',
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'etec',
      loading: false,
    };
  }

  enviarFormulario() {
    Alert.alert('Alerta', 'Formulario enviado com sucesso');
    this.setState({username: ''});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Digite aqui"
          style={[styles.inputContainer, styles.title]}
          value={this.state.username}
          onChangeText={text => this.setState({username: text})}
        />
        <TouchableOpacity onPress={() => this.enviarFormulario()}>
          <Title text="Submeter" />
        </TouchableOpacity>
        <Title text="Olá mundo" />
        <Title
          text={'Digitado: ' + this.state.username}
          underline
          color="#F00"
        />
        <Title text="Titulo legal" upperCase />
      </View>
    );
  }
}

export default App;
