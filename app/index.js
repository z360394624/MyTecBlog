import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import HeaderView from './common/HeaderView';

export default function appSetup () {

  class MyTecBlog extends Component {

    constructor(){
      super()


    }

    render() {
      return (
        <HeaderView style={{height: 48}}/>

      // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      // <View style={{flex: 1}}>
      //   <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      //   <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      //   <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      // </View>
    );
    }


  }
  return MyTecBlog

}
