import React, { Component, PropsWithChildren } from 'react'
import { StyleSheet, View, Text, ViewStyle } from 'react-native'
import { FONTS } from '../constants'

interface CardViewProps extends PropsWithChildren {}

class CardView extends Component<CardViewProps> {
  state = {
    cardIndex: 0,
    selectionAmount: 3,
  }

  flipNext = () => {
    this.flipCard(this.state.cardIndex + 1)
  }

  flipPrevious = () => {
    this.flipCard(this.state.cardIndex - 1)
  }

  flipTo = (index: number) => {
    this.flipCard(index)
  }

  private flipCard = (index: number) => {
    // implement flip animation
  }

  render() {
    const { children } = this.props

    const startIndex = Math.max(0, this.state.cardIndex - this.state.selectionAmount)
    const endIndex = Math.min(
      React.Children.count(children) - 1,
      this.state.cardIndex + this.state.selectionAmount - 1,
    )

    console.log(startIndex, endIndex)

    return (
      <View style={styles.container}>
        {React.Children.map(children, (child, index) => {
          const isSelected = index >= startIndex && index <= endIndex

          if (isSelected) {
            // const card: ViewStyle = {
            //   zIndex: -index,
            //   transform: index == 0 ? [] : [{ rotateZ: `${getBetween(5, -5)}deg` }, { translateY: index * 2 }],
            // }

            const background: ViewStyle = {
              backgroundColor: `rgba(0, 0, 0, ${0.05 * index})`,
            }

            const modification: ViewStyle = {
              zIndex: -index,
              transform: [{ translateY: index * 30 }, { scale: 1 - index * 0.1 }],
            }

            return (
              <View key={index} style={[styles.card, modification]}>
                {child}
                <View style={[styles.card, background]} />
              </View>
            )
          }
        })}
      </View>
    )
  }
}

const getBetween = (num1: number, num2: number) => {
  if (num1 > num2) {
    ;[num1, num2] = [num2, num1]
  }
  return Math.random() * (num2 - num1) + num1
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
  card: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
})

export default CardView
