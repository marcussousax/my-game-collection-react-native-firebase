import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthStackParamList } from './types'
import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import getEnvVars from '../env'

const Stack = createStackNavigator<AuthStackParamList>()

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)

    let routeName
    const { clientId } = getEnvVars()
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: clientId,
            offlineAccess: true
        })

        try {
            AsyncStorage.getItem('@RNAlreadyStarted').then(value => {
                if (!value) {
                    AsyncStorage.setItem('@RNAlreadyStarted', 'true').then(
                        () => {
                            setIsFirstLaunch(true)
                        }
                    )
                } else {
                    setIsFirstLaunch(false)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [clientId])

    if (isFirstLaunch === null) {
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
    } else if (isFirstLaunch) {
        routeName = 'OnboardingScreen'
    } else {
        routeName = 'LoginScreen'
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack
