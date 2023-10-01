import Button from '../components/Button'
import ScreenView from '../components/ScreenView'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../constants'

export default () => {
  const navigation = useNavigation()

  return (
    <ScreenView>
      <Button label='Back' onClick={() => navigation.navigate(SCREENS.DASHBOARD)} />
    </ScreenView>
  )
}
