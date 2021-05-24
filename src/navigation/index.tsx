import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
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
    const { user, setUser } = React.useContext(AuthContext)

    const [initializing, setInitializing] = React.useState(true)

    const onAuthStateChanged = (
        googleUser: React.SetStateAction<FirebaseAuthTypes.User | null>
    ) => {
        setUser(googleUser)
        if (initializing) {
            setInitializing(false)
        }
    }

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

        return subscriber
    }, [])

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
