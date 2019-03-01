import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
// import { Ionicons } from '@expo/vector-icons'

import HeaderComponent from '../components/Header'
import axios from 'axios';
import { server, showError } from '../commons/common';

export default class Playlists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      playlists: null,
      newPlaylistName: null,
      selectedPlaylist: null
    }
  }

  componentWillMount() {
    this.loadPlaylists()
  }

  loadPlaylists = async () => {
    if (!axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTVjMzYxNjU2YWFjMzhmMDI3ZjlkNSIsIm5hbWUiOiJUZaaaXN0ZSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvNzUzYmI4YzFiMzY3MTkyOTkwNzgzOWI2YTE1MmJmMjE_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTUxNDA3NzE5LCJleHAiOjE1NTE0MTEzMTl9._66UwvYQWnI5Y56jzI0H3TkM_ShAHmvDCIXvVZDuoZE'
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

  createNewPlaylist = async () => {
    try {
      await axios.post(`${server}/playlists`, {
        playlistName: this.state.newPlaylistName
      })

      this.loadPlaylists()
      this.setState({ ...this.state, isEditing: !this.state.isEditing })
    } catch (err) {
      showError(JSON.stringify(err.response.data))
    }
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <HeaderComponent title='Minhas Playlists' />
        <ScrollView style={styles.scrollView}>
          {
            this.state.isEditing &&
            (
              <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Nome da playlist'
                  placeholderTextColor='rgba(0,0,0,0.5)'
                  value={this.state.newPlaylistName}
                  onChangeText={title => this.setState({ ...this.state, newPlaylistName: title })}
                />
                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ ...this.state, isEditing: !this.state.isEditing })}>
                    <Text>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.createNewPlaylist} style={styles.addButton}>
                    <Text>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            )
          }
          {
            !this.state.isEditing && (this.state.playlists && this.state.playlists.length >= 0) &&
            (
              <View>
                {
                  this.state.playlists.map( (playlist) => (
                    <TouchableOpacity key={playlist._id} style={styles.playlistsCard} onPress={ this.enterPlaylist.bind(this,playlist) }>
                      <Text key={playlist._id} style={styles.playlistsText}>{playlist.playlistName}</Text>
                      {/* <Ionicons
                        style={ styles.iconEdit }
                        name={ Platform.OS === 'ios'? 'ios-create' : 'md-create' }
                      /> */}
                    </TouchableOpacity>
                  ))
                }
              </View>
            )
          }
          {
            !this.state.isEditing &&
            <View style={styles.alignRight}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => this.setState({ ...this.state, isEditing: !this.state.isEditing })}>
                <Text style={styles.iconBig}>+</Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
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
  scrollView: {
    marginTop: 80,
    flex: 1,
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
    backgroundColor: '#0099CC',
    marginTop: 1,
    padding: 20,
    margin: '3%',
    marginTop: '3%',
    marginBottom: '0%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#b8ecff'
  },
  playlistsText: {
    color: '#fff',
    fontSize: 20
  },
  iconEdit: {
    fontSize: 25
  },
  alignRight: {
    alignItems: 'flex-end',
    padding: 20
  },
  iconBig: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#444',
    fontSize: 30
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
    width: 50,
    height: 50
  },
  inputContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 10,
    color: '#333',
    paddingHorizontal: 15
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexGrow: 1,
    backgroundColor: '#eee',
    marginRight: 5
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexGrow: 1,
    backgroundColor: '#33b5e5',
    marginLeft: 5
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
});
