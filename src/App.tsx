import React, { useEffect, useState } from 'react'
import { DATA, SCREENS } from './constants'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useStorage from './hooks/useStorage'
import useFonts from './hooks/useFonts'

import Dashboard from './screens/Dashboard'
import Onboarding from './screens/Onboarding'
import Settings from './screens/Settings'
import Course from './screens/Course'
import RefineScenario from './screens/RefineScenario'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useFonts()
  const { get } = useStorage()
  const [initialRoute, setInitialRoute] = useState(SCREENS.DASHBOARD)

  useEffect(() => {
    get<boolean>(DATA.SETUP_COMPLETE).then(complete => {
      setInitialRoute(complete ? SCREENS.DASHBOARD : SCREENS.ONBOARDING)
    })
  }, [])

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={SCREENS.COURSE.MAIN}>
          <Screen name={SCREENS.ONBOARDING} component={Onboarding} />
          <Screen name={SCREENS.DASHBOARD} component={Dashboard} />
          <Screen name={SCREENS.SETTINGS} component={Settings} />
          <Screen name={SCREENS.COURSE.MAIN} component={Course} />
          <Screen name={SCREENS.COURSE.REFINE_SCENARIO} component={RefineScenario} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
