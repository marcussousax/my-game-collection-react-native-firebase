import * as React from 'react'
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
    ToastAndroid,
    TouchableOpacity
} from 'react-native'

import { getDocRef } from '../services/api'
import { AuthContext } from '../contexts/auth'
import { AppStackParamList, GameProps } from '../types'
import { StackScreenProps } from '@react-navigation/stack'

export default function ListGameScreen({
    navigation,
    route
}: StackScreenProps<AppStackParamList>) {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [messageFromParams, setMessageFromParams] =
        React.useState<string | null>(null)
    const [listGames, setListGames] = React.useState<GameProps[]>([])
    const { user } = React.useContext(AuthContext)

    React.useEffect(() => {
        getDocRef('games').onSnapshot(QuerySnapshot => {
            const gamesSnapshot:
                | ((prevState: never[]) => never[])
                | GameProps[] = []
            QuerySnapshot.docs.forEach(doc => {
                const { name, status, system } = doc.data()
                gamesSnapshot.push({
                    id: doc.id,
                    name,
                    status,
                    system
                })
            })

            setListGames(gamesSnapshot)
            setLoading(false)
        })
    }, [])

    React.useEffect(() => {
        if (route.params?.message) {
            ToastAndroid.show(route.params.message, ToastAndroid.SHORT)
        }
        return () => setMessageFromParams(null)
    }, [route.params])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>my collection</Text>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProfileScreen')}
                        >
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri: user.photoURL }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {messageFromParams}
                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate('AddGameScreen')}
                    title={'Add Game'}
                />
                {listGames.map(game => (
                    <TouchableOpacity
                        key={game.id}
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate('GameDetailScreen', {
                                gameName: game.name,
                                gameId: game.id
                            })
                        }
                    >
                        <Text>{game.name}</Text>
                        <Text>{game.system}</Text>
                        <Text>{game.status}</Text>
                        <View style={styles.separator} />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    tinyLogo: {
        width: 32,
        height: 32,
        borderRadius: 20
    },
    button: {
        margin: 10
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
    separator: {
        marginVertical: 30,
        height: 1
    }
})
