import React from 'react'
import {} from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import FooterNavigationComponent from '../components/FooterNavigation'
import HeaderComponent from '../components/Header';

export default class Profile extends React.Component {
  state = {
    pageName: 'Perfil Page'
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Home" navigation={this.props.navigation} navTo='Playlists' />
        <ProfileHeader name={this.state.pageName} />
        <FooterNavigationComponent navigation={this.props.navigation} currentPage='Profile' />
      </View>
    );
  }
}

ProfileHeader = (props) => {
  return (
    <View style={ styles.wrap }>
      <TouchableOpacity>
        <Text style={styles.welcome}>{ props.name }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.name}>
        <Text style={styles.welcome}>Seu nome</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  },
  name: {
    borderBottomWidth: 10,
    borderColor: 'red'
  },
  wrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-around'
  }
});
