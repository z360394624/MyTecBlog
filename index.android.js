/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import appSetup from './app/index'

const MyTecBlog = appSetup()

AppRegistry.registerComponent('MyTecBlog', () => MyTecBlog);
