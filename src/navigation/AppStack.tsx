import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { AppStackParamList } from '../types'
import ProfileScreen from '../screens/ProfileScreen'
import AddGameScreen from '../screens/AddGameScreen'
import ListGameScreen from '../screens/ListGameScreen'

const Stack = createStackNavigator<AppStackParamList>()

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={'ListGameScreen'}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
                name="ListGameScreen"
                component={ListGameScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen name="AddGameScreen" component={AddGameScreen} />
        </Stack.Navigator>
    )
}

export default AppStack
