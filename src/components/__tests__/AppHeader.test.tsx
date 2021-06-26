import 'react-native'
import React from 'react'
import AppHeader from '../AppHeader'
import TestRenderer from 'react-test-renderer'

describe('<AppHeader>', () => {
    it('it renders correctly', () => {
        const header = TestRenderer.create(
            <AppHeader title="my game collection" />
        ).toJSON()
        expect(header).toMatchSnapshot()
    })

    it('it shows the title', () => {
        const header = TestRenderer.create(
            <AppHeader title="my game collection" />
        )
        const componentInstance = header.root.findByType(AppHeader)
        expect(componentInstance.props.title).toBe('my game collection')
    })
})
