import { Navigation } from 'react-native-navigation'

const startTabs = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                screen: 'nativeApp.Playlists',
                label: 'Playlists',
                title: 'Playlists'
            },
            {
                screen: 'nativeApp.PlaylistInfo',
                label: 'Playlist Info',
                title: 'Playlist Info',
            },
        ]
    })
}
