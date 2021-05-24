import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { AppStackParamList } from '../types'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator<AppStackParamList>()

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={'ProfileScreen'}>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    )
}

export default AppStack
