import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useFonts from './hooks/useFonts'

import Onboarding from './screens/Onboarding'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='onboarding'>
          <Screen name='onboarding' component={Onboarding} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
