import { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'
import { useNavigation, useParams } from '../'
import Card from './components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import ScreenView from '../../components/ScreenView'
import ConfettiCannon from '../../components/ConfettiCannon'
import AnimatedButton from './components/AnimatedButton'
import useAudio from '../../hooks/useAudio'
import usePronunciation from '../../hooks/usePronunciation'
import HorizontalPageView, { HorizontalPageViewRef } from '../../components/HorizontalPageView'
import { useCourses } from '../../contexts/CourseProvider'

export default () => {
  const navigation = useNavigation()
  const { id } = useParams('course')
  const { get, update } = useCourses()

  const pageView = useRef<HorizontalPageViewRef>(null)
  const cannon = useRef<ConfettiCannon>(null)

  const [isReady, setIsReady] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  const course = get(id)
  const sentences = course![course!.currentLevel]

  // prettier-ignore
  const { 
    loadSound, 
    toggleSound, 
    isPlaying, 
    isLoading 
  } = useAudio()
  // prettier-ignore
  const { 
    setReference, 
    toggleRecording, 
    isRecording, 
    isAssessing,
    assessment 
  } = usePronunciation(course?.language!)

  // prettier-ignore
  const isStateBlocked = [
    isPlaying, 
    isAssessing, 
    isRecording, 
    isLoading].some(Boolean)

  useEffect(() => {
    if (assessment && assessment.accuracyScore > 80) {
      cannon?.current?.shoot()
      course![course!.currentLevel][pageIndex].score = assessment
      update(course)
    }
  }, [assessment])

  useEffect(() => {
    if (sentences) {
      const currentSentence = sentences[pageIndex]
      setReference(currentSentence.sentence)
      loadSound(currentSentence.voice.audio).then(() => {
        if (isReady) {
          toggleSound()
        }
      })
    }
  }, [sentences, pageIndex])

  useEffect(() => {
    if (isReady) {
      setTimeout(toggleSound, 250)
    }
  }, [isReady])

  return (
    <ScreenView>
      <ConfettiCannon ref={cannon} />

      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            icon='close'
            onClick={() => navigation.navigate('dashboard')}
            containerStyle={{ transform: [{ scale: 1.4 }] }}
          />
        </View>

        <Text style={styles.title}>{course?.title}</Text>

        <View>
          <HorizontalPageView ref={pageView} onPageTurn={setPageIndex}>
            {sentences?.map((sentence, i) => (
              <Card key={i} sentence={sentence} />
            ))}
          </HorizontalPageView>

          {isReady && (
            <View style={styles.controls}>
              <SecondaryButton
                label='Back'
                labelStyle={{ opacity: 0.7 }}
                hide={pageIndex <= 0}
                onClick={() => pageView.current?.turnTo(pageIndex - 1)}
                disable={isStateBlocked}
              />
              <Text style={styles.controlPagination}>
                {pageIndex + 1}/{pageView.current?.pageCount!}
              </Text>
              <SecondaryButton
                label='Next'
                labelStyle={{ opacity: 0.7 }}
                hide={pageIndex >= pageView.current?.pageCount! - 1}
                onClick={() => pageView.current?.turnTo(pageIndex + 1)}
                disable={isStateBlocked}
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
            <AnimatedButton icon='audiotrack' onClick={toggleSound} toggle={isPlaying} disable={isLoading} />
            <AnimatedButton
              icon={isAssessing ? 'loop' : isRecording ? 'stop' : 'mic'}
              onClick={toggleRecording}
              toggle={!isPlaying}
              disable={isLoading}
            />
            <AnimatedButton icon='star' disable={isLoading} />
          </View>
        )}
      </View>
    </ScreenView>
  )
}
