import React, {Component} from 'react';
import {View} from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default class App extends Component{
  render(){
    return (
      <View>
        <HomeScreen/>
      </View>
    );
  }
}