import { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Sentence } from '../../types'
import { styles } from './style'
import { useNavigation } from '../'
import { course } from './test'
import Card from './components/Card'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import ScreenView from '../../components/ScreenView'
import ConfettiCannon from '../../components/ConfettiCannon'
import AnimatedButton from './components/AnimatedButton'
import useAudio from '../../hooks/useAudio'
import usePronunciation from '../../hooks/usePronunciation'
import HorizontalPageView, { HorizontalPageViewRef } from '../../components/HorizontalPageView'

export default () => {
  const navigation = useNavigation()
  const [cannon, setCannon] = useState<ConfettiCannon | null>()
  const [isReady, setIsReady] = useState(false)
  const [sentences, setSentences] = useState<Sentence[]>()
  const [pageIndex, setPageIndex] = useState(0)
  const pageView = useRef<HorizontalPageViewRef>(null)

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
  } = usePronunciation(course.language)

  // prettier-ignore
  const isStateBlocked = [
    isPlaying, 
    isAssessing, 
    isRecording, 
    isLoading].some(s => s)

  useEffect(() => {
    if (assessment) {
      console.log(JSON.stringify(assessment, null, 2))
    }
  }, [assessment])

  useEffect(() => {
    // @ts-ignore
    setSentences(course[course.currentLevel as string])
  }, [])

  useEffect(() => {
    if (sentences) {
      const currentSentence = sentences[pageIndex]
      setReference(currentSentence.english)
      loadSound(currentSentence.voice.audio)
    }
  }, [sentences, pageIndex])

  return (
    <ScreenView>
      <ConfettiCannon ref={setCannon} />

      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            icon='close'
            onClick={() => navigation.navigate('dashboard')}
            containerStyle={{ transform: [{ scale: 1.4 }] }}
          />
        </View>

        <Text style={styles.title}>{course.title}</Text>

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
              toggle={isRecording}
            />
            <AnimatedButton icon='star' />
          </View>
        )}
      </View>
    </ScreenView>
  )
}
