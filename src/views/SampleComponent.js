import React from 'react'
import {} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import FooterNavigationComponent from '../components/FooterNavigation'
import HeaderComponent from '../components/Header';

export default class SampleComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Sample" navigation={this.props.navigation} navTo='Home' />
        <Text style={styles.welcome}>Sample Component</Text>
        <FooterNavigationComponent navigation={this.props.navigation} currentPage='SampleComponent' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C851',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  }
});
