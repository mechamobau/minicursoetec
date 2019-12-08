import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Create extends React.Component {

  render() {
    return (
      <View>
        <Text>Página de criação</Text>
        <TouchableOpacity>
          <Text>Navegar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Create;