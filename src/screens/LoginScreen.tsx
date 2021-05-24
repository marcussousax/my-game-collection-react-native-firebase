import React from 'react'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { StyleSheet, View } from 'react-native'
import { AuthContext } from '../contexts/auth'

const LoginScreen: React.FC = () => {
    const { signIn } = React.useContext(AuthContext)

    return (
        <View style={styles.container}>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => signIn()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoginScreen
