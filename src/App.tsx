import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAppFonts from './hooks/use-app-fonts'
import Onboarding from './screens/Onboarding'
import Dashboard from './screens/Dashboard'
import { SCREENS } from './constants'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useAppFonts()

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
