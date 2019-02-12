import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import HeaderComponent from '../components/Header'
import axios from 'axios';
import { server, showError } from '../commons/common';

export default class Playlists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: null
    }
  }

  componentWillMount() {
    this.loadPlaylists()
  }

  loadPlaylists = async () => {
    try {
      const res = await axios.get(`${server}/playlists/all`)
      this.setState({ playlists: res.data })
    } catch (err) {
      showError(err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <HeaderComponent title='Minhas Playlists' /> */}
        {
          this.state.playlists === null
          && <Text style={styles.welcome} onPress={this.loadPlaylists}>Carregando Playlists . . . </Text>
        }
        {
          this.state.playlists && this.state.playlists.length >= 0
          && (
            this.state.playlists.map( (playlist) => (
              <Text key={playlist._id} style={styles.welcome}>{playlist.playlistName}</Text>
            ))
          )
        }
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
