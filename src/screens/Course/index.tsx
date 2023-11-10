import { FONTS, THEME } from '../../constants'
import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation, useParams } from '../'
import useRecognition from '../../hooks/useRecognition'
import useAudio from '../../hooks/useAudio'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import ScreenView from '../../components/ScreenView'
import PageView from '../../components/PageView'
import ConfettiCannon from '../../components/ConfettiCannon'
import { useCourses } from '../../hooks/useCourses'
import AnimatedButton from './components/AnimatedButton'
import Card from './components/Card'

const audios = [
  require('../../../assets/audio/1.m4a'),
  require('../../../assets/audio/2.m4a'),
  require('../../../assets/audio/3.m4a'),
  require('../../../assets/audio/4.m4a'),
  require('../../../assets/audio/5.m4a'),
  require('../../../assets/audio/6.m4a'),
  require('../../../assets/audio/7.m4a'),
  require('../../../assets/audio/8.m4a'),
  require('../../../assets/audio/9.m4a'),
  require('../../../assets/audio/10.m4a'),
]

export default () => {
  const navigation = useNavigation()
  const { courseId } = useParams('course:home')
  const { course } = useCourses(courseId)
  const [pageView, setPageView] = useState<PageView | null>()
  const [cannon, setCannon] = useState<ConfettiCannon | null>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isReady, setIsReady] = useState(false)
  const { isPlaying, loadAudio, playAudio, stopAudio } = useAudio()
  const { startRecording, stopRecording, recognition, isRecording, isLoading, amplitude } =
    useRecognition('fr-FR')

  useEffect(() => {
    if (isReady) {
      const audio = audios[course!.sentences[pageNumber - 1].audio - 1!]
      loadAudio(audio).then(playAudio)
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
    course && (
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

          <Text style={styles.title}>{course?.scenario.title}</Text>

          <View>
            <PageView ref={setPageView} onPageChange={setPageNumber}>
              {course?.sentences?.map((sentence, i) => (
                <Card key={i} sentence={sentence} onSuccess={cannon?.shoot} />
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
                  {pageNumber}/{course?.sentences.length}
                </Text>
                <SecondaryButton
                  label='Next'
                  hide={pageNumber >= course?.sentences.length!}
                  labelStyle={{ opacity: 0.7 }}
                  onClick={pageView?.turnNext}
                  disable={isPlaying}
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
  )
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
  cardControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    fontSize: 14,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  cardControlPagination: {
    color: THEME.COLOR,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
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
