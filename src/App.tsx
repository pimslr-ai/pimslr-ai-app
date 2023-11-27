import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useFonts from './hooks/useFonts'
import SpeechTestV1 from './screens/SpeechTestV1'
import SpeechTestV2 from './screens/SpeechTestV2'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='speech:v2'>
          <Screen name='speech:v1' component={SpeechTestV1} />
          <Screen name='speech:v2' component={SpeechTestV2} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
