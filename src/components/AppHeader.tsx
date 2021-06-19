import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AuthContext } from '../contexts/auth'

// To be used with Authenticated User
const AppHeader: React.FC<{
    title?: string
    hideAvatar?: boolean
    navigation?: any
}> = ({ title, hideAvatar, navigation }) => {
    const { user } = React.useContext(AuthContext)

    return (
        <View style={styles.header}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {!hideAvatar ? (
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProfileScreen')}
                    >
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: user?.photoURL || undefined }}
                        />
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    title: {
        color: '#02cbd3',
        fontSize: 20,
        fontWeight: 'bold'
    },
    tinyLogo: {
        width: 32,
        height: 32,
        borderRadius: 20
    }
})

export default AppHeader
