import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from '../contexts/auth'
import AuthStack from './AuthStack'

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
    return <AuthStack />
}

export default Navigation
