import { StatusBar } from 'expo-status-bar';
import { Component, useState, } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';


class App extends Component {

  constructor(){
    super()
    this.state = {
        resultText: '',
        out: '',
        signal: 0,
        status: false
    }
    this.operations = ['AC','DEL','+','-','*','/','^','√']
    this.Math_op = [['sin', 'cos', 'tan'],['e', '𝝅', '$']]
  }

  toggleStatus(){
    this.setState({
      status:!this.state.status
    });
  }

  calculateResult(){
    let text = this.state.resultText
    text = text.replace('sin','Math.sin')
    text = text.replace('cos','Math.cos')
    text = text.replace('tan','Math.tan')
    text = text.replace('𝝅','Math.PI')
    text = text.replace('e','Math.E')
    text = text.split('')
    for(let i = 0; i < text.length; i++){
      if(text[i] == '√') text[i] = 'Math.sqrt'
      if(text[i] == '^') text[i] = '**'
    }
    text = text.join('')
    
    let res
    try {
      res = eval(text)
      
    } catch (e) {
      res = 'Syntax ERROR'
      
      
    }
    
    this.setState({
      out: res
    })
    
  }

  buttonPressed(text){
    console.log(text)

    if(text == '='){
      this.setState({
        signal: 1
    })
      return this.calculateResult()
    }

    if(this.state.signal == 1){
      this.setState({
        resultText: ''+text,
        out:'',
        signal: 0
      })
    }else{
      this.setState({
        resultText: this.state.resultText+text
      })
      console.log(this.state.resultText)
    }
    
  }

  operate_math(operation){
    if((this.state.resultText == '' || 
    this.Math_op.indexOf(this.state.resultText[this.state.resultText.length - 1]) != -1 ||
    this.state.resultText[this.state.resultText.length - 1] == '(') 
    && operation == 'sin' ){
      this.setState({
        resultText: this.state.resultText + 'sin('
      })
      return
    }

    if((this.state.resultText == '' || 
    this.Math_op.indexOf(this.state.resultText[this.state.resultText.length - 1]) != -1 ||
    this.state.resultText[this.state.resultText.length - 1] == '(') 
    && operation == 'cos' ){
      this.setState({
        resultText: this.state.resultText + 'cos('
      })
      return
    }

    if((this.state.resultText == '' || 
    this.Math_op.indexOf(this.state.resultText[this.state.resultText.length - 1]) != -1 ||
    this.state.resultText[this.state.resultText.length - 1] == '(') 
    && operation == 'tan' ){
      this.setState({
        resultText: this.state.resultText + 'tan('
      })
      return
    }
   
      if(this.state.signal == 1){
        this.setState({
          resultText: ''+operation,
          out:'',
          signal: 0
        })
      }else{
        this.setState({
          resultText: this.state.resultText+operation
        })
        console.log(this.state.resultText)
      }
    
  }

  operate(operation){
    if(operation == 'AC'){
      this.setState({
        resultText: '',
        out:'',
        signal: 0
      })
      return
    }

    if((this.state.resultText == '' || 
    this.operations.indexOf(this.state.resultText[this.state.resultText.length - 1]) != -1 ||
    this.state.resultText[this.state.resultText.length - 1] == '(') 
    && operation == '√' ){
      this.setState({
        resultText: this.state.resultText + '√('
      })
      return
    }

    if(this.state.resultText == '' && this.state.out == '' ) return
    let lastChar = this.state.resultText.split('')[this.state.resultText.length - 1]
    
    switch(operation){
      case 'DEL':
        let text = this.state.resultText.split('')
        console.log(text)
        text.pop()
        this.setState({
            resultText: text.join('')
        })
        break
      case '+':
        if(this.operations.indexOf(lastChar) != -1) return
        if(this.state.signal == 0){
          this.setState({
            resultText: this.state.resultText + '+'
          })
        }else{
          this.setState({
            resultText: this.state.out + '+',
            out: '',
            signal: 0
          })
        }
        
        break
      case '-':
        if(this.operations.indexOf(lastChar) != -1) return
        if(this.state.signal == 0){
          this.setState({
            resultText: this.state.resultText + '-'
          })
        }else{
          this.setState({
            resultText: this.state.out + '-',
            out: '',
            signal: 0
          })
        }
        
        break
      case '*':
        if(this.operations.indexOf(lastChar) != -1) return
        if(this.state.signal == 0){
          this.setState({
            resultText: this.state.resultText + '*'
          })
        }else{
          this.setState({
            resultText: this.state.out + '*',
            out: '',
            signal: 0
          })
        }
        
        break
      case '/':
        if(this.operations.indexOf(lastChar) != -1) return
        if(this.state.signal == 0){
          this.setState({
            resultText: this.state.resultText + '/'
          })
        }else{
          this.setState({
            resultText: this.state.out + '/',
            out: '',
            signal: 0
          })
        }
        
        break
      case '^':
        if(this.operations.indexOf(lastChar) != -1) return
        if(this.state.signal == 0){
          this.setState({
            resultText: this.state.resultText + '^'
          })
        }else{
          this.setState({
            resultText: this.state.out + '^',
            out: '',
            signal: 0
          })
        }
        
        break
    }
  }
  
  render(){
    let rows = []
    let nums = [[7,8,9],[4,5,6],[1,2,3],['.',0,'-'],['(',')','=']]
    for(let i = 0; i < 5; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        row.push(
          <TouchableOpacity onPress={() => this.buttonPressed(nums[i][j])} style = {styles.btn}>
            <Text style = {styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View style = {styles.row}>{row}</View>)
    }

    
    let ops = []
    for(let i = 0; i < 8; i++){
      ops.push(
        <TouchableOpacity style = {styles.btn} onPress = {() => this.operate(this.operations[i])}>
          <Text style = {[styles.btnText, styles.white]}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    let m = []
    for(let i = 0; i < 7; i++){
      let row = []
      if(i<2){
        for(let j = 0; j < 3; j++){
          row.push(
            <TouchableOpacity style = {styles.btn} onPress = {() => this.operate_math(this.Math_op[i][j])}>
              <Text style = {styles.btnText}>{this.Math_op[i][j]}</Text>
            </TouchableOpacity>
          )
        }
      }
      
      m.push(<View style = {styles.row}>{row}</View>)
    }
    
    
    return(
        <View style = {styles.container}>
            <View style = {styles.result}>
                <Text style = {styles.resultText}>{this.state.resultText}</Text>
            </View>

            <View style = {styles.calculation}>
                <Text style = {styles.calculationText}>{this.state.out}</Text>
            </View>
            
            
  
            {
              this.state.status?
                <View style = {styles.math}>
                  <View style = {styles.numbers}>
                      {m}
                  </View>
                </View>
              :
                <View style = {styles.buttons}>
                  <View style = {styles.numbers}>
                      {rows}
                  </View>
                  <View style = {styles.operations}>
                      {ops}
                  </View>
                </View>
            }

            <View style = {styles.nextPage}>
                  <TouchableOpacity style = {styles.btn} onPress = {() => this.toggleStatus()}>
                    <Text style = {styles.nextText}>{'-->'}</Text>
                  </TouchableOpacity>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    resultText:{
      fontSize: 40,
      color: 'black',
      
    },
    calculationText:{
      fontSize: 34,
      color: 'black'
    },
    row:{
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    result: {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'flex-end',
      borderWidth: 1,
      borderColor: 'black',
      borderBottomColor: 'white'
    },
    calculation: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'flex-end',
      borderWidth: 1,
      borderColor: 'black',
      borderTopColor: 'white'
    },
    white: {
      color: 'white'
    },
    btnText: {
      fontSize: 30,
      color: 'white'

    },
    btn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch'

    },
    buttons: {
      flexGrow: 5,
      flexDirection: 'row'
    },
    numbers:{
      flex: 3,
      backgroundColor: '#434343'
    },
    operations: {
      flex: 1,
      justifyContent: 'space-around',
      backgroundColor: '#636363'
    },
    nextPage:{
      flex: 0.4,
      backgroundColor: '#1de9b6'
    },
    math: {
      flexGrow: 8,
      flexDirection: 'row'
    }
});


export default App
