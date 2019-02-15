import React from 'react'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import HeaderComponent from '../components/Header';

export default class PlaylistInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistName: null,
      playlistId: null
    }
  }

  componentWillMount() {
    this.getStoredPlaylist()
  }

  getStoredPlaylist = async () => {
    try {
      const playlistName = await AsyncStorage.getItem('selectedPlaylistName')
      const playlistId = await AsyncStorage.getItem('selectedPlaylistId')
      this.setState({ playlistName, playlistId })
    } catch (err) {
      // Show error msg
    }
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <HeaderComponent title={this.state.playlistName} />
        <View style={styles.container}>
          <Text style={styles.welcome}>Editando Playlist</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#1C2331'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  }
});
