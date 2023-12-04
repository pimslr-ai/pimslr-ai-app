import { INTERESTS, LANGUAGES, LEVELS, THEME } from '../../constants'
import { View, Text, ScrollView, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { PulseIndicator } from 'react-native-indicators'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import PageView from '../../components/PageView'
import ScreenView from '../../components/ScreenView'
import Dropdown from '../../components/Dropdown'
import InteractiveInput from '../../components/InteractiveInput'
import Tag from './components/Tag'
import { useCourses } from '../../contexts/CourseProvider'
import { Level } from '../../types'

const AnimatedView = Animated.createAnimatedComponent(View)

export default () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()
  const [skippable, setSkippable] = useState(true)
  const [pageCompleted, setPageCompleted] = useState(false)

  const [language, setLanguage] = useState<string>()
  const [level, setLevel] = useState<Level>()
  const [interests, setInterests] = useState<string[]>([])
  const [topic, setTopic] = useState<string>()
  const [freetextEnabled, enableFreetext] = useState(false)

  const { status, generate } = useCourses()

  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    switch (pageNumber) {
      case 1:
        setSkippable(false)
        setPageCompleted(!!language)
        break
      case 2:
        setSkippable(false)
        setPageCompleted(!!level)
        break
      case 3:
        setSkippable(false)
        setPageCompleted((!freetextEnabled && interests.length >= 3) || (freetextEnabled && !!topic))
        break
      case 4:
        const i = Math.floor(Math.random() * interests.length)
        const randomInterest = interests[i]
        generate(language!, level!, topic ?? randomInterest)
        break
    }
  }, [pageNumber])

  useEffect(() => {
    setPageCompleted(!!language)
  }, [language])

  useEffect(() => {
    level ? showExplanations() : hideExplanations()
    setPageCompleted(!!level)
  }, [level])

  useEffect(() => {
    setPageCompleted(!freetextEnabled && interests.length >= 3)
  }, [interests])

  useEffect(() => {
    setPageCompleted(freetextEnabled && !!topic)
  }, [topic])

  useEffect(() => {
    if (freetextEnabled) {
      setInterests([])
    } else {
      setTopic(undefined)
    }
  }, [freetextEnabled])

  const showExplanations = () => {
    Animated.timing(animation, {
      duration: 350,
      toValue: 1,
      useNativeDriver: false,
    }).start()
  }

  const hideExplanations = () => {
    Animated.timing(animation, {
      duration: 175,
      toValue: 0,
      useNativeDriver: false,
    }).start()
  }

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            hide={pageNumber <= 1 || pageNumber > 3}
            label='Back'
            onClick={pageView?.turnPrevious}
          />
          <Text style={styles.headerTitle}>{pageNumber}/4</Text>
          <SecondaryButton label='Skip' noticeMe hide={!skippable} onClick={pageView?.turnNext} />
        </View>

        <PageView ref={setPageView} onPageChange={setPageNumber}>
          <View style={styles.page}>
            <Text style={styles.title}>Choose a language</Text>
            <Text style={styles.subtitle}>Learn your first language the PimslrAI way.</Text>

            <Dropdown
              containerStyle={styles.dropdown}
              items={LANGUAGES}
              label='Select a language'
              onSelection={setLanguage}
            />
          </View>

          <View style={styles.page}>
            <Text style={styles.title}>Choose a level</Text>
            <Text style={styles.subtitle}>Get lessons tailored to your speaking level.</Text>

            <Dropdown
              containerStyle={styles.dropdown}
              items={LEVELS.map(l => ({ label: capitalize(l.name), value: l.name }))}
              label='Select prefered level'
              onSelection={setLevel}
            />

            <AnimatedView style={[styles.explanationsContainer, { opacity: animation }]}>
              <Text style={styles.explanations}>{LEVELS.filter(l => l.name === level)[0]?.descriptions}</Text>
            </AnimatedView>
          </View>

          <View style={styles.page}>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>
              Get lessons catered to your interests.
              {freetextEnabled ? 'Write down your interests.' : 'Select at least 3.'}
            </Text>

            {!freetextEnabled ? (
              <>
                <ScrollView style={styles.tagsWrapper} showsVerticalScrollIndicator={false}>
                  <View style={styles.tags}>
                    {INTERESTS.map(interest => (
                      <Tag
                        key={interest}
                        label={interest}
                        onToggleOn={label => setInterests([...interests, label])}
                        onToggleOff={label => setInterests(interests.filter(i => i !== label))}
                      />
                    ))}
                  </View>
                </ScrollView>
                <View style={styles.bottomBorder} />
              </>
            ) : (
              <InteractiveInput
                multiline
                style={styles.input}
                placeholder='I am fascinated by fising...'
                onChange={setTopic}
              />
            )}

            <View style={styles.writeButtonWrapper}>
              <SecondaryButton
                onClick={() => enableFreetext(!freetextEnabled)}
                label={freetextEnabled ? 'Select tags instead' : 'Write something instead'}
              />
            </View>
          </View>

          <View>
            <Text style={styles.title}>{status.isLoading ? status.stage?.label : 'Generate course'} </Text>
            <Text style={styles.subtitle}>Generating your very first course unique to your interests.</Text>
            {status.isLoading && (
              <>
                <Text style={[styles.subtitle, { marginTop: 10 }]}>
                  {status.stage?.step} / {status.stage?.count}
                </Text>
                <PulseIndicator style={styles.loadingIndicator} color={THEME.CTA} />
              </>
            )}
          </View>
        </PageView>

        {pageNumber < 4 && (
          <PrimaryButton
            disable={!pageCompleted}
            label={pageNumber === 3 ? 'Generate course' : 'Next'}
            containerStyle={styles.button}
            onClick={pageView?.turnNext}
          />
        )}
      </View>
    </ScreenView>
  )
}

function capitalize(input: string) {
  const words = input.split(' ')
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
  return capitalizedWords.join(' ')
}
