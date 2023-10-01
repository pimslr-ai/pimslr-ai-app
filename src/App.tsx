import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAppFonts from './hooks/use-app-fonts'
import Onboarding from './screens/Onboarding'
import Dashboard from './screens/Dashboard'
import { DATA, SCREENS } from './constants'
import useAppStorage from './hooks/use-app-storage'

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
        <Navigator initialRouteName={SCREENS.ONBOARDING}>
          <Screen name={SCREENS.ONBOARDING} component={Onboarding} options={{ headerShown: false }} />
          <Screen name={SCREENS.DASHBOARD} component={Dashboard} options={{ headerShown: false }} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
