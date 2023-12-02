import { INTERESTS, LANGUAGES, LEVELS } from '../../constants'
import { View, Text, ScrollView, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import PageView from '../../components/PageView'
import ScreenView from '../../components/ScreenView'
import Dropdown from '../../components/Dropdown'
import InteractiveInput from '../../components/InteractiveInput'
import useCourseGeneration from '../../hooks/useCourseGeneration'
import Tag from './components/Tag'

const AnimatedView = Animated.createAnimatedComponent(View)

export default () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()
  const [skippable, setSkippable] = useState(true)
  const [pageCompleted, setPageCompleted] = useState(false)

  const [interests, setInterests] = useState<string[]>([])
  const [freetextEnabled, enableFreetext] = useState(false)
  const { info, setInfo, generate, status, course } = useCourseGeneration()

  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    switch (pageNumber) {
      case 1:
        setSkippable(false)
        setPageCompleted(!!info.language)
        break
      case 2:
        setSkippable(false)
        setPageCompleted(!!info.level)
        break
      case 3:
        setSkippable(false)
        setPageCompleted(interests.length > 2 || (freetextEnabled && interests.length > 0))
        break
      case 4:
        setSkippable(false)
        const i = Math.floor(Math.random() * interests.length)
        const topic = interests[i]
        setInfo(info => ({ ...info, topic }))
        break
    }
  }, [pageNumber])

  useEffect(() => {
    setPageCompleted(!!info.language)
  }, [info.language])

  useEffect(() => {
    info.level ? showExplanations() : hideExplanations()
    setPageCompleted(!!info.level)
  }, [info.level])

  useEffect(() => {
    setPageCompleted(interests.length > 2 || (freetextEnabled && interests.length > 0))
  }, [interests])

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

  const handleClick = () => {
    pageNumber === 4 ? generate() : pageView?.turnNext()
  }

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton hide={pageNumber <= 1} label='Back' onClick={pageView?.turnPrevious} />
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
              onSelection={language => setInfo(info => ({ ...info, language }))}
            />
          </View>

          <View style={styles.page}>
            <Text style={styles.title}>Choose a level</Text>
            <Text style={styles.subtitle}>Get lessons tailored to your speaking level.</Text>

            <Dropdown
              containerStyle={styles.dropdown}
              items={LEVELS.map(l => ({ label: capitalize(l.name), value: l.name }))}
              label='Select prefered level'
              onSelection={level => setInfo(info => ({ ...info, level }))}
            />

            <AnimatedView style={[styles.explanationsContainer, { opacity: animation }]}>
              <Text style={styles.explanations}>
                {LEVELS.filter(l => l.name === info.level)[0]?.descriptions}
              </Text>
            </AnimatedView>
          </View>

          <View style={styles.page}>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>
              Get lessons catered to your interests.{' '}
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
                onChange={input => setInterests([input])}
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
            <Text style={styles.title}>Generate course</Text>
            <Text style={styles.subtitle}>Generate your very first course unique to your interests.</Text>

            <View style={{ justifyContent: 'center' }}>
              <Text>
                {status.stage?.step}/{status?.stage?.count}: {status?.isLoading && status.stage?.label}
              </Text>
              <Text>{course && JSON.stringify(course, null, 2)}</Text>
            </View>
          </View>
        </PageView>

        <PrimaryButton
          disable={status.isLoading || (pageNumber === 4 ? false : !pageCompleted)}
          label={pageNumber === 4 ? 'Generate course' : 'Next'}
          containerStyle={styles.button}
          onClick={handleClick}
        />
      </View>
    </ScreenView>
  )
}

function capitalize(input: string) {
  const words = input.split(' ')
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
  return capitalizedWords.join(' ')
}