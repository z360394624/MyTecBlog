import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

// import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons'

export default class HeaderView extends Component {

  constructor(){
    super()
  }

  render(){
    return(
      <View style={{height: 48, backgroundColor: 'powderblue', flexDirection:'row'}}>

        <Image source={require('./../img/common/ic_keyboard_arrow_left_black_24dp.png')} style={{justifyContent:'center'}}/>
        <Text>动态发布</Text>
      </View>
    );
  }
}
