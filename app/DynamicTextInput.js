import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    Dimensions,
} from 'react-native';

var {NativeModules} = require('react-native')
let totalWith = Dimensions.get('window').width;
let imageItemWidth = (totalWith - 72) / 5;

export default class DynamicTextInput extends Component {

    _onTextChanged(text) {
        DeviceEventEmitter.emit('getDynamicText', text)
    }

    constructor() {
        super();
        console.log("DynamicTextInput constructor");
        // 初始化全局变量
        DeviceEventEmitter.addListener('sendPhotoFromCamera', (photoObj) => {
            let imageData = JSON.parse(photoObj)
            let imagePath = imageData.imagePath
            this.state.photoList.push(imagePath)
            this.setState({photoPath: imagePath})
            this.setState({photoList: this.state.photoList});
        });
        DeviceEventEmitter.addListener('sendPhotoFromAlbum', (photoObj) => {
            let imageData = JSON.parse(photoObj)
            let imagePath = imageData.imagePath
            this.state.photoList.push(imagePath)
            this.setState({photoPath: imagePath})
            this.setState({photoList: this.state.photoList});
        });
        this.state = {
            photoList: [],
            photoPath: '',
            sendable: false,
        }
    }

    componentWillMount() {
        // 只执行一次，在render执行前执行
    }

    componentDidMount() {
        // 只执行一次，在初始化render执行后立刻执行
    }

    componentWillReceiveProps(nextProps) {
        // 在收到新的props后，在此执行render执行之前执行
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 在收到props或者state后调用，返回值为boolean，false表示不需要渲染界面，反之
        return true
    }

    componentWillUpdate(nextProps, nextState) {
        // 在收到props或者state后执行render钱调用，可以在此方法中处理渲染对象
    }

    componentDidUpdate(prevProps, prevState) {
        // 重新渲染后调用，传入值为渲染钱的props和state
    }

    componentWillUnmount() {
        // 移除监听事件
        // DeviceEventEmitter.removeEventListener
    }

    _onAddImageBtnPressed() {
        // 跳转到相册
        NativeModules.RNBridge.handleMessage('showAlbum')
    }

    _onItemClicked(photoList) {
        console.log("who performed _onImageItemClicked")
        DeviceEventEmitter.emit('imagePreview', photoList)
    }

    render() {

        var photos = Array.from(this.state.photoList);
        var photosView = [];
        for (var i = 0; i < photos.length; i++) {
            var path = 'file://' + photos[i];
            photosView.push(
                <TouchableOpacity key={'container_' + photos[i]} style={styles.imageItemContainer}
                                  onPress={() => this._onItemClicked(photos)}>
                    <Image key={photos[i]} style={styles.imageItem} source={{uri: path}}/>
                </TouchableOpacity>
            )
        }
        if (photos.length < 9) {
            photosView.push(
                <TouchableOpacity key={'container_add_photo'} style={styles.imageItemContainer}
                                  onPress={this._onAddImageBtnPressed}>
                    <Image key={'container_add_photo'} style={styles.imageItem}
                           source={require('./img/dynamic_add_media.png')}/>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.inputContainer}>
                    <TextInput style={styles.dynamicText}
                               underlineColorAndroid='white'
                               multiline={true}
                               textAlignVertical='top'
                               onChangeText={(text) => this._onTextChanged(text)}/>
                </TouchableOpacity>

                <View style={styles.imagePreviewContainer}>
                    {photosView}
                </View>
            </View>

        );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',

    },
    inputContainer: {
        top: 10,
        height: 160,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    dynamicText: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        paddingLeft: 12,
        paddingRight: 12,
    },
    imagePreviewContainer: {
        paddingTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
    },
    imageItemContainer: {
        width: imageItemWidth,
        height: imageItemWidth,
        flexDirection: 'row',
        marginLeft: 12,
        marginBottom: 12,
    },
    imageItem: {
        width: imageItemWidth,
        height: imageItemWidth,
    }
})
