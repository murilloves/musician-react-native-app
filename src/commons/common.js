import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ?
    'https://museekr.herokuapp.com/api' : 'https://museekr.herokuapp.com/api'

function showError(err) {
    Alert.alert('Ops! Ocorreu um problema...', `Mensagem: ${err}`)
}

export { server, showError }
