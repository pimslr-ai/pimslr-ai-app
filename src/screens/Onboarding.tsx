import { DATA, FONTS, THEME } from '../constants'
import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '.'
import useAppStorage from '../hooks/useStorage'
import InteractiveInput from '../components/InteractiveInput'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PageView from '../components/PageView'
import ScreenView from '../components/ScreenView'

export default () => {
  const navigation = useNavigation()
  const { set } = useAppStorage()

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()

  const [state, setState] = useState<UserData>({
    language: 'French',
    profeciency: '',
    context: '',
  })

  const handleCompletion = async () => {
    await set<UserData>(DATA.USER_DATA, state)
    await set<boolean>(DATA.SETUP_COMPLETE, true)

    navigation.navigate('dashboard')
  }

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            hide={pageNumber <= 1}
            label='Back'
            onClick={pageView?.turnPrevious}
          />
          <Text style={styles.headerTitle}>{pageNumber}/3</Text>
          <SecondaryButton
            label='Skip'
            noticeMe
            hide={pageNumber != 3}
            onClick={pageView?.turnNext}
          />
        </View>

        <PageView
          ref={setPageView}
          onPageChange={setPageNumber}
          onLastPage={handleCompletion}
        >
          <View style={styles.page}>
            <Text style={styles.title}>What language would you like to learn?</Text>
            <InteractiveInput
              disable
              style={styles.langageInput}
              placeholder='French'
              onChange={language => setState(prev => ({ ...prev, language }))}
            />
          </View>
          <View style={styles.page}>
            <Text style={styles.title}>What's your level?</Text>
            <Text style={styles.subtitle}>
              This information is used to generate sentences that match your current
              level.
            </Text>
            <InteractiveInput
              multiline
              style={styles.input}
              placeholder='I can understand some of it...'
              onChange={profeciency => setState(prev => ({ ...prev, profeciency }))}
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
              onChange={context => setState(prev => ({ ...prev, context }))}
            />
          </View>
        </PageView>

        <PrimaryButton
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
    textAlignVertical: 'top',
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
