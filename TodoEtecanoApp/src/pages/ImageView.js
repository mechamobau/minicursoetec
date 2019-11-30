import React, {Component} from 'react';

import {View, ActivityIndicator, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 15,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#eee',
    },
    image: {
        flex: 1
    },
});
class ImageView extends Component {
    static navigationOptions = {
        title: 'Anexo',
    };

    constructor() {
        super();
        this.state = {
            photo: null,
        };
    }

    componentDidMount = () => {
        const {
            navigation: {getParam},
        } = this.props;
        const photo = getParam('photo');

        this.setState({photo});
    };

    render = () => {
        const {photo} = this.state;
        return (
            <View style={styles.container}>
                {photo ? (
                    <Image
                        source={{uri: photo}}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ) : (
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#B12D30"
                    />
                )}
            </View>
        );
    };
}

export default ImageView;
