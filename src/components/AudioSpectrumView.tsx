import React from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../constants'

interface AudioSpectrumViewProps {
  count?: number
}
export default ({ count }: AudioSpectrumViewProps) => {
  const rectangles = []
  for (let i = 0; i < (count ?? 3); i++) {
    rectangles.push(<View key={i} style={styles.rectangle}></View>)
  }

  return <View style={styles.container}>{rectangles}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: 7, 
    height: 100, 
    backgroundColor: THEME.CTA, 
    marginHorizontal: 10,
    borderRadius: 99,
  },
})
