import { PropsWithChildren } from 'react'
import { ColorValue, View, StyleSheet } from 'react-native'
import { THEME } from '../constants'
import { StatusBar } from 'expo-status-bar'

interface ScreenViewProps extends PropsWithChildren {
  backgroundColor?: ColorValue
}

export default ({ children, backgroundColor }: ScreenViewProps) => {
  return (
    <View style={[styles.body, { backgroundColor }]}>
      <StatusBar style='auto' />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    backgroundColor: THEME.BACKGROUND,
    overflow: 'scroll',
    height: '100%',
    width: '100%',
  },
})
