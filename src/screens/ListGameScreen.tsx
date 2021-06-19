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

export default function ListGameScreen({
    navigation,
    route
}: StackScreenProps<AppStackParamList>) {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [listGames, setListGames] = React.useState<GameProps[]>([])

    React.useEffect(() => {
        getDocRef('games').onSnapshot(QuerySnapshot => {
            const gamesSnapshot:
                | ((prevState: never[]) => never[])
                | GameProps[] = []
            QuerySnapshot.docs.forEach(doc => {
                const { title, userId, createdAt } = doc.data()
                gamesSnapshot.push({
                    id: doc.id,
                    title,
                    userId,
                    createdAt
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
    }, [route.params])

    const renderItem = ({ item }: { item: GameProps }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                key={item.id}
                onPress={() =>
                    navigation.navigate('GameDetailScreen', {
                        title: item.title,
                        gameId: item.id,
                        createdAt: item.createdAt
                    })
                }
            >
                <Text>{item.title}</Text>
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
        backgroundColor: '#dcda48',
        flexGrow: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
        borderRadius: 5
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
