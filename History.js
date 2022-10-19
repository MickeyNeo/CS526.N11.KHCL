// import { StatusBar } from 'expo-status-bar';
// import { Component, useState, } from 'react';
// import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { SafeAreaView, ScrollView } from 'react-native'
// class HistoryView extends Component {
  
//   constructor(){
//     super();
//     this.state = {
//         search: '',
//     }
//   }

//   filterList(list) {
//     return list.filter(
//       (listItem) =>
//         listItem.cal.includes(this.state.search) ||
//         listItem.res.includes(this.state.search),
//     );
//   }

//   render(){

//     let list = [] 
//     for(let i = 0; i < this.props.cal.length; i++){
//         list.push("{cal: '" + this.props.cal[i] + "', res: '" + this.props.res[i]+ "'}")
//         console.log("{cal: '" + this.props.cal[i] + "', res: '" + this.props.res[i]+ "'}")
//     }
//     console.log(list)
//     return(
//         <View style={styles.contain}>
//             <input type= {'text'} placeholder = {'Search...'} style = {styles.search}/>
//             {this.filterList(list).map((listItem, index) => (
//                 <ScrollView>
//                     {list_his}
//                 </ScrollView>
//                 // <Item key={index} cal={listItem.cal} res={listItem.res} />
//             ))}
            
//         </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//     contain: {
      
   
// });
// export default HistoryView

import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity,Image} from 'react-native';

class HistoryView extends Component {
  state = {
    search: '',
  };

  filterList(list) {
    return list.filter(listItem => listItem.includes(this.state.search));
  }

  _allclear(){
    this.props.allclear();
  }

  render() {
    
    let list = this.props.cal
    return (
      <View style={styles.container}>

        <TextInput
          onChangeText={(search) => this.setState({search})}
          style={styles.searchBar}
          placeholder = {"Search here..."}
        />
        <TouchableOpacity onPress={() => this._allclear()} style = {styles.btn}>
            aa
        </TouchableOpacity>
        {this.filterList(list).map((listItem, index) => (
            <Text key={index} style={styles.itemText}>{listItem}</Text>
        ))}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#e6e6e6',
  //   justifyContent: 'flex-start',
    flexDirection: 'column',
  //   alignItems: 'flex-end'
  },
  itemText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'right',
      width: '100%',
      height: 80,
      backgroundColor: '#636363',
      marginTop: 5,
      borderColor: 'black',
      borderWidth: 1,
      flexDirection: 'row'


  },
  searchBar: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      height: 30,
      fontSize: 20,
  },
  btn: {
    heigh:30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'blue',
  },
});

export default HistoryView;