import React from 'react'
import {} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import FooterNavigationComponent from '../components/FooterNavigation'

export default class HomePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Página Inicial</Text>
        <FooterNavigationComponent navigation={this.props.navigation} currentPage='HomePage' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffbb33',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  }
});
