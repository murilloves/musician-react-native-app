import React from 'react'
import {} from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'

import { Image } from 'react-native-elements';

import FooterNavigationComponent from '../components/FooterNavigation'
import HeaderComponent from '../components/Header';

export default class Profile extends React.Component {
  state = {
    pageName: 'Perfil Page',
    person: 'Fulano de Tal',
    url_1: 'https://raw.githubusercontent.com/murilloves/murilloves.github.io/master/cv/images/profile-12.png',
    url_2: 'https://raw.githubusercontent.com/murilloves/murilloves.github.io/master/cv/images/profile-11.png',
    url_3: 'https://raw.githubusercontent.com/murilloves/murilloves.github.io/master/cv/images/profile-10.png',
    url_4: 'https://raw.githubusercontent.com/murilloves/murilloves.github.io/master/cv/images/profile-09.png',
    url_5: 'https://raw.githubusercontent.com/murilloves/murilloves.github.io/master/cv/images/profile-08.png',
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="Home" navigation={this.props.navigation} navTo='Playlists' />
        <ScrollView style={ styles.scrollView }>
          <ProfileHeader name={this.state.person} imgUrl={this.state.url_1} />
          <ProfileHeader name={this.state.person} imgUrl={this.state.url_2} />
          <ProfileHeader name={this.state.person} imgUrl={this.state.url_3} />
          <ProfileHeader name={this.state.person} imgUrl={this.state.url_4} />
          <ProfileHeader name={this.state.person} imgUrl={this.state.url_5} />
        </ScrollView>
        <FooterNavigationComponent navigation={this.props.navigation} currentPage='Profile' />
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
          <Text style={styles.welcome}>{ props.name }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  flex4: {
    flex: 4
  },
  flex5: {
    flex: 5
  },
  flex6: {
    flex: 6
  },
  flex7: {
    flex: 7
  },
  flex8: {
    flex: 8
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    marginTop: 100,
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
    marginLeft: 25,
    textAlign: 'left',
    color: '#212121',
  },
  name: {
    borderBottomWidth: 10,
    borderColor: 'red'
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection:'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  centerVertically: {
    justifyContent: 'center'
  }
});
