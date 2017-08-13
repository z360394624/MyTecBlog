import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

export default class HeaderView extends Component {



    constructor(){
        super()

    }
    _onTextChanged (text) {
        DeviceEventEmitter.emit('getDynamicText',text)
    }

    render(){
        return(
            <TouchableOpacity style={styles.container}>
                <TextInput style={styles.dynamicText}
                           underlineColorAndroid='white'
                           multiline={true}
                           textAlignVertical='top'
                           onChangeText={(text) => this._onTextChanged(text)}/>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        top: 10,
        height : 200,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    dynamicText: {
        flex:1,
        fontSize: 18,
        color: 'black',
        paddingLeft: 12,
        paddingRight: 12,
    }
})
