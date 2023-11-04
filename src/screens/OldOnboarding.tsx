import { FONTS, LANGUAGES, THEME } from '../constants'
import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import InteractiveInput from '../components/InteractiveInput'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PageView from '../components/PageView'
import ScreenView from '../components/ScreenView'
import Dropdown from '../components/Dropdown'

export default () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()
  const [canSkip, setCanSkip] = useState(true)
  const [pageCompleted, setPageCompleted] = useState(false)

  const [language, setLanguage] = useState<string | null>(null)
  const [profecenicy, setProfecenicy] = useState<string | null>(null)
  const [interests, setInterests] = useState<string | null>(null)

  useEffect(() => {
    setCanSkip(![3, 2].includes(pageNumber))
    setPageCompleted(false)
  }, [pageNumber])

  useEffect(() => {
    setPageCompleted(!!(language || profecenicy || interests))
  }, [language, interests, profecenicy])

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton hide={pageNumber <= 1} label='Back' onClick={pageView?.turnPrevious} />
          <Text style={styles.headerTitle}>{pageNumber}/3</Text>
          <SecondaryButton label='Skip' noticeMe hide={canSkip} onClick={pageView?.turnNext} />
        </View>

        <PageView ref={setPageView} onPageChange={setPageNumber}>
          <View style={styles.page}>
            <Text style={styles.title}>Choose a language</Text>
            <Text style={styles.subtitle}>Learn your first language the PimslrAI way</Text>
            <Dropdown
              containerStyle={styles.dropdown}
              items={LANGUAGES}
              label='Select a language'
              onSelection={setLanguage}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.title}>What's your level?</Text>
            <Text style={styles.subtitle}>Get lessons tailored to your level</Text>
            <InteractiveInput
              multiline
              style={styles.input}
              placeholder='I can understand some of it...'
              onChange={setProfecenicy}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>Get lessons catered to your interests</Text>
            <InteractiveInput
              multiline
              style={styles.input}
              placeholder='I am an exchange student...'
              onChange={setInterests}
            />
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
    paddingHorizontal: 40,
    fontSize: 17,
    fontFamily: FONTS.POPPINS.REGULAR,
  },
  input: {
    height: '50%',
    marginTop: 50,
  },
  dropdown: {
    marginTop: 50,
  },
  button: {
    position: 'absolute',
    bottom: 70,
  },
  page: {
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
})
