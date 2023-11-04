import { useRef } from 'react'
import { TextInput, Animated, TextStyle } from 'react-native'
import { FONTS } from '../constants'

const INITIAL_COLOR = 'transparent'
const TARGET_COLOR = 'rgba(0, 0, 0, 0.5)'
const PLACEHOLDER_COLOR = 'rgba(0, 0, 0, 0.5)'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

interface InteractiveInputProps {
  placeholder?: string
  value?: string
  disable?: boolean
  style?: TextStyle
  multiline?: boolean
  onChange?: (input: string) => void
}

export default (props: InteractiveInputProps) => {
  const interpolatedColor = useRef(new Animated.Value(0)).current

  const borderColor = interpolatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [INITIAL_COLOR, TARGET_COLOR],
  })

  const placeholderTextColor = interpolatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [PLACEHOLDER_COLOR, TARGET_COLOR],
  })

  const showFocusColor = () => {
    Animated.timing(interpolatedColor, {
      duration: 350,
      toValue: 1,
      useNativeDriver: false,
    }).start()
  }

  const showOriginColor = () => {
    Animated.timing(interpolatedColor, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const handleChange = (input: string) => {
    props.onChange && props.onChange(input)
  }

  return (
    <AnimatedTextInput
      value={props.value}
      editable={!props.disable ?? false}
      multiline={props.multiline ?? false}
      placeholderTextColor={placeholderTextColor}
      placeholder={props.placeholder ?? 'Enter something...'}
      style={[textInputStyle(borderColor), props?.style]}
      onFocus={showFocusColor}
      onBlur={showOriginColor}
      onChangeText={handleChange}
    />
  )
}

const textInputStyle = (borderColor: any): TextStyle => ({
  width: '100%',
  padding: 16,
  paddingTop: 12,
  paddingBottom: 12,
  borderWidth: 2,
  borderRadius: 16,
  borderColor: borderColor,
  backgroundColor: 'white',
  fontFamily: FONTS.POPPINS.MEDIUM,
  fontSize: 16,
})
