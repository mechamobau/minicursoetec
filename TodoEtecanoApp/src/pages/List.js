import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../services/api';

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 15,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        marginBottom: 10,
    },
    emptyText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    todoList: {
        flex: 1,
        width: '100%',
    },
    todoItem: {
        color: '#000',
        width: '100%',
        fontSize: 20,
        textAlign: 'left',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 10,
    },
    todoTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    todoDescription: {
        color: '#696969',
        fontSize: 16,
        marginBottom: 5,
    },
    todoUser: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default class List extends Component {
    static navigationOptions = ({navigation}) => {
        const {getParam} = navigation;
        const handleAdd = getParam('handleAdd');
        const handleLogout = getParam('handleLogout');
        return {
            title: 'Lista de TODOs',
            headerRight: (
                <>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={handleAdd}>
                        <Icon name="plus" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={handleLogout}>
                        <Icon name="sign-out-alt" size={20} color="#fff" />
                    </TouchableOpacity>
                </>
            ),
        };
    };

    constructor() {
        super();

        this.state = {
            todos: [],
            loading: true,
        };
    }
    componentDidMount = () => {
        const {navigation} = this.props;
        navigation.setParams({
            handleAdd: this.handleAdd,
            handleLogout: this.handleLogout,
        });
        this.focusListener = navigation.addListener('didFocus', this.loadTodos);
        this.loadTodos();
    };

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    loadTodos = async () => {
        try {
            const response = await api.get('/todos');
            const {data} = response;

            if (!data.error) this.setState({todos: data.data, loading: false});
            else alert(data.message);
        } catch (error) {
            alert(error);
        }
    };

    handleAdd = () => {
        const {
            navigation: {navigate},
        } = this.props;

        navigate('Create');
    };

    handleLogout = () => {
        const {
            navigation: {navigate},
        } = this.props;

        navigate('Logout');
    };

    renderEmpty = () => (
        <Text style={styles.emptyText}>Ainda não há nenhum TODO criado</Text>
    );

    formatDate = date => {
        const dateArr = date.split('-');

        const dia = dateArr[2];
        const mes = dateArr[1];
        const ano = dateArr[0];

        return `${dia}/${mes}/${ano}`;
    };

    formatCreated = date => {
        const dateTimeArr = date.split(' ');
        const dateArr = dateTimeArr[0].split('-');

        const dia = dateArr[2];
        const mes = dateArr[1];
        const ano = dateArr[0];

        return `${dia}/${mes}/${ano}`;
    };

    handleDetail = todo => {
        const {
            navigation: {navigate},
        } = this.props;

        navigate('Detail', {todo});
    };

    renderTodo = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.todoItem}
                onPress={() => this.handleDetail(item)}>
                <Text style={styles.todoTitle}>
                    {item.title} - {this.formatDate(item.date)}
                </Text>
                {item.description && (
                    <Text style={styles.todoDescription} numberOfLines={3}>
                        {item.description}
                    </Text>
                )}
                <Text style={styles.todoDescription}>
                    {item.photos.length} Anexos
                </Text>
                <Text style={styles.todoUser}>Criado por {item.user} em {this.formatCreated(item.created_at)}</Text>
            </TouchableOpacity>
        );
    };

    render = () => {
        const {todos, loading} = this.state;
        return (
            <View style={styles.container}>
                {loading && (
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#B12D30"
                    />
                )}
                <FlatList
                    style={styles.todoList}
                    data={todos}
                    extraData={todos}
                    keyExtractor={item => String(item.id)}
                    renderItem={this.renderTodo}
                    ListEmptyComponent={this.renderEmpty}
                />
            </View>
        );
    };
}
