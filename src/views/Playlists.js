import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import HeaderComponent from '../components/Header'
import FooterNavigationComponent from '../components/FooterNavigation'
import axios from 'axios';
import { server, showError } from '../commons/common';

export default class Playlists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatingNew: false,
      editingPlaylist: false,
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

  createNewPlaylist = async () => {
    try {
      await axios.post(`${server}/playlists`, {
        playlistName: this.state.newPlaylistName
      })

      this.loadPlaylists()
      this.setState({ ...this.state, creatingNew: !this.state.creatingNew })
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
            this.state.creatingNew &&
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
                  <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ ...this.state, creatingNew: !this.state.creatingNew })}>
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
            !this.state.creatingNew && (this.state.playlists && this.state.playlists.length >= 0) &&
            (
              <View>
                {
                  this.state.playlists.map( (playlist) => (
                    <EditPlaylist key={playlist._id} playlist={playlist} playlistId={playlist._id} navigation={this.props.navigation} />
                  ))
                }
              </View>
            )
          }
          {
            !this.state.creatingNew &&
            <View style={styles.alignRight}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                  this.setState({ ...this.state, creatingNew: !this.state.creatingNew });
                  !this.state.creatingNew ? this.loadPlaylists() : null
                }}>
                <Text style={styles.iconBig}>+</Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
        <FooterNavigationComponent navigation={this.props.navigation} currentPage='Playlists' />
      </View>
    );
  }
}

export class EditPlaylist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editingPlaylist: false,
      wasDeleted: false,
      playlistName: this.props.playlist.playlistName,
      playlistId: this.props.playlistId
    }
  }

  editPlaylist = () => {
    const modifiedPlaylist = {
      playlistName: this.state.playlistName,
      playlistId: this.state.playlistId
    }

    this.saveModifiedPlaylist(modifiedPlaylist)
  }

  saveModifiedPlaylist = async (modifiedPlaylist) => {
    try {
      await axios.post(`${server}/playlists`, modifiedPlaylist)

      this.setState({ ...this.state, editingPlaylist: false })

      Alert.alert('Sucesso', 'Playlist alterada')
    } catch (err) {
      showError(JSON.stringify(err.response.data))

      Alert.alert('Erro', 'Não foi possível modificar')
    }
  }

  enterPlaylist = async () => {
    try {
      await AsyncStorage.setItem('selectedPlaylistName', this.state.playlistName)
      await AsyncStorage.setItem('selectedPlaylistId', this.state.playlistId)
      this.props.navigation.navigate('PlaylistInfo')
    } catch (err) {
      Alert.alert('', JSON.stringify(err))
    }
  }

  dialogDeletePlaylist = () => {
    Alert.alert(
      'Deletar playlist',
      'Deseja realmente excluir esta playlist?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim', onPress: () => this.deletePlaylist()
        },
      ],
      {cancelable: true},
    );
  }

  deletePlaylist = async () => {
    await axios.delete(`${server}/playlists/${this.state.playlistId}`)

    this.setState({ ...this.state, wasDeleted: true })

    Alert.alert('Playlist deletada', '')
  }

  render() {
    return (
      !this.state.wasDeleted &&
      <View key={this.state.playlistId}>
        <TouchableOpacity style={styles.playlistsCard} onPress={ this.enterPlaylist }>
          <Text style={styles.playlistsText}>{this.state.playlistName}</Text>
          <TouchableOpacity style={styles.iconBtn} onPress={() => this.setState({ ...this.state, editingPlaylist: !this.state.editingPlaylist })}>
            <Ionicons
              style={ styles.iconEdit }
              name={ Platform.OS === 'ios'? 'ios-create' : 'md-create' }
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {
          this.state.editingPlaylist &&
          <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
            <TouchableOpacity style={{ paddingBottom: 20 }} onPress={() => this.dialogDeletePlaylist()}>
              <Ionicons
                style={[ styles.iconMid, {color: 'red'}]}
                name={ Platform.OS === 'ios'? 'ios-trash' : 'md-trash' }
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder='Nome da playlist'
              placeholderTextColor='rgba(0,0,0,0.5)'
              value={this.state.playlistName}
              onChangeText={playlistName => this.setState({ ...this.state, playlistName: playlistName })}
            />
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ ...this.state, editingPlaylist: !this.state.editingPlaylist })}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.editPlaylist} style={styles.addButton}>
                <Text>Salvar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        }
      </View>
    )
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
    marginBottom: 60,
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
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0099CC',
    marginTop: 1,
    padding: 20,
    paddingTop: 10,
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
  iconMid: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#555',
    fontSize: 25
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
