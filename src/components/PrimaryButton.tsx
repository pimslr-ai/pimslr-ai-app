import { TextStyle, StyleSheet, ViewStyle } from 'react-native'
import { FONTS, THEME } from '../constants'
import Button from './Button'

interface ButtonProps {
  label?: string
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
}

export default (props: ButtonProps) => {
  return (
    <Button
      label={props.label}
      labelStyle={{ ...props.labelStyle, ...styles.label }}
      containerStyle={{ ...props.containerStyle, ...styles.container }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: '80%',
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
