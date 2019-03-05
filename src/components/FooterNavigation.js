import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class FooterNavigationComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        const navigate = this.props.navigation ? this.props.navigation.navigate : null;
        const currentPage = this.props.currentPage;
        const navLink1 = this.props.navLink1 ? this.props.navLink1 : 'HomePage';
        const navLink2 = this.props.navLink2 ? this.props.navLink2 : 'Playlists';
        const navLink3 = this.props.navLink3 ? this.props.navLink3 : 'Gigs';
        return (
            navigate &&
            <View style={ styles.container }>
                <View style={ styles.wrap }>
                    <TouchableOpacity onPress={ () => navigate(navLink1) }>
                        <Ionicons
                            style={ navLink1 === currentPage ? styles.iconSelected : styles.icon }
                            name={ Platform.OS === 'ios'? 'ios-home' : 'md-home' }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => navigate(navLink2) }>
                        <Ionicons
                            style={ navLink2 === currentPage ? styles.iconSelected : styles.icon }
                            name={ Platform.OS === 'ios'? 'ios-musical-note' : 'md-musical-note' }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const primaryColor = '#444'
const secondaryColor = '#fafafa'
const selectedColor = '#0099CC'

const androidNotchHeight = 24

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: secondaryColor,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        // top: androidNotchHeight,
    },
    textHeader: {
        padding: 15,
        color: primaryColor,
        fontSize: 20
    },
    icon: {
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        color: primaryColor,
        fontSize: 30
    },
    iconSelected: {
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        color: selectedColor,
        fontSize: 30
    },
    wrap: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-around'
    }
})

