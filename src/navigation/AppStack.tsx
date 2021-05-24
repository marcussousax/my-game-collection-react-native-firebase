import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { AppStackParamList } from '../types'
import ProfileScreen from '../screens/ProfileScreen'
import AddGameScreen from '../screens/AddGameScreen'

const Stack = createStackNavigator<AppStackParamList>()

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={'ProfileScreen'}>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="AddGameScreen"
                component={AddGameScreen}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    )
}

export default AppStack
