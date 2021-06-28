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
        rating: number
    }
}

export type GameProps = {
    gameId?: string
    title: string
    userId?: string
    createdAt: Date
    rating: number
    notes: string
    systems: []
}

export type SystemProps = {
    iconURI?: string
    name: string
    slug: string
}
