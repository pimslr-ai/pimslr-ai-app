import Button, { ButtonProps } from './Button'

interface LongPressButtonProps extends ButtonProps {}

export default (props: LongPressButtonProps) => {
  return <Button {...props} />
}
