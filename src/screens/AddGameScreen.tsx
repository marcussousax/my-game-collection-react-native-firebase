import React from 'react'
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { getDocRef } from '../services/api'
import { AppStackParamList, GameProps } from '../types'
import { AuthContext } from '../contexts/auth'

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
            <View style={styles.header}>
                <Text style={styles.title}>what are you playing?</Text>
            </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    title: {
        color: '#43DFA8',
        fontSize: 20,
        fontWeight: 'bold'
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
