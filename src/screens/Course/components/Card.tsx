import { View, Text, StyleSheet } from 'react-native'
import { FONTS } from '../../../constants'

interface CardProps {
  recognition?: Recognition
  sentence: Sentence
  onSuccess?: () => void
}

export default ({ sentence, recognition, onSuccess }: CardProps) => {
  return (
    <View key={sentence.id} style={styles.card}>
      <View key={sentence.id} style={styles.cardContent}>
        <Text style={styles.translation}>
          <Sentence onSuccess={onSuccess!} translation={sentence?.translation!} recognition={recognition!} />
        </Text>
        <Text style={styles.original}>{sentence.original}</Text>
      </View>
    </View>
  )
}

interface SentenceProps {
  translation: string
  recognition?: Recognition
  onSuccess?: () => void
}

const Sentence = ({ translation, recognition, onSuccess }: SentenceProps) => {
  const strip = (input: string) => {
    return input
      .replace(/[.,\/#!$%\^&\*;:{}=\\?_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase()
  }

  const flagMismatch = (sentence1: string, sentence2: string) => {
    const words1 = sentence1.split(' ')
    const words2 = sentence2.split(' ')
    const maxLength = Math.max(words1.length, words2.length)
    const mismatchedIndicies: number[] = []

    for (let i = 0; i < maxLength; i++) {
      const word1 = words1[i] || ''
      const word2 = words2[i] || ''

      if (word1 !== word2) {
        mismatchedIndicies.push(i)
      }
    }

    return mismatchedIndicies
  }

  if (recognition) {
    const parsedTranslation = strip(translation)
    const parsedTranscripted = strip(recognition.transcript)
    const mismatched = flagMismatch(parsedTranslation, parsedTranscripted)

    if (!mismatched.length && onSuccess) {
      onSuccess()
    }

    return translation.split(' ').map((word, i) => (
      <Text
        key={i}
        style={{ color: mismatched.length ? 'red' : 'green' }}
        // style={{ color: mismatched.length ? (mismatched.includes(i) ? 'red' : 'black') : 'green' }}
      >
        {word + ' '}
      </Text>
    ))
  }

  return <Text>{translation}</Text>
}

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 16,
  },
  cardContent: {
    elevation: 14,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingVertical: 70,
    paddingHorizontal: 32,
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
