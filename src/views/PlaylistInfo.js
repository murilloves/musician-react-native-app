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
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTVjMzYxNjU2YWFjMzhmMDI3ZjlkNSIsIm5hbWUiOiJUZXN0ZSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvNzUzYmI4YzFiMzY3MTkyOTkwNzgzOWI2YTE1MmJmMjE_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTUxNDA3NzE5LCJleHAiOjE1NTE0MTEzMTl9._66UwvYQWnI5Y56jzI0H3aaaTkM_ShAHmvDCIXvVZDuoZE'
    }
    try {
      const res = await axios.get(`${server}/playlists/${playlistId}`)
      this.setState({ ...this.state, songs: res.data.songs })
    }
    catch (err) {
      showError(err)
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
              this.state.songs.map((song,index) => <SongDescription key={song._id} song={song} index={index} playlistId={this.state.playlistId}/>)
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
      wasDeleted: false,
      editTitle: this.props.song.title,
      editKey: this.props.song.key,
      editAuthor: this.props.song.author,
      editDesc: this.props.song.desc,
      songId: this.props.song._id,
      playlistId: this.props.playlistId
    }
  }

  clickCard = () => {
    this.setState({ clicked: !this.state.clicked})
  }

  updateSongInPlaylist = async () => {
    try {
      await axios.post(`${server}/playlists/${this.state.playlistId}/addSong`, {
        _id: this.state.songId,
        title: this.state.editTitle,
        desc: this.state.editDesc,
        author: this.state.editAuthor,
        key: this.state.editKey,
      })

      Alert.alert('Sucesso!', 'Música alterada.')
      this.setState({ ...this.state, isEditing: !this.state.isEditing })
    } catch (err) {
      console.log(err)
      if (err.response.status === 400) {
        const jsonString = err.response.data
        Alert.alert('Dados inválidos.', JSON.stringify(jsonString).replace(/"/g, '').replace(/,/g, '\n\n').replace('{','').replace('}', '').replace(/:/g, ' : '))
      } else {
          showError(JSON.stringify(err.response))
      }
      this.setState({ ...this.state, isEditing: !this.state.isEditing })
    }
  }

  dialogDeleteSong = () => {
    Alert.alert(
      'Deletar música',
      'Deseja remover esta música da playlist?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim', onPress: () => this.deleteSongFromPlaylist()
        },
      ],
      {cancelable: true},
    );
  }

  deleteSongFromPlaylist = async () => {
    await axios.post(`${server}/playlists/${this.state.playlistId}/removeSong`, {
      _id: this.state.songId
    })

    this.setState({ ...this.state, wasDeleted: true })
    Alert.alert('Sucesso', 'Música deletada')
  }

  render() {
    return (
      !this.state.wasDeleted &&
      <TouchableWithoutFeedback onPress={() => this.clickCard()}>
        <View>
          {
            <View style={this.state.clicked ? styles.selectedCard : styles.playlistsCard}>
              <View style={styles.size80}>
                {
                  this.state.editDesc &&
                  <Text style={[styles.smallText, this.state.clicked ? styles.textWhite : styles.textPrimary]}>
                    {1 + this.props.index} - {this.state.editDesc}
                  </Text>
                }
                {
                  <Text style={[styles.normalText, this.state.clicked ? styles.textWhite : styles.textPrimary]}>
                    {this.state.editKey !== null ? `(${this.state.editKey}) ` : ''}{this.state.editTitle}
                  </Text>
                }
              </View>
              <TouchableOpacity style={styles.iconBtn} onPress={() => this.setState({ ...this.state, isEditing: !this.state.isEditing })}>
                <Ionicons
                  style={ styles.iconMid }
                  name={ Platform.OS === 'ios'? 'ios-create' : 'md-create' }
                  />
              </TouchableOpacity>
            </View>
          }
          {
            this.state.isEditing &&
            <KeyboardAvoidingView behavior='padding' style={styles.inputContainerEdit}>
              <TouchableOpacity style={styles.alignLeft} onPress={this.dialogDeleteSong}>
                <Ionicons
                  style={[ styles.iconMid, {color: 'red'}]}
                  name={ Platform.OS === 'ios'? 'ios-trash' : 'md-trash' }
                  />
              </TouchableOpacity>
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
                <TouchableOpacity onPress={this.updateSongInPlaylist} style={styles.modifyButton}>
                  <Text>Alterar</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
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
    marginTop: 85,
    flex: 1,
  },
  playlistsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    marginTop: 1,
    padding: 20
  },
  selectedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0099CC',
    marginTop: 1,
    padding: 20
  },
  normalText: {
    fontSize: 20
  },
  textWhite: {
    color: '#fff'
  },
  textPrimary: {
    color: '#444'
  },
  smallText: {
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
    width: '100%',
    padding: 20
  },
  alignLeft: {
    alignItems: 'flex-start',
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
  inputContainer: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
  },
  inputContainerEdit: {
    paddingTop: 10,
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
  size80: {
    width: '80%'
  }
});
