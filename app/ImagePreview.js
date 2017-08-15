import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    Dimensions,
} from 'react-native';
import HeaderView from "./common/HeaderView";
import PropTypes from 'prop-types';
import Gallery from 'react-native-gallery';


var createReactClass = require('create-react-class');

let ImagePreview = createReactClass({

    getDefaultProps() {
        return {
            imageList: [],
        }
    },
    _handleImageList() {

    },
    render() {
        const { params } = this.props.navigation.state;
        console.log('params imageList = ' + Array.from(params.imageList).length)
        return (

            <View style={styles.container}>
                <HeaderView viewTitle='图片浏览' rightText='取消'/>
                <Gallery
                    style={{flex: 1, backgroundColor: 'black'}}
                    images={[
                        'file:///storage/emulated/0/DCIM/Camera/IMG_20170615_193401.jpg',
                        'file:///storage/emulated/0/DCIM/Camera/IMG_20170615_193401.jpg'
                    ]}
                />
            </View>
        )
    }

});

module.exports = ImagePreview

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
    },
});