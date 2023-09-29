import { TextStyle, ViewStyle } from 'react-native'
import { FONTS } from '../constants'
import Button from './Button'

interface SecondaryButtonProps {
  label?: string
  noticeMe?: boolean
  hide?: boolean
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
  onClick?: () => void
}

export default ({ label, noticeMe, hide, labelStyle, containerStyle, onClick }: SecondaryButtonProps) => {
  const labelStyle_ = {
    ...labelStyle,
    fontFamily: noticeMe ? FONTS.POPPINS.MEDIUM : FONTS.POPPINS.SEMI_BOLD,
    color: hide ?? false ? 'transparent' : labelStyle?.color,
  }
  const containerStyle_ = {
    ...containerStyle,
    backgroundColor: !noticeMe || (hide ?? false) ? 'transparent' : 'white',
  }
  return (
    <Button
      label={label}
      disable={hide}
      labelStyle={labelStyle_}
      containerStyle={containerStyle_}
      onClick={onClick}
    />
  )
}
