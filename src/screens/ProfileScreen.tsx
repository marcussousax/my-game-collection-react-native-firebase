import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../contexts/auth'
import { getDocRef } from '../services/api'
import { AppStackParamList, GameProps } from '../types'
import { StackScreenProps } from '@react-navigation/stack'

const ProfileScreen = ({ navigation }: StackScreenProps<AppStackParamList>) => {
    const { user, signOut } = React.useContext(AuthContext)
    const [listGames, setListGames] = React.useState<GameProps[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

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

    return (
        <View>
            <Text>{user?.displayName}</Text>
            <Text>{user?.email}</Text>

            {loading ? (
                <Text>loading games</Text>
            ) : (
                listGames.map(game => (
                    <TouchableOpacity key={game.id} onPress={() => null}>
                        <Text>{game.name}</Text>
                        <Text>{game.system}</Text>
                        <Text>{game.status}</Text>
                    </TouchableOpacity>
                ))
            )}

            <Button
                title={'Add Game'}
                onPress={() => navigation.navigate('AddGameScreen')}
            />
            <Button title={'Logout'} onPress={() => signOut()} />
        </View>
    )
}

export default ProfileScreen
