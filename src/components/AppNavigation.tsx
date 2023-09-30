import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoarding from '../screens/OnBoarding'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='OnBoarding'>
        <Screen name='OnBoarding' options={{ headerShown: false }}>
          {props => <OnBoarding {...props} onCompletion={console.log} />}
        </Screen>
      </Navigator>
    </NavigationContainer>
  )
}
