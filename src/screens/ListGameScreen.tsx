import * as React from 'react'
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { getDocRef } from '../services/api'
import { AppStackParamList, GameProps } from '../types'
import { StackScreenProps } from '@react-navigation/stack'
import AppHeader from '../components/AppHeader'
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
                    const { title, userId, createdAt, rating, notes, systems } =
                        doc.data()
                    gamesSnapshot.push({
                        gameId: doc.id,
                        systems,
                        notes,
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
                <Text style={styles.cardText}>{item.title}</Text>

                <View style={styles.cardFooter}>
                    {item.rating !== 0 ? (
                        <Text style={styles.rating}>
                            <Icon name="star" style={styles.ratingIcon} />{' '}
                            {item.rating}
                        </Text>
                    ) : null}
                    {item.notes ? (
                        <Icon name="notes" style={styles.notes} />
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
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#009aa0'
    },
    cardText: {
        color: '#fff'
    },
    cardFooter: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        justifyContent: 'space-around'
    },
    rating: {
        color: '#fff'
    },
    ratingIcon: {
        color: '#f1c402',
        fontSize: 12
    },
    notes: {
        color: '#fff',
        fontSize: 20
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
