import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useFonts from './hooks/useFonts'
import Speech from './screens/Speech'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='speech'>
          <Screen name='speech' component={Speech} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
