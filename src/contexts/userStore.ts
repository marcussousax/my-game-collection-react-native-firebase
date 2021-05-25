import create from 'zustand'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

export const useUserStore = create(
    set =>
        ({
            user: null,
            setUser: () => {
                set(user => {
                    user
                })
            },
            initializing: false,

            setInitializing: () => {
                set(initializing => {
                    initializing
                })
            },

            signInGoogle: async () => {
                try {
                    // Get the users ID token
                    const { idToken } = await GoogleSignin.signIn()

                    // Create a Google credential with the token
                    const googleCredential =
                        await auth.GoogleAuthProvider.credential(idToken)

                    // Sign-in the user with the credential
                    await auth()
                        .signInWithCredential(googleCredential)
                        .then(UserCredential => {
                            console.log(UserCredential)
                            set({ user: UserCredential })
                            set({ initializing: false })
                        })

                        .catch(error => {
                            console.log(
                                'Something went wrong with sign up: ',
                                error
                            )
                        })
                } catch (error) {
                    console.log({ error })
                }
            },

            signOutGoogle: async () => {
                auth()
                    .signOut()
                    .then(() => {
                        set({ user: null })
                        console.log('User signed out!')
                    })
                    .catch(err => console.log(err))
            }
        } as { user: FirebaseAuthTypes.User | null })
)
