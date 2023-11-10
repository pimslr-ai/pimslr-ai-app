import { Navigator, Screen } from './screens'
import { NavigationContainer } from '@react-navigation/native'
import useFonts from './hooks/useFonts'

import Dashboard from './screens/Dashboard'
import Course from './screens/Course'

export default () => {
  const { loaded } = useFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={'dashboard'}>
          <Screen name='dashboard' component={Dashboard} />
          <Screen name='course:home' component={Course} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
