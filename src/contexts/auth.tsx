import React from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useUserStore } from './userStore'

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
    const {
        user,
        setUser,
        signInGoogle,
        signOutGoogle,
        initializing,
        setInitializing
    } = useUserStore()

    const onAuthStateChanged = React.useCallback(
        (googleUser: React.SetStateAction<FirebaseAuthTypes.User | null>) => {
            setUser(googleUser)
            if (initializing) {
                setInitializing(false)
            }
        },
        [initializing, setInitializing, user, setUser]
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
