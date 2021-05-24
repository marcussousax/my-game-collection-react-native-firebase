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
import { Picker } from '@react-native-picker/picker'

import { getDocRef } from '../services/api'
import { AppStackParamList, GameProps } from '../types'

const AddGameScreen = ({ navigation }: StackScreenProps<AppStackParamList>) => {
    const [sending, setSending] = React.useState<boolean>(false)
    const [selectedSystem, setSelectedSystem] = React.useState<string>('')
    const [selectedStatus, setSelectedStatus] = React.useState<string>('')
    const [systems, setSystems] = React.useState<
        { label: string; name: string }[]
    >([
        {
            label: '',
            name: ''
        }
    ])

    const gameDocumentInitialState = {
        name: '',
        status: '',
        system: ''
    }

    // State that will be sent to Firebase
    const [gameDocument, setGameDocument] = React.useState<GameProps>(
        gameDocumentInitialState
    )

    React.useEffect(() => {
        getDocRef('systems').onSnapshot(QuerySnapshot => {
            const systemsSnapshot:
                | ((prevState: never[]) => never[])
                | { id: string; name: any; label: any }[] = []
            QuerySnapshot.docs.forEach(doc => {
                const { name, label } = doc.data()
                systemsSnapshot.push({
                    id: doc.id,
                    name,
                    label
                })
            })

            setSystems(systemsSnapshot)
        })
    }, [])

    const maybeSaveGame = async () => {
        setSending(true)
        await getDocRef('games')
            .add({
                name: gameDocument.name,
                status: gameDocument.status,
                system: gameDocument.system
            })
            .then(() => {
                setGameDocument(gameDocumentInitialState)
                setSending(false)
                navigation.navigate('ProfileScreen')
            })
            .catch(error => console.log(error))
    }
    const handleChange = (key: string, value: string) => {
        setGameDocument({ ...gameDocument, [key]: value })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>{JSON.stringify(gameDocument)}</Text>
                <Text>{JSON.stringify(gameDocumentInitialState)}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Name'}
                    onChangeText={value => handleChange('name', value)}
                />
                <Picker
                    selectedValue={selectedSystem}
                    onValueChange={value => {
                        // Picker doesn't have placeholder text
                        if (value !== '') {
                            setSelectedSystem(value)
                            handleChange('system', value)
                        }
                    }}
                >
                    <Picker.Item label="Select a system" value="" />
                    {systems.map((system, index) => (
                        <Picker.Item
                            key={index}
                            label={system.label}
                            value={system.name}
                        />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedStatus}
                    onValueChange={value => {
                        if (value !== '') {
                            setSelectedStatus(value)
                            handleChange('status', value)
                        }
                    }}
                >
                    <Picker.Item
                        key="status-0"
                        label="Select a status"
                        value=""
                    />
                    <Picker.Item
                        key="status-1"
                        label="Finished"
                        value="finished"
                    />
                    <Picker.Item
                        key="status-2"
                        label="Playing"
                        value="playing"
                    />
                </Picker>

                <View style={styles.separator} />
                <Button
                    disabled={sending}
                    onPress={() => maybeSaveGame()}
                    title={'Save Game'}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1
    }
})

export default AddGameScreen
