import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, THEME } from '../constants'
import InteractiveInput from '../components/InteractiveInput'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PageView from '../components/PageView'
import { OnBoardingData } from '../types/User'
import AppScreen from './AppScreen'

interface OnBoardingProps {
  onCompletion?: (data: OnBoardingData) => void
}

export default ({ onCompletion: onComplete }: OnBoardingProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()

  const [language, setLanguage] = useState('')
  const [profeciency, setProficiency] = useState('')
  const [context, setContext] = useState('')

  const handleCompletion = () => {
    if (onComplete) {
      onComplete({
        language,
        profeciency,
        context,
      })
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton hide={pageNumber <= 1} label='Back' onClick={pageView?.turnPrevious} />
          <Text style={styles.headerTitle}>{pageNumber}/3</Text>
          <SecondaryButton label='Skip' noticeMe hide={pageNumber != 3} onClick={pageView?.turnNext} />
        </View>

        <PageView ref={setPageView} onPageChange={setPageNumber} onLastPage={handleCompletion}>
          <View style={styles.page}>
            <Text style={styles.title}>What language would you like to learn?</Text>
            <InteractiveInput style={styles.langageInput} placeholder='French' onChange={setLanguage} />
          </View>
          <View style={styles.page}>
            <Text style={styles.title}>What's your level?</Text>
            <Text style={styles.subtitle}>
              This information is used to generate sentences that match your current level.
            </Text>
            <InteractiveInput
              multiline
              style={styles.input}
              placeholder='I can understand some of it...'
              onChange={setProficiency}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>
              This information is used to generate sentences that relate to your desires.
            </Text>
            <InteractiveInput
              multiline
              style={styles.input}
              placeholder='I am an exchange student...'
              onChange={setContext}
            />
          </View>
        </PageView>

        <PrimaryButton
          label={pageNumber >= 3 ? 'Complete' : 'Next'}
          containerStyle={styles.button}
          onClick={pageView?.turnNext}
        />
      </View>
    </AppScreen>
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
    fontWeight: 'bold',
    fontSize: 27,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 30,
    fontSize: 15,
    fontFamily: FONTS.POPPINS.REGULAR,
  },
  langageInput: {
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    height: '40%',
    marginTop: 40,
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