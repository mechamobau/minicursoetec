import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#B12D30',
        padding: 10,
        borderRadius: 8
    },
    buttonText: {
        fontSize: 25,
        color: '#FFF',
        textAlign: "center",
        fontWeight: "bold"
    }
});

class Button extends Component {
    render = () => {
        const { children } = this.props
        return (
            <TouchableOpacity style={styles.button} {...this.props}>
                <Text style={styles.buttonText}>{children}</Text>
            </TouchableOpacity>);
    }
}

export default Button;
