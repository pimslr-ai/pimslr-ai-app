import { TextInput, Animated, TextStyle, ViewStyle } from 'react-native'
import { FONTS, THEME } from '../constants'

const MAIN_COLOR = THEME.COLOR
const ORIGINAL_COLOR = 'transparent'
const PLACEHOLDER_COLOR = '#918366'
const ORIGINAL_VALUE = 0
const ANIMATED_VALUE = 1

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
const interpolatedColor = new Animated.Value(ORIGINAL_VALUE)

interface InputProps {
  style?: TextStyle,
}

export default (props: InputProps) => {
  const mainColor = MAIN_COLOR
  const originalColor = ORIGINAL_COLOR
  const animatedPlaceholderTextColor = PLACEHOLDER_COLOR

  let borderColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
    outputRange: [originalColor, mainColor]
  })

  let placeholderTextColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
    outputRange: [animatedPlaceholderTextColor, mainColor]
  })

  const showFocusColor = () => {
    Animated.timing(interpolatedColor, {
      duration: 450,
      toValue: ANIMATED_VALUE,
      useNativeDriver: false
    }).start()
  }

  const showOriginColor = () => {
    Animated.timing(interpolatedColor, {
      duration: 350,
      toValue: ORIGINAL_VALUE,
      useNativeDriver: false
    }).start()
  }

  return (
    <AnimatedTextInput
      placeholderTextColor={placeholderTextColor}
      placeholder='English'
      style={[textInputStyle(borderColor), props?.style]}
      onFocus={showFocusColor}
      onBlur={showOriginColor}
    />
  )
}

export const textInputStyle = (borderColor: any): TextStyle => ({
  height: 55,
  width: '100%',
  borderWidth: 1,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 16,
  borderColor: borderColor,
  justifyContent: 'center',
  backgroundColor: 'white',
  fontFamily: FONTS.POPPINS.MEDIUM,
  fontSize: 16,
})
