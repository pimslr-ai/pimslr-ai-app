import { useRef, useEffect } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { THEME } from '../../../constants'
import Button from '../../../components/Button'

interface AnimatedButtonProps {
  icon: string
  onClick?: () => void
  toggle?: boolean
}

export default ({ icon, onClick, toggle }: AnimatedButtonProps) => {
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    animate()
  }, [toggle])

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1.4, 0, 1.4],
  })

  const backgroundColor = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['transparent', 'transparent', THEME.CTA],
  }) as any

  const animate = () => {
    Animated.timing(animation, {
      duration: 200,
      toValue: toggle ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Button
      icon={icon}
      onClick={onClick}
      labelStyle={{ color: toggle ? 'white' : 'grey' }}
      containerStyle={{
        ...styles.courseControlButton,
        transform: [{ scale }],
        backgroundColor,
      }}
    />
  )
}

const styles = StyleSheet.create({
  courseControlButton: {
    aspectRatio: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.4 }],
  },
})
