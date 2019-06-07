import React from 'react'
import {} from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'

import { Image } from 'react-native-elements';

import FooterNavigationComponent from '../components/FooterNavigation'
import HeaderComponent from '../components/Header';

export default class Profile extends React.Component {
  state = {
    pageName: 'Perfil Page',
    name: 'Ariev Ollirum Avlis',
    description: 'JavascriptDeveloper && \nProgrammingAddicted && \nGameDevEnthusiast && Musician && \nBeerLover && CoffeeDependant;',
    skills: 'Piano, teclado, escaleta, violão, voz',
    url_1: 'https://raw.githubusercontent.com/murilloves/murilloves.github.io/master/cv/images/profile-12.png',
  }

  render() {
    return (
      <View style={ styles.container }>
        <HeaderComponent title="Home" navigation={ this.props.navigation } navTo='Playlists' />
        <ScrollView style={ styles.scrollView }>
          <ProfileHeader name={ this.state.name } imgUrl={ this.state.url_1 } />
          <ProfileDescription description={ this.state.skills } color={ '#444444' } />
          <ProfileDivisor text='Description' />
          <ProfileDescription description={ this.state.description } color={ '#777777' } />
        </ScrollView>
        <FooterNavigationComponent navigation={ this.props.navigation } currentPage='Profile' />
      </View>
    );
  }
}

ProfileHeader = (props) => {
  return (
    <View style={[ styles.wrap ]}>
      <View style={[ styles.flex1, styles.marginImg ]}>
        <Image
          source={{ uri: props.imgUrl }}
          style={ styles.profileImg }
        />
      </View>
      <View style={[ styles.flex7, styles.centerVertically ]}>
        <TouchableOpacity>
          <Text style={ styles.welcome }>{ props.name }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ProfileDescription = (props) => {
  return (
    <View style={[ styles.wrap, styles.flex1, styles.profilePadding ]}>
      <Text style={[ styles.profileDescription, {'color': props.color} ]}>{ props.description }</Text>
    </View>
  );
};

ProfileDivisor = (props) => {
  return (
    <View style={[ styles.wrap, styles.flex1, styles.divisorPadding, styles.divisorBackground ]}>
      <Text style={ styles.divisorText }>{ props.text }</Text>
    </View>
  )
}

Profile


const styles = StyleSheet.create({
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },
  flex6: { flex: 6 },
  flex7: { flex: 7 },
  flex8: { flex: 8 },
  wrap: {
    flexWrap: 'wrap',
    flexDirection:'row',
    marginTop: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    marginTop: 75,
    marginBottom: 100,
  },
  profileImg: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100
  },
  marginImg: {
    marginLeft: 25,
  },
  welcome: {
    fontSize: 20,
    marginLeft: 15,
    textAlign: 'left',
    color: '#313141',
  },
  name: {
    borderBottomWidth: 10,
    borderColor: 'red'
  },
  centerVertically: {
    justifyContent: 'center'
  },
  profileDescription: {
    color: '#777',
    fontSize: 13
  },
  profilePadding: {
    paddingLeft: 25,
    paddingRight: 25
  },
  divisorBackground: {
    backgroundColor: '#304ffe'
  },
  divisorPadding: {
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10
  },
  divisorText: {
    color: '#ffffff',
    justifyContent: 'center',
    fontSize: 16
  }
});
