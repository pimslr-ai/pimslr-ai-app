import { TextStyle, ViewStyle } from 'react-native'
import { FONTS } from '../constants'
import Button from './Button'

interface ButtonProps {
  label?: string
  noticeMe?: boolean
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
  onClick?: () => void
}

export default (props: ButtonProps) => {
  const labelStyle = {
    ...props.labelStyle,
    fontFamily: props.noticeMe ? FONTS.POPPINS.MEDIUM : FONTS.POPPINS.SEMI_BOLD,
  }
  const containerStyle = {
    ...props.containerStyle,
    backgroundColor: props.noticeMe ? 'white' : 'transparent',
  }
  return (
    <Button
      label={props.label}
      labelStyle={labelStyle}
      containerStyle={containerStyle}
      onClick={props.onClick}
    />
  )
}
