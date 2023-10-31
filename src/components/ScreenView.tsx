import { PropsWithChildren } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { THEME } from '../constants'
import { StatusBar } from 'expo-status-bar'

export default ({ children }: PropsWithChildren) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.body}
    >
      <StatusBar style='auto' />
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    backgroundColor: THEME.BACKGROUND,
    overflow: 'scroll',
    maxHeight: '100%',
    maxWidth: '100%',
  },
})
