import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Image, StyleSheet, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

const data = [
    {
        title: 'Welcome',
        text: 'to my React Native app\n',
        image: require('../assets/onboard-bkg-red.png'),
        bg: '#ee6807'
    },
    {
        title: 'Share some Feedbacks',
        text: 'a "bare" React Native CRUD\n using Typescript and Firebase.',
        image: require('../assets/onboard-bkg-green.png'),
        bg: '#057f8e'
    },
    {
        title: 'Enjoy!',
        text: 'this a studying-purpose project.\n feel free to test it and give some feedback.',
        image: require('../assets/onboard-bkg-yellow.png'),
        bg: '#febe29'
    }
]

type Item = typeof data[0]

type AuthStackParamList = {
    loginScreen: undefined
    onboardingScreen: undefined
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
            onDone={() => navigation.navigate('loginScreen')}
            onSkip={() => navigation.navigate('loginScreen')}
            showSkipButton={true}
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
        color: '#fff',
        textAlign: 'center',
        fontSize: 19
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    }
})
