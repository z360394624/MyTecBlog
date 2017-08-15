import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';

var {NativeModules} = require('react-native')

// let RNBridge = NativeModules.RNBridge

// import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons'

export default class HeaderView extends Component {

    constructor() {
        super();
        this.state = {'dynamicText': ''};
        this.props = {
            viewTitle: '',
            rightText: '',
        };
        this.event = DeviceEventEmitter.addListener('getDynamicText', (text) => {
            this.state = {'dynamicText': text}
        });
    }

    // 返回按钮
    _onBackBtnPressed = () => {
        console.log("====返回====");
        NativeModules.RNBridge.handleMessage('finishActivity')
    }
    // 发送按钮
    _onSendBtnPressed = () => {
        this.state.dynamicText == '' ? (
            alert("dynamicText is empty")
        ) : (
            NativeModules.RNBridge.handleMessage(this.state.dynamicText)
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn} onPress={this._onBackBtnPressed}>
                    <Image source={require('./../img/common/left_arrow.png')} style={styles.backBtnImage}/>
                </TouchableOpacity>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.titleText}>{this.props.viewTitle}</Text>
                </View>
                <TouchableOpacity style={styles.sendBtnContainer} onPress={this._onSendBtnPressed}>
                    <Text style={styles.sendBtn}>{this.props.rightText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    backBtnImage: {},
    backBtn: {
        left: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTextContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 22,
    },
    sendBtnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        right: 12,
    },
    sendBtn: {
        fontSize: 20,
        color: 'pink',
    },
})
