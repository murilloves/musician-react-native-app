import { createSwitchNavigator } from 'react-navigation'

import Auth from './views/Auth'
import HomePage from './views/HomePage'
import Playlists from './views/Playlists'
import Gigs from './views/Gigs'

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
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
    initialRouteName: 'Auth'
})
export default MainNavigator

// export default createDrawerNavigator({
//     Auth: {
//         screen: () => <Auth/>,
//         navigationOptions: { title: 'Autenticação' }
//     },
//     HomePage: {
//         screen: () => <HomePage/>,
//         navigationOptions: { title: 'Página Inicial' }
//     },
//     Gigs: {
//         screen: () => <Gigs/>,
//         navigationOptions: { title: 'Meus Eventos' }
//     },
//     Playlists: {
//         screen: () => <Playlists/>,
//         navigationOptions: { title: 'Minhas Playlists' }
//     },
// }, { drawerWidth: 300 })


