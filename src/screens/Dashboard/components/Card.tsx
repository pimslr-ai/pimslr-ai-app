import { PropsWithChildren } from 'react'
import { ViewStyle, TouchableOpacity, StyleSheet } from 'react-native'

interface CardProps extends PropsWithChildren {
  onClick?: () => void
  style?: ViewStyle
}

export default ({ children, onClick, style }: CardProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={() => (onClick ? onClick() : null)}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
    padding: 20,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.5,
  },
})
