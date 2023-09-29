import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import { THEME } from './constants'
import AppContext from './contexts/app-context'
import OnBoarding from './views/OnBoarding'

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
