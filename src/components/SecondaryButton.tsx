import { FONTS, THEME } from '../constants'
import Button, { ButtonProps } from './Button'

interface SecondaryButtonProps extends ButtonProps {
  noticeMe?: boolean
  hide?: boolean
}

export default (props: SecondaryButtonProps) => {
  const { noticeMe, hide, labelStyle, containerStyle } = props

  const labelStyle_ = {
    fontFamily: noticeMe ? FONTS.POPPINS.MEDIUM : FONTS.POPPINS.SEMI_BOLD,
    color: hide ?? false ? 'transparent' : noticeMe ? 'white' : 'black',
    ...labelStyle,
  }

  const containerStyle_ = {
    backgroundColor: !noticeMe || (hide ?? false) ? 'transparent' : THEME.ACCENT,
    ...containerStyle,
  }

  return <Button {...props} disable={hide} labelStyle={labelStyle_} containerStyle={containerStyle_} />
}
