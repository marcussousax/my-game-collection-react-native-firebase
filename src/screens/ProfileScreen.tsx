import React from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../contexts/auth'

const ProfileScreen: React.FC = () => {
    const { user } = React.useContext(AuthContext)
    return (
        <View>
            <Text>{JSON.stringify(user)}</Text>
        </View>
    )
}

export default ProfileScreen
