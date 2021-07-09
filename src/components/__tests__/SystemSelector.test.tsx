import 'react-native'
import React from 'react'
import SystemSelector from '../SystemSelector'
import TestRenderer from 'react-test-renderer'

describe('<SystemSelector>', () => {
    it('it renders correctly', () => {
        const mock = {
            gameId: 'q03wj2zbKySfwowAw0VW',
            title: 'title',
            createdAt: {
                seconds: 1624800041,
                nanoseconds: 137000000
            },
            rating: 4,
            notes: 'notes',
            systems: ['gamecube']
        }

        const comp = TestRenderer.create(
            <SystemSelector currentGame={mock} />
        ).toJSON()
        expect(comp).toMatchSnapshot()
    })
})
