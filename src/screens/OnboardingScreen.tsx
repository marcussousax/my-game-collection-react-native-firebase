import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Image, StyleSheet, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

const data = [
    {
        title: 'Welcome',
        text: 'to my React Native app\n',
        image: require('../assets/bg-onboarding-welcome.png'),
        bg: '#fff',
        color: '#000'
    },
    {
        title: 'Share some Feedbacks',
        text: 'a "bare" React Native CRUD\n using Typescript and Firebase.',
        image: require('../assets/bg-onboarding-step2.png'),
        bg: '#fff'
    },
    {
        title: 'Enjoy!',
        text: 'this a studying-purpose project.\n feel free to test it and give some feedback.',
        image: require('../assets/bg-onboarding-enjoy.png'),
        bg: '#fff'
    }
]

type Item = typeof data[0]

type AuthStackParamList = {
    LoginScreen: undefined
    OnboardingScreen: undefined
}

const OnboardingScreen = ({
    navigation
}: StackScreenProps<AuthStackParamList>) => {
    const keyExtractor = (item: Item) => item.title

    const renderItem = ({ item }: { item: Item }) => {
        return (
            <View
                style={[
                    styles.slide,
                    {
                        backgroundColor: item.bg,
                        flex: 1
                    }
                ]}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        )
    }

    return (
        <AppIntroSlider
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            data={data}
            onDone={() => navigation.navigate('LoginScreen')}
            onSkip={() => navigation.navigate('LoginScreen')}
            showSkipButton={true}
            dotStyle={{ backgroundColor: '#C4C4C4' }}
            activeDotStyle={{ backgroundColor: '#43DFA8' }}
            renderDoneButton={() => (
                <Text
                    style={{
                        fontWeight: '600',
                        marginVertical: 12,
                        color: '#C4C4C4'
                    }}
                >
                    done
                </Text>
            )}
            renderNextButton={() => (
                <Text
                    style={{
                        fontWeight: '600',
                        marginVertical: 12,
                        color: '#C4C4C4'
                    }}
                >
                    next
                </Text>
            )}
            renderSkipButton={() => (
                <Text
                    style={{
                        fontWeight: '600',
                        marginVertical: 12,
                        color: '#C4C4C4'
                    }}
                >
                    skip
                </Text>
            )}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue'
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 32,
        borderRadius: 32
    },
    text: {
        color: '#000',
        textAlign: 'center',
        fontSize: 19
    },
    title: {
        fontSize: 21,
        color: '#43DFA8',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
