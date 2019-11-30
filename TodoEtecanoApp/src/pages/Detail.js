import React, {Component} from 'react';

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
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
    },
    insideContainer: {
        paddingBottom: 50,
    },
    loading: {
        marginBottom: 10,
    },
    todoTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    todoDescription: {
        color: '#696969',
        fontSize: 18,
        marginBottom: 10,
    },
    todoUser: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    todoAttachments: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    photoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    photoButton: {
        width: '45%',
        height: 150,
        borderWidth: 2,
        marginRight: 15,
        borderColor: '#B12D30',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    photoImage: {
        width: '100%',
        height: '100%',
    },
});

export default class Detail extends Component {
    static navigationOptions = ({navigation}) => {
        const {getParam} = navigation;
        const handleRemove = getParam('handleRemove');

        return {
            title: 'TODO',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleRemove}>
                    <Icon name="trash" size={20} color="#fff" solid />
                </TouchableOpacity>
            ),
        };
    };

    constructor() {
        super();
        this.state = {
            todo: null,
        };
    }

    componentDidMount = () => {
        const {
            navigation: {getParam, setParams},
        } = this.props;
        const todo = getParam('todo');

        setParams({
            handleRemove: this.handleRemove,
        });

        this.setState({todo});
    };

    handleRemove = async () => {
        try {
            const {
                todo: {id},
            } = this.state;
            const response = await api.delete(`/todos/${id}`);
            const {data} = response;

            alert(data.message);
        } catch (error) {
            alert(error);
        }
    };

    openImage = photo => {
        const {
            navigation: {navigate},
        } = this.props;

        navigate('ImageView', {photo});
    };

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

    render = () => {
        const {todo} = this.state;
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.insideContainer}>
                {todo ? (
                    <>
                        <Text style={styles.todoTitle}>
                            Titulo: {todo.title}
                        </Text>
                        <Text style={styles.todoTitle}>
                            Data: {this.formatDate(todo.date)}
                        </Text>
                        <Text style={styles.todoDescription}>
                            {todo.description}
                        </Text>
                        <Text style={styles.todoUser}>
                            Criado por {todo.user} em{' '}
                            {this.formatCreated(todo.created_at)}
                        </Text>
                        <Text style={styles.todoAttachments}>Anexos</Text>
                        <View style={styles.photoContainer}>
                            {todo.photos.map((photo, idx) => (
                                <TouchableOpacity
                                    key={String(idx)}
                                    onPress={() => this.openImage(photo.url)}
                                    style={styles.photoButton}>
                                    <Image
                                        source={{uri: photo.url}}
                                        style={styles.photoImage}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                ) : (
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#B12D30"
                    />
                )}
            </ScrollView>
        );
    };
}
