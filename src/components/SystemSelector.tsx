import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { getDocRef } from '../services/api'
import { BlurView } from '@react-native-community/blur'
import {
    Button,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    View
} from 'react-native'
import { GameProps } from '../types'

interface ISystem {
    _id: string
    name: string
    iconURI: string
    slug: string
}

type ISystemSelector = {
    currentGame: GameProps
    handleChange?: (key: string, value: string[]) => void
}
const SystemSelector = ({ currentGame, handleChange }: ISystemSelector) => {
    const [appSystems, setAppSystems] = React.useState<ISystem[]>()
    const [modalVisible, setModalVisible] = React.useState(false)
    React.useEffect(() => {
        const unsubscribe = getDocRef('APP-SYSTEMS').onSnapshot(
            QuerySnapshot => {
                const snapshot: any[] = []
                QuerySnapshot.docs.forEach(doc => {
                    snapshot.push(doc.data())
                })
                setAppSystems(snapshot)
            }
        )

        return () => unsubscribe()
    }, [])

    const handlePress = React.useCallback(
        (system: ISystem) => {
            const systems: string[] = currentGame.systems || []
            const index = systems.indexOf(system._id)
            if (index > -1) {
                systems.splice(index, 1)
            } else {
                systems.push(system._id)
            }
            if (handleChange) {
                handleChange('systems', systems)
            }
        },
        [currentGame.systems, handleChange]
    )

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <BlurView
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end'
                    }}
                    blurType="dark"
                    blurAmount={3}
                    reducedTransparencyFallbackColor="white"
                />

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        padding: 20,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        backgroundColor: 'white',
                        justifyContent: 'space-around'
                    }}
                >
                    {appSystems?.map(system => {
                        return (
                            <BouncyCheckbox
                                key={system._id}
                                size={100}
                                style={{ margin: 20 }}
                                iconImageStyle={{ backgroundColor: 'blue' }}
                                isChecked={
                                    !!currentGame?.systems?.includes(system._id)
                                }
                                iconComponent={
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30
                                            }}
                                            source={{ uri: system.iconURI }}
                                        />
                                        <Text>{system.slug}</Text>
                                    </View>
                                }
                                onPress={() => handlePress(system)}
                            />
                        )
                    })}
                </ScrollView>
                <View
                    style={{ padding: 20, flex: 0, backgroundColor: 'white' }}
                >
                    <Button
                        title={'CLOSE'}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
            </Modal>

            <Pressable onPress={() => setModalVisible(true)}>
                <Text>System</Text>

                {!currentGame?.systems?.length && (
                    <Text>There are no selected system for this title.</Text>
                )}
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                    }}
                >
                    {appSystems
                        ?.filter(x =>
                            currentGame.systems?.includes(x._id) ? x : null
                        )
                        .map(y => (
                            <View
                                key={y._id}
                                style={{
                                    flexDirection: 'row',
                                    marginVertical: 10,
                                    alignItems: 'center',
                                    marginRight: 30
                                }}
                            >
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                    source={{ uri: y.iconURI }}
                                />
                                <Text style={{ marginLeft: 5 }}>{y.name}</Text>
                            </View>
                        ))}
                </View>
            </Pressable>
        </View>
    )
}

export default SystemSelector
