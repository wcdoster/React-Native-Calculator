import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, SafeAreaView } from 'react-native';

import NumberInputButton from './components/NumberInputButton'
import OperatorInputButton from './components/OperatorInputButton'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      numberInput: 0,
      operation: '',
      operationSet: false,
      operationRun: false,
      initialInput: 0,
      rows: [
        [7, 8, 9, '-'],
        [4, 5, 6, '+'],
        [1, 2, 3, '=']
      ]
    }

    this.inputNumber = this.inputNumber.bind(this)
    this.clearInput = this.clearInput.bind(this)
    this.setOperator = this.setOperator.bind(this)
    this.runOperation = this.runOperation.bind(this)
  }

  runOperation = () => {
    console.log(this.state.numberInput, this.state.initialInput)
    switch (this.state.operation) {
      case '*':
        return parseFloat(this.state.numberInput) * parseFloat(this.state.initialInput)
      case '-':
        return parseFloat(this.state.initialInput) - parseFloat(this.state.numberInput)
      case '+':
        return parseFloat(this.state.numberInput) + parseFloat(this.state.initialInput)
      case '/':
        return parseFloat(this.state.initialInput) / parseFloat(this.state.numberInput)
    }
  }

  inputNumber = function (num) {
    let currentNumber = this.state.numberInput
    if (this.state.operationRun === true) {
      this.setState({ numberInput: num, operationRun: false })
      return
    } else if (currentNumber === 0) {
      currentNumber = num
    } else {
      currentNumber = currentNumber.length >= 5 ? currentNumber : currentNumber += num
    }
    this.setState({ numberInput: currentNumber })
  }

  setOperator = function (opp) {
    if (opp === '=') {
      if (this.state.numberInput === 0 || this.state.operation === '') {
        return
      }
      let finalNumber = this.runOperation()
      console.log(finalNumber)
      if(finalNumber%1!==0){
        finalNumber = finalNumber.toFixed(5)
      }else{
        finalNumber = Math.round(finalNumber)
      }
      this.setState({ initialInput: this.state.numberInput, numberInput: finalNumber, operation: '', operationRun: true })
    } else if (opp === 'X') {
      this.setState({ operation: '*', initialInput: this.state.numberInput, numberInput: 0 })
    } else {
      this.setState({ operation: opp, initialInput: this.state.numberInput, numberInput: 0 })
    }

  }

  clearInput = function () {
    this.setState({ numberInput: 0, initialInput: 0, operation: '', operationSet: false })
  }

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <View style={styles.input}>
            <Text style={styles.inputNumber}>{this.state.operation}</Text>
            <Text style={styles.inputNumber}>{this.state.numberInput}</Text>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.clear}>
              <Text onPress={this.clearInput} style={styles.clearText}>Clear</Text>
            </TouchableHighlight>
            <OperatorInputButton setOperator={this.setOperator} value={'X'} />
            <OperatorInputButton setOperator={this.setOperator} value={'/'} />
          </View>
          {this.state.rows.map((row, i) => {
            return <View style={styles.row}>
              {row.map((r) => {
                if (typeof r === 'number') {
                  return <NumberInputButton inputNumber={this.inputNumber} value={r} />
                } else {
                  return <OperatorInputButton setOperator={this.setOperator} value={r} />
                }
              })}
            </View>
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#add8e6'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    width: '100%',
    textAlign: 'right',
    borderWidth: .5,
    height: '25%',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  inputNumber: {
    fontSize: 50
  },
  row: {
    flexDirection: 'row',
  },
  clear: {
    borderWidth: .5,
    width: '50%',
    aspectRatio: 2,
    borderRadius: 50,
  },
  clearText: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 25
  }
});
