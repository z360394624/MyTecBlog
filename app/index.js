import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    DeviceEventEmitter,
} from 'react-native';

import HeaderView from './common/HeaderView';
import DynamicTextInput from './DynamicTextInput';
import BottomButtonView from './BottomButtonView';
import ImagePreview from './ImagePreview';
import {StackNavigator} from 'react-navigation';

export default function appSetup() {


    class MyTecBlog extends Component {


        constructor() {
            super()
            DeviceEventEmitter.addListener('imagePreview', (photoList) => {
                console.log("run listener=================" + photoList)
                this._onImageItemClicked(photoList)
            });

        }

        _onImageItemClicked(photoList) {
            const {navigate} = this.props.navigation;
            navigate('ImagePreview', {imageList: photoList})
        }

        render() {

            return (
                <View style={styles.container}>
                    <HeaderView viewTitle='动态发布' rightText='发送'/>
                    <View style={styles.line}/>
                    <DynamicTextInput/>
                    <BottomButtonView style={styles.bottomView}/>
                </View>
            );
        }

    }

    const TecBlog = StackNavigator({
        MyTecBlog: {
            screen: MyTecBlog,
            navigationOptions: {
                header: null,
            }
        },
        ImagePreview: {
            screen: ImagePreview,
            navigationOptions: {
                header: null,
            }
        },
        DynamicTextInput: {
            screen: DynamicTextInput,
            navigationOptions: {
                header: null,
            }
        }

    })

    return TecBlog

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
    },
    line: {
        height: 1,
        backgroundColor: 'lightgray',
    },
    bottomView: {
        height: 50,
        backgroundColor: 'black',
        alignItems: 'flex-end',
    }
})
