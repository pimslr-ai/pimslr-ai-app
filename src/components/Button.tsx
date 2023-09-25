import { Text, TouchableOpacity, TextStyle, StyleSheet, ViewStyle } from 'react-native'
import { FONTS, THEME } from '../constants'

interface ButtonProps {
  label?: string
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
}

export default (props: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, props?.containerStyle]}>
      <Text style={[styles.label, props?.labelStyle]}>{props?.label ?? 'Button'}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    borderRadius: 99,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
  },
  label: {
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: FONTS.POPPINS.REGULAR,
    color: THEME.COLOR,
  },
})
