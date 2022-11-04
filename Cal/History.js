import React, {Component} from 'react';
import {SafeAreaView,FlatList,View, Text, TextInput, StyleSheet, TouchableOpacity,Image} from 'react-native';
const NO_WIDTH_SPACE = '​'; // This is a special char you should copy and paste, not an empty string! 
// read on stack overflow with key word 2light

const highlight = string =>
  string.split(' ').map((word, i) => (
    <Text key={i}>
      <Text style={[styles.itemText, {backgroundColor:'black'}]}>{word}</Text>
      {NO_WIDTH_SPACE}
    </Text>
  ));

class HistoryView extends Component {
  state = {
    search: '',
    data: this.props.data_his,
    stickyHeaderIndices: [],
  };


  
  _allclear(){
    this.props.allclear();
    this.setState({
      data: this.props.data_his,
      stickyHeaderIndices: []
    })
  }
  renderItem = ({ item }) => {
    if(item.cal_flg == -1 && item.res_flg == -1){
      return(
        <View style = {styles.contain_itemText}>
            <Text style = {styles.itemText} >
              {item.cal_text}</Text>
            <Text style = {styles.itemText} >
              {item.res_text}</Text>
        </View>
      )
    }
    let cal_1 = item.cal_text
    let cal_2 = ''
    let cal_3 = ''
    if(item.cal_flg != -1){
      cal_1 = item.cal_text.slice(0,item.cal_flg)
      cal_2 = item.cal_text.slice(item.cal_flg,this.state.search.length + item.cal_flg)
      cal_3 = item.cal_text.slice(this.state.search.length + item.cal_flg,item.cal_text.length)
    }

    let res_1 = item.res_text
    let res_2 = ''
    let res_3 = ''
    if(item.res_flg != -1){
      res_1 = item.res_text.slice(0,item.res_flg)
      res_2 = item.res_text.slice(item.res_flg,this.state.search.length + item.res_flg)
      res_3 = item.res_text.slice(this.state.search.length + item.res_flg,item.res_text.length)
    }
    return (
      <View style = {styles.contain_itemText}>
          <Text style = {styles.itemText} >
            {cal_1}{highlight(cal_2)}{cal_3}</Text>
          <Text style = {styles.itemText} >
            {res_1}{highlight(res_2)}{res_3}</Text>
      </View>
    );};

    filterList(list) {
      return list.filter((listItem) => {
        listItem.cal_flg = -1
        if (listItem.cal_text.includes(this.state.search)&& this.state.search!=''){
          listItem.cal_flg = listItem.cal_text.indexOf(this.state.search)
        }else if(this.state.search == ''){
          listItem.cal_flg = -1
        }
        listItem.res_flg = -1
        if (listItem.res_text.includes(this.state.search)&& this.state.search!=''){
          listItem.res_flg = listItem.res_text.indexOf(this.state.search)
        }else if(this.state.search == ''){
          listItem.res_flg = -1
        }

        return (
          listItem.cal_text.includes(this.state.search) 
          || listItem.res_text.includes(this.state.search)
        )});

    }
    

  render() {
    
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(search) => this.setState({search})}
          style={styles.searchBar}
          placeholder = {"Search here..."}
        />
        <TouchableOpacity onPress={() => this._allclear()} style = {styles.btn} >
          <Text>Remove all</Text>
        </TouchableOpacity>
        
        <View>
          <FlatList data={this.filterList(this.state.data)}
          renderItem= {this.renderItem} 
          keyExtractor={item => item.id} 
          stickyHeaderIndices={this.state.stickyHeaderIndices}
          /*style = {{maxHeight: '100%vh'} }*/ />
        </View>
        
      </View>
    );
  }
}
// set cho maxHeight của flat list bằng chiều cao của màn hình được lấy bằng dimension

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#e6e6e6',
  //   justifyContent: 'flex-start',
    flexDirection: 'column',
  //   alignItems: 'flex-end'
  },
  contain_itemText: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 5,
  },
  itemText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'right',
      width: '100%',
      height: 40,
      backgroundColor: '#636363',
      flexDirection: 'row',


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
    heigh: 30,
    width: 90,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#c9e9ff',
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'flex-end',
    marginTop: 2
  },
});

export default HistoryView;