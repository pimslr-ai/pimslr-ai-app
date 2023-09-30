import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoardingScreen from './screens/OnBoardingScreen'
import useAppFonts from './hooks/use-app-fonts'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useAppFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator initialRouteName='OnBoardingScreen'>
          <Screen name='OnBoardingScreen' options={{ headerShown: false }}>
            {() => <OnBoardingScreen onCompletion={console.log} />}
          </Screen>
        </Navigator>
      </NavigationContainer>
    )
  )
}
