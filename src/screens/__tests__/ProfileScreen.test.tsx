import 'react-native'
import React from 'react'
import ProfileScreen from '../ProfileScreen'
import TestRenderer from 'react-test-renderer'

describe('<ProfileScreen>', () => {
    it('it renders correctly', () => {
        const comp = TestRenderer.create(<ProfileScreen />).toJSON()
        expect(comp).toMatchSnapshot()
    })
})
