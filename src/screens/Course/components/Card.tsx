import { FONTS, THEME } from '../../../constants'
import { View, Text, StyleSheet } from 'react-native'
import { Sentence } from '../../../types'
import { Dimensions } from 'react-native'
import MultilineGradientText from '../../../components/MultilineGradientText'

const { width } = Dimensions.get('screen')

interface CardProps {
  sentence: Sentence
}

export default ({ sentence }: CardProps) => {
  let colors: string[] = []

  const toColor = (score: number) => {
    const gradient = [
      'rgb(252, 54, 17)',
      'rgb(252, 122, 19)',
      'rgb(247, 169, 40)',
      'rgb(156, 167, 40)',
      'rgb(89, 168, 60)',
    ]
    const index = Math.floor((score / 100) * (gradient.length - 1))
    return gradient[index]
  }

  if (sentence.score) {
    sentence.score.words.forEach(word => {
      word.syllables.forEach(syllable => {
        console.log('SYLLABLE', JSON.stringify(syllable, null, 2))
        const candidate = toColor(syllable.accuracyScore)
        const length = syllable.syllable ? syllable.syllable.length : word.word.length
        const newColors = Array.from({ length }, () => candidate)
        colors = [...colors, ...newColors]
      })
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <MultilineGradientText style={styles.translation} colors={colors} children={sentence.sentence} />
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
    color: THEME.COLOR_ALT,
  },
  original: {
    textAlign: 'center',
    fontFamily: FONTS.POPPINS.REGULAR,
    fontSize: 16,
    opacity: 0.5,
    color: THEME.COLOR_ALT,
  },
})
