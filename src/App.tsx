import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useFonts from './hooks/useFonts'
import Conversation from './screens/Conversation'
import Startup from './screens/Startup'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  const { loaded } = useFonts()

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='startup'>
          <Screen name='startup' component={Startup} />
          <Screen name='conversation' component={Conversation} />
        </Navigator>
      </NavigationContainer>
    )
  )
}
