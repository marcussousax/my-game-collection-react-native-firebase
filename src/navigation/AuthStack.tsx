import React, { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import OnboardingScreen from '../screens/OnboardingScreen'

const Stack = createStackNavigator()

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)

    let routeName

    React.useEffect(() => {
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
    }, [])

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
        routeName = 'onboardingScreen'
    } else {
        routeName = 'loginScreen'
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="onboardingScreen"
                component={OnboardingScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="loginScreen"
                component={LoginScreen}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    )
}

const LoginScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Login Screen</Text>
        </View>
    )
}

export default AuthStack
