import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ?
    'https://obscure-taiga-67223.herokuapp.com/api' : 'https://obscure-taiga-67223.herokuapp.com/api'

function showError(err) {
    Alert.alert('Ops! Ocorreu um problema...', `Mensagem: ${err}`)
}

export { server, showError }
