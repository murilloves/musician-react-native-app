import React, { Component } from 'react'
import {
    Stylesheet,
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
            <View>
                <Text>
                    Musicial
                </Text>
                <View>
                    <Text>
                        {this.state.stageNew ? 'Crie sua conta': 'Informe seus dados'}
                    </Text>
                    {
                        this.state.stageNew && 
                        <TextInput
                            placeholder='Nome'
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                        />
                    }
                    <TextInput
                        placeholder='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        placeholder='Senha'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    {
                        this.state.stageNew && 
                        <TextInput
                            placeholder='Confirmação da senha'
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View>
                            <Text>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                    <Text>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
                />
            </View>
        )
    }
}
