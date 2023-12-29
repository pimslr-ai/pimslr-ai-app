import { StyleSheet } from 'react-native'
import Button from '../../../components/Button'

interface AnimatedButtonProps {
  icon: string
  onClick?: () => void
  toggle?: boolean
  disable?: boolean
}

export default ({ icon, onClick, toggle, disable }: AnimatedButtonProps) => {
  const handleClick = () => {
    if (!disable && onClick) {
      onClick()
    }
  }

  return (
    <Button
      disable={disable}
      icon={icon}
      onClick={handleClick}
      labelStyle={{ color: toggle ? '#f5c33b' : 'grey' }}
      containerStyle={{
        ...styles.courseControlButton,
        opacity: disable ? 0.7 : 1,
      }}
    />
  )
}

const styles = StyleSheet.create({
  courseControlButton: {
    aspectRatio: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.4 }],
  },
})
