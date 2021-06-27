import * as React from 'react'
import {
    Button,
    StyleSheet,
    View,
    Text,
    ToastAndroid,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { getDocRef } from '../services/api'
import { AppStackParamList, GameProps } from '../types'
import { StackScreenProps } from '@react-navigation/stack'
import AppHeader from '../components/AppHeader'
import Rating from '../components/Rating'
import { AuthContext } from '../contexts/auth'

export default function ListGameScreen({
    navigation,
    route
}: StackScreenProps<AppStackParamList>) {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [listGames, setListGames] = React.useState<GameProps[]>([])
    const { user } = React.useContext(AuthContext)
    React.useEffect(() => {
        const unsubscribe = getDocRef('GAMES')
            .where('userId', '==', user?.uid)
            .onSnapshot(QuerySnapshot => {
                const gamesSnapshot:
                    | ((prevState: never[]) => never[])
                    | GameProps[] = []
                QuerySnapshot.docs.forEach(doc => {
                    const { title, userId, createdAt, rating } = doc.data()
                    gamesSnapshot.push({
                        gameId: doc.id,
                        notes: '',
                        title,
                        userId,
                        createdAt,
                        rating
                    })
                })
                setListGames(gamesSnapshot)
                setLoading(false)
            })

        return () => unsubscribe()
    }, [])

    React.useEffect(() => {
        if (route.params?.message) {
            ToastAndroid.show(route.params.message, ToastAndroid.SHORT)
        }
    }, [route?.params])

    const renderItem = ({ item }: { item: GameProps }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                key={item.gameId}
                onPress={() =>
                    navigation.navigate('GameDetailScreen', { game: item })
                }
            >
                <View>
                    <Text style={styles.cardText}>{item.title}</Text>
                    {item.rating !== 0 ? (
                        <Rating
                            hideTitle={true}
                            currentGame={item}
                            disabled={true}
                            starSize={10}
                            hideEmptyStar={true}
                        />
                    ) : null}
                </View>
            </TouchableOpacity>
        )
    }
    return loading ? (
        <ActivityIndicator />
    ) : (
        <View style={styles.container}>
            <AppHeader title="my game collection" navigation={navigation} />
            <FlatList
                scrollEnabled={true}
                data={listGames}
                numColumns={3}
                contentContainerStyle={styles.flatList}
                renderItem={renderItem}
                keyExtractor={item => item.gameId}
            />
            <View style={styles.footer}>
                <Button
                    onPress={() => navigation.navigate('AddGameScreen')}
                    title={'Add Game'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1
    },
    footer: {
        paddingVertical: 20
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02cbd3',
        flexGrow: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#009aa0'
    },
    cardText: {
        color: '#fff'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    separator: {
        marginVertical: 30,
        height: 1
    }
})
