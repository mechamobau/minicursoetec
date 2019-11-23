import React, { Component } from 'react';

import { ImageBackground, View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    itemMarker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFF'
    },
    item: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left'
    }
});

export default class Introduction extends Component {

    constructor() {
        super();

        this.state = {
            title: 'Mini Curso React Native',
            classes: [
                { id: '1', name: 'Componentização' },
                { id: '2', name: 'State' },
                { id: '3', name: 'Props' },
            ]
        }
    }

    renderItem = ({ item }) => (
        <View>
            <View styles={styles.itemMarker}></View>
            <Text style={styles.item}>{item.name}</Text>
        </View>
    )

    render() {
        const { classes, title } = this.state;

        return (
            <ImageBackground
                source={require('../assets/images/background.png')}
                resizeMode="cover"
                style={styles.container}
            >
                <StatusBar backgroundColor="#001603" animated barStyle="light-content" />
                <Text style={styles.title}>{title}</Text>

                <FlatList
                    data={classes}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                    style={{ flex: 1, width: '100%' }}
                />
            </ImageBackground>
        );
    }
}
