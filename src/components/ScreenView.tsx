import { PropsWithChildren } from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../constants'

export default ({ children }: PropsWithChildren) => {
  return <View style={styles.body}>{children}</View>
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: THEME.BACKGROUND,
  },
})
