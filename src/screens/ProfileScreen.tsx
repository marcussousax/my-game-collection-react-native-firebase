import React from 'react'
import { Button, Text, View } from 'react-native'
import { AuthContext } from '../contexts/auth'

const ProfileScreen: React.FC = () => {
    const { user, signOut } = React.useContext(AuthContext)
    return (
        <View>
            <Text>{JSON.stringify(user)}</Text>
            <Text>{user?.displayName}</Text>
            <Text>{user?.email}</Text>
            <Button title={'Logout'} onPress={() => signOut()} />
        </View>
    )
}

export default ProfileScreen
