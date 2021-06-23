import React from 'react'
// @ts-ignore
import StarRating from 'react-native-star-rating'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { GameProps } from '../types'

const MAXSTARS = 5

const Rating: React.FC<{
    currentGame: GameProps
    hideTitle?: boolean
    hideEmptyStar?: boolean
    disabled?: boolean
    handleChange?: (key: string, value: string) => void
    starSize?: number
    viewStyle?: StyleProp<ViewStyle>
}> = ({
    hideTitle,
    hideEmptyStar,
    viewStyle,
    disabled,
    currentGame,
    handleChange,
    starSize
}) => {
    return (
        <View style={viewStyle}>
            {!hideTitle && (
                <Text style={styles.ratingText}>
                    Rating:{' '}
                    <Text style={{ fontSize: 30 }}>{currentGame?.rating}</Text>/
                    {MAXSTARS}
                </Text>
            )}
            <StarRating
                disabled={disabled || false}
                emptyStarColor={hideEmptyStar ? 'transparent' : '#ddd'}
                maxStars={MAXSTARS}
                fullStarColor={'#f1c402'}
                starSize={starSize}
                starStyle={{ padding: 5 }}
                rating={currentGame?.rating}
                selectedStar={(value: string) =>
                    handleChange ? handleChange('rating', value) : null
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ratingText: {
        color: '#f1c402',
        fontSize: 16,
        paddingVertical: 20
    }
})

export default Rating
