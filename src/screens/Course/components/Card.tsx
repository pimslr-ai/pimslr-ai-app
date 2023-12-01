import { FONTS } from '../../../constants'
import { View, Text, StyleSheet } from 'react-native'
import { Sentence } from '../../../types'
import useAudio from '../../../hooks/useAudio'
import usePronunciation from '../../../hooks/usePronunciation'
import SecondaryButton from '../../../components/SecondaryButton'
import { Ref, forwardRef, useEffect, useImperativeHandle } from 'react'

interface CardProps {
  language: string
  sentence: Sentence
  onSuccess?: () => void
  onSound?: (isPlaying: boolean) => void
  onRecording?: (isRecording: boolean) => void
  onAssessment?: (isAssessing: boolean) => void
}

export interface CardRef {
  toggleRecording: () => void
  toggleSound: () => void
}

const Card = ({ language, sentence, onSound, onRecording, onAssessment }: CardProps, ref: Ref<CardRef>) => {
  console.log(sentence.sentence, ref)
  const { toggleSound, isPlaying } = useAudio(sentence.voice.audio)
  const { toggleRecording, isRecording, isAssessing, assessment } = usePronunciation(
    language,
    sentence.sentence,
  )

  useImperativeHandle(
    ref,
    () => ({
      toggleRecording,
      toggleSound,
    }),
    [],
  )

  useEffect(() => {
    if (onSound) {
      onSound(isPlaying)
    }
  }, [isPlaying])

  useEffect(() => {
    if (onRecording) {
      onRecording(isRecording)
    }
  }, [isRecording])

  useEffect(() => {
    if (onAssessment) {
      onAssessment(isAssessing)
    }
  }, [isAssessing])

  useEffect(() => {
    if (assessment) {
      console.log(JSON.stringify(assessment, null, 2))
    }
  }, [assessment])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <SecondaryButton
            label='Record'
            labelStyle={{ color: isRecording ? 'red' : 'black' }}
            onClick={toggleRecording}
          />
          <SecondaryButton
            label='Audio'
            labelStyle={{ color: isPlaying ? 'red' : 'black' }}
            onClick={toggleSound}
          />
          <Text style={styles.translation}>{sentence.sentence}</Text>
          <Text style={styles.original}>{sentence.english}</Text>
        </View>
      </View>
    </View>
  )
}

export default forwardRef<CardRef, CardProps>(Card)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
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
