import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAppFonts from './hooks/use-app-fonts'
import SpeechTest from './screens/SpeechTest'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useAppFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='speech-test'>
          <Screen name='speech-text' component={SpeechTest} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
