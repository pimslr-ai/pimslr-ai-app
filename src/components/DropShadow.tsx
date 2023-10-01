import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

export type ShadowProps = PropsWithChildren & {
  color?: string
  radius?: number
}

export default ({ children, color = 'black', radius = 10 }: ShadowProps) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={{ ...styles.shadow, shadowColor: color, shadowRadius: radius }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    height: 10,
    borderRadius: 20,
    alignSelf: 'center',
    zIndex: -100,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
})
