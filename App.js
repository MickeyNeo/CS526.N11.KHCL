import { StatusBar } from 'expo-status-bar';
import { Component, } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import HistoryView from './History'

const windowWidth = Dimensions.get('window').width;
const  windowHeight = Dimensions.get('window').height;
class App extends Component {
  constructor(){
    super()
    this.state = {
        resultText: '',
        out: '',
        signal: 0,
        status1: false,
        status2: false,
        his_text:[],
        id:0,
        dimensions: {
          window
        }
    }
    this.clear = this.clear.bind(this)
    this.operations = ['AC','DEL','+','-','*','/','^','√']
    this.Math_op = [['sin', 'cos', 'tan'],['e', '𝝅', '$']]
  }

  onChange = ({ window }) => {
    this.setState({ dimensions: { window } });
  };

  componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.onChange);
  }

  componentWillUnmount() {
    this.dimensionsSubscription?.remove();
  }

  clear(){
    let temp = []
    this.setState({
      his_text:temp,
      id: 0
    });
  }

  toggleStatus1(){
    this.setState({
      status1:!this.state.status1
    });
  }

  toggleStatus2(){
    this.setState({
      status2:!this.state.status2
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
    this.state.his_text.push(
      {
        id: this.state.id++,
        cal_text: this.state.resultText,
        res_text: '=' + res.toString(),
        cal_flg: -1,
        res_flg: -1
      }
    )
    console.log(this.state.his_text)
    
  }

  buttonPressed(text){
    console.log(text)

    if(text == '='){
      
      this.setState({
        signal: 1,
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
      //nếu chiều rộng gấp 1.2l chiều cao thì đổi
        this.state.dimensions.window.width/this.state.dimensions.window.height >= 1.2?
          <View style = {styles.containerLarge}>
              <View style = {styles.calculatorPart}>
                    <View style = {styles.result}>
                        <Text style = {styles.resultText}>{this.state.resultText}</Text>
                    </View>

                    <View style = {styles.calculation}>
                        <Text style = {styles.calculationText}>{this.state.out}</Text>
                    </View>
                    {
                      this.state.status1?
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
                          <TouchableOpacity style = {styles.btn} onPress = {() => this.toggleStatus1()}>
                            <Text style = {styles.nextText}>{'-->'}</Text>
                          </TouchableOpacity>
                    </View>
              </View>
              <View style = {styles.historyPart}>
                <HistoryView data_his = {this.state.his_text}  allclear = {this.clear}/>
              </View>
          </View>
        :
          <View style = {styles.containerNormal} >
                <Pressable style = {styles.history} onPress = {() => this.toggleStatus2()}>
                  <Text>History</Text>
                </Pressable>
                
              {
                this.state.status2?
                  <HistoryView data_his = {this.state.his_text}  allclear = {this.clear}/>
                : 
                  <>
                    <View style = {styles.result}>
                        <Text style = {styles.resultText}>{this.state.resultText}</Text>
                    </View>

                    <View style = {styles.calculation}>
                        <Text style = {styles.calculationText}>{this.state.out}</Text>
                    </View>
                    {
                      this.state.status1?
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
                          <TouchableOpacity style = {styles.btn} onPress = {() => this.toggleStatus1()}>
                            <Text style = {styles.nextText}>{'-->'}</Text>
                          </TouchableOpacity>
                    </View>
                  </>
                
              }
          </View>
    )
  }
}

const styles = StyleSheet.create({
    containerNormal: {
      flex: 1,
      
    },
    resultText:{
      fontSize: 50,
      color: 'black',
      
    },
    calculationText:{
      fontSize: 44,
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
    },
    history: {
      backgroundColor: '#c9e9ff',
      alignItems: 'center',
      textAlign: 'center',
      alignSelf: 'flex-end',
      marginTop: 30,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    
    containerLarge: {
      flex: 1,
      flexDirection: 'row',
      
    },
    calculatorPart: {
      width: '60%',
      backgroundColor: 'green',
      borderWidth: 1,
      borderColor:'black'
    },
    historyPart: {
      width: '40%',
      backgroundColor: 'red',
      borderWidth: 2,
      borderColor:'black'
    }
    
});


export default App
