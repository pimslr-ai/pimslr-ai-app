import { Text, TouchableOpacity, TextStyle, StyleSheet, ViewStyle } from 'react-native'
import { FONTS, THEME } from '../constants'

interface ButtonProps {
  label?: string
  disable?: boolean
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
  onClick?: () => void
}

export default ({ label, disable, labelStyle, containerStyle, onClick }: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disable ?? false}
      style={[styles.container, containerStyle, { opacity: disable ? 0.7 : 1 }]}
      onPress={() => onClick && onClick()}
    >
      <Text style={[styles.label, labelStyle]}>{label ?? 'Button'}</Text>
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
