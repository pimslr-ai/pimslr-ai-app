import { Navigator, Screen } from './screens'
import { NavigationContainer } from '@react-navigation/native'
import useFonts from './hooks/useFonts'

import Dashboard from './screens/Dashboard'
import Course from './screens/Course'
import Onboarding from './screens/Onboarding'

export default () => {
  const { loaded } = useFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='dashboard'>
          <Screen name='onboarding' component={Onboarding} />
          <Screen name='dashboard' component={Dashboard} />
          <Screen name='course' component={Course} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
