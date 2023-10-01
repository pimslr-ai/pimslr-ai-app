import { FONTS, THEME } from '../constants'
import Button, { ButtonProps } from './Button'

interface SecondaryButtonProps extends ButtonProps {
  noticeMe?: boolean
  hide?: boolean
}

export default (props: SecondaryButtonProps) => {
  const { noticeMe, hide, labelStyle, containerStyle } = props

  const labelStyle_ = {
    ...labelStyle,
    fontFamily: FONTS.POPPINS.SEMI_BOLD,
    color: hide ?? false ? 'transparent' : noticeMe ? 'white' : 'black',
  }

  const containerStyle_ = {
    ...containerStyle,
    backgroundColor: !noticeMe || (hide ?? false) ? 'transparent' : THEME.CTA,
  }

  return <Button disable={hide} labelStyle={labelStyle_} containerStyle={containerStyle_} {...props} />
}
