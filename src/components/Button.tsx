import React from 'react'
import {
  Text,
  TouchableOpacity,
  TextStyle,
  StyleSheet,
  ViewStyle,
  View,
  Image,
  Animated,
} from 'react-native'
import { FONTS, THEME } from '../constants'
import Icon from 'react-native-vector-icons/MaterialIcons'

export interface ButtonProps {
  label?: string
  labelFirst?: boolean
  icon?: string
  disable?: boolean
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
  onClick?: () => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default ({
  label,
  labelFirst,
  icon,
  disable,
  labelStyle,
  containerStyle,
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    !disable && onClick && onClick()
  }

  return (
    <AnimatedTouchableOpacity
      disabled={disable ?? false}
      style={[
        styles.container,
        containerStyle,
        { opacity: disable ? 0.7 : 1, flexDirection: labelFirst ? 'row-reverse' : 'row' },
      ]}
      onPress={handleClick}
    >
      {icon && (
        <Icon
          size={17}
          name={icon}
          style={[
            styles.icon,
            labelStyle,
            {
              marginLeft: label && labelFirst ? 8 : 0,
              marginRight: label && !labelFirst ? 8 : 0,
            },
          ]}
        />
      )}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </AnimatedTouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  label: {
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: FONTS.POPPINS.REGULAR,
    color: THEME.COLOR,
    alignSelf: 'center',
  },
  icon: {
    padding: 0,
    margin: 0,
    alignSelf: 'center',
  },
})
