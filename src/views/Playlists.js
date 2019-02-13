import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

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
    axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTVjMzYxNjU2YWFjMzhmMDI3ZjlkNSIsIm5hbWUiOiJUZXN0ZSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvNzUzYmI4YzFiMzY3MTkyOTkwNzgzOWI2YTE1MmJmMjE_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTUwMDE4MDExLCJleHAiOjE1NTAwMjE2MTF9.Lz4UmFwYSVue1xrO6JxiFwPlgz3f5WzvyEfgZJ9XePk'
    try {
      const res = await axios.get(`${server}/playlists/all`)
      this.setState({ playlists: res.data })
    } catch (err) {
      showError(err)
    }
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <HeaderComponent title='Minhas Playlists' />
        {
          (this.state.playlists === null) && (
            <View style={styles.container}>
              <Text style={styles.placeholder} onPress={this.loadPlaylists}>Carregando . . . </Text>
            </View>
          )
        }
        {
          (this.state.playlists && this.state.playlists.length >= 0) && (
            <View style={styles.playlistsContainer}>
              { this.state.playlists.map( (playlist) => (
                <TouchableOpacity key={playlist._id} style={styles.playlistsCard}>
                  <Text key={playlist._id} style={styles.playlistsText}>{playlist.playlistName}</Text>
                  <Icon
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
    marginTop: 60,
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
