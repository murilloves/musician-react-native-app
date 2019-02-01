import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import Auth from './views/Auth'
import InitialPage from './views/InitialPage'
import Playlists from './views/Playlists'
import Gigs from './views/Gigs'

export default createDrawerNavigator({
    Auth: {
        screen: () => <Auth/>,
        navigationOptions: { title: 'Autenticação' }
    },
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
