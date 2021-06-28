import React from 'react'
import { Button, Image, ScrollView, Text, View } from 'react-native'

import { AuthContext } from '../contexts/auth'

const ProfileScreen = () => {
    const { user, signOut } = React.useContext(AuthContext)

    return (
        <>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    left: 0,
                    right: 0,
                    height: 100,
                    backgroundColor: '#02cbd3',
                    marginBottom: 150
                }}
            >
                <Image
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 60,
                        marginTop: 40,
                        position: 'absolute',
                        top: 10
                    }}
                    source={{ uri: user?.photoURL }}
                />
                <Text style={{ fontSize: 30, position: 'absolute', top: 150 }}>
                    {user?.displayName}
                </Text>
                <Text style={{ fontSize: 15, position: 'absolute', top: 190 }}>
                    {user?.email}
                </Text>
            </View>
            <ScrollView>
                <Button title={'Logout'} onPress={() => signOut()} />
            </ScrollView>
        </>
    )
}

export default ProfileScreen
