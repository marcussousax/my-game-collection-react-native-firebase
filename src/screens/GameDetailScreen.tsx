import * as React from 'react'
import {
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from 'react-native'
import { deleteDoc, getDocRef } from '../services/api'
import { AuthContext } from '../contexts/auth'
import AppHeader from '../components/AppHeader'
import { GameProps } from '../types'

export default function GameDetailScreen({ navigation, route }) {
    const { gameId } = route.params

    const [loading, setLoading] = React.useState(true)
    const [sending, setSending] = React.useState<boolean>(false)

    const { user } = React.useContext(AuthContext)

    // Don't know if it is the beast approach. Maybe get the initial state from params?
    const initialState = {
        id: '',
        title: '',
        createdAt: new Date(),
        customMeta: undefined
    }
    const [currentGame, setCurrentGame] = React.useState(initialState)

    React.useEffect(() => {
        getGameByID(gameId).then()
    }, [gameId])

    const getGameByID = async (id: string) => {
        const docRef = getDocRef('games').doc(id)
        const doc = await docRef.get()
        const game = doc.data()
        const currentGameSnapshot: GameProps = {
            id,
            title: game?.title,
            createdAt: game?.createdAt
        }

        const metaRef = docRef.collection('custom_meta')
        metaRef.onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(metaDoc => {
                currentGameSnapshot.customMeta = metaDoc.data()
            })
            setCurrentGame(currentGameSnapshot)
            setLoading(false)
        })
    }

    const handleChange = (title: string, value: string) => {
        setCurrentGame({ ...currentGame, [title]: value })
    }

    const updateGame = async (id: string) => {
        setSending(true)
        const docRef = getDocRef('games').doc(id)
        await docRef
            .set({
                title: currentGame.title,
                createdAt: currentGame?.createdAt,
                userId: user?.uid
            })
            .then(() => {
                setCurrentGame(initialState)
                setSending(false)
                navigation.navigate('ListGameScreen', {
                    message: 'Game updated'
                })
            })
            .catch(error => console.log(error))
    }

    const handleDelete = (id: string) => {
        setLoading(true)
        deleteDoc('games', id)
            .then(() => {
                navigation.navigate('ListGameScreen', {
                    message: 'Game deleted'
                })
            })
            .catch((err: any) => console.log(err))
    }

    const confirmDelete = () => {
        Alert.alert('Are you sure?', 'Confirm?', [
            { text: 'yes', onPress: () => handleDelete(gameId) },
            { text: 'no', onPress: () => null }
        ])
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <AppHeader title={'update game information'} hideAvatar={true} />
            <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder={'Title'}
                    value={currentGame.title}
                    onChangeText={value => handleChange('title', value)}
                />

                <TextInput
                    style={[styles.input, { textAlignVertical: 'top' }]}
                    placeholder={`type some notes about ${currentGame.title.toLowerCase()}`}
                    numberOfLines={8}
                    value={currentGame.customMeta?.notes}
                    multiline={true}
                    onChangeText={value => handleChange('notes', value)}
                />
            </ScrollView>
            <View style={styles.footer}>
                <Button
                    title={'Update Game'}
                    disabled={sending}
                    onPress={() => updateGame(gameId)}
                />
                <Button
                    title={'Delete Game'}
                    color={'red'}
                    onPress={() => confirmDelete()}
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
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    input: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 5,
        marginBottom: 12
    }
})
