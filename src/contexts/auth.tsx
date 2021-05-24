import React from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

interface AuthContextData {
    user: FirebaseAuthTypes.User | null
    setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>
    signInGoogle: any
}

export const AuthContext = React.createContext<AuthContextData>(
    {} as AuthContextData
)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null)
    // const [user, setUser] = React.useState<React.SetStateAction<null>>(null)

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                signInGoogle: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn()

                        // Create a Google credential with the token
                        const googleCredential =
                            auth.GoogleAuthProvider.credential(idToken)

                        // Sign-in the user with the credential
                        await auth()
                            .signInWithCredential(googleCredential)
                            .then(res => console.log(res))
                            .catch(error => {
                                console.log(
                                    'Something went wrong with sign up: ',
                                    error
                                )
                            })
                    } catch (error) {
                        console.log({ error })
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
