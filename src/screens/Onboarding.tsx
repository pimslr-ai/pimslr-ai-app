import { FONTS, INTERESTS, LANGUAGES, LEVELS, THEME } from '../constants'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PageView from '../components/PageView'
import ScreenView from '../components/ScreenView'
import Dropdown from '../components/Dropdown'
import { getCompletion } from '../clients/openai'

const AnimatedView = Animated.createAnimatedComponent(View)

export default () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()
  const [skippable, setSkippable] = useState(true)
  const [pageCompleted, setPageCompleted] = useState(false)

  const [language, setLanguage] = useState<string | null>('fr-FR')
  const [profeciency, setProfeciency] = useState<string | null>('begining')
  const [interests, setInterests] = useState<string[]>(['Art', 'Books', 'Movies'])

  const [generated, setGenerated] = useState<null | string>(null)

  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    console.log('calling...')
    generateCourses()
  }, [])

  useEffect(() => {
    switch (pageNumber) {
      case 1:
        setSkippable(false)
        setPageCompleted(!!language)
        break
      case 2:
        setSkippable(false)
        setPageCompleted(!!profeciency)
        break
      case 3:
        setSkippable(true)
        setPageCompleted(interests.length >= 3)
        break
    }
  }, [pageNumber])

  useEffect(() => {
    setPageCompleted(!!language)
  }, [language])

  useEffect(() => {
    if (profeciency) {
      showExplanations()
    } else {
      hideExplanations()
    }

    setPageCompleted(!!profeciency)
  }, [profeciency])

  useEffect(() => {
    setPageCompleted(interests.length >= 3)
  }, [interests])

  const generateCourses = () => {
    const prompt = `Given the following sentence complexity levels:

Level 1: Basic Sentences
Grammar and Syntax:
Sentences should have correct grammar and basic syntax.
Simple sentence structures (subject-verb-object).
Use of common conjunctions (and, but, or).
Vocabulary:
Use of common and everyday words.
Limited use of specialized or complex vocabulary.
Clarity:
Clear and straightforward communication.
Avoidance of ambiguous or convoluted phrasing.

Level 2: Intermediate Sentences
Grammar and Syntax:
More varied sentence structures (e.g., compound and complex sentences).
Correct use of punctuation for emphasis and clarity.
Proper use of verb tenses and agreement.
Vocabulary:
Expanded vocabulary with a mix of common and more advanced words.
Use of synonyms and varied expressions.
Clarity:
Clear communication with the ability to express more nuanced ideas.
Awareness of context for effective communication.

Level 3: Advanced Sentences
Grammar and Syntax:
Mastery of complex sentence structures (e.g., subordinate clauses, participial phrases).
Skillful use of rhetorical devices (e.g., parallelism, inversion).
Varied sentence beginnings for stylistic effect.
Vocabulary:
Extensive and precise vocabulary.
Effective use of domain-specific terminology.
Ability to convey abstract and sophisticated concepts.
Clarity:
Clear communication of complex ideas.
Use of rhetorical strategies to enhance persuasiveness or engagement.

As users progress through each level, they can expect an increase in linguistic complexity and sophistication. These criteria provide a framework for gradually advancing the difficulty of generated sentences.

For someone learning a new language, can you generate sentences related to the topic of ${interests[0]}.

Can you generate a list of 10 sentences no more than 10 words in ${language} for each complexity levels. 

Please return respond with a json response.
      `

    getCompletion(prompt).then(setGenerated)
  }

  const showExplanations = () => {
    Animated.timing(animation, {
      duration: 350,
      toValue: 1,
      useNativeDriver: false,
    }).start()
  }

  const hideExplanations = () => {
    Animated.timing(animation, {
      duration: 0,
      toValue: 0,
      useNativeDriver: false,
    }).start()
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
          <View>
            <Text style={styles.title}>Generated courses</Text>
            <Text style={styles.subtitle}>
              Placeholder screen for displaying results from generated courses.
            </Text>

            <View>
              <Text>{generated}</Text>
            </View>
          </View>

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
              onSelection={setProfeciency}
            />

            <AnimatedView style={[styles.explanationsContainer, { opacity: animation }]}>
              <Text style={styles.explanations}>
                {LEVELS.filter(l => l.name === profeciency)[0]?.descriptions}
              </Text>
            </AnimatedView>
          </View>

          <View style={styles.page}>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>Get lessons catered to your interests. Select at least 3.</Text>

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
          </View>
        </PageView>

        <PrimaryButton
          disable={!pageCompleted}
          label={pageNumber >= 3 ? 'Complete' : 'Next'}
          containerStyle={styles.button}
          onClick={pageView?.turnNext}
        />
      </View>
    </ScreenView>
  )
}

const Tag = ({
  label,
  onToggleOn,
  onToggleOff,
}: {
  label: string
  onToggleOn?: (label: string) => void
  onToggleOff?: (label: string) => void
}) => {
  const [toggle, setToggled] = useState<boolean>()

  const style = toggle
    ? {
        ...styles.tag,
        ...styles.tagActive,
      }
    : styles.tag

  const handleToggle = () => {
    if (toggle) {
      setToggled(false)
      onToggleOff!(label)
    } else {
      setToggled(true)
      onToggleOn!(label)
    }
  }

  return (
    <TouchableOpacity onPress={handleToggle}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  headerTitle: {
    fontSize: 16,
    color: THEME.COLOR,
    alignSelf: 'center',
    textAlign: 'center',
  },
  title: {
    color: THEME.COLOR,
    fontFamily: FONTS.POPPINS.BOLD,
    fontSize: 27,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 40,
    fontSize: 17,
    fontFamily: FONTS.POPPINS.REGULAR,
  },
  input: {
    height: '50%',
    marginTop: 50,
  },
  tagsWrapper: {
    marginTop: 50,
    height: '50%',
    padding: 8,
  },
  bottomBorder: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tags: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 32,
    // justifyContent: 'center',
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    color: THEME.COLOR,
    fontFamily: FONTS.POPPINS.MEDIUM,
    fontSize: 15,
  },
  tagActive: {
    backgroundColor: THEME.ACCENT,
    color: 'white',
  },
  dropdown: {
    marginTop: 50,
    width: '80%',
  },
  button: {
    position: 'absolute',
    bottom: 70,
  },
  page: {
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  explanationsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  explanations: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 16,
    marginHorizontal: 'auto',
    padding: 32,
  },
})

function capitalize(input: string) {
  const words = input.split(' ')
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
  return capitalizedWords.join(' ')
}
