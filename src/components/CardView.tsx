import React, { createRef, Component, PropsWithChildren, useRef } from 'react'
import { StyleSheet, View, ViewStyle, Animated, Easing, Dimensions } from 'react-native'

interface CardViewProps extends PropsWithChildren {
  cardCount?: number
  startingCardIndex?: number
  randomRotation?: boolean
  direction?: 'top' | 'left' | 'bottom' | 'right'
}

const AnimatedView = Animated.createAnimatedComponent(View)
const screen = Dimensions.get('screen')

class CardView extends Component<CardViewProps> {
  private cardCount = React.Children.count(this.props.children)

  state = {
    cardIndex: 0,
    selectionAmount: 3,
    positionState: new Animated.ValueXY({ x: 0, y: 0 }),
    hiddenPositionState: new Animated.Value(0),
  }

  flipNext = () => {
    if (this.state.cardIndex < this.cardCount) {
      this.setState({ cardIndex: this.state.cardIndex + 1 })
    }
  }

  flipPrevious = () => {
    if (this.state.cardIndex > 0) {
      this.setState({ cardIndex: this.state.cardIndex - 1 })
    }
  }

  private moveCardOut = () => {
    const { positionState } = this.state
    Animated.timing(positionState, {
      toValue: { x: -screen.width, y: 0 },
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()
  }

  componentDidUpdate(prevProps: any) {
    console.log(this.state.cardIndex, prevProps)
    if (this.state.cardIndex !== prevProps.cardIndex) {
      this.moveCardOut()
    }
  }

  render() {
    const { children } = this.props
    const { positionState, cardIndex } = this.state

    const startIndex = Math.max(0, this.state.cardIndex - this.state.selectionAmount)
    const endIndex = Math.min(this.cardCount - 1, this.state.cardIndex + this.state.selectionAmount - 1)

    return (
      <View style={styles.container}>
        {React.Children.map(children, (child, index) => {
          // const isSelected = index >= startIndex && index <= endIndex

          const modification: ViewStyle = {
            zIndex: -index,
            transform: [{ translateX: positionState.x }],
            // transform:
            // index == 0 ? [] : [{ rotateZ: `${getBetween(5, -5)}deg` }, { translateY: index * 2 }],
            // transform:
            //   index <= cardIndex
            //     ? [{ translateX: positionState.x }]
            //     : [{ translateY: index * 30 }, { scale: 1 - index * 0.1 }],
          }

          return (
            <AnimatedView key={index} style={[styles.card, modification]}>
              {child}
              <View style={[styles.card, { backgroundColor: `rgba(0, 0, 0, ${0.05 * index})` }]} />
            </AnimatedView>
          )
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
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
