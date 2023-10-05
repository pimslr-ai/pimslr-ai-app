import React, { Component, PropsWithChildren } from 'react'
import { Animated, Easing, ViewStyle } from 'react-native'

interface MorphViewProps extends PropsWithChildren {
  duration?: number
  onShrinked?: () => void
  onGrew?: () => void
  onChange?: (progress: number) => void
}

class MorphView extends Component<MorphViewProps> {
  state = {
    animationProgress: new Animated.Value(0),
  }

  scaleTransform = this.state.animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  shrink = () => {
    Animated.timing(this.state.animationProgress, {
      toValue: 1,
      duration: this.props.duration ?? 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()

    this.props.onShrinked && this.props.onShrinked()
  }

  grow = () => {
    Animated.timing(this.state.animationProgress, {
      toValue: 0,
      duration: this.props.duration ?? 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()

    this.props.onGrew && this.props.onGrew()
  }

  render() {
    const transformStyle: ViewStyle = {
      transform: [{ scale: this.scaleTransform }],
    }

    return <Animated.View style={transformStyle}>{this.props.children}</Animated.View>
  }
}

export default MorphView
