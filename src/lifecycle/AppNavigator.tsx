import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoardingScreen from '../screens/OnBoardingScreen'

const { Navigator, Screen } = createNativeStackNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='OnBoardingScreen'>
        <Screen name='OnBoardingScreen' options={{ headerShown: false }}>
          {props => <OnBoardingScreen {...props} onCompletion={console.log} />}
        </Screen>
      </Navigator>
    </NavigationContainer>
  )
}
