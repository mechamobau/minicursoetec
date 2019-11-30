import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    color: '#00F',
    fontWeight: 'bold',
  },
});

class Title extends Component {
  render() {
    let newStyle = null;

    if(this.props.color) {
        newStyle = {
            color: this.props.color
        }
    }

    let underStyle = null;

    if(this.props.underline) {
        underStyle = {
            textDecorationLine: 'underline'
        }
    }
    
    let textUppercase = this.props.text;

    if(this.props.upperCase) {
        textUppercase = this.props.text.toUpperCase();
    }

    return <Text style={[styles.title, newStyle, underStyle]}>{textUppercase}</Text>;
  }
}

export default Title;
