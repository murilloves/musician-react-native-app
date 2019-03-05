import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
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
                    <TouchableOpacity>
                        {/* <Ionicons
                            style={ styles.iconHeader }
                            name={ Platform.OS === 'ios'? 'ios-add' : 'md-add' }
                        /> */}
                    </TouchableOpacity>
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
        backgroundColor: secondaryColor,
        left: 0,
        right: 0,
        top: androidNotchHeight,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    textHeader: {
        padding: 15,
        color: primaryColor,
        paddingLeft: 20,
        fontSize: 20
    },
    iconHeader: {
        padding: 15,
        paddingLeft: 20,
        color: primaryColor,
        fontSize: 30
    },
    wrap: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        justifyContent: 'flex-start'
    }
})

