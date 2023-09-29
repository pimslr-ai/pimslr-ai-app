import { TextStyle, StyleSheet, ViewStyle } from 'react-native'
import { FONTS, THEME } from '../constants'
import Button from './Button'

interface PrimaryButtonProps {
  label?: string
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
  disable?: boolean
  onClick?: () => void
}

export default ({ label, labelStyle, containerStyle, disable, onClick }: PrimaryButtonProps) => {
  return (
    <Button
      label={label}
      labelStyle={{ ...labelStyle, ...styles.label }}
      containerStyle={{ ...containerStyle, ...styles.container }}
      onClick={onClick}
      disable={disable}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: '70%',
    borderRadius: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.CTA,
  },
  label: {
    color: 'white',
    fontFamily: FONTS.POPPINS.BOLD,
    textAlign: 'center',
    fontSize: 16,
  },
})
