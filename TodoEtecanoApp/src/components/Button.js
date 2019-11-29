import React, {Component} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#B12D30',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

class Button extends Component {
    render = () => {
        const {children, loading} = this.props;
        return (
            <TouchableOpacity
                style={styles.button}
                disabled={loading}
                {...this.props}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>{children}</Text>
                )}
            </TouchableOpacity>
        );
    };
}

export default Button;
