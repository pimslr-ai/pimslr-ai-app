import React, { useEffect, useState } from 'react'
import { DATA, SCREENS } from './constants'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAppStorage from './hooks/use-app-storage'
import useAppFonts from './hooks/use-app-fonts'
import Dashboard from './screens/Dashboard'
import Onboarding from './screens/Onboarding'
import Settings from './screens/Settings'
import Course from './screens/Course'
import RefineScenario from './screens/RefineScenario'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useAppFonts()
  const { get } = useAppStorage()
  const [initialRoute, setInitialRoute] = useState(SCREENS.DASHBOARD)

  useEffect(() => {
    get<boolean>(DATA.SETUP_COMPLETE).then(complete => {
      setInitialRoute(complete ? SCREENS.DASHBOARD : SCREENS.ONBOARDING)
    })
  }, [])

  return (
    loaded && (
      <NavigationContainer>
        <Navigator initialRouteName={initialRoute}>
          <Screen name={SCREENS.ONBOARDING} component={Onboarding} options={{ headerShown: false }} />
          <Screen name={SCREENS.DASHBOARD} component={Dashboard} options={{ headerShown: false }} />
          <Screen name={SCREENS.SETTINGS} component={Settings} options={{ headerShown: false }} />
          <Screen name={SCREENS.COURSE.MAIN} component={Course} options={{ headerShown: false }} />
          <Screen
            name={SCREENS.COURSE.REFINE_SCENARIO}
            component={RefineScenario}
            options={{ headerShown: false }}
          />
        </Navigator>
      </NavigationContainer>
    )
  )
}
