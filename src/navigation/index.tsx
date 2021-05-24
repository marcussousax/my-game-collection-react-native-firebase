import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext, AuthProvider } from '../contexts/auth'
import AuthStack from './AuthStack'
import AppStack from './AppStack'

const LinkingConfiguration = {
    prefixes: ['/'],
    config: {
        screens: {
            LoginScreen: 'LoginScreen',
            OnboardingScreen: 'OnboardingScreen'
        }
    }
}

const Navigation = () => {
    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </NavigationContainer>
    )
}

const Routes: React.FC = () => {
    const { user, initializing } = React.useContext(AuthContext)

    if (initializing) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }

    return user ? <AppStack /> : <AuthStack />
}

export default Navigation
