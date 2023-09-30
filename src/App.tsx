import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAppFonts from './hooks/use-app-fonts'
import Onboarding from './screens/Onboarding'
import Dashboard from './screens/Dashboard'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useAppFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator initialRouteName='Onboarding'>
          <Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
          <Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
