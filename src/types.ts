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
    ListGameScreen: undefined
    AddGameScreen: undefined
}

export type GameProps = {
    id?: string // only for listing the game
    name: string
    system: string
    status: string
}
