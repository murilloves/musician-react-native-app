import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <View style={ styles.container }>
                <View style={ styles.wrap }>
                    <TouchableOpacity>
                        <Icon
                            style={ styles.iconHeader }
                            name={ Platform.OS === 'ios'? 'ios-menu' : 'md-menu' }
                        />
                    </TouchableOpacity>
                    <Text style={ styles.textHeader }>{ this.props.title }</Text>
                    <TouchableOpacity>
                        <Icon
                            style={ styles.iconHeader }
                            name={ Platform.OS === 'ios'? 'ios-add' : 'md-add' }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const primaryColor = '#444'
const secondaryColor = '#fff'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: secondaryColor,
        left: 0,
        right: 0,
        top: 0
    },
    textHeader: {
        padding: 15,
        color: primaryColor,
        fontSize: 20
    },
    iconHeader: {
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        color: primaryColor,
        fontSize: 30
    },
    wrap: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        justifyContent: 'space-between'
    }
})

