import React from 'react'
import { Button, Image, ScrollView, Text, View } from 'react-native'

import { AuthContext } from '../contexts/auth'

const ProfileScreen = () => {
    const { user, signOut } = React.useContext(AuthContext)

    return (
        <ScrollView>
            <Text>my profile</Text>

            <Text>{JSON.stringify(user, null, 4)}</Text>
            <Image
                style={{ width: 30, height: 30 }}
                source={{ uri: user?.photoURL }}
            />
            <View>
                <Text>Display name</Text>
                <Text>{user?.displayName}</Text>
            </View>

            <Text>Account information</Text>
            <View>
                <Text>Email</Text>
                <Text>{user?.email}</Text>
            </View>
            <View>
                <Text>Provider</Text>
                <Text>{user?.providerId}</Text>
            </View>
            <Button title={'Logout'} onPress={() => signOut()} />
        </ScrollView>
    )
}

export default ProfileScreen
