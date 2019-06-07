import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        menuOpened: false
    }

    openCloseMenu = () => {
        console.log(this.props, this.state.menuOpened)
        this.state.menuOpened
            ? this.props.navigation.navigate('DrawerClose')
            : this.props.navigation.navigate('DrawerOpen')

        this.setState({ ...this.state, menuOpened : !this.state.menuOpened })
    }

    render () {
        const navigate = this.props.navigation ? this.props.navigation.navigate : null;
        const navTo = this.props.navTo ? this.props.navTo : 'HomePage';
        return (
            <View style={ styles.container }>
                <View style={ styles.wrap }>
                    {navigate &&
                        <TouchableOpacity onPress={ () => navigate(navTo) }>
                            <Ionicons
                                style={ styles.iconHeader }
                                name={ Platform.OS === 'ios'? 'ios-arrow-back' : 'md-arrow-back' }
                            />
                        </TouchableOpacity>
                    }
                    <Text style={ styles.textHeader }>{ this.props.title }</Text>
                    {navigate &&
                        <TouchableOpacity onPress={ () => this.openCloseMenu() }>
                            <Ionicons
                                style={ styles.iconHeader }
                                name={ Platform.OS === 'ios'? 'ios-menu' : 'md-menu' }
                                />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const primaryColor = '#444'
const secondaryColor = '#fafafa'

const androidNotchHeight = 24

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        backgroundColor: secondaryColor,
        left: 0,
        right: 0,
        top: androidNotchHeight,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    textHeader: {
        flex: 4,
        padding: 10,
        textAlign: 'center',
        color: primaryColor,
        fontSize: 18
    },
    iconHeader: {
        flex: 1,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        color: primaryColor,
        fontSize: 25
    },
    wrap: {
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-around'
    }
})

