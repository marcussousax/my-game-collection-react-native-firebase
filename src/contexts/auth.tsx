import React from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

interface AuthContextData {
    user: FirebaseAuthTypes.User | null
    initializing: boolean
    signIn: () => void
    signOut: () => void
}

export const AuthContext = React.createContext<AuthContextData>(
    {} as AuthContextData
)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null)

    const [initializing, setInitializing] = React.useState(true)

    const signInGoogle = async () => {
        try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn()

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)

            // Sign-in the user with the credential
            await auth()
                .signInWithCredential(googleCredential)
                .then(res => console.log(res))
                .catch(error => {
                    console.log('Something went wrong with sign up: ', error)
                })
        } catch (error) {
            console.log({ error })
        }
    }

    const signOutGoogle = async () => {
        auth()
            .signOut()
            .then(() => {
                setUser(null)
                console.log('User signed out!')
            })
            .catch(err => console.log(err))
    }

    const onAuthStateChanged = React.useCallback(
        (googleUser: React.SetStateAction<FirebaseAuthTypes.User | null>) => {
            setUser(googleUser)
            if (initializing) {
                setInitializing(false)
            }
        },
        [initializing]
    )

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

        return subscriber
    }, [onAuthStateChanged])

    const signIn = () => {
        signInGoogle().catch(err => console.log(err))
    }

    const signOut = () => {
        signOutGoogle().catch(err => console.log(err))
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                initializing,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
