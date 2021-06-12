import React from 'react'
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { getDocRef } from '../services/api'
import { AppStackParamList, GameProps } from '../types'
import { AuthContext } from '../contexts/auth'
import AppHeader from '../components/AppHeader'

const AddGameScreen = ({ navigation }: StackScreenProps<AppStackParamList>) => {
    const [sending, setSending] = React.useState<boolean>(false)

    const { user } = React.useContext(AuthContext)

    const gameDocumentInitialState = {
        title: '',
        userId: '',
        createdAt: new Date()
    }

    // State that will be sent to Firebase
    const [gameDocument, setGameDocument] = React.useState<GameProps>(
        gameDocumentInitialState
    )

    const maybeSaveGame = async () => {
        setSending(true)
        await getDocRef('games')
            .add({
                title: gameDocument.title,
                userId: user?.uid,
                createdAt: new Date()
            })
            .then(() => {
                setGameDocument(gameDocumentInitialState)
                setSending(false)
                navigation.navigate('ListGameScreen', {
                    message: 'Game created'
                })
            })
            .catch(error => console.log(error))
    }
    const handleChange = (key: string, value: string) => {
        setGameDocument({ ...gameDocument, [key]: value })
    }

    return (
        <View style={styles.container}>
            <AppHeader title={'what are you playing?'} hideAvatar={true} />
            <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder={'Title'}
                    onChangeText={value => handleChange('title', value)}
                />
            </ScrollView>
            <View style={styles.footer}>
                <Button
                    disabled={!gameDocument.title || sending}
                    onPress={() => maybeSaveGame()}
                    title={'Save Game'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    footer: {
        paddingVertical: 20
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    input: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 5
    }
})

export default AddGameScreen
