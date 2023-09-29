import { TextInput, Animated, TextStyle, TouchableOpacity } from 'react-native'
import { FONTS, THEME } from '../constants'

const MAIN_COLOR = 'rgba(0, 0, 0, 0.5)'
const ORIGINAL_COLOR = 'transparent'
const PLACEHOLDER_COLOR = 'rgba(0, 0, 0, 0.5)'
const ORIGINAL_VALUE = 0
const ANIMATED_VALUE = 0.5

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

interface InputProps {
  placeholder?: string
  style?: TextStyle
  multiline?: boolean
  onChange?: (input: string) => void
}

export default (props: InputProps) => {
  const mainColor = MAIN_COLOR
  const originalColor = ORIGINAL_COLOR
  const animatedPlaceholderTextColor = PLACEHOLDER_COLOR

  const interpolatedColor = new Animated.Value(ORIGINAL_VALUE)

  const borderColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
    outputRange: [originalColor, mainColor],
  })

  const placeholderTextColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
    outputRange: [animatedPlaceholderTextColor, mainColor],
  })

  const showFocusColor = () => {
    Animated.timing(interpolatedColor, {
      duration: 350,
      toValue: ANIMATED_VALUE,
      useNativeDriver: false,
    }).start()
  }

  const showOriginColor = () => {
    Animated.timing(interpolatedColor, {
      duration: 200,
      toValue: ORIGINAL_VALUE,
      useNativeDriver: false,
    }).start()
  }

  return (
    <AnimatedTextInput
      multiline={props.multiline ?? false}
      placeholderTextColor={placeholderTextColor}
      placeholder={props.placeholder ?? 'Enter something...'}
      style={[textInputStyle(borderColor), props?.style]}
      onFocus={showFocusColor}
      onBlur={showOriginColor}
      onChange={e => props.onChange && props.onChange(e.nativeEvent.text)}
    />
  )
}

export const textInputStyle = (borderColor: any): TextStyle => ({
  width: '100%',
  padding: 16,
  borderWidth: 2,
  borderRadius: 16,
  borderColor: borderColor,
  backgroundColor: 'rgba(0, 0, 0, 0.07)',
  fontFamily: FONTS.POPPINS.MEDIUM,
  fontSize: 16,
})
