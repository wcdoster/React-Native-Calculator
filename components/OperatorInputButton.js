import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default function OperatorInputButton(props) {
    return (
        <TouchableHighlight onPress={()=>{props.setOperator(props.value)}} style={styles.button} value={props.value}>
            <Text style={styles.text}>{props.value}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: .5,
        width: '24%',
        aspectRatio: 1,
        backgroundColor: 'red',
        borderRadius: 50,
        // justifyContent: 'space-evenly'
    },
    text:{
        fontSize: 50,
        textAlign: 'center',
        marginTop: 25
    }
})