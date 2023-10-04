import { View, StyleSheet, Text } from 'react-native'
import ScreenView from '../components/ScreenView'
import InteractiveInput from '../components/InteractiveInput'
import { THEME, FONTS, SCREENS } from '../constants'
import SecondaryButton from '../components/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import PrimaryButton from '../components/PrimaryButton'

interface RefineScenarioProps {
  scenario?: string
}

export default ({ scenario }: RefineScenarioProps) => {
  const navigation = useNavigation()

  const handleRefining = () => {
    navigation.navigate(SCREENS.COURSE.MAIN)
  }

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            containerStyle={{ transform: [{ scale: 1.4 }] }}
            icon='close'
            onClick={() => navigation.navigate(SCREENS.COURSE.MAIN)}
          />
        </View>

        <View style={styles.page}>
          <Text style={styles.title}>{scenario ?? 'Refine your scenario'}</Text>
          <Text style={styles.subtitle}>
            You can refine the current scenario by entering more information about the context you desire.
          </Text>
          <InteractiveInput
            multiline
            style={styles.input}
            placeholder='Enter more context about the desired scenario here here...'
          />
        </View>

        <PrimaryButton label='Refine Scenario' containerStyle={styles.button} onClick={handleRefining} />
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