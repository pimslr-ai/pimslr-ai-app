import { View, Text, StyleSheet } from 'react-native'
import { FONTS } from '../../../constants'
import { Assessment, Sentence } from '../../../types'

interface CardProps {
  sentence: Sentence
  isCurrent: boolean
  assessment?: Partial<Assessment>
  onSuccess?: () => void
}

export default ({ sentence, isCurrent, assessment, onSuccess }: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.translation}>
          <Sentence
            onSuccess={onSuccess!}
            isCurrent={isCurrent}
            translation={sentence?.sentence}
            assessment={assessment!}
          />
        </Text>
        <Text style={styles.original}>{sentence.english}</Text>
      </View>
    </View>
  )
}

interface SentenceProps {
  isCurrent: boolean
  translation: string
  assessment?: Partial<Assessment>
  onSuccess?: () => void
}

const Sentence = ({ translation, isCurrent, assessment, onSuccess }: SentenceProps) => {
  if (assessment && isCurrent) {
    const strip = (input: string) => {
      return input
        .replace(/[.,\/#!$%\^&\*;:{}=\\?_`~()]/g, '')
        .replace(/\s+/g, ' ')
        .toLowerCase()
    }

    function isMatch(arr1: string[], arr2: string[]) {
      const sortedArr1 = arr1.slice().sort()
      const sortedArr2 = arr2.slice().sort()
      return sortedArr1.every((value, index) => value === sortedArr2[index])
    }

    function getColor(confidence: number): string {
      const colors = [
        'rgb(252, 54, 17)',
        'rgb(252, 122, 19)',
        'rgb(247, 169, 40)',
        'rgb(247, 169, 40)',
        'rgb(156, 167, 40)',
        'rgb(156, 167, 40)',
        'rgb(89, 168, 60)',
        'rgb(89, 168, 60)',
      ]
      const index = Math.floor(confidence * (colors.length - 1))
      return colors[index]
    }

    const originalWords = translation.split(' ').map(w => ({ word: w, stripped: strip(w) }))
    const scoredWords = assessment?.words?.map(w => ({ word: strip(w.word), score: w.accuracyScore }))

    const matched = isMatch(
      originalWords.filter(w => w.stripped !== '').map(w => w.stripped),
      scoredWords?.map(w => w.word)!,
    )

    if (matched) {
      onSuccess!()
    }

    return originalWords.map((original, i) => {
      let confidenceColor = 'black'

      if (original.stripped !== '') {
        const matchingWord = scoredWords?.filter(w => w.word === original.stripped)[0]

        if (matchingWord === undefined) {
          confidenceColor = 'rgb(252, 54, 17)'
        } else {
          confidenceColor = getColor(matchingWord?.score!)
        }
      }

      return (
        <Text key={i} style={{ color: confidenceColor }}>
          {original.word + ' '}
        </Text>
      )
    })
  }

  return <Text>{translation}</Text>
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 16,
  },
  wrapper: {
    elevation: 14,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingVertical: 70,
    paddingHorizontal: 32,
    minHeight: 250,
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
