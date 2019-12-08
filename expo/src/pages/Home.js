import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../service/api';

class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      dados: [],
      loading: false
    }
  }

  async getTodos() {
    this.setState({ loading: true });
    const response = await api.get('/todos');

    this.setState({ loading: false, dados: response.data.data })
  }

  componentDidMount() {
    this.getTodos();
  }

  renderEmptyTodo(){
    return (
      <View>
        <Text>Lista vazia</Text>
      </View>
    )
  }

  renderTodoItem(obj) {
    return (
      <View>
        <Text>-------------------------</Text>
        <Text>User: {obj.item.user}</Text>
        <Text>Title: {obj.item.title}</Text>
        <Text numberOfLines={3}>Description: {obj.item.description}</Text>
        <Text>-------------------------</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Text>Página de home</Text>

        <FlatList 
          data={this.state.dados}
          ListEmptyComponent={() => this.renderEmptyTodo()}
          renderItem={(obj) => this.renderTodoItem(obj)}
        />

        <TouchableOpacity>
          <Text>Navegar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Home;