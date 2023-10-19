import { useNavigation } from '../App'
import Button from '../components/Button'
import ScreenView from '../components/ScreenView'

export default () => {
  const navigation = useNavigation()

  return (
    <ScreenView>
      <Button label='Back' onClick={() => navigation.navigate('dashboard')} />
      <Button label='Onboarding' onClick={() => navigation.navigate('onboarding')} />
    </ScreenView>
  )
}
