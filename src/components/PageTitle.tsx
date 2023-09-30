import { PropsWithChildren } from 'react'
import { Text, View, StyleSheet, ViewStyle } from 'react-native'
import { FONTS } from '../constants'

interface PageTitleProps extends PropsWithChildren {
  label?: string
  style?: ViewStyle
}

export default ({ label, style, children }: PageTitleProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{label ?? 'Title'}</Text>
      <View>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 28,
  },
  title: {
    fontFamily: FONTS.POPPINS.MEDIUM,
    fontSize: 27,
  },
})
