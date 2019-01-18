import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import InitialPage from './pages/InitialPage'
import Playlists from './pages/Playlists'
import Gigs from './pages/Gigs'

export default createDrawerNavigator({
    InitialPage: {
        screen: () => <InitialPage/>,
        navigationOptions: { title: 'Página Inicial' }
    },
    Gigs: {
        screen: () => <Gigs/>,
        navigationOptions: { title: 'Meus Eventos' }
    },
    Playlists: {
        screen: () => <Playlists/>,
        navigationOptions: { title: 'Minhas Playlists' }
    },
}, { drawerWidth: 300 })
