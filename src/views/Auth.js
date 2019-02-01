import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native'
// import commonStyles from '../commonStyles'
// import backGroundImage from '../../assets/imgs.login.jpg'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            Alert.alert('Sucesso!', 'Criar conta')
        } else {
            Alert.alert('Sucesso!', 'Logar')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Museekr
                </Text>
                <Text style={styles.slogan}>
                    {this.state.stageNew ? 'Crie sua conta. É muito fácil!': 'A melhor plataforma para músicos do mundo todo!'}
                </Text>
                <View>
                    {/* <Text style={styles.createAccount}>
                        {this.state.stageNew ? 'Crie sua conta. É muito fácil!': ''}
                    </Text> */}
                    {
                        this.state.stageNew && 
                        <TextInput
                            style={styles.input}
                            placeholder='Nome'
                            placeholderTextColor='rgba(255,255,255,0.5)'
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                        />
                    }
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor='rgba(255,255,255,0.5)'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        placeholderTextColor='rgba(255,255,255,0.5)'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    {
                        this.state.stageNew && 
                        <TextInput
                            style={styles.input}
                            placeholder='Confirmação da senha'
                            placeholderTextColor='rgba(255,255,255,0.5)'
                            secureTextEntry
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup} style={styles.button}>
                        <View>
                            <Text style={styles.loginSignin}>
                                {this.state.stageNew ? 'CADASTRAR' : 'ENTRAR'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                    <Text style={styles.changeLoginSignin}>
                        {this.state.stageNew ? 'Já possuo conta!' : 'Ainda não tenho conta'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#304ffe' // #304ffe #01579b #1a237e #1C2331 #3E4551 #1C2331 #3F729B
    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        color: '#fff',
    },
    slogan: {
        fontSize: 15,
        textAlign: 'center',
        margin: 20,
        marginTop: 15,
        width: 250,
        marginBottom: 30,
        lineHeight: 22,
        color: '#fff'
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#fff',
        paddingHorizontal: 15
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 300,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 15,
        paddingHorizontal: 15
    },
    createAccount: {
        color: '#ccc',
        paddingHorizontal: 15,
        marginBottom: 5
    },
    loginSignin: {
        color: '#eee'
    },
    changeLoginSignin: {
        marginTop: 30,
        color: '#eee'
    }
});