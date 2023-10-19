import { SCREENS } from '../constants'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button'
import ScreenView from '../components/ScreenView'

export default () => {
  const navigation = useNavigation()

  return (
    <ScreenView>
      <Button label='Back' onClick={() => navigation.navigate(SCREENS.DASHBOARD)} />
      <Button
        label='Onboarding'
        onClick={() => navigation.navigate(SCREENS.ONBOARDING)}
      />
    </ScreenView>
  )
}
