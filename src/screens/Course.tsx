import { FONTS, THEME } from '../constants'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Animated, TextStyle } from 'react-native'
import { useNavigation, useParams } from '.'
import useRecognition from '../hooks/useRecognition'
import useAudio from '../hooks/useAudio'
import ScreenView from '../components/ScreenView'
import PageView from '../components/PageView'
import SecondaryButton from '../components/SecondaryButton'
import PrimaryButton from '../components/PrimaryButton'
import ConfettiCannon from 'react-native-confetti-cannon'
import Button from '../components/Button'

export default () => {
  const navigation = useNavigation()
  const { course } = useParams('course:home')
  const [pageView, setPageView] = useState<PageView | null>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isReady, setIsReady] = useState(false)
  const [hasSucceeded, setHasSucceeded] = useState(false)
  const { isPlaying, playAudio, stopAudio, setAudio } = useAudio()
  const { startRecording, stopRecording, clearRecognition, recognition, isRecording, isLoading, amplitude } =
    useRecognition('fr-FR')

  useEffect(() => {
    if (isReady) {
      clearRecognition()

      stopAudio()
        .then(() => setAudio(course.sentences[pageNumber - 1].audio))
        .then(playAudio)
    }
  }, [isReady, pageNumber])

  const toggleRecording = () => {
    if (isPlaying) {
      stopAudio()
    }
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const toggleAudio = () => {
    if (!isRecording) {
      if (isPlaying) {
        stopAudio()
      } else {
        playAudio()
      }
    }
  }

  const handleClose = () => {
    stopAudio()
    navigation.navigate('dashboard')
  }

  return (
    <ScreenView>
      {hasSucceeded && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}

      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            icon='close'
            onClick={handleClose}
            containerStyle={{ transform: [{ scale: 1.4 }] }}
          />
          <SecondaryButton
            icon='edit'
            label='Refine Scenario'
            noticeMe
            labelFirst
            onClick={() => navigation.navigate('course:refine_scenario', { course })}
          />
        </View>

        <Text style={styles.title}>{course?.scenario}</Text>

        <View style={styles.cards}>
          <PageView ref={setPageView} onPageChange={setPageNumber}>
            {course?.sentences.map((sentence, i) => (
              <View key={sentence.id} style={styles.card}>
                <View key={sentence.id} style={styles.cardContent}>
                  <Text style={styles.translation}>
                    <Sentence
                      onSuccess={() => setHasSucceeded(true)}
                      translation={sentence?.translation!}
                      recognition={i === pageNumber - 1 ? recognition! : undefined}
                    />
                  </Text>
                  <Text style={styles.original}>{sentence.original}</Text>
                </View>
              </View>
            ))}
          </PageView>

          {isReady && (
            <View style={styles.cardControls}>
              <SecondaryButton
                label='Back'
                hide={pageNumber <= 1}
                labelStyle={{ opacity: 0.7 }}
                onClick={pageView?.turnPrevious}
              />
              <Text style={styles.cardControlPagination}>
                {pageNumber}/{course?.sentences.length}
              </Text>
              <SecondaryButton
                label='Next'
                hide={pageNumber >= course?.sentences.length!}
                labelStyle={{ opacity: 0.7 }}
                onClick={pageView?.turnNext}
              />
            </View>
          )}
        </View>

        {!isReady ? (
          <PrimaryButton
            label='Start!'
            containerStyle={styles.startButton}
            onClick={() => setIsReady(true)}
          />
        ) : (
          <View style={styles.courseControls}>
            <AnimatedButton icon='audiotrack' onClick={toggleAudio} toggle={isPlaying} />
            <AnimatedButton
              icon={isLoading ? 'loop' : isRecording ? 'stop' : 'mic'}
              onClick={toggleRecording}
              toggle={!isPlaying}
            />
            <AnimatedButton icon='star' />
          </View>
        )}
      </View>
    </ScreenView>
  )
}

// const AnimatedMicButton = ({
//   icon,
//   onClick,
//   toggle,
//   amplitude,
// }: {
//   icon: string
//   onClick?: () => void
//   toggle?: boolean
//   amplitude?: number
// }) => {
//   const animation = useRef(new Animated.Value(0)).current

//   useEffect(() => {
//     animate()
//   }, [toggle])

//   const backgroundColor = animation.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ['transparent', 'transparent', THEME.CTA],
//   }) as any

//   const animate = () => {
//     Animated.timing(animation, {
//       duration: 200,
//       toValue: toggle ? 1 : 0,
//       useNativeDriver: true,
//     }).start()
//   }

//   const remap = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => {
//     const normalizedValue = (value - fromMin) / (fromMax - fromMin)
//     return normalizedValue * (toMax - toMin) + toMin
//   }

//   const remapped = remap(amplitude! + 60, 0, 50, 0, 100)

//   console.log(remapped)

//   return (
//     <Button
//       icon={icon}
//       onClick={onClick}
//       labelStyle={{ color: toggle ? 'white' : 'grey' }}
//       containerStyle={{
//         ...styles.courseControlButton,
//         transform: amplitude ? [{ scale: Math.round(Math.abs(amplitude)) / 100 }] : [],
//         backgroundColor,
//       }}
//     />
//   )
// }

const AnimatedButton = ({
  icon,
  onClick,
  toggle,
}: {
  icon: string
  onClick?: () => void
  toggle?: boolean
}) => {
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    animate()
  }, [toggle])

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1.4, 0, 1.4],
  })

  const backgroundColor = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['transparent', 'transparent', THEME.CTA],
  }) as any

  const animate = () => {
    Animated.timing(animation, {
      duration: 200,
      toValue: toggle ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Button
      icon={icon}
      onClick={onClick}
      labelStyle={{ color: toggle ? 'white' : 'grey' }}
      containerStyle={{
        ...styles.courseControlButton,
        transform: [{ scale }],
        backgroundColor,
      }}
    />
  )
}

const Sentence = ({
  translation,
  recognition,
  onSuccess,
}: {
  translation: string
  recognition?: Recognition
  onSuccess?: () => void
}) => {
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
  courseControls: {
    width: '100%',
    position: 'absolute',
    bottom: 70,
    paddingHorizontal: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  startButton: {
    position: 'absolute',
    bottom: 70,
  },
  courseControlButton: {
    aspectRatio: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.4 }],
  },
  container: {
    flex: 1,
    alignContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: 30,
    marginTop: 50,
  },
  title: {
    color: THEME.COLOR,
    fontFamily: FONTS.POPPINS.BOLD,
    fontSize: 27,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginVertical: 40,
  },
  cards: {
    elevation: 5,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  card: {
    padding: 16,
  },
  cardContent: {
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
  cardControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  cardControlPagination: {
    fontSize: 12,
    color: THEME.COLOR,
    alignSelf: 'center',
    textAlign: 'center',
  },
})
