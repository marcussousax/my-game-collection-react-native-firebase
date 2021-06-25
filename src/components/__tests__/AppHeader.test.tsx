jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')
jest.mock('@react-native-google-signin/google-signin', () => {})

import 'react-native'
import React from 'react'
import AppHeader from '../AppHeader'
import TestRenderer from 'react-test-renderer'

function MyComponent() {
    return <HeaderComponent title="my game collection" />
}

function HeaderComponent({ title }) {
    return <AppHeader title={title} />
}

const testRenderer = TestRenderer.create(<MyComponent />)
const testInstance = testRenderer.root

describe('Header Component', () => {
    it('it shows the title', () => {
        expect(testInstance.findByType(HeaderComponent).props.title).toBe(
            'my game collection'
        )
    })
})
