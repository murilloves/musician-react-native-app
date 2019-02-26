import React from 'react'
import HeaderComponent from '../components/Header'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Alert,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import axios from 'axios'
import { server, showError } from '../commons/common'

export default class PlaylistInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistName: null,
      playlistId: null,
      songs: [],
      isEditing: false,
      editKey: null,
      editTitle: null,
      editDesc: null,
      editAuthor: null
    }

    props.isLoading = true
  }

  componentWillMount() {
    this.getStoredPlaylist()
  }

  getStoredPlaylist = async () => {
    try {
      const playlistName = await AsyncStorage.getItem('selectedPlaylistName')
      const playlistId = await AsyncStorage.getItem('selectedPlaylistId')
      this.setState({ playlistName, playlistId })

      this.getPlaylistSongs(playlistId)
    } catch (err) {
      // Show error msg
    }
  }

  getPlaylistSongs = async (playlistId) => {
    if (!axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTVjMzYxNjU2YWFjMzhmMDI3ZjlkNSIsIm5hbWUiOiJUZXN0ZSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvNzUzYmI4YzFiMzY3MTkyOTkwNzgzOWI2YTE1MmJmMjE_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTUwNzIwMDMzLCJleHAiOjE1NTA3MjM2MzN9.9V9UawEqHel9Dodji_InRXSw3y4OzrSAadXKVOPD2Rs'
    }
    try {
      const res = await axios.get(`${server}/playlists/${playlistId}`)
      this.setState({ ...this.state, songs: res.data.songs })
    }
    catch (err) {
      // Show error msg
    }
  }

  addSongToPlaylist = async () => {
    try {
      await axios.post(`${server}/playlists/${this.state.playlistId}/addSong`, {
        title: this.state.editTitle,
        desc: this.state.editDesc,
        author: this.state.editAuthor,
        key: this.state.editKey,
      })

      Alert.alert('Sucesso!', 'Música adicionada.')
      this.getPlaylistSongs(this.state.playlistId)
      this.setState({ isEditing:false })
    } catch (err) {
      if (err.response.status === 400) {
        const jsonString = err.response.data
        Alert.alert('Dados inválidos.', JSON.stringify(jsonString).replace(/"/g, '').replace(/,/g, '\n\n').replace('{','').replace('}', '').replace(/:/g, ' : '))
      } else {
          showError(JSON.stringify(err.response))
      }
    }
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <HeaderComponent title={this.state.playlistName} navigation={this.props.navigation} navTo={'Playlists'}/>
        <ScrollView style={styles.container}>
          {
            this.state.isEditing &&
            (
              <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Nome da música'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                  value={this.state.editTitle}
                  onChangeText={title => this.setState({ ...this.state, editTitle: title })}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Tonalidade'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                  value={this.state.editKey}
                  onChangeText={key => this.setState({ ...this.state, editKey: key })}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Descrição'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                  value={this.state.editDesc}
                  onChangeText={desc => this.setState({ ...this.state, editDesc: desc })}
                />
                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ ...this.state, isEditing: !this.state.isEditing })}>
                    <Text>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.addSongToPlaylist} style={styles.addButton}>
                    <Text>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            )
          }
          {
            !this.state.isEditing &&
              this.state.songs.map((song,index) => <SongDescription key={song._id} song={song} index={index}/>)
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

export class SongDescription extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      editTitle: this.props.song.title,
      editKey: this.props.song.key,
      editDesc: this.props.song.desc,
    }
  }

  enableDisableCard = () => {
    this.setState({ disabled: !this.state.disabled})
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.enableDisableCard()}>
        <View>
          {
            this.state.isEditing &&
            <KeyboardAvoidingView behavior='padding' style={styles.inputContainerEdit}>
              <TextInput
                style={styles.input}
                placeholder='Nome da música'
                placeholderTextColor='rgba(255,255,255,0.5)'
                value={this.state.editTitle}
                onChangeText={title => this.setState({ ...this.state, editTitle: title })}
              />
              <TextInput
                style={styles.input}
                placeholder='Tonalidade'
                placeholderTextColor='rgba(255,255,255,0.5)'
                value={this.state.editKey}
                onChangeText={key => this.setState({ ...this.state, editKey: key })}
              />
              <TextInput
                style={styles.input}
                placeholder='Descrição'
                placeholderTextColor='rgba(255,255,255,0.5)'
                value={this.state.editDesc}
                onChangeText={desc => this.setState({ ...this.state, editDesc: desc })}
              />
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ ...this.state, isEditing: !this.state.isEditing })}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.addSongToPlaylist} style={styles.modifyButton}>
                  <Text>Alterar</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          }
          {
            !this.state.isEditing &&
            <View style={this.state.disabled ? styles.disabledCard : styles.playlistsCard}>
              <View>
                {
                  this.props.song.desc &&
                  <Text style={styles.smallText}>{1 + this.props.index} - {this.props.song.desc}</Text>
                }
                {
                  <Text style={styles.normalText}>{this.props.song.key !== null ? `(${this.props.song.key}) ` : ''}{this.props.song.title}</Text>
                }
              </View>
              <TouchableOpacity style={styles.iconBtn} onPress={() => {this.setState({ ...this.state, isEditing: !this.state.isEditing }); console.log(this.props)}}>
                <Ionicons
                  style={ styles.iconBig }
                  name={ Platform.OS === 'ios'? 'ios-create' : 'md-create' }
                  />
              </TouchableOpacity>
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#1C2331'
  },
  container: {
    marginTop: 80,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    color: 'white',
  },
  playlistsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    marginTop: 1,
    padding: 20
  },
  disabledCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#aaa',
    marginTop: 1,
    padding: 20
  },
  normalText: {
    color: '#444',
    fontSize: 20
  },
  smallText: {
    color: '#444',
    fontSize: 15
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    width: 50,
    height: 50
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
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    width: 50,
    height: 50
  },
  inputContainer: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
  },
  inputContainerEdit: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#555'
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    paddingBottom: 40
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#fff',
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
    backgroundColor: '#00C851',
    marginLeft: 5
  },
  modifyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexGrow: 1,
    backgroundColor: '#08c',
    marginLeft: 5
  },
});
