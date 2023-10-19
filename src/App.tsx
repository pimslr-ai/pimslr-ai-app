import { DATA } from './constants'
import { useEffect, useState } from 'react'
import { Routes, Navigator, Screen } from './hooks/useScreens'
import { NavigationContainer } from '@react-navigation/native'
import useStorage from './hooks/useStorage'
import useFonts from './hooks/useFonts'

import Dashboard from './screens/Dashboard'
import Onboarding from './screens/Onboarding'
import Settings from './screens/Settings'
import RefineScenario from './screens/RefineScenario'
import Course from './screens/Course'

export default () => {
  const { loaded } = useFonts()
  const { get } = useStorage()
  const [initialRoute, setInitialRoute] = useState<Routes | undefined>()

  useEffect(() => {
    get<boolean>(DATA.SETUP_COMPLETE).then(complete => {
      setInitialRoute(complete ? 'dashboard' : 'onboarding')
    })
  }, [])

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
          <Screen name='onboarding' component={Onboarding} />
          <Screen name='dashboard' component={Dashboard} />
          <Screen name='settings' component={Settings} />
          <Screen name='course:home' component={Course} />
          <Screen name='course:refine_scenario' component={RefineScenario} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
