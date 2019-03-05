import { createSwitchNavigator } from 'react-navigation'
// import { Navigation } from 'react-native-navigation'

import Auth from './views/Auth'
import HomePage from './views/HomePage'
import Gigs from './views/Gigs'
import Playlists from './views/Playlists'
import PlaylistInfo from './views/PlaylistInfo'

// Navigation.registerComponent('nativeApp.Auth', () => Auth)
// Navigation.registerComponent('nativeApp.HomePage', () => HomePage)
// Navigation.registerComponent('nativeApp.Playlists', () => Playlists)
// Navigation.registerComponent('nativeApp.PlaylistInfo', () => PlaylistInfo)

// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'nativeApp.Auth',
//         title: 'Login'
//     }
// })

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
    initialRouteName: 'Auth'
})
export default MainNavigator
