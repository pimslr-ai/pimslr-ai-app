import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'
import { useNavigation } from '../'
import usePronunciation from '../../hooks/usePronunciation'
import useAudio from '../../hooks/useAudio'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import ScreenView from '../../components/ScreenView'
import PageView from '../../components/PageView'
import ConfettiCannon from '../../components/ConfettiCannon'
import AnimatedButton from './components/AnimatedButton'
import Card from './components/Card'
import { Course, Sentence } from '../../types'

export default () => {
  const navigation = useNavigation()

  const course: Partial<Course> = {}
  const [sentences, setSentences] = useState<Sentence[]>([])

  const [cannon, setCannon] = useState<ConfettiCannon | null>()
  const [pageView, setPageView] = useState<PageView | null>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isReady, setIsReady] = useState(false)

  // prettier-ignore
  const { 
    isPlaying, 
    loadAudio, 
    playAudio, 
    stopAudio 
  } = useAudio()

  // prettier-ignore
  const { 
    startRecording, 
    stopRecording, 
    clearAssessment, 
    assessement, 
    isRecording, 
    isLoading, 
  } = usePronunciation('fr-FR', 'reference')

  useEffect(() => {
    if (isReady) {
      // @ts-ignore
      setSentences(course[course.currentLevel as string])

      // const selectedSentence = course!.sentences[pageNumber - 1]
      // const audio = audios[selectedSentence.audio - 1!]
      // loadAudio(audio).then(playAudio)
      // clearAssessment()
    }
  }, [isReady, pageNumber])

  const toggleRecording = () => {
    clearAssessment()

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
    clearAssessment()

    if (isRecording) {
      stopRecording()
    }
    if (isPlaying) {
      stopAudio()
    } else {
      playAudio()
    }
  }

  const handleClose = () => {
    stopAudio()
    navigation.navigate('dashboard')
  }

  return (
    <ScreenView>
      <ConfettiCannon ref={setCannon} />

      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            icon='close'
            onClick={handleClose}
            containerStyle={{ transform: [{ scale: 1.4 }] }}
          />
          {/* <SecondaryButton
              icon='edit'
              label='Refine Scenario'
              noticeMe
              labelFirst
              onClick={() => navigation.navigate('course:refine_scenario', { courseId })}
            /> */}
        </View>

        <Text style={styles.title}>{course?.title}</Text>

        <View>
          <PageView ref={setPageView} onPageChange={setPageNumber}>
            {sentences?.map((sentence, i) => (
              <Card
                key={i}
                isCurrent={pageNumber - 1 === i}
                sentence={sentence}
                assessment={assessement}
                onSuccess={cannon?.shoot}
              />
            ))}
          </PageView>

          {isReady && (
            <View style={styles.cardControls}>
              <SecondaryButton
                label='Back'
                hide={pageNumber <= 1}
                labelStyle={{ opacity: 0.7 }}
                onClick={pageView?.turnPrevious}
                disable={isPlaying}
              />
              <Text style={styles.cardControlPagination}>
                {pageNumber}/{sentences.length}
              </Text>
              <SecondaryButton
                label='Next'
                hide={pageNumber >= sentences.length}
                labelStyle={{ opacity: 0.7 }}
                onClick={pageView?.turnNext}
                disable={isPlaying}
              />
            </View>
          )}
        </View>

        {!isReady ? (
          <>
            <Text style={{ bottom: 150, textAlign: 'center', position: 'absolute', width: '100%' }}>
              Please disable silent mode 😊
            </Text>
            <PrimaryButton
              label='Start!'
              containerStyle={styles.startButton}
              onClick={() => setIsReady(true)}
            />
          </>
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
