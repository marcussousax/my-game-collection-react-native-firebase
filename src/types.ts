import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type AuthStackParamList = {
    LoginScreen: undefined
    OnboardingScreen: undefined
}

export type AppStackParamList = {
    ProfileScreen: undefined
    ListGameScreen: {
        message: string | undefined
    }
    AddGameScreen: undefined
    GameDetailScreen: {
        title: string | undefined
        gameId: string | undefined
        createdAt: Date
    }
}

export type GameProps = {
    id?: string // only for listing the game
    title: string
    userId?: string
    createdAt: Date
    customMeta?:
        | { notes: string; ratings: number }
        | FirebaseFirestoreTypes.DocumentData
        | undefined
}
