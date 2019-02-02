import React from 'react'
import {} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Meus Eventos</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4444',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  }
});
