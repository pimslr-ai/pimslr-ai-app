import { FONTS } from '../../../constants'
import { View, Text, StyleSheet } from 'react-native'
import { Sentence } from '../../../types'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')

interface CardProps {
  sentence: Partial<Sentence>
}

export default ({ sentence }: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.translation}>{sentence.sentence}</Text>
          <Text style={styles.original}>{sentence.english}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    width: width,
  },
  wrapper: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 14,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 24,
  },
  content: {
    minHeight: 250,
    paddingVertical: 70,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignContent: 'center',
  },
  translation: {
    textAlign: 'center',
    fontFamily: FONTS.POPPINS.BOLD,
    fontSize: 20,
    marginBottom: 24,
  },
  original: {
    textAlign: 'center',
    fontFamily: FONTS.POPPINS.REGULAR,
    fontSize: 16,
    opacity: 0.5,
  },
})
