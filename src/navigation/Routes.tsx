import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'

const Providers = () => {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}

export default Providers
