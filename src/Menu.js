import { createSwitchNavigator } from 'react-navigation'

import Auth from './views/Auth'
import HomePage from './views/HomePage'
import Gigs from './views/Gigs'
import Playlists from './views/Playlists'
import PlaylistInfo from './views/PlaylistInfo'

const MainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    HomePage: {
        name: 'Home Page',
        screen: HomePage,
        navigationOptions: { title: 'Página Inicial' }
    },
    Gigs: {
        name: 'Meus Shows e Eventos',
        screen: Gigs,
        navigationOptions: { title: 'Meus Eventos' }
    },
    Playlists: {
        name: 'Minhas Playlists',
        screen: Playlists,
        navigationOptions: { title: 'Minhas Playlists' }
    },
    PlaylistInfo: {
        name: 'Playlist Info',
        screen: PlaylistInfo,
        navigationOptions: { title: 'Playlist Info' }
    },
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
    initialRouteName: 'PlaylistInfo'
})
export default MainNavigator
