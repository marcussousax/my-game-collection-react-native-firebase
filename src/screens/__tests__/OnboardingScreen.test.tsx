import 'react-native'
import React from 'react'
import OnboardingScreen from '../OnboardingScreen'
import TestRenderer from 'react-test-renderer'

const testProps = () => ({
    navigation: {
        navigate: jest.fn(),
        route: jest.fn()
    }
})

describe('<OnboardingScreen>', () => {
    it('it renders correctly', () => {
        const comp = TestRenderer.create(
            <OnboardingScreen {...testProps} />
        ).toJSON()
        expect(comp).toMatchSnapshot()
    })
})
