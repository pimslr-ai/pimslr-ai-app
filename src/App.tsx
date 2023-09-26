import AppContext from './contexts/app-context'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import { THEME } from './constants'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoarding from './views/OnBoarding'

const Stack = createNativeStackNavigator()

export default () => {
  return (
    <AppContext>
      <View style={styles.body}>
        <StatusBar style='auto' />
        <OnBoarding />
      </View>
    </AppContext>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: THEME.BACKGROUND,
  },
})
