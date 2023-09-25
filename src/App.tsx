import AppContext from './contexts/AppContext'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import OnBoarding from './views/OnBoarding'
import { THEME } from './constants'

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
    backgroundColor: THEME.BACKGROUND
  }
})
