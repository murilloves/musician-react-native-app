import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import HeaderComponent from '../components/Header'
import axios from 'axios';
import { server, showError } from '../commons/common';

export default class Playlists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: null,
      selectedPlaylist: null
    }
  }

  componentWillMount() {
    this.loadPlaylists()
  }

  loadPlaylists = async () => {
    if (!axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTVjMzYxNjU2YWFjMzhmMDI3ZjlkNSIsIm5hbWUiOiJUZXN0ZSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvNzUzYmI4YzFiMzY3MTkyOTkwNzgzOWI2YTE1MmJmMjE_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTUwNzExNzI3LCJleHAiOjE1NTA3MTUzMjd9.R916T7J0TA4xviI1alk8ZOYCLip6KEuAOdZYpGl-s6c'
    }
    try {
      const res = await axios.get(`${server}/playlists/all`)
      this.setState({ playlists: res.data })
    } catch (err) {
      showError(err)
    }
  }

  enterPlaylist = async (playlist) => {
    try {
      await AsyncStorage.setItem('selectedPlaylistName', playlist.playlistName)
      await AsyncStorage.setItem('selectedPlaylistId', playlist._id)
      this.props.navigation.navigate('PlaylistInfo')
    } catch (err) {
      // Error saving data
    }
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <HeaderComponent title='Minhas Playlists' />
        {
          (this.state.playlists === null) && (
            <View style={styles.container}>
              <Text style={styles.placeholder}>Carregando . . . </Text>
            </View>
          )
        }
        {
          (this.state.playlists && this.state.playlists.length >= 0) && (
            <View style={styles.playlistsContainer}>
              { this.state.playlists.map( (playlist) => (
                <TouchableOpacity key={playlist._id} style={styles.playlistsCard} onPress={ this.enterPlaylist.bind(this,playlist) }>
                  <Text key={playlist._id} style={styles.playlistsText}>{playlist.playlistName}</Text>
                  <Ionicons
                    style={ styles.iconEdit }
                    name={ Platform.OS === 'ios'? 'ios-create' : 'md-create' }
                  />
                </TouchableOpacity>
              ))}
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C851',
  },
  placeholder: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  playlistsContainer: {
    marginTop: 80,
  },
  playlistsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    marginTop: 1,
    padding: 20
  },
  playlistsText: {
    color: '#444',
    fontSize: 20
  },
  iconEdit: {
    fontSize: 25
  }
});
