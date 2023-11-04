import { PropsWithChildren } from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../constants'
import { StatusBar } from 'expo-status-bar'

export default ({ children }: PropsWithChildren) => {
  return (
    <View style={[styles.body]}>
      <StatusBar style='auto' />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    backgroundColor: THEME.BACKGROUND,
    height: '100%',
    width: '100%',
  },
})
