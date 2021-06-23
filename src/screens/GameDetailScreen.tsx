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
import { getDocRef } from '../services/api'
import AppHeader from '../components/AppHeader'
import { GameProps } from '../types'
import firestore from '@react-native-firebase/firestore'
import Rating from '../components/Rating'

export default function GameDetailScreen({ navigation, route }) {
    const { game } = route.params

    const [loading, setLoading] = React.useState(true)
    const [sending, setSending] = React.useState<boolean>(false)

    const [currentGame, setCurrentGame] = React.useState<GameProps>()

    React.useEffect(() => {
        const unsubscribe = getDocRef('GAMES')
            .doc(game.gameId)
            .onSnapshot(querySnapshot => {
                const firebaseData = querySnapshot.data()
                const data = {
                    gameId: game.gameId,
                    title: firebaseData?.title,
                    createdAt: firebaseData?.createdAt,
                    rating: firebaseData?.rating,
                    notes: firebaseData?.notes
                } as GameProps
                setCurrentGame(data)
                setLoading(false)
            })

        return () => unsubscribe()
    }, [])

    const handleChange = (key: string, value: string | number) => {
        setCurrentGame({ ...currentGame, [key]: value })
    }

    const updateGame = async (id: string) => {
        setSending(true)

        const batch = firestore().batch()

        const docRef = getDocRef('GAMES').doc(id)
        batch.update(docRef, {
            title: currentGame?.title,
            rating: currentGame?.rating,
            notes: currentGame?.notes
        })

        await batch
            .commit()
            .then(() => {
                setSending(false)
                navigation.navigate('ListGameScreen', {
                    message: 'Game updated'
                })
            })
            .catch(error => console.log(error))
    }

    const handleDelete = async (id: string) => {
        setLoading(true)
        const batch = firestore().batch()

        const docRef = getDocRef('GAMES').doc(id)
        batch.delete(docRef)

        await batch
            .commit()
            .then(() => {
                navigation.navigate('ListGameScreen', {
                    message: 'Game deleted'
                })
            })
            .catch((err: any) => console.log(err))
    }

    const confirmDelete = () => {
        Alert.alert('Are you sure?', 'Confirm?', [
            { text: 'yes', onPress: () => handleDelete(game.gameId) },
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
                    value={currentGame?.title}
                    onChangeText={value => handleChange('title', value)}
                />

                <TextInput
                    style={[styles.input, { textAlignVertical: 'top' }]}
                    placeholder={`type some notes about ${currentGame?.title?.toLowerCase()}`}
                    numberOfLines={8}
                    value={currentGame?.notes}
                    multiline={true}
                    onChangeText={value => handleChange('notes', value)}
                />
                <View style={styles.spacer} />
            </ScrollView>
            <Rating
                viewStyle={styles.rating}
                currentGame={currentGame}
                handleChange={handleChange}
            />
            <View style={styles.footer}>
                <Button
                    title={'Update Game'}
                    disabled={sending}
                    onPress={() => updateGame(game.gameId)}
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
    spacer: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    rating: {
        alignItems: 'center',
        paddingVertical: 50
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
