import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#eee',
    },
    title: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    itemList: {
        flex: 1,
        width: '100%',
    },
    item: {
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
});

export default class Introduction extends Component {
    static navigationOptions = {
        title: 'Aulas',
    };

    constructor() {
        super();

        this.state = {
            title: 'Mini Curso React Native',
            classes: [
                {id: '1', name: 'Componentização'},
                {id: '2', name: 'State'},
                {id: '3', name: 'Props'},
                {id: '4', name: 'Componentes nativos'},
                {id: '5', name: 'Estilização'},
                {id: '6', name: 'Integração com API nativa'},
                {id: '7', name: 'Integração com API externa'},
                {id: '8', name: 'Respondendo dúvidas'},
            ],
        };
    }

    renderItem = ({item}) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    );

    handleInit = async () => {
        const {
            navigation: {navigate},
        } = this.props;
        navigate('Login');
    };

    render = () => {
        const {classes, title} = this.state;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#B12D30"
                    animated
                    barStyle="light-content"
                />
                <Text style={styles.title}>{title}</Text>

                <FlatList
                    data={classes}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                    style={styles.itemList}
                    contentContainerStyle={{paddingBottom: 50}}
                />

                <Button onPress={this.handleInit}>Iniciar</Button>
            </View>
        );
    };
}
