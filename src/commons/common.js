import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ?
    'http://localhost:5000/api' : 'http://10.0.2.2:5000/api'

function showError(err) {
    Alert.alert('Ops! Ocorreu um problema...', `Mensagem: ${err}`)
}

export { server, showError }
