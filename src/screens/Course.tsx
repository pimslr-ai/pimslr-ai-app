import { StyleSheet, View, Text } from 'react-native'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import { FONTS, SCREENS, THEME } from '../constants'
import { useEffect, useState } from 'react'
import PageView from '../components/PageView'
import Button from '../components/Button'
import { AVPlaybackStatusSuccess, Audio } from 'expo-av'
import PrimaryButton from '../components/PrimaryButton'

interface Course {
  id: any
  scenario: string
  sentences: Sentence[]
}

interface Sentence {
  id: any
  translation?: string
  original?: string
}

const course: Course = {
  id: 1,
  scenario: 'You are at a bar...',
  sentences: [
    {
      id: 1,
      translation: 'Pourriez-vous recommander une bière locale ?',
      original: 'Could you recommend a local brew?',
    },
    {
      id: 2,
      translation: 'Pourriez-vous recommander une bière locale ?',
      original: 'Could you recommend a local brew?',
    },
    {
      id: 3,
      translation: 'Pourriez-vous recommander une bière locale ?',
      original: 'Could you recommend a local brew?',
    },
  ],
}

export default () => {
  const navigation = useNavigation()
  const [pageView, setPageView] = useState<PageView | null>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState<Audio.Recording>()

  useEffect(() => {
    if (isReady) playAudio()
  }, [isReady])

  const recordAudio = () => {
    if (!isPlaying) {
      if (isRecording) {
        stopRecording()
        setIsRecording(false)
      } else {
        startRecording()
        setIsRecording(true)
      }
    }
  }

  async function startRecording() {
    console.log('Requesting permissions..')
    await Audio.requestPermissionsAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    })

    console.log('Starting recording..')
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
    setRecording(recording)
    console.log('Recording started')
  }

  async function stopRecording() {
    if (recording) {
      console.log('Stopping recording..')
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })
      const uri = recording.getURI()
      console.log('Recording stopped and stored at', uri)
    }
  }

  const playAudio = async () => {
    if (!isPlaying && !isRecording) {
      const file = require('../../assets/audio/question1.m4a')
      const { sound } = await Audio.Sound.createAsync(file)
      sound.setOnPlaybackStatusUpdate(
        status => (status as AVPlaybackStatusSuccess).didJustFinish && setIsPlaying(false),
      )
      sound.playAsync()
      setIsPlaying(true)
    }
  }

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            containerStyle={{ transform: [{ scale: 1.4 }] }}
            icon='close'
            onClick={() => navigation.navigate(SCREENS.DASHBOARD)}
          />
          <SecondaryButton
            labelFirst
            noticeMe
            label='Refine Scenario'
            icon='edit'
            onClick={() => navigation.navigate(SCREENS.COURSE.REFINE_SCENARIO)}
          />
        </View>

        <Text style={styles.title}>{course.scenario}</Text>

        <View style={styles.cards}>
          <PageView ref={setPageView} onPageChange={setPageNumber}>
            {course.sentences.map(sentence => (
              <View key={sentence.id} style={styles.card}>
                <View key={sentence.id} style={styles.cardContent}>
                  <Text style={styles.translation}>{sentence.translation}</Text>
                  <Text style={styles.original}>{sentence.original}</Text>
                </View>
              </View>
            ))}
          </PageView>

          <View style={styles.cardControls}>
            <SecondaryButton
              hide={pageNumber <= 1}
              label='Back'
              labelStyle={{ opacity: 0.7 }}
              onClick={pageView?.turnPrevious}
            />
            <Text style={styles.cardControlPagination}>
              {pageNumber}/{course.sentences.length}
            </Text>
            <SecondaryButton
              hide={pageNumber >= course.sentences.length}
              label='Next'
              labelStyle={{ opacity: 0.7 }}
              onClick={pageView?.turnNext}
            />
          </View>
        </View>

        {!isReady ? (
          <PrimaryButton
            containerStyle={styles.startButton}
            label='Start!'
            onClick={() => setIsReady(true)}
          />
        ) : (
          <View style={styles.courseControls}>
            <CourseButton icon='audiotrack' toggle={isPlaying} onClick={playAudio} />
            <CourseButton icon={isRecording ? 'pause' : 'mic'} toggle={!isPlaying} onClick={recordAudio} />
            <Button labelStyle={{ color: 'grey' }} containerStyle={styles.courseControlButton} icon='star' />
          </View>
        )}
      </View>
    </ScreenView>
  )
}

const CourseButton = ({ icon, toggle, onClick }: { icon: string; toggle: boolean; onClick: () => void }) => {
  return (
    <Button
      labelStyle={{ color: toggle ? 'white' : 'grey' }}
      containerStyle={{
        ...styles.courseControlButton,
        backgroundColor: toggle ? THEME.CTA : 'transparent',
      }}
      icon={icon}
      onClick={onClick}
    />
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
