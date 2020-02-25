import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default function NumberInputButton(props) {
    return (
        <TouchableHighlight value={props.value} onPress={() => {
            requestAnimationFrame(() => {
                props.inputNumber(props.value)
            })
        }} style={styles.button}>
            <Text style={styles.text} >{props.value}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: .5,
        width: '24%',
        aspectRatio: 1,
        borderRadius: 50,
        // justifyContent: "space-evenly"
    },
    text: {
        fontSize: 50,
        textAlign: 'center',
        marginTop: 25
    }
})