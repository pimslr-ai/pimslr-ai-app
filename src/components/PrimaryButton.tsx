import { StyleSheet } from 'react-native'
import { FONTS, THEME } from '../constants'
import Button, { ButtonProps } from './Button'

interface PrimaryButtonProps extends ButtonProps {}

export default (props: PrimaryButtonProps) => {
  const { labelStyle, containerStyle } = props

  return (
    <Button
      {...props}
      labelStyle={{ ...labelStyle, ...styles.label }}
      containerStyle={{ ...containerStyle, ...styles.container }}
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
