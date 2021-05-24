import React from 'react'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { View } from 'react-native'
import { AuthContext } from '../contexts/auth'

const LoginScreen: React.FC = () => {
    const { signInGoogle } = React.useContext(AuthContext)

    return (
        <View>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => signInGoogle()}
            />
        </View>
    )
}

export default LoginScreen
