/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Menu from './src/Menu';

AppRegistry.registerComponent(appName, () => Menu);

export default class App extends React.Component {
  render() {
    return <Menu/>
  }
}
