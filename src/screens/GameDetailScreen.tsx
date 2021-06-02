import * as React from 'react'
import {
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { deleteDoc, getDocRef } from '../services/api'
import { AuthContext } from '../contexts/auth'

export default function GameDetailScreen({ navigation, route }) {
    const { gameId } = route.params

    const [loading, setLoading] = React.useState(true)
    const [sending, setSending] = React.useState<boolean>(false)

    const { user } = React.useContext(AuthContext)

    // Don't know if it is the beast approach. Maybe get the initial state from params?
    const initialState = {
        id: '',
        title: '',
        createdAt: new Date()
    }
    const [currentGame, setCurrentGame] = React.useState(initialState)

    React.useEffect(() => {
        getGameByID(gameId)
    }, [gameId])

    const getGameByID = async (id: string) => {
        const docRef = getDocRef('games').doc(id)
        const doc = await docRef.get()
        const game = doc.data()

        setCurrentGame({
            title: game?.title,
            id,
            createdAt: game?.createdAt
        })
        setLoading(false)
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
            <View style={styles.header}>
                <Text style={styles.title}>update game information</Text>
            </View>
            <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder={'Title'}
                    value={currentGame.title}
                    onChangeText={value => handleChange('title', value)}
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
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    input: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 5
    }
})
