import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

var {NativeModules} = require('react-native')

export default class BottomButtonView extends Component {


    constructor() {
        super()

    }

    _onCameraBtnPressed() {
        NativeModules.RNBridge.handleMessage('callCamera')
    }


    render() {
        return (

            <View style={styles.container}>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomBtnContainer}>
                        <Image source={require('./img/senddynamic_icon.png')} style={styles.iconImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomBtnContainer} onPress={this._onCameraBtnPressed}>
                        <Image source={require('./img/senddynamic_camera.png')} style={styles.iconImg}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'whitesmoke',
    },
    bottomContainer: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    bottomBtnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImg: {
        flex: 1,
        width: 28,
        height: 28,
        marginRight: 12,
        resizeMode: 'contain',
    }

})