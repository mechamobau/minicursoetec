import * as React from 'react'

import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    AsyncStorage
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B12D30',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 15,
    },
});

class Loading extends React.Component {
    async componentDidMount() {

        const username = await AsyncStorage.getItem('username');

        if (username) {
          this.props.navigation.navigate('Home')
        } else {
           this.props.navigation.navigate('Login')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FFF" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }
}

export default Loading;